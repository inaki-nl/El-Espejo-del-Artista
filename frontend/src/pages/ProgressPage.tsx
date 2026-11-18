import { useState } from "react";
import {
  Artwork,
  DisplayDate,
  PageFrame,
  PageHeading,
  PageLink,
  Panel,
  SectionTitle,
  StatCard,
} from "./HomePage";
import type { ArtworkData, MetricValues } from "./HomePage";

export type ProgressWork = ArtworkData & { metrics: MetricValues };
export type ProgressPageData = {
  userId: string;
  works: ProgressWork[];
  history: { date: string; label?: string; metrics: MetricValues }[];
  summary: { registeredWorks: number; completedAnalyses: number; completedExercises: number; assignedExercises: number };
  observation: string;
};
export type ProgressPageProps = { data?: ProgressPageData };

const demoWorks: Omit<ProgressWork, "id">[] = [] = [
    {
      kind: "landscape",
      title: "Paisaje mexicano",
      date: "18 oct 2026",
      metrics: [62, 70, 73],
    },
    {
      kind: "stillLife",
      title: "Bodegón con naranjas",
      date: "15 oct 2026",
      metrics: [59, 68, 69],
    },
    {
      kind: "portrait",
      title: "Retrato a lápiz",
      date: "10 oct 2026",
      metrics: [56, 65, 66],
    },
    {
      kind: "garden",
      title: "Jardín al atardecer",
      date: "05 oct 2026",
      metrics: [53, 61, 63],
    },
    {
      kind: "eye",
      title: "Estudio de mirada",
      date: "29 sep 2026",
      metrics: [49, 64, 59],
    },
    {
      kind: "house",
      title: "Perspectiva de una casa",
      date: "25 sep 2026",
      metrics: [43, 51, 47],
    },
  ];
// Contraste -> Iluminaciòn -> Balance
const demoProgress: ProgressPageData = {
  userId: "demo",
  works: demoWorks.map((work) => ({ ...work, id: work.kind })),
  history: [
    { date: "2026-09-15", label: "Sep 15", metrics: [42, 49, 46] },
    { date: "2026-09-22", label: "Sep 22", metrics: [47, 55, 52] },
    { date: "2026-09-29", label: "Sep 29", metrics: [56, 63, 65] },
    { date: "2026-10-05", label: "Oct 5", metrics: [57, 70, 68] },
    { date: "2026-10-10", label: "Oct 10", metrics: [64, 75, 78] },
    { date: "2026-10-18", label: "Oct 18", metrics: [67, 80, 84] },
  ],
  summary: { registeredWorks: 6, completedAnalyses: 6, completedExercises: 3, assignedExercises: 5 },
  observation: "cada obra explora decisiones distintas. Tu siguiente práctica puede explorar cómo distribuir el peso visual sin perder espontaneidad.",
};

/** API -> data: snapshot autorizado del usuario. Fechas ISO, contadores number
 * y metrics [contraste, iluminación, balance], cada valor entre 0 y 100.
 * history admite cualquier cantidad de puntos, incluso cero o uno.
 */
export default function ProgressPage({ data = demoProgress }: ProgressPageProps = {}) {
  return <ProgressContent key={data.userId} data={data} />;
}

