import { useState } from "react";
import { ImagePicker, PageFrame, PageHeading, PageLink, Panel, SectionTitle } from "./HomePage";

// 03-analizar-obra: carga local y explicación del análisis de demostración.
export default function AnalizeImgPage() {
  const [title, setTitle] = useState("Paisaje mexicano");

  return (
    <PageFrame>
      <PageHeading eyebrow="TU PRÓXIMA OBRA" title="Analizar mi obra" description="Sube una imagen propia para recibir una lectura visual y una crítica educativa." action={<PageLink to="/" secondary>← Volver al inicio</PageLink>} />
      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <Panel className="xl:min-h-[530px]">
          <SectionTitle>1. Selecciona tu imagen</SectionTitle>
          <div className="mt-3"><ImagePicker /></div>
          <p className="mt-3 text-[12px] leading-5 text-[#8b7565]">Formatos permitidos: JPG, PNG y WEBP. Tamaño máximo: 10 MB. El archivo original no se modifica.</p>
        </Panel>
        <Panel>
          <SectionTitle>2. Completa los detalles</SectionTitle>
          <label htmlFor="artwork-title" className="mt-3 block text-[12px] font-bold text-[#725440]">Título de la obra</label>
          <input id="artwork-title" type="text" value={title} maxLength={120} onChange={(event) => setTitle(event.target.value)} className="mt-[7px] w-full rounded-xl border border-[#e5cfbb] bg-white px-[13px] py-3 text-[16px] text-[#55483c] outline-none focus:border-[#f52e70] focus:ring-2 focus:ring-[#f52e7026]" />
          <p className="mt-[7px] text-[11px] text-[#978574]">El título te ayudará a identificarla en tu galería.</p>
          <p className="mt-[15px] rounded-xl bg-[#fff4d5] p-3 text-[12px] leading-4 text-[#855b21]">🔒 Tu obra será privada. La IA analiza y comenta, pero nunca cambia tu imagen original.</p>
          <h3 className="mt-5 text-[18px] font-bold [font-family:Georgia,serif]">Así funcionará el análisis</h3>
          <ol className="mt-4 space-y-[18px] text-[12px] text-[#808477]">
            {["Validamos el formato y tamaño", "Medimos paleta, contraste, iluminación y balance", "Generamos una crítica constructiva y ejercicios"].map((step, index) => <li key={step} className="flex items-center gap-[10px]"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full font-bold ${index === 0 ? "bg-[#f52e70] text-white" : "bg-[#e9ebdf] text-[#104734]"}`}>{index + 1}</span>{step}</li>)}
          </ol>
          <div className="mt-6 [&>a]:w-full"><PageLink to="/result-image">✦ Ver demostración del análisis →</PageLink></div>
          <p className="mt-5 text-[11px] leading-[18px] text-[#a08776]">Esta es una simulación visual. El resultado muestra la obra de ejemplo; no analiza la imagen que selecciones.</p>
        </Panel>
      </div>
    </PageFrame>
  );
}
