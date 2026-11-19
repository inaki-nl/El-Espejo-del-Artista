from datetime import datetime

from sqlalchemy import String, ForeignKey, func, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Obra(Base):
    __tablename__ = "Obra"

    id_obra: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("Usuario.id_usuario"), nullable=False
    )
    titulo_obra: Mapped[str] = mapped_column(String(120), nullable=False)
    ruta_archivo_imagen: Mapped[str] = mapped_column(String(255), nullable=False)
    fecha_subida: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp(), nullable=False
    )
