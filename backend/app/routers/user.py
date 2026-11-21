from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, Query
from pydantic import HttpUrl
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import Usuario
from app.schemas.user import (
    UsuarioCreate,
    UsuarioLogin,
    UsuarioResponse,
    UsuarioConsult,
    UsuarioUpdate,
)
from app.services.hash import hashear_contrasena

router = APIRouter(prefix="/user")


@router.post("/crear")
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    usuario_existente = (
        db.query(Usuario).filter(Usuario.correo == usuario.correo).first()
    )

    if usuario_existente:
        raise HTTPException(status_code=409, detail="El correo ya esta registrado")

    nuevo_usuario = Usuario(
        nombre_pila=usuario.nombre_pila,
        apellido_paterno=usuario.apellido_paterno,
        apellido_materno=usuario.apellido_materno,
        correo=usuario.correo,
        contrasena_hash=hashear_contrasena(usuario.contrasena),
        fecha_registro=datetime.now().isoformat(),
        id_tipo=usuario.id_tipo
    )

    try:
        db.add(nuevo_usuario)
        db.commit()
        db.refresh(nuevo_usuario)

    except Exception as err:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error al registrar el usuario\n{err}"
        )

    return nuevo_usuario


@router.get("/")
def obtener_usuario(
    id_usuario: int | None = Query(default=None), db: Session = Depends(get_db)
):
    if id_usuario is None:
        consulta_usuarios = db.query(Usuario).all()
        return consulta_usuarios

    else:
        usuario = db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()

        if usuario:
            return usuario

        raise HTTPException(status_code=422, detail="Usuario no encontrado")


@router.patch("/")
def actualizar_usuario(
    usuario: UsuarioUpdate, id_usuario: int = Query(gt=0), db: Session = Depends(get_db)
):
    usuario_modificar = (
        db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    )

    if usuario_modificar is None:
        raise HTTPException(
            status_code=404,
            detail=f"Usuario con el id {id_usuario} no encontrado",
        )

    datos = usuario.model_dump(exclude_unset=True)

    for campo, valor in datos.items():
        if campo == "contrasena" and valor is not None:
            usuario_modificar.contrasena_hash = hashear_contrasena(valor)
        else:
            setattr(usuario_modificar, campo, valor)

    db.commit()
    db.refresh(usuario_modificar)

    return usuario_modificar


@router.put("/")
def reemplazar_usuario(
    usuario: UsuarioCreate, id_usuario: int = Query(gt=0), db: Session = Depends(get_db)
):
    usuario_reemplazar = (
        db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    )

    if usuario_reemplazar is None:
        raise HTTPException(
            status_code=404, detail=f"Usuario con el id {id_usuario} no encontrado"
        )

    usuario_reemplazar.nombre_pila = usuario.nombre_pila
    usuario_reemplazar.apellido_paterno = usuario.apellido_paterno
    usuario_reemplazar.apellido_materno = usuario.apellido_materno
    usuario_reemplazar.correo = usuario.correo
    usuario_reemplazar.contrasena_hash = hashear_contrasena(usuario.contrasena)

    db.commit()
    db.refresh(usuario_reemplazar)

    return usuario_reemplazar


@router.delete("/")
def borrar_usuario(id_usuario: int = Query(gt=0), db: Session = Depends(get_db)):
    if id_usuario is None:
        raise HTTPException(
            status_code=422, detail="Falto ingresar el id del usuario a eliminar"
        )

    usuario_eliminar = (
        db.query(Usuario).filter(Usuario.id_usuario == id_usuario).first()
    )

    if usuario_eliminar is None:
        raise HTTPException(
            status_code=405,
            detail=f"No existe usuario con el id {id_usuario} para eliminar",
        )

    db.delete(usuario_eliminar)
    db.commit()

    return {"message": f"Usuario con el id {id_usuario} eliminado correctamente"}
