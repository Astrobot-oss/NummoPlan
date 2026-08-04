# 🧠 Decisiones de arquitectura

## Arquitectura general

- Un Context por módulo.
- Toda la lógica de negocio vive en `src/domain`.
- Los componentes únicamente renderizan información.
- Las páginas coordinan la interfaz.
- Nunca realizar cálculos dentro de las Cards.

---

## Organización de módulos

Cada módulo debe seguir la misma estructura siempre que sea necesario:

- Form
- Card
- Detail
- SummaryCard
- InfoCard
- HistoryCard

Esto mantiene la aplicación consistente y facilita el mantenimiento.

---

## Servicios

Cada módulo dispone de su propio Service.

Ejemplos:

- goalService
- investmentService
- debtService

Responsabilidades:

- Crear
- Actualizar
- Eliminar
- Registrar movimientos
- Modificar el estado del módulo

---

## Cálculos

Todos los cálculos viven separados de la interfaz.

Ejemplos:

- investmentCalculations
- debtCalculations

Nunca se repiten cálculos entre componentes.

---

## Componentes reutilizables

Siempre que sea posible se reutilizan:

- PageHeader
- PrimaryButton
- Modal
- ConfirmModal
- EmptyState
- ActionMenu
- ClickableCardHeader

El objetivo es mantener una interfaz homogénea en toda la aplicación.

---

# Patrimonio

Las inversiones se modelan mediante movimientos.

Actualmente existen tres tipos:

- buy
- sell
- dividend

El precio actual es independiente del precio medio de compra.

El precio medio:

- aumenta con nuevas compras.
- nunca cambia con ventas.
- nunca cambia con dividendos.

Toda la operativa principal se realiza desde el detalle de la inversión.

---

# Persistencia

Actualmente utilizan LocalStorage:

- Objetivos
- Patrimonio

El resto de módulos utilizarán el mismo sistema hasta una futura sincronización en la nube.

---

# Responsive

Se ha decidido adaptar completamente la aplicación a dispositivos móviles antes de continuar desarrollando nuevos módulos.

Todos los componentes nuevos deberán diseñarse pensando primero en:

- móvil
- tablet
- escritorio

Se evitará rehacer componentes posteriormente.

---

# Dashboard

El Dashboard será uno de los últimos módulos en desarrollarse.

Su única función será consumir información del resto de módulos.

Nunca contendrá lógica de negocio propia.

Esto evita modificar continuamente el Dashboard conforme aparecen nuevos módulos.

---

# Prioridades de desarrollo

Orden actual del proyecto:

1. Arquitectura
2. Funcionalidad
3. Compatibilidad móvil
4. Reutilización
5. Optimización
6. Diseño final

---

# Diseño

Durante el desarrollo se prioriza completar funcionalidades.

El diseño visual se perfecciona una vez los módulos son funcionales.

Esto evita rehacer componentes varias veces.

---

# Gráficas

Las gráficas deben trabajar siempre sobre históricos persistentes.

Nunca representarán únicamente el estado actual.

Esto permitirá mostrar correctamente la evolución financiera del usuario a lo largo del tiempo.

---

# Filosofía del proyecto

NummoPlan busca ser una aplicación sencilla de utilizar pero con una arquitectura escalable.

Las decisiones técnicas priorizan:

- Código limpio.
- Reutilización.
- Escalabilidad.
- Facilidad de mantenimiento.
- Separación entre lógica y presentación.