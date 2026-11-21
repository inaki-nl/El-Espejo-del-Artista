from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class Sesion(Base):
    __tablename__ = "Sesion"

    id_sesion: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_usuario: Mapped[int] = mapped_column(
        ForeignKey("Usuario.id_usuario", ondelete="CASCADE"), nullable=False, index=True
    )
    token_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    fecha_creacion: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.current_timestamp(), nullable=False
    )
    fecha_expiracion: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    fecha_revocacion: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
