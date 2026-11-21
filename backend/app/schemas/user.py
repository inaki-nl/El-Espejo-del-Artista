from datetime import datetime

from pydantic import BaseModel, Field, EmailStr, ConfigDict


# Datos para agregar un usuario
class UsuarioCreate(BaseModel):
    nombre_pila: str = Field(min_length=2, max_length=100)
    apellido_paterno: str = Field(min_length=3, max_length=100)
    apellido_materno: str | None = Field(default=None, max_length=100)
    correo: EmailStr
    contrasena: str = Field(min_length=8, max_length=128)
    id_tipo: int = Field(default=1)


class UsuarioResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id_usuario: int
    nombre_pila: str
    apellido_paterno: str
    apellido_materno: str | None
    correo: EmailStr
    fecha_registro: datetime
    id_tipo: int


class UsuarioConsult(BaseModel):
    id_usuario: int


class UsuarioUpdate(BaseModel):
    nombre_pila: str | None = None
    apellido_paterno: str | None = None
    apellido_materno: str | None = None
    correo: EmailStr | None = None
    contrasena: str | None = None
    id_tipo: int | None = None

class UsuarioLogin(BaseModel):
    correo: str
    contrasena: str
