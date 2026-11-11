import { useState } from "react";
import { Link } from "react-router";
import { Badge, PageFrame, PageHeading, PageLink, Panel, SectionTitle } from "./HomePage";

// 09-perfil: información ficticia y edición del nombre solo durante esta visita.
// No modifica credenciales ni afirma que exista una sesión autenticada.
export default function ProfilePage() {
  const [name, setName] = useState("Evelyn Pinales");
  const [draftName, setDraftName] = useState(name);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <PageFrame>
      <PageHeading eyebrow="TU ESPACIO PERSONAL" title="Mi perfil" description="Actualiza tus datos y gestiona la seguridad de tu cuenta." action={<PageLink to="/" secondary>← Regresar al taller</PageLink>} />
      <div className="grid items-start gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-[18px]">
          <Panel>
            <div className="flex items-center gap-5">
              <span aria-hidden="true" className="flex size-[85px] shrink-0 items-center justify-center rounded-full bg-[#e9c9e2] text-[50px]">👩🏽‍🎨</span>
              <div><h2 className="text-[21px] font-bold [font-family:Georgia,serif]">{name}</h2><p className="mt-3 text-[12px] text-[#8b7b6b]">Creadora en proceso · Cuenta privada</p><div className="mt-3"><Badge>Miembro desde septiembre de 2026</Badge></div></div>
            </div>
          </Panel>
          <Panel>
            <SectionTitle>Información de cuenta</SectionTitle>
            <dl className="mt-3 grid gap-[14px] sm:grid-cols-2">
              {[["Nombre", name], ["Correo electrónico", "evelyn@ejemplo.com"], ["Fecha de registro", "14 sep 2026"], ["Estado de cuenta", "Activa"]].map(([label, value]) => <div key={label} className="min-w-0 rounded-xl border border-[#f0ddc9] bg-[#fff8ef] p-[14px]"><dt className="text-[11px] text-[#a08776]">{label}</dt><dd className="mt-[5px] break-words text-[14px] font-bold text-[#42503f]">{value}</dd></div>)}
            </dl>
            {editing ? <form className="mt-[18px]" onSubmit={(event) => { event.preventDefault(); if (!draftName.trim()) return; setName(draftName.trim()); setEditing(false); setMessage("Nombre actualizado en esta vista de demostración."); }}>
              <label htmlFor="profile-name" className="mb-2 block text-[12px] font-bold text-[#725440]">Tu nombre</label>
              <input id="profile-name" type="text" autoComplete="name" value={draftName} required maxLength={80} onChange={(event) => setDraftName(event.target.value)} className="w-full rounded-xl border border-[#e5cfbb] bg-white px-3 py-[10px] text-[#55483c] outline-none focus:ring-2 focus:ring-[#f52e7040]" />
              <div className="mt-3 flex gap-2"><button type="submit" className="cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-[9px] text-[12px] font-bold text-white hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-[#104734]">Guardar nombre</button><button type="button" onClick={() => setEditing(false)} className="cursor-pointer rounded-full border border-[#dcc5b3] bg-white px-[15px] py-[9px] text-[12px] font-bold focus-visible:outline-2 focus-visible:outline-[#104734]">Cancelar</button></div>
            </form> : <button type="button" onClick={() => { setDraftName(name); setEditing(true); setMessage(""); }} className="mt-[18px] cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-[9px] text-[12px] font-bold text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]">Editar nombre</button>}
          </Panel>
        </div>
        <div className="space-y-[18px]">
          <Panel>
            <SectionTitle>Tu actividad</SectionTitle>
            <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">Accesos al historial, no un sistema de puntuaciones o niveles.</p>
            <div className="mt-3 space-y-2">
              {[{ label: "Obras en tu galería", count: 6, link: "Ver galería →", to: "/galery" }, { label: "Ejercicios completados", count: 3, link: "Ver ejercicios →", to: "/exercise" }].map((item) => <div key={item.label} className="rounded-[13px] border border-[#efd4bc] bg-white p-[19px]"><h3 className="text-[13px] text-[#8b7565]">{item.label}</h3><p className="mt-[9px] text-[30px] leading-8 font-bold [font-family:Georgia,serif]">{item.count}</p><Link to={item.to} className="mt-3 inline-block text-[12px] text-[#8b7565] hover:underline focus-visible:outline-2 focus-visible:outline-[#f52e70]">{item.link}</Link></div>)}
            </div>
          </Panel>
          <Panel>
            <SectionTitle>Privacidad y seguridad</SectionTitle>
            <p className="mt-3 text-[12px] leading-[19px] text-[#8b7b6b]">Tus imágenes son privadas y conservas su autoría. Esta vista utiliza datos de ejemplo; las acciones de cuenta se habilitarán al conectar tu cuenta.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" onClick={() => setMessage("El cambio de contraseña estará disponible cuando conectes tu cuenta. Esta demostración no modifica contraseñas.")} className="cursor-pointer rounded-full border border-[#dcc5b3] bg-white px-[15px] py-2 text-[12px] font-bold hover:bg-[#fff1df] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]">Cambiar contraseña</button>
              <button type="button" onClick={() => setMessage("Esta es una vista de demostración; no hay una sesión autenticada que cerrar.")} className="cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-2 text-[12px] font-bold text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]">Cerrar sesión</button>
            </div>
          </Panel>
        </div>
      </div>
      {message && <p role="status" className="mt-4 rounded-xl border border-[#c8dfbf] bg-[#e8f1e4] p-4 text-[13px] text-[#426e45]">{message}</p>}
    </PageFrame>
  );
}
