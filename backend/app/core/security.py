from datetime import datetime, timedelta, timezone
import jwt

from app.core.config import settings


def crear_token(subject: str, tipo: str, duracion: timedelta) -> str:
    ahora = datetime.now(timezone.utc)

    payload = {"sub": subject, "type": tipo, "iat": ahora, "exp": ahora + duracion}

    token = jwt.encode(
        payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM
    )

    return token


def decodificar_token(token: str) -> dict:
    payload = jwt.decode(
        token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM]
    )

    return payload
