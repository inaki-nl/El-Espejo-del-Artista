from sqlalchemy import ForeignKey, String, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from app.database.base import Base


class Usuario(Base):
    __tablename__ = "Usuario"

    id_usuario: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nombre_pila: Mapped[str] = mapped_column(String(100), nullable=False)
    apellido_paterno: Mapped[str] = mapped_column(String(100), nullable=False)
    apellido_materno: Mapped[str | None] = mapped_column(String(100), nullable=True)
    correo: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    contrasena_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    fecha_registro: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp(), nullable=False
    )
    id_tipo: Mapped[int] = mapped_column(
        ForeignKey("TiposUsuario.id_tipo"), nullable=False
    )
    tipo_usuario = relationship("TiposUsuario")
