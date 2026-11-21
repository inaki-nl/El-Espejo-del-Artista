from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class TiposUsuario(Base):
    __tablename__ = "TiposUsuario"

    id_tipo: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nombre_tipo: Mapped[str] = mapped_column(String(100), nullable=False)