function ProgressContent({ data }: { data: ProgressPageData }) {
  const clamp = (value: number) => Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const works = data.works.map((work) => ({ ...work, metrics: work.metrics.map(clamp) as MetricValues }));
  const history = [...data.history].sort((a, b) => a.date.localeCompare(b.date));
  const [previous, setPrevious] = useState(data === demoProgress ? "eye" : works.at(-1)?.id ?? "");
  const [current, setCurrent] = useState(works[0]?.id ?? "");
  const previousWork = works.find((work) => work.id === previous) ?? works.at(-1);
  const currentWork = works.find((work) => work.id === current) ?? works[0];
  const series = [
    { label: "Contraste", color: "stroke-[#f52e70]", dot: "text-[#f52e70]" },
    { label: "Iluminación", color: "stroke-[#e8a136]", dot: "text-[#e8a136]" },
    { label: "Balance", color: "stroke-[#208a6e]", dot: "text-[#208a6e]" },
  ].map((line, metric) => ({ ...line, values: history.map((entry) => clamp(entry.metrics[metric])) }));

  return (
    <PageFrame>
      <PageHeading
        eyebrow="MIRA TU CAMINO"
        title="Mi progreso artístico"
        description="Compara tus obras a lo largo del tiempo, sin reducir tu creatividad a una nota."
        action={<PageLink to="/gallery">Explorar mis obras →</PageLink>}
      />
      <div className="mb-[18px] grid gap-[15px] sm:grid-cols-3">
        <StatCard label="Obras registradas" value={data.summary.registeredWorks} note={data === demoProgress ? "Ejemplo" : undefined} />
        <StatCard
          label="Análisis completados"
          value={data.summary.completedAnalyses}
          note={data.summary.completedAnalyses > 0 ? "Historial disponible" : "Sin análisis"}
        />
        <StatCard
          label="Ejercicios completados"
          value={data.summary.completedExercises}
          note={`De ${data.summary.assignedExercises} asignados`}
        />
      </div>
      <div className="grid gap-[19px] xl:grid-cols-2">
        <Panel>
          <SectionTitle>Evolución de tus métricas</SectionTitle>
          <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">
            Variaciones medidas en obras sucesivas. No constituyen una
            calificación.
          </p>
          <div className="mt-3 rounded-xl bg-[#fff9f2] p-3">
            <svg
              viewBox="0 0 520 205"
              role="img"
              aria-label={`Evolución de contraste, iluminación y balance en ${history.length} obras`}
              className="h-auto w-full"
            >
              {[20, 40, 60, 80, 100].map((value) => (
                <g key={value}>
                  <line
                    x1="40"
                    x2="502"
                    y1={176 - value * 1.4}
                    y2={176 - value * 1.4}
                    className="stroke-[#eee1d2] stroke-1"
                  />
                  <text
                    x="14"
                    y={179 - value * 1.4}
                    className="fill-[#958272] text-[9px]"
                  >
                    {value}
                  </text>
                </g>
              ))}
              {series.map((line) => (
                <polyline
                  key={line.label}
                  points={line.values
                    .map(
                      (value, index) =>
                        `${46 + index * (445 / Math.max(history.length - 1, 1))},${176 - value * 1.4}`,
                    )
                    .join(" ")}
                  className={`fill-none stroke-[3] ${line.color}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
              {history.map((entry, index) => index !== 0 && index !== history.length - 1 && index % Math.max(1, Math.ceil((history.length - 1) / 5)) !== 0 ? null : (
                <text key={`${entry.date}-${index}`} x={46 + index * (445 / Math.max(history.length - 1, 1))}
                  y="199" textAnchor={index === history.length - 1 ? "end" : "start"}
                  className="fill-[#958272] text-[9px]">
                  {entry.label ?? <DisplayDate value={entry.date} options={{ year: undefined }} />}
                </text>
              ))}
              {history.length === 1 && series.map((line) => <circle key={line.label} cx="46" cy={176 - line.values[0] * 1.4} r="3" className={`fill-[#fffdf9] stroke-[2] ${line.color}`} />)}
            </svg>
          </div>
          {history.length === 0 && <p className="mt-3 text-[12px] text-[#8b7565]">Todavía no hay métricas en el historial.</p>}
          <div className="mt-3 flex flex-wrap gap-4 text-[11px]">
            {series.map((line) => (
              <span key={line.label} className={line.dot}>
                ● {line.label}
              </span>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle>Comparar dos obras</SectionTitle>
          <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">
            Datos ilustrativos: selecciona una obra anterior y otra actual del
            mismo usuario.
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Obra anterior",
                value: previousWork?.id ?? "",
                change: setPrevious,
                id: "previous-work",
              },
              {
                label: "Obra actual",
                value: currentWork?.id ?? "",
                change: setCurrent,
                id: "current-work",
              },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-[7px] block text-[12px] font-bold text-[#725440]"
                >
                  {field.label}
                </label>
                <select
                  id={field.id}
                  value={field.value}
                  disabled={works.length === 0}
                  onChange={(event) => field.change(event.target.value)}
                  className="w-full rounded-[10px] border border-[#e9d1bc] bg-white p-3 text-[13px] text-[#403a33] outline-none focus:ring-2 focus:ring-[#f52e7040]"
                >
                  {works.length === 0 && <option value="">Sin obras disponibles</option>}
                  {works.map((work) => (
                    <option key={work.id} value={work.id}>
                      {work.title}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-7 space-y-4" aria-live="polite">
            {previousWork && currentWork ? ["Contraste", "Iluminación", "Balance"].map((label, index) => {
              const delta =
                currentWork.metrics[index] - previousWork.metrics[index];
              return (
                <div
                  key={label}
                  className="grid grid-cols-[90px_1fr_54px] items-center gap-3 text-[12px] text-[#228164] sm:grid-cols-[132px_1fr_60px]"
                >
                  <span className="font-bold">{label}</span>
                  <svg
                    viewBox="0 0 100 9"
                    role="img"
                    aria-label={`${label}: anterior ${previousWork.metrics[index]}, actual ${currentWork.metrics[index]}`}
                    className="h-7 w-full"
                    preserveAspectRatio="none"
                  >
                    <rect
                      width="100"
                      height="9"
                      rx="2"
                      className="fill-[#f0eee8]"
                    />
                    <rect
                      width={previousWork.metrics[index]}
                      height="4"
                      rx="2"
                      className="fill-[#ddb9bf]"
                    />
                    <rect
                      y="5"
                      width={currentWork.metrics[index]}
                      height="4"
                      rx="2"
                      className="fill-[#2f9578]"
                    />
                  </svg>
                  <span className="font-bold">
                    {delta > 0 ? "+" : ""}
                    {delta} pts
                  </span>
                </div>
              );
            }) : <p className="text-[12px] text-[#8b7565]">Añade obras para comenzar a compararlas.</p>}
          </div>
          <div className="mt-5 rounded-xl border border-[#c8dfbf] bg-[#e8f1e4] p-[15px] text-[13px] leading-5 text-[#426e45]">
            <strong>🌿 Una observación útil:</strong> {data.observation}
          </div>
        </Panel>
      </div>
      <Panel className="mt-[18px]">
        <SectionTitle>Línea de tiempo</SectionTitle>
        <div className="mt-3 grid grid-cols-2 gap-[13px] sm:grid-cols-3 xl:grid-cols-6">
          {works.map((work) => (
            <div key={work.id}>
              <div className="h-[100px] overflow-hidden rounded-[10px]">
                <Artwork kind={work.kind} imageUrl={work.imageUrl} imageAlt={work.title} />
              </div>
              <h3 className="mt-[10px] text-[12px] leading-4 font-bold">
                {work.title}
              </h3>
              <p className="text-[12px] text-[#8b7565]"><DisplayDate value={work.date} /></p>
            </div>
          ))}
        </div>
      </Panel>
    </PageFrame>
  );
}
