# 🧠 Decisiones de arquitectura

## General

- Un Context por módulo.
- Toda la lógica vive en domain.
- Los componentes únicamente renderizan datos.
- Nunca calcular dentro de las Cards.

---

## Organización

Cada módulo debe contener:

- Form
- Card
- Detail
- SummaryCard
- InfoCard
- HistoryCard

Siempre que sea necesario.

---

## Servicios

Cada módulo tiene su propio Service.

Ejemplos:

- goalService
- investmentService
- debtService

Responsabilidades:

- Crear
- Actualizar
- Eliminar
- Registrar movimientos

---

## Cálculos

Todos los cálculos viven separados.

Ejemplos:

- investmentCalculations
- debtCalculations

Nunca repetir cálculos entre componentes.

---

## Componentes reutilizables

Se reutilizan siempre que sea posible:

- PageHeader
- ActionMenu
- PrimaryButton
- Modal
- ConfirmModal
- EmptyState
- ClickableCardHeader

---

## Dashboard

El Dashboard será el último módulo en desarrollarse.

Su función será únicamente consumir información del resto de módulos.

Nunca contendrá lógica de negocio propia.

---

## Prioridades

Orden de desarrollo:

1. Arquitectura
2. Funcionalidad
3. Reutilización
4. Optimización
5. Diseño final

---

## Diseño

Durante el desarrollo se prioriza terminar funcionalidades.

La fase visual llegará una vez todos los módulos estén terminados.

Esto evita rehacer componentes varias veces.


## Patrimonio

- Las inversiones se modelan mediante movimientos (buy, sell, dividend).
- El precio actual es independiente del precio medio de compra.
- El detalle de inversión centraliza las operaciones principales.

## Persistencia

Pendiente de migrar todos los Context a localStorage mediante un helper común.