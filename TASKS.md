# Tareas pendientes del proyecto

## ✅ Completadas

- **#3** Integrar WhatsApp como medio de contacto _(ya estaba hecho en Hero y ContactSection)_
- **#4** Crear panel de administrador con autenticación
- **#5** Implementar CRUD de Packages en el panel admin
- **#6** Conectar packages del admin con la landing page
- **#7** Fijar configuración Prisma y crear .env.example

---

## 🔲 Pendientes

### #1 — Finalizar diseño visual de la landing page

**1. Contexto**
La landing tiene las secciones Hero, Packages, Services, CTA y ContactSection implementadas estructuralmente, pero el diseño visual no está terminado. Algunas secciones carecen de estilos definitivos, tipografía consistente, espaciados correctos y elementos visuales finales.

**2. Objetivo**
Completar el diseño visual de todas las secciones para que tenga un aspecto profesional, coherente y acorde a una agencia de viajes moderna.

**3. Requerimientos**.
- Packages: Dejarla como esta.
- Services: íconos o ilustraciones, descripción breve de cada servicio.
- CTA (CtaVideosSection): Dejarla como esta.
- ContactSection: Dejarla como esta.
- Consistencia tipográfica con `--font-geist-sans` / `--font-geist-mono`.
- Paleta de colores usando las custom properties ya definidas (`bg-surface`, `text-muted-foreground`, `shadow-soft`).

**4. Reglas Técnicas**
- Tailwind CSS v4 exclusivamente (sin CSS inline salvo excepciones).
- No instalar librerías de UI externas; usar `src/components/ui/`.
- Mantener componentes en `src/features/landing/components/`.
- Server Components por defecto; `"use client"` solo si hay interactividad.

**5. Criterio de Aceptación**
- Todas las secciones tienen diseño visualmente terminado y coherente.
- No hay placeholders, secciones vacías ni colores por defecto sin intención.
- Diseño aprobado en desktop (≥1280px) corriendo `npm run dev`.

---

### #2 — Hacer la landing page 100% responsive

**1. Contexto**
La landing fue desarrollada priorizando desktop. Algunas secciones no están adaptadas correctamente para mobile (<640px) ni tablet (640px–1024px). El swiper de packages ya tiene `PackagesMobileSwiper` pero el resto puede necesitar ajustes.

**2. Objetivo**
Garantizar que toda la landing se vea y funcione correctamente en mobile, tablet y desktop.

**3. Requerimientos**
- Breakpoints: mobile (<640px), tablet (sm/md: 640–1024px), desktop (lg+: ≥1024px).
- Hero: tipografía, imágenes y CTA adaptados a mobile.
- Packages: `PackagesMobileSwiper` solo en mobile, `PackagesSwiper` solo en desktop/tablet.
- Services y CTA: columnas que colapsan a una columna en mobile.
- ContactSection: botón/info usable en pantallas pequeñas.
- Sin desbordamiento horizontal en ningún breakpoint.

**4. Reglas Técnicas**
- Prefijos Tailwind v4: `sm:`, `md:`, `lg:`, `xl:` — sin media queries CSS manuales.
- Validar en DevTools: 375px (iPhone SE), 768px (iPad), 1280px (desktop).
- Respetar el padding ya definido en `PageShell` (`px-4 sm:px-6 lg:px-8`).

**5. Criterio de Aceptación**
- En 375px: sin scroll horizontal, textos y botones legibles y accesibles.
- En 768px: layout de dos columnas donde corresponde.
- En 1280px: diseño desktop intacto.
- `npm run build` pasa sin errores.
