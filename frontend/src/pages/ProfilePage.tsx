import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  DisplayDate,
  PageFrame,
  PageHeading,
  PageLink,
  Panel,
  SectionTitle,
} from "./HomePage";
import type { PageUser } from "./HomePage";
import type { User } from "../App";
import { BACKEND_API_URL } from "../config/api";

// 09-perfil: información ficticia y edición del nombre solo durante esta visita.
// No modifica credenciales ni afirma que exista una sesión autenticada.
/*
export type ProfilePageData = {
  user: PageUser & { email: string; registeredAt: string; status: "Activa" | "Inactiva" };
  biography: string;
  galleryCount: number;
  completedExercises: number;
};
export type ProfilePageProps = {
  data?: ProfilePageData;
  onNameChange?: (userId: string, name: string) => void | Promise<void>;
  user?: User;
  setUser: 
};

const demoProfile: ProfilePageData = {
  user: { id: "demo", name: "Usuario", email: "usuario@ejemplo.com", registeredAt: "2026-09-14", status: "Activa" },
  biography: "Creador@ en proceso · Cuenta privada",
  galleryCount: 6, completedExercises: 3,
};
*/

/** API -> data: usuario autorizado, fechas ISO y contadores numéricos.
 * onNameChange permite persistir el nombre desde el contenedor; si no se entrega,
 * se mantiene la edición local de la maqueta, sin afirmar que se guardó en la API.
 */
export default function ProfilePage({ user, setUser }) {
  return <ProfileContent key={user.id_user} user={user} setUser={setUser} />;
}

function ProfileContent({ user, setUser }) {
  const name: string = [user.first_name, user.middle_name, user.last_name].join(
    " ",
  );
  const [draftName, setDraftName] = useState(name);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const logout = async () => {
    const response = await fetch(`${BACKEND_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      alert("Logout perfecto");
      setUser(null);
    } else {
      alert("No se pudo cerrar sesión de manera correcta");
    }
  };

  return (
    <PageFrame>
      <PageHeading
        eyebrow="TU ESPACIO PERSONAL"
        title="Mi perfil"
        description="Actualiza tus datos y gestiona la seguridad de tu cuenta."
        action={
          <PageLink to="/" secondary>
            ← Regresar al taller
          </PageLink>
        }
      />
      <div className="grid items-start gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-[18px]">
          <Panel>
            <div className="flex items-center gap-5">
              <span
                aria-hidden="true"
                className="flex size-[85px] shrink-0 items-center justify-center rounded-full bg-[#e9c9e2] text-[50px]"
              >
                👩🏽‍🎨
              </span>
              <div>
                <h2 className="text-[21px] font-bold [font-family:Georgia,serif]">
                  {user.first_name}
                </h2>
                <p className="mt-3 text-[12px] text-[#8b7b6b]">
                  Artista en progreso
                </p>
                <div className="mt-3">
                  <Badge>
                    Miembro desde{" "}
                    <DisplayDate
                      value={user.register_date}
                      options={{
                        day: undefined,
                        month: "long",
                        year: "numeric",
                      }}
                    />
                  </Badge>
                </div>
              </div>
            </div>
          </Panel>
          <Panel>
            <SectionTitle>Información de cuenta</SectionTitle>
            <dl className="mt-3 grid gap-[14px] sm:grid-cols-2">
              {[
                ["Nombre", name],
                ["Correo electrónico", user.email],
                [
                  "Fecha de registro",
                  <DisplayDate key="registered" value={user.register_date} />,
                ],
                ["Tipo de cuenta", user.type],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="min-w-0 rounded-xl border border-[#f0ddc9] bg-[#fff8ef] p-[14px]"
                >
                  <dt className="text-[11px] text-[#a08776]">{label}</dt>
                  <dd className="mt-[5px] break-words text-[14px] font-bold text-[#42503f]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            {editing ? (
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-[12px] font-bold text-[#725440]"
                >
                  Tu nombre
                </label>
                <input
                  id="profile-name"
                  type="text"
                  autoComplete="name"
                  value={draftName}
                  required
                  disabled={saving}
                  maxLength={80}
                  onChange={(event) => setDraftName(event.target.value)}
                  className="w-full rounded-xl border border-[#e5cfbb] bg-white px-3 py-[10px] text-[#55483c] outline-none focus:ring-2 focus:ring-[#f52e7040]"
                />
                <div className="mt-3 flex gap-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-[9px] text-[12px] font-bold text-white hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-[#104734]"
                  >
                    {saving ? "Guardando…" : "Guardar nombre"}
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => setEditing(false)}
                    className="cursor-pointer rounded-full border border-[#dcc5b3] bg-white px-[15px] py-[9px] text-[12px] font-bold focus-visible:outline-2 focus-visible:outline-[#104734]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDraftName(name);
                  setEditing(true);
                  setMessage("");
                }}
                className="mt-[18px] cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-[9px] text-[12px] font-bold text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]"
              >
                Editar nombre
              </button>
            )}
          </Panel>
        </div>
        <div className="space-y-[18px]">
          <Panel>
            <SectionTitle>Tu actividad</SectionTitle>
            <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">
              Accesos al historial, no un sistema de puntuaciones o niveles.
            </p>
            <div className="mt-3 space-y-2">
              {[
                {
                  label: "Obras en tu galería",
                  // Data.galery.count
                  count: 10000,
                  link: "Ver galería →",
                  to: "/gallery",
                },
                {
                  label: "Ejercicios completados",
                  // Data.exercises.count
                  count: 10000,
                  link: "Ver ejercicios →",
                  to: "/exercise",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[13px] border border-[#efd4bc] bg-white p-[19px]"
                >
                  <h3 className="text-[13px] text-[#8b7565]">{item.label}</h3>
                  <p className="mt-[9px] text-[30px] leading-8 font-bold [font-family:Georgia,serif]">
                    {item.count}
                  </p>
                  <Link
                    to={item.to}
                    className="mt-3 inline-block text-[12px] text-[#8b7565] hover:underline focus-visible:outline-2 focus-visible:outline-[#f52e70]"
                  >
                    {item.link}
                  </Link>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <SectionTitle>Privacidad y seguridad</SectionTitle>
            <p className="mt-3 text-[12px] leading-[19px] text-[#8b7b6b]">
              Tus imágenes son privadas y conservas su autoría. Esta vista
              utiliza datos de ejemplo; las acciones de cuenta se habilitarán al
              conectar tu cuenta.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "El cambio de contraseña estará disponible cuando conectes tu cuenta. Esta demostración no modifica contraseñas.",
                  )
                }
                className="cursor-pointer rounded-full border border-[#dcc5b3] bg-white px-[15px] py-2 text-[12px] font-bold hover:bg-[#fff1df] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]"
              >
                Cambiar contraseña
              </button>
              <button
                type="button"
                onClick={logout}
                className="cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-2 text-[12px] font-bold text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]"
              >
                Cerrar sesión
              </button>
            </div>
          </Panel>
        </div>
      </div>
      {message && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-[#c8dfbf] bg-[#e8f1e4] p-4 text-[13px] text-[#426e45]"
        >
          {message}
        </p>
      )}
    </PageFrame>
  );
}
