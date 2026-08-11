📌 ProjectStatus

Estado actualizado del proyecto NummoPlan.

Estado general

Módulo

Estado

🎯 Objetivos

✅ Funcional

💼 Patrimonio

✅ Funcional

💳 Deudas

✅ Funcional

⚖️ Balance

🚧 En desarrollo / integración y validación

🏠 Inmuebles

⏳ Pendiente

📱 Responsive

🚧 Pendiente de revisión

📊 Dashboard

⏳ Pendiente

⚙️ Ajustes

⏳ Pendiente

Metodología de desarrollo

A partir del desarrollo del módulo Balance todo el proyecto seguirá la siguiente metodología.

Desarrollo por bloques completos

Cada funcionalidad se desarrollará como un bloque completo.

Antes de comenzar la integración deberán estar terminados todos los archivos que forman parte de la feature.

Ejemplo:

Balance

Context

Service

Calculations

Componentes

Formularios

Modales

Cards

Hooks

Utilidades

Solo cuando todas las piezas estén terminadas comenzará la integración.

Orden obligatorio

Toda funcionalidad seguirá siempre este orden.

Diseño funcional.

Componentes.

Formularios.

Servicios.

Cálculos.

Context.

Integración.

Persistencia.

Pruebas.

Refactorización.

Integración

La integración siempre será el último paso.

Nunca se desarrollarán componentes apoyándose en:

imports inexistentes

funciones aún no implementadas

estados provisionales

componentes vacíos

código preparado para el futuro

Desarrollo guiado

Antes de modificar cualquier archivo deberán comprobarse todas sus dependencias.

No se desarrollará nunca "a ciegas".

Cada bloque deberá quedar completamente operativo antes de comenzar el siguiente.

UX

El desarrollo se divide en dos fases.

Fase funcional

Conseguir que toda la funcionalidad funcione.

Fase UX

Posteriormente se mejorarán:

validaciones

experiencia de usuario

diseño visual

accesibilidad

animaciones

simplificación de formularios

Todas las mejoras detectadas durante el desarrollo funcional quedarán anotadas para esta fase.

🎯 Objetivos

Estado:

✅ Funcional

Incluye:

CRUD completo

Página detalle

Historial de aportaciones

Barra de progreso

SummaryCard

InfoCard

HistoryCard

Persistencia mediante LocalStorage

Arquitectura modular

Pendiente:

Adaptación responsive completa

Integración con Dashboard

💼 Patrimonio

Estado:

✅ Funcional

Incluye:

CRUD completo

Compra inicial

Compras posteriores

Venta de participaciones

Registro de dividendos

Actualización del valor de mercado

Precio medio automático

Histórico de movimientos

Histórico de precios

Gráfica individual

Página detalle

SummaryCard

InfoCard

HistoryCard

Persistencia mediante LocalStorage

Pendiente:

Adaptación responsive completa

Integración automática con Balance

Integración con Dashboard

💳 Deudas

Estado:

✅ Funcional

Incluye:

CRUD completo

Registro de pagos

Barra de progreso

Indicador de deuda liquidada

Página detalle

SummaryCard

InfoCard

HistoryCard

DebtProgressGauge

Persistencia mediante LocalStorage

Responsive mejorado

Pendiente:

Integración automática con Balance

Adaptación responsive final

Integración con Dashboard

⚖️ Balance

Estado:

🚧 En desarrollo / integración y validación

Base completada

Arquitectura del módulo

BalanceContext

balanceService

balanceCalculations

Persistencia mediante LocalStorage

Modelo de datos

BalanceSummaryCard

TransactionsHistory / actividad reciente

RecurringIncomeCard

RecurringIncomeModal

RecurringExpenseCard

RecurringExpenseModal

MovementModal

MonthlyInsightsCard

MonthlySavingsChart

AccumulatedSavingsChart

ExpenseBreakdownSummaryCard

