# 🐷 NummoPlan

NummoPlan es una aplicación de planificación financiera personal desarrollada con React + Vite cuyo objetivo es ayudar al usuario a comprender, organizar y mejorar su situación financiera desde un único lugar.

Más que registrar movimientos como hace una aplicación bancaria, NummoPlan pretende convertirse en un asistente financiero capaz de responder preguntas como:

- ¿En qué se está yendo mi dinero?
- ¿Cuánto puedo invertir cada mes?
- ¿Qué gastos están creciendo demasiado?
- ¿Cuánto dinero necesito realmente para vivir?
- ¿Qué decisiones frenan mi patrimonio?

La filosofía del proyecto es transformar datos financieros en información útil para tomar mejores decisiones.

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

Actualmente incluye:

- CRUD completo.
- Registro de pagos.
- Historial de pagos.
- Página de detalle.
- Indicadores de progreso.
- Persistencia mediante LocalStorage.

Continúa mejorándose visualmente y adaptándose completamente a dispositivos móviles.

---

## 🚧 Balance (Ingresos y gastos)

Nuevo módulo en desarrollo cuyo objetivo no es actuar como un extracto bancario, sino como el centro de control financiero del usuario.

Permitirá:

### Ingresos recurrentes

- Salario.
- Día habitual de cobro.
- Pagas extraordinarias configurables.
- Otros ingresos periódicos.

### Movimientos

Registro manual de:

- ingresos
- gastos
- transferencias futuras entre módulos

Cada movimiento podrá clasificarse mediante categorías y etiquetas.

### Inteligencia financiera

El sistema calculará automáticamente:

- ahorro mensual
- tasa de ahorro
- dinero disponible para invertir
- porcentaje del salario comprometido
- evolución mensual
- comparación con meses anteriores

### Análisis

Se incorporarán:

- gráficos circulares de gastos
- evolución temporal
- distribución por categorías
- tendencias

### Insights

NummoPlan ofrecerá recomendaciones automáticas como:

- "Este mes has ahorrado un 12 % más."
- "Tus gastos en ocio han aumentado un 35 %."
- "Podrías invertir aproximadamente 320 € al mes."
- "Las suscripciones representan el 9 % de tus gastos."

---

## ⏳ Inmuebles

Pendiente.

---

## ⏳ Dashboard inteligente

Será el último gran módulo.

No almacenará datos propios.

Consumirá información de:

- Objetivos
- Patrimonio
- Deudas
- Balance
- Inmuebles

para ofrecer una visión global del patrimonio del usuario.

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

Cada módulo mantiene la misma estructura:

- Página principal
- Página detalle
- Formularios
- Cards
- Componentes específicos
- Context
- Service
- Calculations

---

# Filosofía del proyecto

NummoPlan sigue una arquitectura inspirada en Clean Architecture.

- Los componentes únicamente renderizan información.
- Los Context almacenan el estado.
- Toda la lógica vive en `src/domain`.
- Las páginas coordinan la interfaz.

El objetivo es mantener un código limpio, reutilizable y preparado para crecer durante años.

---

# Diferenciación respecto a otras aplicaciones

NummoPlan no pretende sustituir a un banco.

Pretende convertirse en un copiloto financiero.

Mientras un banco muestra movimientos, NummoPlan ayuda a comprender qué significan esos movimientos y cómo afectan al patrimonio presente y futuro del usuario.

La aplicación evolucionará hacia un sistema capaz de conectar automáticamente todos los módulos:

- compras de inversiones
- dividendos
- pagos de deudas
- ingresos
- gastos
- inmuebles

para generar un análisis financiero unificado.

---

# Persistencia

Actualmente utilizan LocalStorage:

- Objetivos
- Patrimonio
- Deudas
- Balance

Hasta la futura sincronización en la nube.

---

# Responsive

Toda nueva funcionalidad se desarrolla pensando primero en:

- móvil
- tablet
- escritorio

evitando rehacer componentes posteriormente.

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

# Futuro de NummoPlan

Entre las funcionalidades previstas destacan:

- Dashboard financiero inteligente
- Simuladores financieros
- Herramientas FIRE
- Comparativas históricas
- Alertas inteligentes
- Exportación de datos
- Sincronización en la nube