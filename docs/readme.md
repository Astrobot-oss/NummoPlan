# 🐷 NummoPlan

NummoPlan es una aplicación de planificación financiera personal desarrollada con React + Vite cuyo objetivo es centralizar toda la información económica del usuario en un único lugar.

La aplicación está diseñada para ofrecer una visión completa del patrimonio, las obligaciones financieras y la evolución económica del usuario mediante una interfaz moderna, sencilla y escalable.

---

# Funcionalidades

## ✅ Objetivos de ahorro

- Crear objetivos.
- Seguimiento del progreso.
- Aportaciones.
- Eliminación y edición.
- Persistencia mediante LocalStorage.

---

## ✅ Patrimonio e inversiones

Actualmente permite gestionar inversiones de forma completa:

- Crear inversiones.
- Compra de participaciones.
- Venta de participaciones.
- Registro de dividendos.
- Actualización del precio de mercado.
- Histórico de movimientos.
- Histórico de precios.
- Gráfica individual de evolución.
- Cálculo automático de:

  - Participaciones
  - Capital invertido
  - Precio medio
  - Valor actual
  - Rentabilidad
  - Dividendos recibidos

- Persistencia mediante LocalStorage.

---

## 🚧 Deudas

En desarrollo.

---

## 🚧 Inmuebles

Pendiente.

---

## 🚧 Ingresos y gastos

Pendiente.

---

## 🚧 Dashboard financiero

Pendiente hasta completar todos los módulos financieros.

---

# Stack tecnológico

- React
- Vite
- React Router
- TailwindCSS
- Context API
- Lucide React
- Recharts

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
├── utils
└── data
```

Todos los módulos siguen la misma estructura:

- Página principal
- Página detalle
- Formularios
- Tarjetas
- Componentes específicos
- Servicios
- Cálculos

---

# Filosofía del proyecto

NummoPlan sigue una arquitectura inspirada en Clean Architecture.

Los componentes únicamente renderizan información.

Toda la lógica de negocio vive en:

```
src/domain
```

Los Context únicamente gestionan el estado.

Las páginas orquestan la interfaz.

Esto permite mantener un código escalable y sencillo de mantener.

---

# Persistencia

Actualmente utilizan LocalStorage:

- Objetivos
- Patrimonio
- Deudas

Los siguientes módulos también utilizarán LocalStorage hasta una futura sincronización en la nube.

---

# Responsive

La aplicación está siendo adaptada progresivamente para funcionar correctamente tanto en escritorio como en dispositivos móviles.

La compatibilidad móvil pasa a ser una prioridad antes de continuar con los siguientes módulos.

Objetivos del responsive:

- Adaptación completa a móviles.
- Adaptación a tablets.
- Componentes reutilizables.
- Modales adaptativos.
- Navegación cómoda mediante pantallas táctiles.

---

# Instalación

```bash
npm install
npm run dev
```

---

# Estado del proyecto

Consultar:

- ProjectStatus.md
- RoadMap.md
- Decisions.md

---

# Próximos módulos

Una vez completado el responsive se desarrollarán:

- Deudas
- Inmuebles
- Ingresos y gastos
- Dashboard financiero inteligente
- Simuladores financieros
- Herramientas FIRE
- Exportación de datos
- Sincronización en la nube