Página de detalle mensual (BalanceDetail)

Comparación con el mes anterior

Tasa de ahorro

Meta de ahorro mensual

Insights del mes

Distribución de gastos por categoría mediante gráfico circular/donut

Filtros de actividad: todos, manuales y recurrentes

Implementado en código y pendiente de validación final

Flujo completo de creación y edición de movimientos desde MovementModal

Navegación entre meses con actividad

Visualización detallada de la actividad mensual

Posicionamiento del tooltip del gráfico de gastos alrededor del sector seleccionado

Adaptación responsive de la página de detalle y sus bloques principales

Pendiente

Estadísticas anuales

Dinero disponible para invertir

Pie Chart de ingresos

Evolución específica del gasto

Etiquetas de movimientos

Buscador de movimientos

Integración automática con Patrimonio

Integración automática con Deudas

Integración automática con Inmuebles

Dashboard

Mejoras UX detectadas

Se implementarán una vez el módulo sea completamente funcional.

Mejor selector del día de cobro.

Resolver automáticamente meses con menos días.

Rediseñar el selector de pagas extraordinarias.

Validaciones del formulario.

Mejor flujo de creación de movimientos.

Revisión responsive final del módulo.

🏠 Inmuebles

Estado:

⏳ Pendiente

Planificado:

CRUD completo

Valor de mercado

Hipoteca asociada

Gastos asociados

Rentabilidad

Histórico de valor

Integración con Balance

Integración con Dashboard

📱 Responsive

Estado:

🚧 Pendiente de revisión global

Completado parcialmente:

MainLayout

Sidebar

Modal

PrimaryButton

PageHeader

Pendiente:

Revisión completa de Objetivos

Revisión completa de Balance

Revisión completa de Patrimonio

Revisión completa de Deudas

Inmuebles

Dashboard

Ajustes

Optimización para tablets

La revisión responsive se realizará cuando cada módulo esté funcionalmente terminado.

📊 Dashboard

Estado:

⏳ Pendiente

Se desarrollará cuando todos los módulos estén finalizados.

Consumirá información de:

Objetivos

Patrimonio

Deudas

Balance

Inmuebles

Nunca contendrá lógica de negocio.

Arquitectura

Todos los módulos siguen el mismo flujo.

Usuario

↓

Página

↓

Componentes

↓

Context

↓

Service

↓

Calculations

↓

Persistencia

Cada capa posee una única responsabilidad.

Persistencia

Actualmente utilizan LocalStorage:

Objetivos

Patrimonio

Deudas

Balance

Todos los módulos futuros seguirán el mismo sistema hasta la incorporación de sincronización en la nube.

Próximo objetivo

Orden de desarrollo actual.

Completar funcionalmente Balance.

Revisar UX completa de Balance.

Revisar Responsive de todos los módulos.

Desarrollar Inmuebles.

Construir Dashboard inteligente.

Completar Ajustes.

Interconectar automáticamente todos los módulos.

Visión del producto

NummoPlan no pretende ser únicamente un registro de movimientos.

Su objetivo es convertirse en un asistente financiero que ayude al usuario a comprender cómo afectan sus decisiones a su patrimonio.

Los análisis deberán responder preguntas como:

¿Cuánto ahorro realmente?

¿Cuánto puedo invertir?

¿Qué gastos crecen más rápido?

¿Qué porcentaje de mis ingresos está comprometido?

¿Qué decisiones frenan más mi patrimonio?

¿Estoy mejor que el mes pasado?

Estado del MVP

Actualmente NummoPlan dispone de:

Arquitectura consolidada.

Componentes reutilizables.

Persistencia local.

Objetivos funcionales.

Patrimonio funcional.

Deudas funcionales.

Base del módulo Balance prácticamente completada.

La siguiente gran fase consiste en cerrar la validación funcional y UX de Balance y después avanzar hacia la interconexión automática entre todos los módulos.