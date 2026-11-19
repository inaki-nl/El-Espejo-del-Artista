from datetime import datetime

from sqlalchemy import String, ForeignKey, func, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Critica(Base):
    __tablename__ = "Critica"

    id_critica: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_analisis: Mapped[int] = mapped_column(
        ForeignKey("Analisis.id_analisis"), nullable=False
    )
    texto_critica: Mapped[str] = mapped_column(Text, nullable=False)
    fecha_generacion: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp(), nullable=False
    )
