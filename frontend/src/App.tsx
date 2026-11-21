import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AnalizeImgPage from "./pages/AnalizeImgPage";
import AccessPage from "./pages/AccessPage";
import ExercisePage from "./pages/ExercisePage";
import GalleryPage from "./pages/GalleryPage";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import ResourcesPage from "./pages/ResourcesPage";
import ResultPage from "./pages/ResultPage";
import { BACKEND_API_URL } from "./config/api";

export type User = {
  id_user: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  register_date: string;
  type: string;
};

function ProtectedRoute({ user }) {
  if (!user) {
    return <Navigate to="/access" replace />;
  }

  return <Outlet />;
}

const verificarSesion = async (setUser) => {
  try {
    let response = await fetch(`${BACKEND_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    // Si el access token expiró, intentamos renovarlo
    if (response.status === 401) {
      const refresh = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refresh.ok) {
        throw new Error("Sesión expirada");
      }

      // Volvemos a consultar al usuario
      response = await fetch(`${BACKEND_API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
    }

    if (!response.ok) {
      throw new Error("No se pudo recuperar la sesión");
    }

    const usuario = await response.json();

    setUser(usuario);
  } catch (error) {
    setUser(null);
  }
};

function App() {
  const defaultUser = {
    nombre_pila: "Prueba",
    apellido_paterno: "ApellidoP",
    apellido_materno: "ApellidoM",
    correo: "prueba123@gmail.com",
    fecha_registro: "2001-09-11T01:30:00",
  };
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const iniciarSesion = async () => {
      try {
        await verificarSesion(setUser);
      } finally {
        setLoading(false);
      }
    };

    iniciarSesion();
  }, []);

  if (loading) {
    return <div>Verificando sesión...</div>;
  }
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/analize-image" element={<AnalizeImgPage />} />
          <Route path="/result-image" element={<ResultPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/exercise" element={<ExercisePage />} />
          <Route
            path="/profile"
            element={<ProfilePage user={user} setUser={setUser} />}
          />
          <Route path="/resources" element={<ResourcesPage />} />
        </Route>

        <Route path="/access" element={<AccessPage setUser={setUser} />} />
      </Route>
    </Routes>
  );
}

export default App;
