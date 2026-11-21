import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Artwork } from "./HomePage";
import { BACKEND_API_URL } from "../config/api";

// 02-acceso: las dos pestañas son una demostración visual, sin autenticación real.
// Se integra dentro del layout existente sin duplicar su navbar ni su encabezado.
// TODO: Implementar en la opción de Crear Cuenta un captcha y la confirmación de la contraseña mediante otro textbox ademas de dividir el nombre por nombre, apellido paterno y apellido materno(Opcional)
export default function AccessPage({ setUser }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const navigate = useNavigate();


  const login = async () => {
    const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
      body: JSON.stringify({ correo: email, contrasena: pass }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      let user = await response.json();
      setUser(user.user);
      navigate("/");
    } else {
      let message = await response.json();
      alert(message.detail);
    }
  };

  const createUser = async () => {};
  return (
    <div className="pt-[9px] pb-8">
      <section className="grid overflow-hidden rounded-[20px] border border-[#efd4bc] bg-[#fff8ef] xl:min-h-[740px] xl:grid-cols-2">
        <div className="flex flex-col bg-[#123f31] p-7 text-[#fff0d3] sm:p-10">
          <p className="text-[21px] font-bold [font-family:Georgia,serif]">
            🎨 El Espejo del Artista
          </p>
          <h1 className="mt-9 text-[36px] leading-[1.12] font-bold [font-family:Georgia,serif] sm:text-[46px]">
            Cada obra cuenta una historia. La tuya continúa aquí.
          </h1>
          <p className="mt-8 text-[16px] leading-[27px]">
            Un taller digital para mirar tu arte con otra perspectiva y
            practicar sin miedo a equivocarte.
          </p>
          <div className="mt-5 h-[280px] overflow-hidden rounded-[18px] xl:h-auto xl:min-h-[280px] xl:flex-1">
            <Artwork className="opacity-60" />
          </div>
          <p className="mt-8 text-[16px] italic">
            Tu arte, con mejor perspectiva ✿
          </p>
        </div>
        <div className="flex items-center justify-center p-7 sm:p-10 xl:px-12">
          <div className="w-full max-w-[440px]">
            <p className="text-[11px] font-bold tracking-[0.15em] text-[#ee3c70]">
              TE DAMOS LA BIENVENIDA
            </p>
            <h2 className="mt-7 text-[34px] leading-tight font-bold [font-family:Georgia,serif] sm:text-[38px]">
              Tu espacio para crear
            </h2>
            <p className="mt-8 text-[14px] leading-5 text-[#8b7565]">
              {mode === "login"
                ? "Inicia sesión para continuar con tus obras y ejercicios."
                : "Crea tu cuenta para comenzar tu camino creativo."}
            </p>
            <div
              aria-label="Tipo de acceso"
              className="mt-[26px] flex gap-[10px]"
            >
              {(
                [
                  { value: "login", label: "Iniciar sesión" },
                  { value: "register", label: "Crear cuenta" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  aria-pressed={mode === tab.value}
                  onClick={() => setMode(tab.value)}
                  className={`cursor-pointer rounded-full px-5 py-3 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734] ${mode === tab.value ? "bg-[#f52e70] text-white" : "bg-[#f5e7db] text-[#7d5f4c] hover:bg-[#f0d9c7]"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {mode === "register" && (
              <div>
                <label
                  htmlFor="access-name"
                  className="mb-[7px] block text-[12px] font-bold text-[#725440]"
                >
                  Nombre
                </label>
                <input
                  id="access-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={80}
                  placeholder="Tu nombre"
                  className="w-full rounded-[10px] border border-[#e5cfbb] bg-white px-[13px] py-3 text-[16px] text-[#55483c] outline-none focus:border-[#f52e70] focus:ring-2 focus:ring-[#f52e7026]"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="access-email"
                className="mb-[7px] block text-[12px] font-bold text-[#725440]"
              >
                Correo electrónico
              </label>
              <input
                id="access-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="tu-correo@ejemplo.com"
                className="w-full rounded-[10px] border border-[#e5cfbb] bg-white px-[13px] py-3 text-[16px] text-[#55483c] outline-none focus:border-[#f52e70] focus:ring-2 focus:ring-[#f52e7026]"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="access-password"
                className="mb-[7px] block text-[12px] font-bold text-[#725440]"
              >
                Contraseña
              </label>
              <input
                id="access-password"
                name="password"
                type="password"
                minLength={8}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                required
                placeholder="Mínimo 8 caracteres"
                className="w-full rounded-[10px] border border-[#e5cfbb] bg-white px-[13px] py-3 text-[16px] text-[#55483c] outline-none focus:border-[#f52e70] focus:ring-2 focus:ring-[#f52e7026]"
                onChange={(event) => setPass(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-[#f52e70] px-5 py-3 text-[13px] font-bold text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]"
              onClick={mode === "login" ? login : createUser}
            >
              {mode === "login" ? "Entrar a mi taller →" : "Crear mi cuenta →"}
            </button>
            <p className="mt-5 text-[11px] leading-[18px] text-[#a08776]">
              Prototipo conceptual: el acceso se simula. No se crea una cuenta
              ni se guardan o envían tus credenciales.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
