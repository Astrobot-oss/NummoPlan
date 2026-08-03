# 🐷 PiggyVault

PiggyVault es una aplicación de finanzas personales desarrollada con React + Vite cuyo objetivo es centralizar toda la información financiera del usuario en un único lugar.

La aplicación permitirá gestionar:

- 🎯 Objetivos de ahorro
- 💼 Patrimonio e inversiones
- 💳 Deudas
- 📊 Dashboard financiero
- 📅 Presupuestos
- 🧾 Gastos fijos
- 💶 Ingresos

---

# Stack tecnológico

- React
- Vite
- React Router
- TailwindCSS
- Context API
- Lucide React

---

# Arquitectura

```
src
│
├── components
├── context
├── domain
├── features
├── pages
├── routes
└── utils
```

Cada módulo mantiene la misma estructura:

- Página principal
- Página detalle
- Formularios
- Tarjetas
- Servicio
- Cálculos

---

# Filosofía

La lógica de negocio nunca vive dentro de los componentes.

Los componentes únicamente muestran información.

Toda la lógica vive dentro de:

```
src/domain
```

---

# Instalación

```bash
npm install
npm run dev
```

---

# Estado

Consultar:

- RoadMap.md
- ProjectStatus.md
- Decisions.md

## Próximas mejoras

- Persistencia mediante localStorage para todos los módulos.
- Venta de participaciones.
- Registro de pagos desde el detalle de deudas.
- Nueva visualización del histórico de inversiones.