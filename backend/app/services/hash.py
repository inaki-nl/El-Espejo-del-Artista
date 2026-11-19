from argon2 import PasswordHasher

ph = PasswordHasher()

def hashear_contrasena(contrasena: str):
    return ph.hash(contrasena)

def validar_contrasena(hash_contrasena: str, contrasena_intento):
    try:
        ph.verify(hash_contrasena, contrasena_intento)
        return True
    except Exception:
        return False
