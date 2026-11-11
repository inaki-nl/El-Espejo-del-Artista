import { Artwork, Badge, PageFrame, PageHeading, PageLink, Panel, SectionTitle } from "./HomePage";

// 04-resultado: datos ficticios de la obra de ejemplo, sin simular un análisis real.
export default function ResultPage() {
  const metrics = [
    { name: "Contraste", value: 62, description: "Variación de luminancia", color: "fill-[#f52e70]" },
    { name: "Iluminación", value: 70, description: "Claridad promedio", color: "fill-[#eca642]" },
    { name: "Balance", value: 73, description: "Distribución del peso visual", color: "fill-[#3f8a76]" },
  ];

  return (
    <PageFrame>
      <PageHeading eyebrow="LECTURA VISUAL · EJEMPLO" title="Resultado del análisis" description={<span className="inline-flex flex-wrap items-center gap-1">Paisaje mexicano · 18 oct 2026 · <Badge>Completado</Badge></span>} action={<PageLink to="/analize-image" secondary>+ Analizar otra obra</PageLink>} />
      <div className="grid gap-[22px] xl:grid-cols-[.74fr_1fr]">
        <Panel>
          <div className="h-[300px] overflow-hidden rounded-xl sm:h-[385px]"><Artwork format="tall" /></div>
          <h2 className="mt-5 text-[18px] font-bold [font-family:Georgia,serif]">Tu obra, tu autoría</h2>
          <p className="mt-3 text-[12px] leading-[19px] text-[#8b7b6b]">Visualizamos la imagen original sin modificarla. Las observaciones son una guía para tu aprendizaje, no una calificación estética.</p>
          <div className="mt-3"><PageLink to="/galery" small secondary>Ver en mi galería →</PageLink></div>
        </Panel>
        <div className="space-y-[18px]">
          <Panel>
            <SectionTitle>¿Qué observamos?</SectionTitle>
            <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">Métricas descriptivas normalizadas de 0 a 100. Un número alto no significa necesariamente una obra “mejor”.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => <div key={metric.name} className="rounded-xl border border-[#f0dfcf] bg-[#fdf8f1] p-4">
                <p className="text-[12px] text-[#8b7565]">{metric.name}</p>
                <p className="mt-[7px] text-[26px] font-bold [font-family:Georgia,serif]">{metric.value}/100</p>
                <svg viewBox="0 0 100 5" role="img" aria-label={`${metric.name}: ${metric.value} de 100`} className="mt-[10px] h-2 w-full"><rect width="100" height="5" rx="2.5" className="fill-[#efeee7]" /><rect width={metric.value} height="5" rx="2.5" className={metric.color} /></svg>
                <p className="mt-3 text-[10px] leading-4 text-[#8b7b6b]">{metric.description}</p>
              </div>)}
            </div>
            <p className="mt-[18px] text-[12px] text-[#8b7565]">Paleta de cinco colores dominantes (estimación visual)</p>
            <div className="mt-[10px] flex gap-2" aria-label="Paleta de la obra">
              {[["Cielo azul", "bg-[#a6cfdc]"], ["Ocre", "bg-[#e9a862]"], ["Verde grisáceo", "bg-[#7fa79e]"], ["Terracota", "bg-[#bb7765]"], ["Verde de los árboles", "bg-[#557e55]"]].map(([name, color]) => <span key={name} role="img" aria-label={name} title={name} className={`size-[27px] rounded-full border-2 border-white ring-1 ring-[#dfd5c9] ${color}`} />)}
            </div>
          </Panel>
          <Panel>
            <SectionTitle>La crítica educativa</SectionTitle>
            <p className="mt-3 text-[14px] leading-[24px] text-[#6d594a]">La distribución de los elementos crea un recorrido claro hacia el edificio central. La luz cálida aporta una atmósfera agradable. Para tu próximo intento, prueba reforzar la diferencia entre zonas claras y oscuras; eso podría ayudar a que el punto focal se distinga mejor.</p>
          </Panel>
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3"><SectionTitle>Ejercicio para seguir creciendo</SectionTitle><Badge tone="amber">Pendiente</Badge></div>
            <p className="mt-5 text-[12px] leading-[19px] text-[#8b7b6b]"><strong className="text-[#654b36]">Luz y sombra con intención.</strong> Dibuja una versión sencilla de esta escena usando solo tres tonos: claro, medio y oscuro. Identifica una fuente de luz antes de comenzar.</p>
            <div className="mt-3"><PageLink to="/exercise" small>Comenzar ejercicio →</PageLink></div>
          </Panel>
        </div>
      </div>
    </PageFrame>
  );
}
