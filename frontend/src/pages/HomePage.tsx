
import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";

export type ArtworkKind = "landscape" | "stillLife" | "portrait" | "garden" | "eye" | "house";

// Piezas visuales compartidas entre las páginas para conservar la misma paleta,
// bordes y tipografía. No incluyen la navbar ni el encabezado del layout.
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[18px] border border-[#efd4bc] bg-[#fffdf9] p-[21px] shadow-[0_4px_14px_#764d2410] ${className}`}>{children}</section>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[21px] leading-7 font-bold [font-family:Georgia,serif]">{children}</h2>;
}

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="pt-[9px] pb-7 text-[14px] text-[#104734]">
      {children}
      <footer className="mt-6 text-center text-[10px] leading-5 text-[#b6937c]">
        El Espejo del Artista · Diseño conceptual basado en Entregables 1, 2 y 3 · ESCOM 2026
      </footer>
    </div>
  );
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-[23px] flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="mb-[7px] text-[11px] font-bold tracking-[0.15em] text-[#ee3c70]">{eyebrow}</p>
        <h1 className="text-[32px] leading-tight font-bold [font-family:Georgia,serif] sm:text-[36px]">{title}</h1>
        <div className="mt-[9px] text-[14px] leading-5 text-[#8b7565]">{description}</div>
      </div>
      {action}
    </div>
  );
}

export function PageLink({ to, children, secondary = false, small = false }: { to: string; children: ReactNode; secondary?: boolean; small?: boolean }) {
  return <Link to={to} className={`inline-flex min-h-8 items-center justify-center gap-1 rounded-full px-5 py-[11px] text-center text-[13px] leading-4 font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#104734] ${secondary ? "border border-[#dcc5b3] bg-white text-[#104734] hover:bg-[#fff1df]" : "bg-[#f52e70] text-white shadow-[0_4px_9px_#f52e7026] hover:bg-[#df245f]"} ${small ? "px-[15px] py-2 text-[12px]" : ""}`}>{children}</Link>;
}

export function Badge({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "pink" | "amber" | "peach" }) {
  const colors = {
    green: "bg-[#e4efda] text-[#397341]",
    pink: "bg-[#ffe1e9] text-[#d8265e]",
    amber: "bg-[#fff0d6] text-[#a96316]",
    peach: "bg-[#f9dbcf] text-[#c86648]",
  };
  return <span className={`inline-flex rounded-full px-[10px] py-[5px] text-[10px] leading-[13px] font-medium ${colors[tone]}`}>{children}</span>;
}

export function StatCard({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="rounded-[14px] border border-[#efd4bc] bg-white px-[19px] py-5">
      <p className="text-[13px] text-[#8b7565]">{label}</p>
      <p className="mt-[9px] text-[30px] leading-8 font-bold [font-family:Georgia,serif]">{value}</p>
      {note && <div className="mt-[7px]"><Badge tone="peach">{note}</Badge></div>}
    </div>
  );
}

