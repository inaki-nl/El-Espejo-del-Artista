import { useState } from "react";
import {
  Badge,
  DisplayDate,
  PageFrame,
  PageHeading,
  Panel,
  SectionTitle,
  StatCard,
} from "./HomePage";

// Modelo normalizado de esta vista. Los nombres de los campos coinciden con los
// que utilizan AccessPage y ProfilePage. Confirmar los valores reales de "type"
// al adaptar la respuesta de usuarios: aquí "admin" y "user" son valores locales.
export type ManagedUser = {
  id_user: string | number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  type: "admin" | "user";
  register_date: string;
};

type UserDraft = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  type: ManagedUser["type"];
};
type EditorMode = "closed" | "create" | "edit" | "view";
type FieldErrors = Partial<Record<keyof UserDraft, string>>;
type Feedback = { kind: "success" | "error"; text: string } | null;

const demoUsers: ManagedUser[] = [
  { id_user: "demo-1", first_name: "Lucía", middle_name: null, last_name: "Moreno", email: "lucia.admin@example.com", type: "admin", register_date: "2026-09-14" },
  { id_user: "demo-2", first_name: "Ana", middle_name: "Sofía", last_name: "Torres", email: "ana@example.com", type: "user", register_date: "2026-10-05" },
  { id_user: "demo-3", first_name: "Diego", middle_name: null, last_name: "Ramos", email: "diego@example.com", type: "user", register_date: "2026-10-18" },
  { id_user: "demo-4", first_name: "María", middle_name: "Elena", last_name: "Cruz", email: "maria@example.com", type: "user", register_date: "2026-11-12" },
];

const emptyDraft: UserDraft = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  type: "user",
};

const nameFields: { key: "first_name" | "middle_name" | "last_name"; label: string; maxLength: number; optional?: boolean }[] = [
  { key: "first_name", label: "Nombre", maxLength: 60 },
  { key: "middle_name", label: "Segundo nombre", maxLength: 60, optional: true },
  { key: "last_name", label: "Apellidos", maxLength: 80 },
];

