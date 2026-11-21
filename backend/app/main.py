from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import user, projects, auth

app = FastAPI(
    title="El espejo del Artista API",
    description="Simple API para complementar el funcionamiento de 'El Espejo del Artista'",
    version="1.0.0",
)

origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(projects.router)
app.include_router(auth.router)


@app.get("/")
def root():
    return {"message": "API Funcionando correctamente"}