// Ilustraciones vectoriales de las seis obras de las referencias.
// Se dibujan en el propio TSX, sin dependencias, CSS ni archivos de imágenes nuevos.
export function Artwork({ kind = "landscape", className = "", decorative = false, format = "wide" }: { kind?: ArtworkKind; className?: string; decorative?: boolean; format?: "wide" | "tall" }) {
  const titles = { landscape: "Paisaje mexicano", stillLife: "Bodegón con naranjas", portrait: "Retrato a lápiz", garden: "Jardín al atardecer", eye: "Estudio de mirada", house: "Perspectiva de una casa" };
  return (
    <svg viewBox={kind === "landscape" && format === "tall" ? "0 0 360 328" : "0 0 360 200"} preserveAspectRatio="xMidYMid slice" role={decorative ? undefined : "img"} aria-label={decorative ? undefined : titles[kind]} aria-hidden={decorative || undefined} className={`block h-full w-full ${className}`}>
      {kind === "landscape" && format === "wide" && <>
        <rect width="360" height="200" className="fill-[#a6cfdc]" />
        <rect y="107" width="360" height="93" className="fill-[#eab77d]" />
        <circle cx="268" cy="29" r="33" className="fill-[#ffca6d]" />
        <path d="M0 120 56 58 111 119 158 50 225 121 307 53 360 104V180H0Z" className="fill-[#7fa79e]" />
        <path d="m0 160 99-58 91 45 96-44 74 49v48H0Z" className="fill-[#bb7b66]" />
        <path d="m0 177 77-39 68 26 91-29 124 42v23H0Z" className="fill-[#eab77d]" />
        <rect x="151" y="84" width="81" height="93" rx="1" className="fill-[#e9a862]" />
        <rect x="171" y="63" width="40" height="41" className="fill-[#efc68c]" />
        <path d="M164 66q27-37 55 0Z" className="fill-[#bb7765]" />
        <rect x="180" y="39" width="20" height="31" className="fill-[#c7785c]" />
        <path d="M175 40q14-19 29 0Z" className="fill-[#ffd184]" />
        <rect x="180" y="128" width="21" height="49" className="fill-[#805644]" />
        <circle cx="46" cy="145" r="29" className="fill-[#557e55]" /><circle cx="62" cy="117" r="24" className="fill-[#557e55]" />
        <path d="m44 184 4-48" className="stroke-[#916448] stroke-[5]" />
        <circle cx="298" cy="139" r="35" className="fill-[#557e55]" /><circle cx="317" cy="117" r="30" className="fill-[#557e55]" />
        <path d="m311 190-5-66" className="stroke-[#916448] stroke-[5]" />
      </>}
      {kind === "landscape" && format === "tall" && <>
        <rect width="360" height="328" className="fill-[#a6cfdc]" />
        <rect y="167" width="360" height="161" className="fill-[#eab77d]" />
        <circle cx="288" cy="73" r="41" className="fill-[#ffca6d]" />
        <path d="M0 146 23 112 84 178 151 101 248 185 337 105 360 126V285H0Z" className="fill-[#7fa79e]" />
        <path d="m0 206 87-28 109 48 103-57 61 39v120H0Z" className="fill-[#bb7b66]" />
        <path d="m0 252 58-34 77 28 128-35 97 24v93H0Z" className="fill-[#eab77d]" />
        <rect x="140" y="145" width="102" height="117" rx="1" className="fill-[#e9a862]" />
        <rect x="165" y="120" width="51" height="50" className="fill-[#efc68c]" />
        <path d="M156 123q34-45 70 0Z" className="fill-[#bb7765]" />
        <rect x="177" y="94" width="25" height="34" className="fill-[#c7785c]" />
        <path d="M171 94q18-24 37 0Z" className="fill-[#ffd184]" />
        <rect x="177" y="199" width="26" height="63" className="fill-[#805644]" />
        <circle cx="17" cy="219" r="36" className="fill-[#557e55]" /><circle cx="38" cy="184" r="30" className="fill-[#557e55]" />
        <path d="m15 270 5-60" className="stroke-[#916448] stroke-[6]" />
        <circle cx="326" cy="211" r="44" className="fill-[#557e55]" /><circle cx="350" cy="179" r="32" className="fill-[#557e55]" />
        <path d="m342 278-6-87" className="stroke-[#916448] stroke-[6]" />
      </>}
      {kind === "stillLife" && <>
        <rect width="360" height="200" className="fill-[#c98269]" /><rect y="106" width="360" height="94" className="fill-[#e5ba9d]" /><rect y="140" width="360" height="60" className="fill-[#b98366]" />
        <ellipse cx="178" cy="170" rx="147" ry="25" className="fill-[#9c6548]" /><ellipse cx="175" cy="165" rx="89" ry="16" className="fill-[#d3a67c]" />
        <path d="m121 45-10 52q-12 35 10 55h64q24-18 14-48l-12-59Z" className="fill-[#548577]" /><path d="M129 45h52v15h-54Z" className="fill-[#35665e]" /><path d="M184 76q46-2 30 40-5 15-22 9" className="fill-none stroke-[#427565] stroke-[12]" />
        <circle cx="218" cy="161" r="31" className="fill-[#ee9e35]" /><path d="M224 132q4-15 14-13" className="fill-none stroke-[#637d48] stroke-[4]" /><ellipse cx="240" cy="152" rx="9" ry="5" className="fill-[#638950]" /><circle cx="270" cy="170" r="31" className="fill-[#f5c154]" />
        <path d="M75 174q43-22 88-3t72 7l83 11-3 11-90-8q-34 6-73-10t-70 7Z" className="fill-[#f5dfb9]" />
      </>}
      {kind === "portrait" && <>
        <rect width="360" height="200" className="fill-[#e5d9c3]" />
        {[28, 66, 119, 162].map((y) => <path key={y} d={`M18 ${y}l324 5`} className="stroke-[#c8bda8] stroke-1" />)}
        <path d="M94 200q12-65 62-54l50-1q52 8 74 55Z" className="fill-[#76756b]" />
        <path d="M132 70q13-43 53-38t46 61l-15 53q-36 44-69-1l-16-31Z" className="fill-[#d9c8ac] stroke-[#69665d] stroke-[3]" />
        <path d="M130 96q-19-70 52-83 68-1 61 77l-19-39q-47 11-94 45Z" className="fill-[#686459]" />
        <path d="M150 103q12-7 24 0m23 0q13-6 24 3m-38-2-7 24h16m-18 17q22 9 40-1" className="fill-none stroke-[#69665d] stroke-[3]" />
        <path d="m110 25 130 137m-121-112 151 154M108 98l109 91" className="stroke-[#ada38e] stroke-[1.5]" />
      </>}
      {kind === "garden" && <>
        <rect width="360" height="200" className="fill-[#bfd5cd]" /><circle cx="87" cy="27" r="32" className="fill-[#f9d88c]" />
        <path d="M0 115q73-34 131 3 113-59 229 0v82H0Z" className="fill-[#83a88d]" /><path d="M0 166q92-40 187-1 105-40 173-3v38H0Z" className="fill-[#4d876d]" />
        <path d="m137 200-48-78m91 78V99m44 101 44-98" className="fill-none stroke-[#4e7d53] stroke-[5]" />
        <circle cx="87" cy="122" r="22" className="fill-[#f36980]" /><circle cx="93" cy="104" r="14" className="fill-[#fbb5c1]" /><circle cx="87" cy="125" r="9" className="fill-[#ffd06e]" />
        <circle cx="180" cy="89" r="24" className="fill-[#f36980]" /><circle cx="200" cy="75" r="15" className="fill-[#fbb5c1]" /><circle cx="180" cy="89" r="9" className="fill-[#ffd06e]" />
        <circle cx="266" cy="103" r="25" className="fill-[#f36980]" /><circle cx="248" cy="85" r="14" className="fill-[#fbb5c1]" /><circle cx="266" cy="103" r="9" className="fill-[#ffd06e]" />
      </>}
      {kind === "eye" && <>
        <rect width="360" height="200" className="fill-[#e4dac7]" />
        <path d="M42 42 64 31m20-7 24-5m28-2 29 1m29 7 23 9m17 9 23 15m11 14 20 20m-262-15 27-16" className="fill-none stroke-[#878176] stroke-[3]" />
        <path d="M42 100q139-117 282 0-138 118-282 0Z" className="fill-[#f0e7d2] stroke-[#6f6b62] stroke-[8]" />
        <ellipse cx="182" cy="100" rx="69" ry="68" className="fill-[#a88f70] stroke-[#6b675c] stroke-[5]" /><circle cx="182" cy="100" r="39" className="fill-[#4b5c57]" /><circle cx="182" cy="100" r="23" className="fill-[#1e3434]" /><circle cx="166" cy="80" r="13" className="fill-[#dfe5e4]" />
      </>}
      {kind === "house" && <>
        <rect width="360" height="200" className="fill-[#f0dfbc]" />
        <path d="m58 190-6-89 118-45 119 47 5 87Z" className="fill-[#f2cc98] stroke-[#908269] stroke-[3]" />
        <path d="m52 101 119 40 118-38M170 56l1 135m-38 0v-42l21 4v38m54 0v-47l29-13v60M0 187l360 4M58 191l231-88M52 101l242 89" className="fill-none stroke-[#908269] stroke-[3]" />
        <path d="m0 18 360 178M0 62l360 130M360 17 0 221" className="fill-none stroke-[#bcae92] stroke-1" />
      </>}
    </svg>
  );
}

