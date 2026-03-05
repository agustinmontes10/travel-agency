# 🌍 Proyecto: Web Agencia de Viajes – Base 2026

## 🎯 Objetivo del Proyecto

Construir una web profesional para una agencia de viajes con:

- Landing page moderna
- Panel de administración protegido
- Gestión de paquetes de viajes
- Arquitectura fullstack moderna y escalable

El proyecto debe servir tanto como producto funcional real como base arquitectónica reutilizable.

---

# 🧭 Visión

Desarrollar una web con diseño moderno (estética 2026), limpia, minimalista y responsive, que permita:

- Mostrar paquetes de viajes de forma atractiva
- Filtrar paquetes por fecha de inicio
- Gestionar contenido desde un panel administrador seguro
- Facilitar el contacto vía WhatsApp
- Mantener una arquitectura limpia, escalable y mantenible

---

# 🚀 Stack Tecnológico

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma (ORM)
- Zod (validación runtime)
- Server Actions para mutaciones
- Arquitectura por feature

---

# 🏗 Alcance Funcional

## 1️⃣ Landing Page

La landing debe incluir las siguientes secciones:

- **Hero**
- **Packages**
- **Services**
- **Contact**

Debe ser:

- Responsive (mobile-first)
- Diseño moderno y limpio
- Visualmente profesional
- Optimizada para experiencia de usuario

---

## 2️⃣ Gestión de Paquetes

Desde el panel administrador se deben poder:

- Crear paquetes
- Editar paquetes
- Eliminar paquetes
- Listar paquetes

Cada paquete debe incluir:

- `image`
- `title`
- `startDate`

En la landing, la sección **Packages** debe permitir:

- Filtrar paquetes por `startDate`

---

## 3️⃣ Autenticación

Se requiere:

- Sistema de autenticación
- Acceso protegido al panel de administrador
- Separación clara entre usuario público y administrador

---

## 4️⃣ Contacto

- El medio principal de contacto será WhatsApp
- Se debe integrar botón o enlace directo configurable

---

## 5️⃣ Sistema de Diseño

- Definir variables globales de colores
- Sistema reutilizable de estilos
- Base preparada para rebranding futuro
- Diseño consistente en toda la aplicación

---

# 🧠 Requisitos Técnicos

- Arquitectura fullstack con Next.js (App Router)
- Server Actions para mutaciones
- Separación Action → Service → Repository
- Validación runtime
- Base de datos con modelo `Package`
- Código organizado por feature
- Escalable y mantenible
- Preparado para extender a nuevas funcionalidades

---

# 🎨 Lineamientos de Diseño

- Estética moderna (2026)
- Minimalismo
- Buen uso de espacio en blanco
- Tipografía limpia
- Componentes reutilizables
- UX clara y simple

---

# 📱 Requisitos de Experiencia

- Responsive en todos los dispositivos
- Mobile-first
- Navegación fluida
- Carga optimizada

---

# 🚀 Objetivo Arquitectónico

No se busca solo una web funcional.

Se busca:

- Una base sólida reutilizable
- Buenas prácticas reales
- Separación de responsabilidades
- Escalabilidad futura
- Código limpio y mantenible

---

## 3️⃣ Separación de Responsabilidades

Flujo definido:
    UI
    ↓
    Server Action
    ↓
    Service (reglas de negocio)
    ↓
    Repository (acceso a DB)
    ↓
    Prisma
    ↓
    PostgreSQL


Reglas estrictas:

- La UI nunca accede a Prisma directamente.
- El repository no contiene lógica de negocio.
- El service no conoce HTTP ni FormData.
- La action no contiene reglas de negocio.
- La validación ocurre antes de llegar al service.

---

# 🔥 Uso de Server Actions

Se decidió utilizar Server Actions en lugar de API Routes cuando:

- No se necesita API pública
- No existen clientes externos (mobile / terceros)
- Es un flujo interno de la aplicación

Ventajas:

- Se elimina la capa HTTP innecesaria
- Menos boilerplate
- Mejor tipado end-to-end
- Integración natural con App Router
- Arquitectura más simple

API Routes se reservarán únicamente si:
- Se necesita API pública
- Hay integraciones externas
- Hay clientes distintos (mobile, microservicios)

---
