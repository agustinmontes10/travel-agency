import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-7 px-4 text-center">
      <p className="flex items-center gap-4 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold">
        <span className="h-px w-8 bg-gold/50" aria-hidden />
        Error 404
        <span className="h-px w-8 bg-gold/50" aria-hidden />
      </p>

      <h1 className="font-display text-5xl tracking-tight text-balance sm:text-6xl">
        Este destino no está <em className="italic text-accent">en el mapa</em>.
      </h1>

      <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
        La página que buscás no existe o fue movida. Pero tranquilo: los
        mejores viajes empiezan volviendo al punto de partida.
      </p>

      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold tracking-tight text-accent-foreground shadow-soft transition-all duration-200 hover:bg-navy-deep hover:-translate-y-0.5 active:scale-[0.98]"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
