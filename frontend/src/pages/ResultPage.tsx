import {
  Artwork,
  Badge,
  DisplayDate,
  PageFrame,
  PageHeading,
  PageLink,
  Panel,
  SectionTitle,
} from "./HomePage";
import type { AnalysisStatus, ArtworkData, MetricValues } from "./HomePage";

// 04-resultado: datos ficticios de la obra de ejemplo, sin simular un análisis real.
export type ResultPageData = {
  userId: string;
  artwork: ArtworkData;
  status: AnalysisStatus;
  metrics: MetricValues;
  palette: { name: string; hex: string }[];
  critique: string;
  exercise: { title: string; description: string; status: AnalysisStatus } | null;
};
export type ResultPageProps = { data?: ResultPageData };

const demoResult: ResultPageData = {
  userId: "demo",
  artwork: { id: "landscape", kind: "landscape", title: "Paisaje mexicano", date: "2026-10-18" },
  status: "Completado", metrics: [62, 70, 73],
  palette: [
    { name: "Cielo azul", hex: "#a6cfdc" }, { name: "Ocre", hex: "#e9a862" },
    { name: "Verde grisáceo", hex: "#7fa79e" }, { name: "Terracota", hex: "#bb7765" },
    { name: "Verde de los árboles", hex: "#557e55" },
  ],
  critique: "La distribución de los elementos crea un recorrido claro hacia el edificio central. La luz cálida aporta una atmósfera agradable. Para tu próximo intento, prueba reforzar la diferencia entre zonas claras y oscuras; eso podría ayudar a que el punto focal se distinga mejor.",
  exercise: { title: "Luz y sombra con intención.", description: "Dibuja una versión sencilla de esta escena usando solo tres tonos: claro, medio y oscuro. Identifica una fuente de luz antes de comenzar.", status: "Pendiente" },
};

/** API -> data: resultado del usuario autorizado. metrics es una tupla
 * [contraste, iluminación, balance] de 0 a 100; palette usa colores #RRGGBB;
 * artwork.date es ISO; exercise puede ser null. No se calcula un análisis aquí.
 */
export default function ResultPage({ data = demoResult }: ResultPageProps = {}) {
  const metrics = [
    {
      name: "Contraste",
      value: data.metrics[0],
      description: "Variación de luminancia",
      color: "fill-[#f52e70]",
    },
    {
      name: "Iluminación",
      value: data.metrics[1],
      description: "Claridad promedio",
      color: "fill-[#eca642]",
    },
    {
      name: "Balance",
      value: data.metrics[2],
      description: "Distribución del peso visual",
      color: "fill-[#3f8a76]",
    },
  ].map((metric) => ({ ...metric, value: Number.isFinite(metric.value) ? Math.min(100, Math.max(0, metric.value)) : 0 }));

  return (
    <PageFrame>
      <PageHeading
        eyebrow={data === demoResult ? "LECTURA VISUAL · EJEMPLO" : "LECTURA VISUAL"}
        title="Resultado del análisis"
        description={
          <span className="inline-flex flex-wrap items-center gap-1">
            {data.artwork.title} · <DisplayDate value={data.artwork.date} /> · <Badge tone={data.status === "Completado" ? "green" : data.status === "En progreso" ? "pink" : "amber"}>{data.status}</Badge>
          </span>
        }
        action={
          <PageLink to="/analize-image" secondary>
            + Analizar otra obra
          </PageLink>
        }
      />
      <div className="grid gap-[22px] xl:grid-cols-[.74fr_1fr]">
        <Panel>
          <div className="h-[300px] overflow-hidden rounded-xl sm:h-[385px]">
            <Artwork format="tall" kind={data.artwork.kind} imageUrl={data.artwork.imageUrl} imageAlt={data.artwork.title} />
          </div>
          <h2 className="mt-5 text-[18px] font-bold [font-family:Georgia,serif]">
            Tu obra, tu autoría
          </h2>
          <p className="mt-3 text-[12px] leading-[19px] text-[#8b7b6b]">
            Visualizamos la imagen original sin modificarla. Las observaciones
            son una guía para tu aprendizaje, no una calificación estética.
          </p>
          <div className="mt-3">
            <PageLink to="/gallery" small secondary>
              Ver en mi galería →
            </PageLink>
          </div>
        </Panel>
        <div className="space-y-[18px]">
          <Panel>
            <SectionTitle>¿Qué observamos?</SectionTitle>
            <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">
              Métricas descriptivas normalizadas de 0 a 100. Un número alto no
              significa necesariamente una obra “mejor”.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.name}
                  className="rounded-xl border border-[#f0dfcf] bg-[#fdf8f1] p-4"
                >
                  <p className="text-[12px] text-[#8b7565]">{metric.name}</p>
                  <p className="mt-[7px] text-[26px] font-bold [font-family:Georgia,serif]">
                    {metric.value}/100
                  </p>
                  <svg
                    viewBox="0 0 100 5"
                    role="img"
                    aria-label={`${metric.name}: ${metric.value} de 100`}
                    className="mt-[10px] h-2 w-full"
                  >
                    <rect
                      width="100"
                      height="5"
                      rx="2.5"
                      className="fill-[#efeee7]"
                    />
                    <rect
                      width={metric.value}
                      height="5"
                      rx="2.5"
                      className={metric.color}
                    />
                  </svg>
                  <p className="mt-3 text-[10px] leading-4 text-[#8b7b6b]">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-[18px] text-[12px] text-[#8b7565]">
              Paleta de {data.palette.length} colores dominantes (estimación visual)
            </p>
            <div
              className="mt-[10px] flex gap-2"
              aria-label="Paleta de la obra"
            >
              {data.palette.map(({ name, hex }, index) => (
                <svg key={`${hex}-${index}`} viewBox="0 0 28 28" role="img" aria-label={name}
                  className="size-[27px] rounded-full border-2 border-white ring-1 ring-[#dfd5c9]">
                  <title>{name}</title>
                  <circle cx="14" cy="14" r="14" fill={/^#[0-9a-f]{6}$/i.test(hex) ? hex : "#e5dfd5"} />
                </svg>
              ))}
            </div>
          </Panel>
          <Panel>
            <SectionTitle>La crítica educativa</SectionTitle>
            <p className="mt-3 text-[14px] leading-[24px] text-[#6d594a]">
              {data.critique}
            </p>
          </Panel>
          {data.exercise && (
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <SectionTitle>Ejercicio para seguir creciendo</SectionTitle>
              <Badge tone={data.exercise.status === "Completado" ? "green" : data.exercise.status === "En progreso" ? "pink" : "amber"}>{data.exercise.status}</Badge>
            </div>
            <p className="mt-5 text-[12px] leading-[19px] text-[#8b7b6b]">
              <strong className="text-[#654b36]">{data.exercise.title}</strong>{" "}
              {data.exercise.description}
            </p>
            <div className="mt-3">
              <PageLink to="/exercise" small>
                {data.exercise.status === "Completado" ? "Ver ejercicios →" : "Comenzar ejercicio →"}
              </PageLink>
            </div>
          </Panel>
          )}
        </div>
      </div>
    </PageFrame>
  );
}
