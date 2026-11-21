import hashlib
from datetime import datetime, timezone

from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from jwt import InvalidTokenError

from app.database.connection import get_db
from app.core.security import decodificar_token
from app.models.user import Usuario
from app.models.sesion import Sesion


def obtener_usuario_actual(request: Request, db: Session = Depends(get_db)):
    access_token = request.cookies.get("access_token")
    refresh_token = request.cookies.get("refresh_token")

    if not access_token or not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="No autenticado"
        )

    try:
        payload = decodificar_token(access_token)

        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Token incorrecto")

        usuario_id = int(payload.get("sub"))

    except (InvalidTokenError, TypeError, ValueError):
        raise HTTPException(status_code=401, detail="Access token inválido o expirado")

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
        .first()
    )

    if sesion is None:
        raise HTTPException(status_code=401, detail="Sesión revocada o expirada")

    usuario = db.query(Usuario).filter(Usuario.id_usuario == usuario_id).first()

    if usuario is None:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    return usuario