// Selector local con arrastre, validación y vista previa; no sube archivos a un servidor.
export function ImagePicker({ compact = false }: { compact?: boolean }) {
  const inputId = useId();
  const [preview, setPreview] = useState("");
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");
  const readerRef = useRef<FileReader | null>(null);

  function selectImage(file?: File) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Selecciona una imagen JPG, PNG o WEBP.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen debe pesar como máximo 10 MB.");
      return;
    }
    readerRef.current?.abort();
    const reader = new FileReader();
    readerRef.current = reader;
    reader.onload = () => {
      if (readerRef.current !== reader) return;
      setPreview(String(reader.result));
      setFilename(file.name);
      setError("");
    };
    reader.onerror = () => setError("No pudimos leer la imagen. Intenta con otro archivo.");
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label htmlFor={inputId} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); selectImage(event.dataTransfer.files[0]); }} className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#e4b2a1] bg-[#fff8ef] px-4 text-center transition-colors hover:bg-[#fff0df] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#f52e70] ${compact ? "min-h-[148px] py-5" : "min-h-[327px] py-8"}`}>
        <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp" aria-describedby={error ? `${inputId}-error` : undefined} className="sr-only" onChange={(event) => { selectImage(event.target.files?.[0]); event.target.value = ""; }} />
        {preview ? <>
          <img src={preview} alt={filename} className={`mb-2 max-w-full rounded-lg object-contain ${compact ? "h-20" : "h-48"}`} />
          <span className="max-w-full truncate text-[13px] font-bold">{filename}</span>
          <span className="mt-1 text-[12px] text-[#8b7565]">Haz clic para cambiar la imagen</span>
        </> : <>
          <span aria-hidden="true" className={`mb-3 leading-none ${compact ? "text-[28px] text-[#f52e70]" : "text-[44px] text-[#653018]"}`}>⇪</span>
          <span className={`font-bold ${compact ? "text-[14px]" : "text-[16px] text-[#653018]"}`}>{compact ? <>Arrastra tu imagen aquí<br />o haz clic para seleccionar</> : "Arrastra una obra aquí"}</span>
          <span className="mt-1 text-[12px] text-[#8b7565]">{compact ? "JPG, PNG o WEBP · Máximo 10 MB" : "o selecciona un archivo desde tu equipo"}</span>
          {!compact && <span className="mt-5 rounded-full border border-[#dcc5b3] bg-white px-5 py-3 text-[13px] font-bold">Elegir imagen</span>}
        </>}
      </label>
      {error && <p id={`${inputId}-error`} role="alert" className="mt-2 text-[12px] text-[#b5234c]">{error}</p>}
    </div>
  );
}

