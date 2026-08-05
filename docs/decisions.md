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

No todos los módulos necesitan obligatoriamente todos los componentes, pero cuando existan deberán mantener la misma nomenclatura.

---

## Servicios

Cada módulo dispone de su propio Service.

Ejemplos:

- goalService
- investmentService
- debtService
- balanceService

Responsabilidades:

- Crear
- Actualizar
- Eliminar
- Registrar movimientos
- Modificar el estado del módulo

Toda modificación de datos debe realizarse desde su Service correspondiente.

---

## Cálculos

Todos los cálculos viven separados de la interfaz.

Ejemplos:

- investmentCalculations
- debtCalculations
- balanceCalculations

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
- EmptyState

El objetivo es mantener una interfaz homogénea en toda la aplicación.

Antes de crear un componente nuevo debe comprobarse si alguno existente puede reutilizarse.

---

# Estados vacíos

Todos los módulos deben ofrecer un estado inicial limpio cuando todavía no existan datos.

Debe utilizarse siempre el componente `EmptyState`.

La filosofía es evitar pantallas vacías o saturadas.

Cada módulo debe explicar al usuario:

- qué representa esa sección
- por qué todavía no hay información
- cuál es el siguiente paso recomendado

---

# Patrimonio

Las inversiones se modelan mediante movimientos.

Actualmente existen cuatro tipos:

- buy
- sell
- dividend
- updateValue

El precio actual es independiente del precio medio de compra.

El precio medio:

- aumenta con nuevas compras
- nunca cambia con ventas
- nunca cambia con dividendos

Toda la operativa principal se realiza desde el detalle de la inversión.

En el futuro las operaciones repercutirán automáticamente sobre el módulo Balance.

---

# Balance

Balance constituye el centro financiero de NummoPlan.

No debe entenderse como un simple registro de ingresos y gastos.

Su objetivo es explicar al usuario qué está ocurriendo con su dinero.

El modelo de datos se basa en:

- movimientos
- ingresos recurrentes

No existe el concepto de "salario".

Un ingreso recurrente puede representar:

- nómina
- pensión
- alquiler recibido
- negocio
- prestación
- cualquier ingreso periódico

Esta decisión permite soportar cualquier perfil de usuario sin modificar la arquitectura.

En el futuro Balance recibirá automáticamente movimientos procedentes de:

- Patrimonio
- Deudas
- Objetivos
- Inmuebles

---

# Dashboard

El Dashboard será uno de los últimos módulos en desarrollarse.

Su única función será consumir información del resto de módulos.

Nunca contendrá lógica de negocio propia.

Su objetivo será mostrar un resumen financiero global.

---

# Persistencia

Actualmente utilizan LocalStorage:

- Objetivos
- Patrimonio
- Deudas
- Balance

Todos los módulos nuevos deberán utilizar el mismo sistema mediante las utilidades comunes:

- loadData()
- saveData()

No debe accederse directamente a LocalStorage desde los Context.

---

# Responsive

La aplicación se desarrolla siguiendo una estrategia Mobile First.

Todas las nuevas funcionalidades deberán diseñarse pensando primero en:

- móvil
- tablet
- escritorio

Se evitará rehacer componentes posteriormente.

La adaptación responsive forma parte del desarrollo de cada módulo y no de una fase posterior.

---

# Diseño

Durante el desarrollo se prioriza completar funcionalidades.

El diseño visual se perfecciona una vez los módulos son funcionales.

Esto evita rehacer componentes varias veces.

La interfaz debe transmitir simplicidad y claridad.

Se evitarán pantallas sobrecargadas.

---

# Gráficas

Las gráficas deben trabajar siempre sobre históricos persistentes.

Nunca representarán únicamente el estado actual.

Esto permitirá mostrar correctamente la evolución financiera del usuario a lo largo del tiempo.

---

# Inteligencia financiera

NummoPlan debe diferenciarse de una aplicación bancaria tradicional.

Su objetivo no es únicamente almacenar información.

Debe ayudar al usuario a tomar decisiones.

Los análisis inteligentes deberán responder preguntas como:

- ¿Cuánto dinero necesitas realmente para vivir?
- ¿Qué gastos podrías reducir sin afectar a tu calidad de vida?
- ¿Cuánto podrías invertir cada mes?
- ¿Qué porcentaje de tus ingresos ya está comprometido?
- ¿Qué categoría está creciendo demasiado rápido?
- ¿Qué decisiones están frenando más tu patrimonio?

Las recomendaciones evolucionarán conforme aumente la información registrada.

---

# Integración entre módulos

Los módulos deben diseñarse para poder comunicarse entre sí.

En futuras versiones:

- pagar una deuda afectará automáticamente a Balance
- cobrar un dividendo generará un ingreso en Balance
- comprar participaciones registrará un gasto
- vender participaciones registrará un ingreso
- alcanzar un objetivo modificará el Dashboard
- los inmuebles repercutirán sobre Balance y Patrimonio cuando corresponda

Cada módulo continuará siendo independiente, pero compartirá información mediante sus Services.

---

# Filosofía del proyecto

NummoPlan busca convertirse en un asistente financiero personal.

No pretende sustituir a un banco.

Pretende ayudar al usuario a comprender mejor su situación económica y a tomar mejores decisiones.

Las decisiones técnicas priorizan siempre:

- Arquitectura
- Escalabilidad
- Código limpio
- Reutilización
- Mantenibilidad
- Experiencia de usuario