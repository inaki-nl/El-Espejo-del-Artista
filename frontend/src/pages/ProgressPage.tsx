import { useState } from "react";
import { Artwork, PageFrame, PageHeading, PageLink, Panel, SectionTitle, StatCard } from "./HomePage";
import type { ArtworkKind } from "./HomePage";

// 06-progreso: gráfica SVG y comparación de datos ilustrativos, sin librería de gráficas.
export default function ProgressPage() {
  const works: { kind: ArtworkKind; title: string; date: string; metrics: number[] }[] = [
    { kind: "landscape", title: "Paisaje mexicano", date: "18 oct 2026", metrics: [62, 70, 73] },
    { kind: "stillLife", title: "Bodegón con naranjas", date: "15 oct 2026", metrics: [59, 68, 69] },
    { kind: "portrait", title: "Retrato a lápiz", date: "10 oct 2026", metrics: [56, 65, 66] },
    { kind: "garden", title: "Jardín al atardecer", date: "05 oct 2026", metrics: [53, 61, 63] },
    { kind: "eye", title: "Estudio de mirada", date: "29 sep 2026", metrics: [49, 64, 59] },
    { kind: "house", title: "Perspectiva de una casa", date: "25 sep 2026", metrics: [43, 51, 47] },
  ];
  const [previous, setPrevious] = useState("eye");
  const [current, setCurrent] = useState("landscape");
  const previousWork = works.find((work) => work.kind === previous) ?? works[4];
  const currentWork = works.find((work) => work.kind === current) ?? works[0];
  const series = [
    { label: "Contraste", color: "stroke-[#f52e70]", values: [42, 47, 56, 57, 64, 67], dot: "text-[#f52e70]" },
    { label: "Iluminación", color: "stroke-[#e8a136]", values: [49, 55, 63, 70, 75, 80], dot: "text-[#e8a136]" },
    { label: "Balance", color: "stroke-[#208a6e]", values: [46, 52, 65, 68, 78, 84], dot: "text-[#208a6e]" },
  ];

  return (
    <PageFrame>
      <PageHeading eyebrow="MIRA TU CAMINO" title="Mi progreso artístico" description="Compara tus obras a lo largo del tiempo, sin reducir tu creatividad a una nota." action={<PageLink to="/galery">Explorar mis obras →</PageLink>} />
      <div className="mb-[18px] grid gap-[15px] sm:grid-cols-3">
        <StatCard label="Obras registradas" value={6} note="Ejemplo" />
        <StatCard label="Análisis completados" value={6} note="Historial disponible" />
        <StatCard label="Ejercicios completados" value={3} note="De 5 asignados" />
      </div>
      <div className="grid gap-[19px] xl:grid-cols-2">
        <Panel>
          <SectionTitle>Evolución de tus métricas</SectionTitle>
          <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">Variaciones medidas en obras sucesivas. No constituyen una calificación.</p>
          <div className="mt-3 rounded-xl bg-[#fff9f2] p-3">
            <svg viewBox="0 0 520 205" role="img" aria-label="Ejemplo de evolución: contraste de 42 a 67, iluminación de 49 a 80 y balance de 46 a 84, entre septiembre y octubre" className="h-auto w-full">
              {[20, 40, 60, 80, 100].map((value) => <g key={value}><line x1="40" x2="502" y1={176 - value * 1.4} y2={176 - value * 1.4} className="stroke-[#eee1d2] stroke-1" /><text x="14" y={179 - value * 1.4} className="fill-[#958272] text-[9px]">{value}</text></g>)}
              {series.map((line) => <polyline key={line.label} points={line.values.map((value, index) => `${46 + index * 89},${176 - value * 1.4}`).join(" ")} className={`fill-none stroke-[3] ${line.color}`} strokeLinecap="round" strokeLinejoin="round" />)}
              {["Sep 15", "Sep 22", "Sep 29", "Oct 5", "Oct 10", "Oct 18"].map((date, index) => <text key={date} x={46 + index * 89} y="199" textAnchor={index === 5 ? "end" : "start"} className="fill-[#958272] text-[9px]">{date}</text>)}
            </svg>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-[11px]">{series.map((line) => <span key={line.label} className={line.dot}>● {line.label}</span>)}</div>
        </Panel>
        <Panel>
          <SectionTitle>Comparar dos obras</SectionTitle>
          <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">Datos ilustrativos: selecciona una obra anterior y otra actual del mismo usuario.</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[{ label: "Obra anterior", value: previous, change: setPrevious, id: "previous-work" }, { label: "Obra actual", value: current, change: setCurrent, id: "current-work" }].map((field) => <div key={field.id}>
              <label htmlFor={field.id} className="mb-[7px] block text-[12px] font-bold text-[#725440]">{field.label}</label>
              <select id={field.id} value={field.value} onChange={(event) => field.change(event.target.value)} className="w-full rounded-[10px] border border-[#e9d1bc] bg-white p-3 text-[13px] text-[#403a33] outline-none focus:ring-2 focus:ring-[#f52e7040]">{works.map((work) => <option key={work.kind} value={work.kind}>{work.title}</option>)}</select>
            </div>)}
          </div>
          <div className="mt-7 space-y-4" aria-live="polite">
            {["Contraste", "Iluminación", "Balance"].map((label, index) => {
              const delta = currentWork.metrics[index] - previousWork.metrics[index];
              return <div key={label} className="grid grid-cols-[90px_1fr_54px] items-center gap-3 text-[12px] text-[#228164] sm:grid-cols-[132px_1fr_60px]">
                <span className="font-bold">{label}</span>
                <svg viewBox="0 0 100 9" role="img" aria-label={`${label}: anterior ${previousWork.metrics[index]}, actual ${currentWork.metrics[index]}`} className="h-7 w-full" preserveAspectRatio="none"><rect width="100" height="9" rx="2" className="fill-[#f0eee8]" /><rect width={previousWork.metrics[index]} height="4" rx="2" className="fill-[#ddb9bf]" /><rect y="5" width={currentWork.metrics[index]} height="4" rx="2" className="fill-[#2f9578]" /></svg>
                <span className="font-bold">{delta > 0 ? "+" : ""}{delta} pts</span>
              </div>;
            })}
          </div>
          <div className="mt-5 rounded-xl border border-[#c8dfbf] bg-[#e8f1e4] p-[15px] text-[13px] leading-5 text-[#426e45]">
            <strong>🌿 Una observación útil:</strong> cada obra explora decisiones distintas. Tu siguiente práctica puede explorar cómo distribuir el peso visual sin perder espontaneidad.
          </div>
        </Panel>
      </div>
      <Panel className="mt-[18px]">
        <SectionTitle>Línea de tiempo</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-[13px] sm:grid-cols-3 xl:grid-cols-6">
          {works.map((work) => <div key={work.kind}><div className="h-[100px] overflow-hidden rounded-[10px]"><Artwork kind={work.kind} /></div><h3 className="mt-[10px] text-[12px] leading-4 font-bold">{work.title}</h3><p className="text-[12px] text-[#8b7565]">{work.date}</p></div>)}
        </div>
      </Panel>
    </PageFrame>
  );
}
