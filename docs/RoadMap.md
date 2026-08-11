🛣 RoadMap

El desarrollo de NummoPlan se organiza en fases para construir una aplicación sólida, escalable y centrada en ayudar al usuario a tomar mejores decisiones financieras.

📐 Metodología de desarrollo

Todas las fases de NummoPlan deberán seguir las siguientes reglas de desarrollo.

Desarrollo por bloques completos

Cada funcionalidad se desarrollará como un bloque completo.

Ejemplo:

Balance

Context

Service

Calculations

Componentes

Modales

Formularios

Hooks

Utilidades

Si una funcionalidad necesita 30 archivos para funcionar, primero deberán estar creados y terminados esos 30 archivos antes de comenzar su integración.

No se implementarán funcionalidades sobre componentes incompletos.

Orden obligatorio de desarrollo

Cada feature seguirá siempre este orden:

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

No se alterará este orden salvo que exista un error crítico.

Integración

La integración siempre será el último paso de una feature.

No se conectarán componentes a Context, Services o cálculos que aún no estén completamente terminados.

No se añadirán imports, estados o funciones cuya dependencia todavía no exista.

Refactorización

No se reorganizarán carpetas, componentes o imports mientras una funcionalidad no esté completamente operativa.

Toda refactorización se realizará una vez el flujo completo funcione de principio a fin.

Experiencia de usuario

La UX se desarrollará una vez la funcionalidad esté terminada.

Primero:

funcionamiento

Después:

validaciones

accesibilidad

mejoras visuales

animaciones

optimización del flujo

No se interrumpirá el desarrollo funcional para mejorar la interfaz salvo que exista un problema grave de usabilidad.

Desarrollo guiado

Antes de modificar cualquier archivo se revisarán todas las dependencias necesarias.

No se desarrollará "a ciegas".

Si una funcionalidad depende de archivos aún no terminados, se detendrá la implementación hasta completar dichas dependencias.

Cada paso del desarrollo deberá dejar una funcionalidad estable y completamente operativa antes de continuar con la siguiente.

Fase 1 · Núcleo financiero

🎯 Objetivos

CRUD

Página de detalle

Historial

Barra de progreso

Menú contextual

Persistencia LocalStorage

Responsive

💼 Patrimonio

CRUD

Compra inicial

Compras posteriores

Venta de participaciones

Registro de dividendos

Precio medio automático

Actualización del valor de mercado

Histórico de movimientos

Histórico de precios

Gráfica individual

Página de detalle

Persistencia LocalStorage

Responsive

💳 Deudas

Context

Service

Calculations

CRUD

Registro de pagos

Página de detalle

SummaryCard

InfoCard

HistoryCard

Persistencia LocalStorage

Responsive

Fase 2 · Balance financiero

Este módulo será el centro de control económico del usuario.

💶 Balance

Base

Context

Service

Calculations

BalanceSummaryCard

RecurringIncomeCard

RecurringIncomeModal

RecurringExpenseCard

RecurringExpenseModal

MovementModal

TransactionsHistory / actividad reciente

MonthlyInsightsCard

MonthlySavingsChart

AccumulatedSavingsChart

ExpenseBreakdownSummaryCard

Página de detalle mensual

Ingresos recurrentes

Ingresos recurrentes

Día habitual de cobro

Pagas extraordinarias

Otros ingresos periódicos

Frecuencias mensual, quincenal, trimestral y anual

Movimientos

Registrar ingresos

Registrar gastos

Categorías

Historial

Filtros

Etiquetas

Buscador

Estadísticas

Balance mensual

Balance anual

Tasa de ahorro

Dinero disponible para invertir

Evolución mensual del ahorro

Comparación entre meses

Visualizaciones

Pie Chart / donut de gastos

Pie Chart de ingresos

Evolución del ahorro

Evolución específica del gasto

Distribución por categorías

Insights inteligentes

Categoría que más crece

Suscripciones

Gasto en caprichos

Gasto imprescindible

Ahorro potencial

Capacidad de inversión

Insights mensuales básicos

Recomendaciones automáticas avanzadas

Detalle mensual

Navegación entre meses con actividad

Comparación con el mes anterior

Meta de ahorro mensual

Actividad mensual completa

Filtro de movimientos manuales y recurrentes

Distribución detallada de gastos por categoría

Insights del mes

Validación y UX

Validación funcional final en navegador

Revisión responsive final

Validaciones de formularios

Mejoras de UX detectadas durante el desarrollo

Fase 3 · Inmuebles

🏠 Inmuebles

Context

Service

Calculations

CRUD

Página de detalle

Historial

Gastos

Ingresos por alquiler

Hipoteca

Rentabilidad

Revalorización

Persistencia

Responsive

Fase 4 · Interconexión entre módulos

Una vez todos los módulos funcionen de forma independiente comenzará la integración automática.

Balance ← resto de módulos

Dividendos → ingresos

Compra de inversiones → gasto

Venta de inversiones → ingreso

Pago de deudas → gasto

Rentas inmobiliarias → ingreso

Gastos de inmuebles → gasto

Dashboard ← todos los módulos

Patrimonio neto

Objetivos

Balance

Deudas

Inmuebles

Distribución patrimonial

Evolución financiera

Alertas

Indicadores principales

Fase 5 · Inteligencia financiera

Esta fase convertirá NummoPlan en un asistente financiero personal.

Análisis

¿Cuánto dinero necesito realmente para vivir?

¿Qué gastos puedo reducir?

¿Qué porcentaje del salario está comprometido?

¿Cuánto podría invertir cada mes?

¿Qué categoría está creciendo demasiado?

¿Dónde estoy perdiendo dinero?

Comparación con meses anteriores

Predicción del ahorro anual

Simuladores

FIRE

Jubilación

Independencia financiera

Proyección patrimonial

Simulador de inversiones

Fase 6 · Plataforma

Exportación

Copias de seguridad

Sincronización en la nube

Multi-dispositivo

Notificaciones

Configuración avanzada

Temas visuales

API pública