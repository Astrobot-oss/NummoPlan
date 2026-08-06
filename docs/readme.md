# 🐷 NummoPlan

NummoPlan es una aplicación de planificación financiera personal desarrollada con React + Vite cuyo objetivo es ayudar al usuario a comprender, organizar y mejorar su situación financiera desde un único lugar.

Más que registrar movimientos como hace una aplicación bancaria, NummoPlan pretende convertirse en un asistente financiero capaz de responder preguntas como:

- ¿En qué se está yendo mi dinero?
- ¿Cuánto puedo invertir cada mes?
- ¿Qué gastos están creciendo demasiado?
- ¿Cuánto dinero necesito realmente para vivir?
- ¿Qué decisiones frenan mi patrimonio?

La filosofía del proyecto consiste en transformar datos financieros en información útil para ayudar al usuario a tomar mejores decisiones.

---

# Funcionalidades

## ✅ Objetivos de ahorro

Incluye:

- CRUD completo
- Seguimiento del progreso
- Aportaciones
- Página de detalle
- Historial
- Persistencia mediante LocalStorage

---

## ✅ Patrimonio e inversiones

Actualmente permite gestionar inversiones de forma completa.

Incluye:

- Crear inversiones
- Compra de participaciones
- Venta de participaciones
- Registro de dividendos
- Actualización del valor de mercado
- Histórico de movimientos
- Histórico de precios
- Gráfica individual

Calcula automáticamente:

- Participaciones
- Capital invertido
- Precio medio
- Valor actual
- Rentabilidad
- Dividendos recibidos

Persistencia mediante LocalStorage.

---

## ✅ Deudas

Incluye:

- CRUD completo
- Registro de pagos
- Historial de pagos
- Página detalle
- Indicadores de progreso
- Persistencia mediante LocalStorage

---

## 🚧 Balance

Balance será el centro financiero de NummoPlan.

No pretende comportarse como un extracto bancario, sino explicar qué ocurre con el dinero del usuario.

Actualmente se encuentra en desarrollo.

### Ingresos recurrentes

Permitirá configurar:

- nómina
- pensión
- alquiler
- negocio
- cualquier ingreso periódico

### Movimientos

Registro manual de:

- ingresos
- gastos

En futuras versiones recibirá automáticamente movimientos procedentes de otros módulos.

### Inteligencia financiera

Calculará automáticamente:

- ahorro mensual
- tasa de ahorro
- dinero disponible para invertir
- evolución mensual
- comparativas
- categorías de mayor gasto

### Análisis

Mostrará:

- distribución por categorías
- evolución temporal
- tendencias
- insights automáticos

---

## ⏳ Inmuebles

Pendiente de desarrollo.

Permitirá gestionar:

- inmuebles
- valor de mercado
- hipotecas
- gastos asociados
- rentabilidad

---

## ⏳ Dashboard inteligente

Será el último gran módulo.

Consumirá información procedente de:

- Objetivos
- Patrimonio
- Deudas
- Balance
- Inmuebles

Nunca almacenará información propia.

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

Cada módulo mantiene siempre la misma filosofía.

- Context
- Service
- Calculations
- Componentes
- Formularios
- Página principal
- Página detalle

La lógica de negocio permanece completamente separada de la interfaz.

---

# Metodología de desarrollo

El proyecto sigue una metodología basada en bloques completos.

Cada nueva funcionalidad se desarrolla en este orden:

1. Diseño funcional.
2. Componentes.
3. Formularios.
4. Servicios.
5. Cálculos.
6. Context.
7. Integración.
8. Persistencia.
9. Pruebas.
10. Refactorización.

La integración siempre es el último paso.

No se implementan funcionalidades apoyándose en componentes incompletos, imports inexistentes o código preparado "para más adelante".

Cada bloque debe quedar completamente funcional antes de comenzar el siguiente.

---

# Filosofía del proyecto

NummoPlan sigue una arquitectura inspirada en Clean Architecture.

- Los componentes únicamente renderizan información.
- Los Context almacenan el estado.
- Toda la lógica vive en `src/domain`.
- Las páginas coordinan la interfaz.
- Los cálculos permanecen separados de la presentación.

El objetivo es mantener un código limpio, reutilizable y preparado para crecer durante años.

---

# Diferenciación respecto a otras aplicaciones

NummoPlan no pretende sustituir a un banco.

Pretende convertirse en un asistente financiero.

Mientras una aplicación bancaria muestra movimientos, NummoPlan ayuda a comprender qué significan esos movimientos y cómo afectan al patrimonio presente y futuro.

La aplicación evolucionará hacia un ecosistema completamente conectado donde:

- comprar una inversión generará automáticamente un gasto
- vender una inversión generará un ingreso
- cobrar dividendos actualizará Balance
- pagar una deuda registrará automáticamente un movimiento
- los inmuebles generarán ingresos y gastos automáticamente

Todo ello permitirá obtener un análisis financiero unificado.

---

# Persistencia

Actualmente utilizan LocalStorage:

- Objetivos
- Patrimonio
- Deudas
- Balance

En el futuro podrá sustituirse por sincronización en la nube sin modificar la arquitectura.

---

# Responsive

La aplicación sigue una estrategia Mobile First.

El desarrollo funcional tiene prioridad.

Una vez finalizada cada funcionalidad se realiza una revisión completa de:

- móvil
- tablet
- escritorio

---

# Instalación

```bash
npm install
npm run dev
```

---

# Documentación

El proyecto dispone de documentación interna para facilitar su mantenimiento.

- ProjectStatus.md
- RoadMap.md
- Decisions.md
- PROJECT_ARCHITECTURE.md
- AI_INSTRUCTIONS.md

---

# Estado actual

Actualmente NummoPlan dispone de:

- Arquitectura consolidada
- Componentes reutilizables
- Persistencia local
- Objetivos funcionales
- Patrimonio funcional
- Deudas funcionales
- Desarrollo avanzado del módulo Balance

La siguiente gran fase consiste en finalizar Balance y comenzar la integración automática entre todos los módulos.

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

El objetivo final es convertir NummoPlan en un asistente financiero personal capaz de ayudar al usuario a comprender y mejorar su situación económica mediante análisis inteligentes y una visión global de todo su patrimonio.