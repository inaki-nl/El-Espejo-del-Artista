from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError

ph = PasswordHasher()

def hashear_contrasena(contrasena: str):
    return ph.hash(contrasena)

def validar_contrasena(hash_contrasena: str, contrasena_intento):
    try:
        ph.verify(hash_contrasena, contrasena_intento)
        return True
    except (VerifyMismatchError, VerificationError):
        return False
