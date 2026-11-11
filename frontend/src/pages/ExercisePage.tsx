import { useState } from "react";
import { Badge, PageFrame, PageHeading, PageLink, Panel, SectionTitle, StatCard } from "./HomePage";

type ExerciseStatus = "Pendiente" | "En progreso" | "Completado";

// 07-ejercicios: filtros, contadores y avance funcionan únicamente en esta vista.
export default function ExercisePage() {
  const [filter, setFilter] = useState("Todos");
  const [exercises, setExercises] = useState<{ id: number; title: string; description: string; icon: string; status: ExerciseStatus }[]>([
    { id: 1, title: "Luz y sombra con intención", description: "Dibuja una misma escena utilizando tres tonos de luminosidad.", icon: "☀️", status: "Pendiente" },
    { id: 2, title: "Paleta limitada de tres colores", description: "Crea un boceto empleando únicamente tres colores dominantes.", icon: "🎨", status: "En progreso" },
    { id: 3, title: "El punto focal", description: "Reorganiza una composición y destaca el elemento principal.", icon: "🎯", status: "Completado" },
    { id: 4, title: "Contrastes en naturaleza muerta", description: "Observa y diferencia las zonas más oscuras y más claras.", icon: "🖼️", status: "Completado" },
    { id: 5, title: "Balance del encuadre", description: "Realiza dos miniaturas con distribuciones de peso visual distintas.", icon: "⚖️", status: "Completado" },
  ]);
  const [message, setMessage] = useState("");
  const filterStatus: Record<string, ExerciseStatus> = { Pendientes: "Pendiente", "En progreso": "En progreso", Completados: "Completado" };
  const visibleExercises = exercises.filter((exercise) => filter === "Todos" || exercise.status === filterStatus[filter]);

  function advance(id: number) {
    setExercises((items) => items.map((exercise) => exercise.id === id ? { ...exercise, status: exercise.status === "Pendiente" ? "En progreso" : "Completado" } : exercise));
    setMessage("Avance actualizado en esta demostración. Los cambios duran mientras permanezcas en la vista.");
  }

  return (
    <PageFrame>
      <PageHeading eyebrow="PRÁCTICA PERSONALIZADA" title="Mis ejercicios" description="Pequeños retos nacidos de tus análisis. Practica a tu ritmo y marca tu avance." action={<PageLink to="/result-image" secondary>Ver crítica de origen →</PageLink>} />
      <div className="mb-[18px] grid gap-[15px] sm:grid-cols-3">
        {([["Pendientes", "Pendiente"], ["En progreso", "En progreso"], ["Completados", "Completado"]] as const).map(([label, status]) => <StatCard key={label} label={label} value={exercises.filter((exercise) => exercise.status === status).length} />)}
      </div>
      <Panel>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <SectionTitle>Mi lista de práctica</SectionTitle>
          <div aria-label="Filtrar ejercicios" className="flex flex-wrap gap-2">{["Todos", "Pendientes", "En progreso", "Completados"].map((option) => <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)} className={`cursor-pointer rounded-full border px-[15px] py-[9px] text-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#104734] ${filter === option ? "border-[#ffb8cc] bg-[#fde5ec] font-bold text-[#dc2a61]" : "border-[#e9d1bc] bg-white text-[#805d48] hover:bg-[#fff1df]"}`}>{option}</button>)}</div>
        </div>
        <ul className="space-y-[10px]">
          {visibleExercises.map((exercise) => <li key={exercise.id} className="flex flex-wrap items-center gap-[13px] rounded-[13px] border border-[#efd4bc] bg-white p-[15px]">
            <span aria-hidden="true" className="flex size-[54px] shrink-0 items-center justify-center rounded-[13px] bg-[#fae1cb] text-[25px]">{exercise.icon}</span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold text-[#3c533d]">{exercise.title}</h3>
              <p className="mt-[6px] text-[12px] leading-[18px] text-[#8b7b6b]">{exercise.description}</p>
              <div className="mt-[5px]"><Badge tone={exercise.status === "Pendiente" ? "amber" : exercise.status === "En progreso" ? "pink" : "green"}>{exercise.status}</Badge></div>
            </div>
            {exercise.status === "Completado" ? <span className="rounded-full border border-[#dcc5b3] px-[15px] py-2 text-[12px] font-bold">✓ Realizado</span> : <button type="button" onClick={() => advance(exercise.id)} className="cursor-pointer rounded-full bg-[#f52e70] px-[15px] py-[9px] text-[12px] font-bold text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734]">{exercise.status === "Pendiente" ? "Empezar" : "Completar"}</button>}
          </li>)}
        </ul>
        {visibleExercises.length === 0 && <p className="rounded-xl bg-[#fff8ef] p-6 text-center text-[#8b7565]">No hay ejercicios en esta categoría.</p>}
        {message && <p role="status" className="mt-4 text-[12px] text-[#426e45]">{message}</p>}
      </Panel>
      <p className="mt-[18px] rounded-xl border border-[#c8dfbf] bg-[#e8f1e4] p-[15px] text-[13px] leading-5 text-[#426e45]">Estos ejercicios provienen de las críticas educativas. No se asignan manualmente como tareas escolares: cada uno está relacionado con una obra y un análisis previos.</p>
    </PageFrame>
  );
}
