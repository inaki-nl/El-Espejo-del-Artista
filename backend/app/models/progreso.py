from decimal import Decimal

from enum import Enum as PyEnum
from sqlalchemy import String, Enum, Numeric, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class MetricaComparada(PyEnum):
    CONTRASTE = "contraste",
    ILUMINACION = "iluminacion",
    BALANCE_COMPOSITIVO = "balance_compositivo"


class Progreso(Base):
    __tablename__ = "Progreso"

    id_progreso: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("Usuario.id_usuario"), nullable=False
    )
    id_obra_actual: Mapped[int] = mapped_column(
        ForeignKey("Obra.id_obra"), nullable=False
    )
    id_obra_anterior: Mapped[int] = mapped_column(
        ForeignKey("Obra.id_obra"), nullable=False
    )
    metrica_comparada: Mapped[MetricaComparada] = mapped_column(
        Enum(MetricaComparada), nullable=False
    )
    variacion: Mapped[Decimal] = mapped_column(Numeric(6, 2), nullable=False)
