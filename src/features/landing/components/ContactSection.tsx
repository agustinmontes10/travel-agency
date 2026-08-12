"use client";

import Link from "next/link";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { DrawnRule, Reveal } from "@/components/ui";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
const WHATSAPP_DEFAULT_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  "Hola, quiero hacer una consulta sobre los paquetes de la agencia.";

export function buildWhatsAppUrl() {
  if (!WHATSAPP_PHONE) return "#";

  const encodedMessage = encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
}

const InstagramIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const MailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/mtturismochaves/",
    icon: <InstagramIcon />,
    external: true,
  },
  {
    label: "WhatsApp",
    href: buildWhatsAppUrl(),
    icon: <WhatsAppIcon />,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:iaramenendezt@gmail.com",
    icon: <MailIcon />,
    external: false,
  },
];

export function ContactSection() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <footer
      id="contact"
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none bg-navy-deep text-white/70"
    >
      {/* Filete dorado superior: se dibuja desde el centro al entrar */}
      <DrawnRule
        className="w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        origin="center"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="gap-8 md:flex md:items-start md:justify-between" y={28} amount={0.15}>
          <div className="max-w-xl space-y-4">
            <Image
              src="/LogoBlanco.png"
              alt="mt turismo Gonzales Chaves"
              width={180}
              height={48}
              className="h-10 w-auto sm:h-12"
            />
            <p className="font-display text-2xl italic leading-snug text-white sm:text-3xl">
              Tu próximo viaje empieza con una conversación.
            </p>
            <p className="text-sm leading-relaxed">
              Te ayudamos a encontrar el viaje ideal con asesoramiento
              personalizado y las mejores opciones del mercado.
            </p>
          </div>

          <div className="mt-8 md:mt-0 md:shrink-0">
            <Link
              href={whatsappUrl}
              target="_blank"
              onClick={() => track("whatsapp_click", { source: "footer" })}
              className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-8 text-sm font-semibold tracking-tight text-navy-deep shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sand"
            >
              Escribir por WhatsApp
            </Link>
          </div>
        </Reveal>

        <Reveal
          className="mt-12 grid gap-8 border-t border-white/10 pt-10 text-sm sm:grid-cols-3"
          y={24}
          delay={0.15}
          amount={0.15}
        >
          <div className="space-y-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sand">
              Horarios de atención
            </p>
            <p>Lunes a viernes de 9 a 18 hs.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sand">
              Ubicación
            </p>
            <p>Sarmiento 235, Adolfo Gonzales Chaves, Buenos Aires.</p>
          </div>
          <div className="space-y-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sand">
              Redes
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-200 hover:border-gold/70 hover:text-sand hover:-translate-y-0.5"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-md text-white/50 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} MT Turismo · Adolfo Gonzales Chaves
          </p>
          <a
            href="https://neexia.com.ar"
            target="_blank"
            className="inline-flex items-center gap-2 transition-colors hover:text-sand"
          >
            Hecho por Neexia
            {/* <svg width="24" height="24" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="200" fill="black" />
              <g filter="url(#filter0_d_54_25)">
                <path d="M169.574 258.985C164.375 274.58 151.872 286.075 133.414 292.228C124.983 295.022 116.189 296.568 107.31 296.816C106.216 296.816 105.167 296.381 104.393 295.608C103.619 294.834 103.184 293.784 103.184 292.69C103.433 283.812 104.978 275.017 107.773 266.587C113.925 248.129 125.421 235.624 141.016 230.426C141.53 230.254 142.073 230.185 142.614 230.223C143.155 230.261 143.683 230.405 144.168 230.648C144.653 230.89 145.086 231.225 145.441 231.635C145.797 232.044 146.068 232.52 146.239 233.034C146.411 233.549 146.479 234.092 146.44 234.633C146.402 235.174 146.257 235.702 146.014 236.186C145.771 236.671 145.435 237.104 145.025 237.458C144.615 237.813 144.139 238.084 143.625 238.255C117.93 246.82 112.743 276.928 111.698 288.302C123.069 287.259 153.18 282.072 161.745 256.376C162.092 255.339 162.837 254.482 163.815 253.994C164.793 253.505 165.925 253.425 166.963 253.771C168 254.117 168.858 254.86 169.347 255.838C169.837 256.815 169.918 257.947 169.574 258.985ZM273.606 178.908L263.145 189.369V254.262C263.149 255.888 262.831 257.499 262.209 259.001C261.587 260.503 260.673 261.867 259.521 263.014L226.159 296.375C224.575 297.959 222.591 299.083 220.418 299.628C218.245 300.173 215.965 300.118 213.82 299.469C211.676 298.82 209.748 297.601 208.243 295.942C206.737 294.283 205.709 292.247 205.27 290.05L196.869 248.045L151.956 203.132L109.951 194.73C107.754 194.291 105.718 193.264 104.059 191.758C102.4 190.252 101.181 188.325 100.531 186.18C99.8819 184.036 99.8268 181.756 100.372 179.582C100.917 177.409 102.041 175.425 103.626 173.841L136.986 140.481C138.132 139.328 139.496 138.414 140.999 137.791C142.501 137.169 144.112 136.851 145.738 136.855H210.63L221.092 126.393C249.252 98.233 277.93 99.0177 288.952 100.663C291.571 101.043 293.997 102.259 295.869 104.13C297.741 106.002 298.957 108.428 299.337 111.047C300.982 122.07 301.767 150.747 273.606 178.908ZM111.569 186.639L152.634 194.852L202.379 145.107H145.738C145.196 145.106 144.659 145.212 144.158 145.419C143.657 145.627 143.202 145.932 142.82 146.316L109.46 179.676C108.932 180.204 108.557 180.865 108.376 181.59C108.195 182.314 108.213 183.074 108.429 183.789C108.646 184.503 109.052 185.146 109.605 185.648C110.158 186.15 110.837 186.492 111.569 186.639ZM254.893 197.621L205.148 247.367L213.361 288.431C213.507 289.163 213.85 289.842 214.352 290.395C214.854 290.948 215.497 291.355 216.211 291.571C216.926 291.787 217.687 291.806 218.411 291.624C219.135 291.442 219.797 291.068 220.325 290.539L253.685 257.179C254.069 256.797 254.374 256.342 254.581 255.842C254.788 255.341 254.894 254.804 254.893 254.262L254.893 197.621ZM267.771 173.073C293.278 147.566 292.636 122.051 291.176 112.266C291.05 111.398 290.647 110.594 290.027 109.974C289.407 109.354 288.603 108.95 287.735 108.824C277.947 107.364 252.433 106.722 226.926 132.229L215.257 143.897L215.256 143.899L159.825 199.331L200.67 240.176L256.101 184.744L256.102 184.743L267.771 173.073Z" fill="url(#paint0_linear_54_25)" />
              </g>
              <defs>
                <filter id="filter0_d_54_25" x="99" y="99.0005" width="209" height="206.999" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dx="5" dy="3" />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_54_25" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_54_25" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_54_25" x1="291" y1="113" x2="172" y2="300" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00D4E7" />
                  <stop offset="1" stopColor="#00BE77" />
                </linearGradient>
              </defs>
            </svg> */}
            <svg width="26" height="26" viewBox="0 0 398 423" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_26_15)">
                <path d="M345.821 0.0169219C344.238 0.0635432 342.657 0.143521 341.077 0.254524C312.533 5.67814 304.228 22.8791 300.081 49.1447C279.647 64.4143 256.839 79.2065 240.539 98.6965C214.571 129.746 196.191 167.925 176.779 202.373C155.388 240.334 105.668 303.193 68.8193 325.649C-16.8951 305.355 -9.95969 417.329 52.2198 412.511C64.1571 411.443 73.9143 409.285 82.2107 399.788C87.1326 394.158 92.1232 381.199 97.0606 376.91C124.15 353.373 149.268 331.978 171.579 303.404C210.464 253.606 231.07 192.574 270.803 143.426C282.762 128.772 315.908 99.3403 332.258 89.7585C359.119 91.2393 383.933 87.5296 391.319 56.0891C398.077 27.3215 376.038 -0.788961 345.821 0.0169219Z" fill="#FF8336" />
              </g>
              <path d="M101.17 39.6767C95.815 13.5643 70.2755 -3.2349 44.1786 2.18649C18.1795 7.5879 1.45345 33.012 6.78826 59.0267C12.1208 85.0414 37.5029 101.834 63.5309 96.568C89.6543 91.282 106.522 65.7868 101.17 39.6767Z" fill="#F1F1F1" />
              <g filter="url(#filter1_d_26_15)">
                <path d="M236.37 216.768C233.759 219.299 233.129 221.559 231.703 224.894C224.537 239.406 213.252 258.061 205.016 272.17C222.455 291.02 234.41 308.887 255.107 326.783C266.838 336.925 281.257 347.241 291.769 356.97L292.864 357.991C298.889 339.145 305.785 324.392 325.101 315.723C289.942 289.675 267 259.524 242.99 223.797C240.364 220.172 239.753 217.834 236.37 216.768Z" fill="#FF8336" />
              </g>
              <g filter="url(#filter2_d_26_15)">
                <path d="M190.752 151.022C165.361 114.788 151.514 89.9569 110.925 66.0002C105.537 84.2403 94.9314 96.0754 78.4496 105.213C106.98 127.054 142.989 171.711 162.739 202.454L164.424 202.57C171.71 189.074 185.694 164.737 190.752 151.022Z" fill="#FF8336" />
              </g>
              <path d="M381.42 337.267C370.428 325.185 353.778 319.968 337.858 323.615C313.777 329.13 298.576 352.947 303.711 377.112C308.846 401.278 332.416 416.853 356.661 412.103C372.688 408.961 385.778 397.423 390.906 381.919C396.036 366.411 392.411 349.346 381.42 337.267Z" fill="#F1F1F1" />
              <defs>
                <filter id="filter0_d_26_15" x="0" y="0" width="397.544" height="422.662" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="5" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_15" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26_15" result="shape" />
                </filter>
                <filter id="filter1_d_26_15" x="200.016" y="216.768" width="130.085" height="151.223" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="5" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_15" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26_15" result="shape" />
                </filter>
                <filter id="filter2_d_26_15" x="73.4496" y="66.0002" width="122.302" height="146.569" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="5" />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_26_15" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_26_15" result="shape" />
                </filter>
              </defs>
            </svg>

          </a>
        </div>
      </div>
    </footer>
  );
}
