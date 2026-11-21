import hashlib
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, HTTPException, Depends, Query, Response, Request, status
from sqlalchemy.orm import Session
from jwt import InvalidTokenError

from app.database.connection import get_db
from app.dependencies.auth import obtener_usuario_actual
from app.models.user import Usuario
from app.models.sesion import Sesion
from app.schemas.user import UsuarioLogin
from app.services.hash import validar_contrasena
from app.core.security import crear_token, decodificar_token
from app.core.config import settings

router = APIRouter(prefix="/auth")


@router.post("/login")
def login_usuario(
    usuario: UsuarioLogin, response: Response, db: Session = Depends(get_db)
):
    usuario_login = db.query(Usuario).filter(Usuario.correo == usuario.correo).first()

    if usuario_login is None or not validar_contrasena(
        usuario_login.contrasena_hash, usuario.contrasena
    ):
        raise HTTPException(status_code=404, detail="Usuario y/o contraseña incorrecta")

    access_token = crear_token(
        subject=str(usuario_login.id_usuario),
        tipo="access",
        duracion=timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    refresh_token = crear_token(
        subject=str(usuario_login.id_usuario),
        tipo="refresh",
        duracion=timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS),
    )

    token_hash = hashlib.sha256(refresh_token.encode("utf-8")).hexdigest()

    fecha_expiracion = datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(
        days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS
    )

    nueva_sesion = Sesion(
        id_usuario=usuario_login.id_usuario,
        token_hash=token_hash,
        fecha_expiracion=fecha_expiracion,
    )

    db.add(nueva_sesion)
    db.commit()

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS * 86400,
    )

    return {
        "message": "Inicio de sesión exitoso",
        "user": {
            "id_user": usuario_login.id_usuario,
            "first_name": usuario_login.nombre_pila,
            "middle_name": usuario_login.apellido_paterno,
            "last_name": usuario_login.apellido_materno,
            "email": usuario_login.correo,
            "register_date": usuario_login.fecha_registro,
            "type": usuario_login.tipo_usuario.nombre_tipo,
        },
    }


@router.get("/me")
def obtener_sesion_actual(usuario: Usuario = Depends(obtener_usuario_actual)):
    return {
        "id_user": usuario.id_usuario,
        "first_name": usuario.nombre_pila,
        "middle_name": usuario.apellido_paterno,
        "last_name": usuario.apellido_materno,
        "email": usuario.correo,
        "register_date": usuario.fecha_registro,
        "type": usuario.tipo_usuario.nombre_tipo,
    }


@router.post("/refresh")
def renovar_sesion(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")

    if not refresh_token:
        raise HTTPException(status_code=401, detail="No existe una sesión para renovar")

    try:
        payload = decodificar_token(refresh_token)

        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Token incorrecto")

        usuario_id = int(payload.get("sub"))

    except (InvalidTokenError, TypeError, ValueError):
        raise HTTPException(status_code=401, detail="Refresh token inválido o expirado")

    token_hash = hashlib.sha256(refresh_token.encode("utf-8")).hexdigest()

    ahora = datetime.now(timezone.utc).replace(tzinfo=None)

    sesion = (
        db.query(Sesion)
        .filter(
            Sesion.token_hash == token_hash,
            Sesion.id_usuario == usuario_id,
            Sesion.fecha_revocacion.is_(None),
            Sesion.fecha_expiracion > ahora,
        )
        .with_for_update()
        .first()
    )

    if sesion is None:
        raise HTTPException(status_code=401, detail="Sesión inválida o revocada")

    sesion.fecha_revocacion = ahora

    nuevo_access = crear_token(
        subject=str(usuario_id),
        tipo="access",
        duracion=timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    nuevo_refresh = crear_token(
        subject=str(usuario_id),
        tipo="refresh",
        duracion=timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS),
    )

    nuevo_hash = hashlib.sha256(nuevo_refresh.encode("utf-8")).hexdigest()

    nueva_sesion = Sesion(
        id_usuario=usuario_id,
        token_hash=nuevo_hash,
        fecha_expiracion=(
            ahora + timedelta(days=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS)
        ),
    )

    db.add(nueva_sesion)
    db.commit()

    # Actualizamos las cookies
    response.set_cookie(
        key="access_token",
        value=nuevo_access,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    response.set_cookie(
        key="refresh_token",
        value=nuevo_refresh,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS * 86400,
    )

    return {"mensaje": "Sesión renovada correctamente"}


@router.post("/logout")
def cerrar_sesion(request: Request, response: Response, db: Session = Depends(get_db)):
    refresh_token = request.cookies.get("refresh_token")

    if refresh_token:
        token_hash = hashlib.sha256(refresh_token.encode("utf-8")).hexdigest()

        sesion = (
            db.query(Sesion)
            .filter(Sesion.token_hash == token_hash, Sesion.fecha_revocacion.is_(None))
            .with_for_update()
            .first()
        )

        if sesion:
            sesion.fecha_revocacion = datetime.now(timezone.utc).replace(tzinfo=None)
            db.commit()

    response.delete_cookie(
        key="access_token", httponly=True, secure=False, samesite="lax"
    )

    response.delete_cookie(
        key="refresh_token", httponly=True, secure=False, samesite="lax"
    )

    return {"mensaje": "Sesión cerrada correctamente"}