function fullName(user: Pick<ManagedUser, "first_name" | "middle_name" | "last_name">) {
  return [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function searchText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es-MX");
}

/**
 * ACCESO EXCLUSIVO PARA ADMINISTRADORES
 * Conectar esta vista al usuario/sesión que ya maneja el contenedor de rutas.
 * Antes de montar <CRUDUsuarios />, esperar a que termine la carga de sesión,
 * exigir usuario autenticado y comprobar su rol administrativo usando el contrato
 * real de la aplicación (ProfilePage muestra user.type). No asumir que el backend
 * utiliza literalmente los valores locales "admin"/"user": normalizarlos primero.
 * La lista administrada y sus roles NO son una prueba de la identidad del operador.
 * Este archivo no crea autenticación ni sustituye el guard existente.
 * El backend debe validar autenticación y autorización administrativa en CADA
 * operación de consulta, creación, actualización y eliminación.
 *
 * INTEGRACIÓN PENDIENTE CON LA API
 * En las páginas revisadas hay fetch para /auth/login y /auth/logout, utilizando
 * BACKEND_API_URL y credentials: "include"; no se encontró aquí un CRUD conectado.
 * No se inspeccionaron servicios externos ni se asumieron endpoints de usuarios.
 * 1. Lectura: reemplazar demoUsers por la colección autorizada que devuelva el
 *    servicio real; transformar sus campos a ManagedUser y entregar fechas ISO.
 * 2. Creación: enviar los campos editables y añadir la respuesta canónica con el
 *    id_user y register_date del servidor. La política de alta/credenciales la
 *    resuelve el backend; esta pantalla no administra ni guarda contraseñas.
 * 3. Actualización: enviar únicamente nombre, apellidos, correo y rol; mantener
 *    id_user y register_date inmutables y utilizar la respuesta del servidor.
 * 4. Eliminación: solicitarla solo después de confirmar y retirar la fila
 *    únicamente cuando el servidor confirme el resultado.
 * Reutilizar la configuración y sesión existentes al conectar el servicio.
 * Mientras se esperan respuestas, bloquear los botones y gestionar errores,
 * incluidos 401/403; ante un fallo no confirmar cambios locales ni mostrar éxito.
 * La persistencia en base de datos corresponde al backend, nunca al navegador.
 */
export default function CRUDUsuarios() {
  // Todos los cambios son locales: recargar o salir de esta vista restaura la muestra.
  const [users, setUsers] = useState<ManagedUser[]>(() => demoUsers.map((user) => ({ ...user })));
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | ManagedUser["type"]>("all");
  const [mode, setMode] = useState<EditorMode>("closed");
  const [selectedId, setSelectedId] = useState<ManagedUser["id_user"] | null>(null);
  const [draft, setDraft] = useState<UserDraft>({ ...emptyDraft });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pendingDelete, setPendingDelete] = useState<ManagedUser | null>(null);

  const selectedUser = users.find((user) => user.id_user === selectedId);
  const query = searchText(search.trim());
  const filteredUsers = users.filter((user) =>
    (roleFilter === "all" || user.type === roleFilter) &&
    searchText(`${fullName(user)} ${user.email} ${user.id_user}`).includes(query)
  );
  const adminCount = users.filter((user) => user.type === "admin").length;
  const inputClass = "mt-[7px] w-full rounded-xl border border-[#e5cfbb] bg-white px-[13px] py-3 text-[14px] text-[#55483c] outline-none focus:border-[#f52e70] focus:ring-2 focus:ring-[#f52e7026]";
  const primaryButton = "inline-flex cursor-pointer items-center justify-center rounded-full bg-[#f52e70] px-5 py-[11px] text-[13px] leading-4 font-bold text-white shadow-[0_4px_9px_#f52e7026] transition-colors hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734] disabled:cursor-not-allowed disabled:opacity-50";
  const secondaryButton = "inline-flex cursor-pointer items-center justify-center rounded-full border border-[#dcc5b3] bg-white px-4 py-[9px] text-[12px] font-bold text-[#104734] transition-colors hover:bg-[#fff1df] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f52e70] disabled:cursor-not-allowed disabled:opacity-50";

  function closeEditor() {
    setMode("closed");
    setSelectedId(null);
    setDraft({ ...emptyDraft });
    setErrors({});
    setFeedback(null);
  }

  function openCreate() {
    closeEditor();
    setPendingDelete(null);
    setMode("create");
  }

  function openUser(user: ManagedUser, nextMode: "view" | "edit") {
    setPendingDelete(null);
    setFeedback(null);
    setErrors({});
    setSelectedId(user.id_user);
    setDraft({
      first_name: user.first_name,
      middle_name: user.middle_name ?? "",
      last_name: user.last_name,
      email: user.email,
      type: user.type,
    });
    setMode(nextMode);
  }

  function changeField<K extends keyof UserDraft>(field: K, value: UserDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  function validateDraft(value: UserDraft): FieldErrors {
    const nextErrors: FieldErrors = {};
    if (!value.first_name) nextErrors.first_name = "Escribe el nombre.";
    else if (value.first_name.length > 60) nextErrors.first_name = "Utiliza como máximo 60 caracteres.";
    if (value.middle_name.length > 60) nextErrors.middle_name = "Utiliza como máximo 60 caracteres.";
    if (!value.last_name) nextErrors.last_name = "Escribe los apellidos.";
    else if (value.last_name.length > 80) nextErrors.last_name = "Utiliza como máximo 80 caracteres.";
    if (!value.email) nextErrors.email = "Escribe el correo electrónico.";
    else if (value.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) nextErrors.email = "Escribe un correo electrónico válido.";
    else if (users.some((user) => user.id_user !== selectedId && user.email.trim().toLowerCase() === value.email)) nextErrors.email = "Este correo ya pertenece a otro usuario.";
    if (value.type !== "admin" && value.type !== "user") nextErrors.type = "Selecciona un rol válido.";
    return nextErrors;
  }

  function saveUser() {
    if (mode !== "create" && mode !== "edit") return;
    const value: UserDraft = {
      first_name: draft.first_name.trim().replace(/\s+/g, " "),
      middle_name: draft.middle_name.trim().replace(/\s+/g, " "),
      last_name: draft.last_name.trim().replace(/\s+/g, " "),
      email: draft.email.trim().toLowerCase(),
      type: draft.type,
    };
    const nextErrors = validateDraft(value);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ kind: "error", text: "Revisa los campos indicados antes de guardar." });
      return;
    }
    const editable = { ...value, middle_name: value.middle_name || null };
    if (mode === "create") {
      // API pendiente: crear y utilizar el id y fecha devueltos por el servidor.
      const localId = globalThis.crypto?.randomUUID?.() ??
        `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      const created: ManagedUser = {
        ...editable,
        id_user: `demo-${localId}`,
        register_date: new Date().toISOString(),
      };
      setUsers((current) => [created, ...current]);
      closeEditor();
      setFeedback({ kind: "success", text: `Usuario ${fullName(created)} agregado a la demostración.` });
    } else {
      if (selectedId === null || !selectedUser) {
        setFeedback({ kind: "error", text: "El usuario seleccionado ya no está disponible." });
        return;
      }
      // API pendiente: actualizar y sustituir por la respuesta canónica del servidor.
      setUsers((current) => current.map((user) =>
        user.id_user === selectedId ? { ...user, ...editable } : user
      ));
      closeEditor();
      setFeedback({ kind: "success", text: "Datos del usuario actualizados en la demostración." });
    }
    setSearch("");
    setRoleFilter("all");
  }

  function requestDelete(user: ManagedUser) {
    closeEditor();
    setPendingDelete(user);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    const target = users.find((user) => user.id_user === pendingDelete.id_user);
    if (!target) {
      setPendingDelete(null);
      setFeedback({ kind: "error", text: "El usuario seleccionado ya no está disponible." });
      return;
    }
    // API pendiente: eliminar por id y aplicar este cambio solo tras la confirmación del servidor.
    setUsers((current) => current.filter((user) => user.id_user !== target.id_user));
    setPendingDelete(null);
    setFeedback({ kind: "success", text: `Usuario ${fullName(target)} eliminado de la demostración.` });
  }

  return (
    <PageFrame>
      <PageHeading
        eyebrow="ADMINISTRACIÓN"
        title="Administración de usuarios"
        description="Consulta y gestiona las cuentas registradas en El Espejo del Artista."
        action={<button type="button" onClick={openCreate} className={primaryButton}>+ Agregar usuario</button>}
      />

      <aside className="mb-[18px] rounded-xl border border-[#edcba6] bg-[#fff4d5] p-[15px] text-[13px] leading-5 text-[#855b21]">
        <strong>Modo de demostración.</strong> Los usuarios son ficticios y los cambios solo se conservan mientras permanezcas en esta vista.
      </aside>

      <div className="mb-[18px] grid gap-[15px] sm:grid-cols-3">
        <StatCard label="Usuarios registrados" value={users.length} />
        <StatCard label="Administradores" value={adminCount} />
        <StatCard label="Usuarios estándar" value={users.length - adminCount} />
      </div>

      {feedback && <p role={feedback.kind === "error" ? "alert" : "status"} className={`mb-[18px] rounded-xl border p-[15px] text-[13px] leading-5 ${feedback.kind === "error" ? "border-[#ffc5d4] bg-[#fde1e7] text-[#85344c]" : "border-[#c8dfbf] bg-[#e8f1e4] text-[#426e45]"}`}>{feedback.text}</p>}

      {pendingDelete && (
        <section key={pendingDelete.id_user} aria-labelledby="delete-user-title" className="mb-[18px] rounded-[18px] border border-[#ffc5d4] bg-[#fff1f3] p-[21px]">
          <h2 id="delete-user-title" className="text-[21px] font-bold text-[#85344c] [font-family:Georgia,serif]">Confirmar eliminación</h2>
          <p role="alert" className="mt-3 break-words text-[14px] leading-6 text-[#754d49]">
            ¿Deseas eliminar a <strong>{fullName(pendingDelete)}</strong> ({pendingDelete.email})? Este registro se quitará de la lista de demostración.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" autoFocus onClick={() => setPendingDelete(null)} className={secondaryButton}>Cancelar eliminación</button>
            <button type="button" onClick={confirmDelete} className={primaryButton}>Sí, eliminar</button>
          </div>
        </section>
      )}

      <div className={mode === "closed" ? "" : "grid items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]"}>
        <Panel className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle>Usuarios registrados</SectionTitle>
            <Badge tone="peach">{filteredUsers.length} de {users.length} usuarios</Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px]">
            <div>
              <label htmlFor="user-search" className="block text-[12px] font-bold text-[#725440]">Buscar usuario</label>
              <input id="user-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nombre, correo o identificador" className={inputClass} />
            </div>
            <div>
              <label htmlFor="user-role-filter" className="block text-[12px] font-bold text-[#725440]">Rol de la cuenta</label>
              <select id="user-role-filter" value={roleFilter} onChange={(event) => setRoleFilter(event.target.value as typeof roleFilter)} className={inputClass}>
                <option value="all">Todos los roles</option>
                <option value="admin">Administradores</option>
                <option value="user">Usuarios estándar</option>
              </select>
            </div>
          </div>
          {(search || roleFilter !== "all") && <button type="button" onClick={() => { setSearch(""); setRoleFilter("all"); }} className="mt-3 cursor-pointer rounded text-[12px] font-bold text-[#b5234c] hover:underline focus-visible:outline-2 focus-visible:outline-[#f52e70]">Limpiar filtros</button>}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left text-[13px]">
              <caption className="sr-only">Usuarios registrados y acciones de consulta, edición y eliminación</caption>
              <thead className="border-y border-[#efdfd1] bg-[#fff8ef] text-[11px] uppercase tracking-[0.05em] text-[#8b7565]">
                <tr>
                  <th scope="col" className="px-3 py-3">Usuario</th>
                  <th scope="col" className="px-3 py-3">Rol</th>
                  <th scope="col" className="px-3 py-3">Registro</th>
                  <th scope="col" className="px-3 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efe2d4]">
                {filteredUsers.map((user) => (
                  <tr key={user.id_user} className="align-top">
                    <th scope="row" className="max-w-[260px] px-3 py-4 font-normal">
                      <span className="block break-words font-bold text-[#40553d]">{fullName(user)}</span>
                      <span className="mt-1 block break-all text-[12px] text-[#8b7565]">{user.email}</span>
                      <span className="mt-1 block break-all text-[10px] text-[#a08776]">ID: {user.id_user}</span>
                    </th>
                    <td className="px-3 py-4"><Badge tone={user.type === "admin" ? "pink" : "green"}>{user.type === "admin" ? "Administrador" : "Usuario"}</Badge></td>
                    <td className="whitespace-nowrap px-3 py-4 text-[12px] text-[#8b7565]"><DisplayDate value={user.register_date} /></td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap justify-end gap-2">
                        <button type="button" onClick={() => openUser(user, "view")} aria-label={`Ver detalles de ${fullName(user)}`} className="cursor-pointer rounded-lg px-2 py-1 text-[12px] font-bold text-[#104734] hover:bg-[#f8ebdf] focus-visible:outline-2 focus-visible:outline-[#f52e70]">Ver</button>
                        <button type="button" onClick={() => openUser(user, "edit")} aria-label={`Editar a ${fullName(user)}`} className="cursor-pointer rounded-lg px-2 py-1 text-[12px] font-bold text-[#104734] hover:bg-[#f8ebdf] focus-visible:outline-2 focus-visible:outline-[#f52e70]">Editar</button>
                        <button type="button" onClick={() => requestDelete(user)} aria-label={`Eliminar a ${fullName(user)}`} className="cursor-pointer rounded-lg px-2 py-1 text-[12px] font-bold text-[#b5234c] hover:bg-[#fde5ec] focus-visible:outline-2 focus-visible:outline-[#f52e70]">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && <tr><td colSpan={4} className="px-4 py-9 text-center text-[#8b7565]">{users.length === 0 ? "Todavía no hay usuarios registrados." : "No hay usuarios que coincidan con los filtros."}</td></tr>}
              </tbody>
            </table>
          </div>
        </Panel>

        {mode !== "closed" && (
          <Panel key={`${mode}-${selectedId ?? "new"}`} className="min-w-0">
            <SectionTitle>{mode === "create" ? "Agregar usuario" : mode === "edit" ? "Editar usuario" : "Detalle del usuario"}</SectionTitle>
            {mode === "view" && selectedUser ? <>
              <dl className="mt-4 space-y-3 text-[13px]">
                {[
                  ["Identificador", selectedUser.id_user],
                  ["Nombre", selectedUser.first_name],
                  ["Segundo nombre", selectedUser.middle_name || "Sin segundo nombre"],
                  ["Apellidos", selectedUser.last_name],
                  ["Correo electrónico", selectedUser.email],
                  ["Rol", selectedUser.type === "admin" ? "Administrador" : "Usuario"],
                ].map(([label, value]) => <div key={String(label)} className="rounded-xl border border-[#f0ddc9] bg-[#fff8ef] p-3"><dt className="text-[11px] text-[#a08776]">{label}</dt><dd className="mt-1 break-words font-bold text-[#42503f]">{value}</dd></div>)}
                <div className="rounded-xl border border-[#f0ddc9] bg-[#fff8ef] p-3"><dt className="text-[11px] text-[#a08776]">Fecha de registro</dt><dd className="mt-1 font-bold text-[#42503f]"><DisplayDate value={selectedUser.register_date} /></dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" onClick={() => openUser(selectedUser, "edit")} className={primaryButton}>Editar usuario</button>
                <button type="button" autoFocus onClick={closeEditor} className={secondaryButton}>Cerrar detalle</button>
              </div>
            </> : mode === "create" || mode === "edit" ? <>
              <p className="mt-3 text-[12px] leading-5 text-[#8b7565]">Los campos con * son obligatorios. El identificador y la fecha de registro se asignan automáticamente.</p>
              <div className="mt-4 space-y-4">
                {nameFields.map(({ key, label, maxLength, optional }) => <div key={key}>
                  <label htmlFor={`managed-${key}`} className="block text-[12px] font-bold text-[#725440]">{label}{optional ? " (opcional)" : " *"}</label>
                  <input id={`managed-${key}`} type="text" autoFocus={key === "first_name"} autoComplete={key === "first_name" ? "given-name" : key === "middle_name" ? "additional-name" : "family-name"} value={draft[key]} maxLength={maxLength} required={!optional} onChange={(event) => changeField(key, event.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `managed-${key}-error` : undefined} className={inputClass} />
                  {errors[key] && <p id={`managed-${key}-error`} className="mt-1 text-[12px] text-[#b5234c]">{errors[key]}</p>}
                </div>)}
                <div>
                  <label htmlFor="managed-email" className="block text-[12px] font-bold text-[#725440]">Correo electrónico *</label>
                  <input id="managed-email" type="email" autoComplete="email" value={draft.email} maxLength={254} required onChange={(event) => changeField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "managed-email-error" : undefined} className={inputClass} />
                  {errors.email && <p id="managed-email-error" className="mt-1 text-[12px] text-[#b5234c]">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="managed-type" className="block text-[12px] font-bold text-[#725440]">Rol *</label>
                  <select id="managed-type" value={draft.type} onChange={(event) => changeField("type", event.target.value as ManagedUser["type"])} aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? "managed-type-error" : undefined} className={inputClass}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                  {errors.type && <p id="managed-type-error" className="mt-1 text-[12px] text-[#b5234c]">{errors.type}</p>}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" onClick={saveUser} className={primaryButton}>{mode === "create" ? "Crear usuario" : "Guardar cambios"}</button>
                <button type="button" onClick={closeEditor} className={secondaryButton}>Cancelar</button>
              </div>
            </> : <button type="button" onClick={closeEditor} className={secondaryButton}>Cerrar</button>}
          </Panel>
        )}
      </div>
    </PageFrame>
  );
}