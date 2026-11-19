from fastapi import FastAPI

from app.routers import user, projects

app = FastAPI(
    title="El espejo del Artista API",
    description="Simple API para complementar el funcionamiento de 'El Espejo del Artista'",
    version="1.0.0",
)

app.include_router(user.router)
app.include_router(projects.router)

@app.get("/")
def root():
    return {"message": "API Funcionando correctamente"}
