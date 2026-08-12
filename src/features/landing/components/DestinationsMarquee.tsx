const DESTINATIONS = [
  "Caribe",
  "Bariloche",
  "Europa",
  "Machu Picchu",
  "Cataratas",
  "Nueva York",
  "Patagonia",
  "Bora Bora",
];

/**
 * Marquee editorial de destinos: cinta infinita en serif que corre en loop
 * (CSS puro, se pausa al hover y se desactiva con prefers-reduced-motion).
 * La lista se duplica para que el loop de -50% sea continuo.
 */
export function DestinationsMarquee() {
  return (
    <section
      aria-hidden
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none select-none overflow-hidden py-4"
    >
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {DESTINATIONS.map((destination, i) => (
              <li key={destination} className="flex items-center">
                <span
                  className={`whitespace-nowrap pr-8 font-display text-5xl italic tracking-tight sm:pr-12 sm:text-6xl md:text-7xl ${
                    i % 2 === 0
                      ? "text-accent/80"
                      : "text-transparent [-webkit-text-stroke:1.5px_rgba(37,67,107,0.35)]"
                  }`}
                >
                  {destination}
                </span>
                <span className="pr-8 text-xl text-gold/70 sm:pr-12 sm:text-2xl">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
