from datetime import datetime
from decimal import Decimal

from sqlalchemy import String, ForeignKey, func, JSON, Numeric, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Analisis(Base):
    __tablename__ = "Analisis"

    id_analisis: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_obra: Mapped[int] = mapped_column(ForeignKey("Obra.id_obra"), nullable=False)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("Usuario.id_usuario"), nullable=False
    )
    paleta_color: Mapped[dict] = mapped_column(JSON, nullable=False)
    contraste: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    iluminacion: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    balance_compositivo: Mapped[Decimal] = mapped_column(Numeric(5, 2), nullable=False)
    estado: Mapped[str] = mapped_column(String(20), nullable=False)
    fecha_analisis: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp(), nullable=False
    )