// 01-inicio: bienvenida y tres columnas; el encabezado general lo aporta MainLayout.
export default function HomePage() {
  const recent: { kind: ArtworkKind; name: string; date: string }[] = [
    { kind: "landscape", name: "Paisaje mexicano", date: "18 oct 2026" },
    { kind: "stillLife", name: "Bodegón con naranjas", date: "15 oct 2026" },
    { kind: "portrait", name: "Retrato a lápiz", date: "10 oct 2026" },
    { kind: "garden", name: "Jardín al atardecer", date: "05 oct 2026" },
  ];

  return (
    <PageFrame>
      <section aria-labelledby="welcome-title" className="grid overflow-hidden rounded-[20px] border border-[#efc9a2] bg-[#fce7c9] xl:grid-cols-[1.105fr_1fr]">
        <div className="relative px-6 py-9 sm:px-[35px] xl:py-[42px]">
          <p className="mb-6 text-[14px] font-bold tracking-[0.1em] text-[#e75b50]">BIENVENIDA A TU TALLER CREATIVO</p>
          <h1 id="welcome-title" className="text-[32px] leading-[1.08] font-bold text-[#873b2c] [font-family:Georgia,serif] sm:text-[42px]">¡Hola, Evelyn!<br />Tu mirada sigue creciendo.</h1>
          <p className="mt-3 max-w-[480px] text-[14px] leading-[22px] text-[#80523f]">Aquí tu arte no solo se ve, se entiende. Descubre tus decisiones de color y composición con orientación clara y ejercicios pensados para ti.</p>
          <div className="mt-[23px]"><PageLink to="/analize-image">✦ Analizar mi obra →</PageLink></div>
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-4 -left-3 text-[72px] leading-none text-[#f6b7ad]">✿</span>
        </div>
        <div className="h-[240px] overflow-hidden xl:h-full xl:min-h-[327px]"><Artwork /></div>
      </section>

      <div className="mt-[19px] grid gap-[17px] md:grid-cols-2 xl:grid-cols-[1.05fr_1fr_.8fr]">
        <Panel>
          <SectionTitle>Analiza tu obra</SectionTitle>
          <p className="mt-3 mb-4 text-[#8b7565]">Empieza con una obra creada por ti.</p>
          <ImagePicker compact />
          <p className="mt-4 mb-2 text-[12px] text-[#8b7565]">Un pequeño vistazo a tu proceso</p>
          <div className="grid grid-cols-4 gap-2">{recent.map((work) => <div key={work.kind} className="h-[57px] overflow-hidden rounded-lg"><Artwork kind={work.kind} /></div>)}</div>
        </Panel>
        <Panel>
          <div className="mb-3 flex items-center justify-between gap-2"><SectionTitle>Últimos análisis</SectionTitle><Link to="/galery" className="text-[12px] text-[#8b7565] hover:underline">Ver todos →</Link></div>
          <ul className="divide-y divide-[#efe2d4]">
            {recent.map((work) => <li key={work.kind}><Link to="/result-image" className="flex items-center gap-[10px] rounded-lg py-[9px] focus-visible:outline-2 focus-visible:outline-[#f52e70]">
              <div className="h-[53px] w-[58px] shrink-0 overflow-hidden rounded-lg"><Artwork kind={work.kind} decorative /></div>
              <div className="min-w-0 flex-1"><p className="text-[12px] font-bold text-[#4f4941]">{work.name}</p><p className="mt-1 text-[10px] text-[#a08670]">{work.date}</p></div>
              <Badge>Completado</Badge>
            </Link></li>)}
          </ul>
        </Panel>
        <Panel className="md:col-span-2 xl:col-span-1">
          <SectionTitle>Consejos para ti</SectionTitle>
          <div className="mt-3 rounded-[14px] border border-[#ffc5d4] bg-[#fde1e7] p-[15px] text-[13px] leading-5 text-[#85344c]">
            <p className="font-bold">☀️ Explora las luces y sombras</p>
            <p className="mt-3">Una fuente de luz bien definida puede ayudarte a comprender el volumen en tus próximas obras.</p>
          </div>
          <h3 className="mt-[18px] text-[18px] font-bold [font-family:Georgia,serif]">Accesos rápidos</h3>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px] font-bold text-[#754c38]">
            {[["📖 Guías de técnica", "/resources"], ["🎨 Paleta de color", "/resources"], ["🖌 Ejercicios", "/exercise"], ["📈 Mi progreso", "/progress"]].map(([label, to]) => <Link key={label} to={to} className="rounded-xl border border-[#efd4bc] bg-[#f8ebdf] px-2 py-[14px] transition-colors hover:bg-[#f5ddc8] focus-visible:outline-2 focus-visible:outline-[#f52e70]">{label}</Link>)}
          </div>
        </Panel>
      </div>
    </PageFrame>
  );
}
