from datetime import datetime

from sqlalchemy import DateTime, String, ForeignKey, func, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Ejercicio(Base):
    __tablename__ = "Ejercicio"

    id_ejercicio: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_critica: Mapped[int] = mapped_column(
        ForeignKey("Critica.id_critica"), nullable=False
    )
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    estado: Mapped[str] = mapped_column(String(20), nullable=False)
    fecha_asignacion: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp(), nullable=False
    )
    fecha_entrega: Mapped[datetime] = mapped_column(DateTime, nullable=True)
