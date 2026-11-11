import { Artwork, Badge, PageFrame, PageHeading, PageLink, Panel, SectionTitle } from "./HomePage";
import type { ArtworkKind } from "./HomePage";

// 08-recursos: guías desplegables y tutoriales de muestra; no inventa enlaces externos.
export default function ResourcesPage() {
  const guides: { category: string; title: string; description: string; kind: ArtworkKind; advice: string }[] = [
    { category: "COLOR", title: "Explora las paletas reducidas", description: "Descubre cómo elegir pocos colores para reforzar la armonía.", kind: "garden", advice: "Elige tres colores y crea pequeñas mezclas entre ellos. Prueba pintar una escena sencilla y observa cómo cambia al variar sus proporciones." },
    { category: "COMPOSICIÓN", title: "Cómo usar la regla de tercios", description: "Identifica posibles zonas de interés sin convertirlas en reglas rígidas.", kind: "house", advice: "Divide tu encuadre en nueve partes iguales. Prueba colocar el elemento principal cerca de una intersección y compara el resultado con una composición centrada." },
    { category: "ILUMINACIÓN", title: "Luces y sombras en objetos", description: "Reconoce valores de claridad y profundidad en una naturaleza muerta.", kind: "stillLife", advice: "Coloca un objeto junto a una sola fuente de luz. Distingue la zona iluminada, el tono medio y la sombra antes de añadir detalles." },
  ];

  return (
    <PageFrame>
      <PageHeading eyebrow="APRENDE CON CURIOSIDAD" title="Recursos y consejos" description="Guías visuales, consejos de técnica y recursos para complementar tus ejercicios." action={<PageLink to="/exercise">Mis ejercicios →</PageLink>} />
      <aside className="mb-5 rounded-[14px] border border-[#ffc5d4] bg-[#fde1e7] p-[15px] text-[13px] leading-5 text-[#85344c]">
        <h2 className="font-bold">💡 Consejo adaptado al último análisis</h2>
        <p className="mt-3">Antes de comenzar un dibujo, decide de dónde viene la luz. Prueba tres pequeños bocetos cambiando su dirección.</p>
      </aside>
      <div className="grid items-start gap-[18px] md:grid-cols-3">
        {guides.map((guide) => <details key={guide.category} className="group overflow-hidden rounded-[18px] border border-[#efd4bc] bg-[#fffdf9] p-[21px] shadow-[0_4px_14px_#764d2410]">
          <summary className="cursor-pointer list-none rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f52e70] [&::-webkit-details-marker]:hidden">
            <div className="h-[180px] overflow-hidden rounded-[10px]"><Artwork kind={guide.kind} /></div>
            <p className="mt-[18px] text-[10px] font-bold tracking-[0.08em] text-[#f52e70]">{guide.category}</p>
            <h2 className="mt-[6px] text-[20px] leading-6 font-bold [font-family:Georgia,serif] group-hover:text-[#b13c58]">{guide.title}</h2>
            <p className="mt-3 text-[12px] leading-[19px] text-[#8b7b6b]">{guide.description}</p>
            <div className="mt-3"><Badge tone="pink">Guía introductoria</Badge></div>
          </summary>
          <p className="mt-4 border-t border-[#efdfd1] pt-4 text-[13px] leading-6 text-[#6d594a]">{guide.advice}</p>
        </details>)}
      </div>
      <Panel className="mt-[19px]">
        <SectionTitle>Tutoriales para seguir practicando</SectionTitle>
        <p className="mt-3 text-[12px] leading-5 text-[#8b7b6b]">En la primera versión, los tutoriales se presentan como enlaces a recursos externos seleccionados. Aquí aparecen como tarjetas de demostración.</p>
        <div className="mt-3 grid gap-[19px] md:grid-cols-2">
          {["Introducción a la composición", "Fundamentos del color"].map((title) => <div key={title} className="flex items-center gap-[13px] rounded-[13px] border border-[#efd4bc] bg-white p-[15px]"><span aria-hidden="true" className="flex size-[52px] shrink-0 items-center justify-center rounded-[13px] bg-[#fae1cb] text-[25px] text-[#653018]">▶</span><div><h3 className="text-[14px] font-bold text-[#3c533d]">{title}</h3><p className="mt-[6px] text-[12px] leading-[18px] text-[#8b7b6b]">Contenido orientativo · enlace externo por configurar</p></div></div>)}
        </div>
      </Panel>
    </PageFrame>
  );
}
