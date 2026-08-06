# 🧠 Decisiones de arquitectura

# Arquitectura general

- Un Context por módulo.
- Toda la lógica de negocio vive en `src/domain`.
- Los componentes únicamente renderizan información.
- Las páginas coordinan la interfaz.
- Nunca realizar cálculos dentro de las Cards.
- Cada módulo debe ser completamente independiente.
- Toda modificación de datos debe pasar siempre por su Service correspondiente.

---

# Metodología de desarrollo

## Desarrollo por bloques completos

Toda funcionalidad deberá desarrollarse como un bloque completo.

Antes de comenzar la integración de una feature deberán existir y estar terminados todos los archivos que la componen.

Ejemplo:

Balance

- Context
- Service
- Calculations
- Cards
- Detail
- Modales
- Formularios
- Hooks
- Utilidades

Si una funcionalidad necesita 30 archivos para funcionar, primero deberán completarse esos 30 archivos.

Solo entonces comenzará la integración.

Queda prohibido implementar funcionalidades apoyándose en componentes incompletos o provisionales.

---

## Orden obligatorio de desarrollo

Toda feature seguirá siempre este orden:

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

No se alterará este orden salvo que exista un error crítico.

---

## Integración

La integración siempre será el último paso.

Nunca deberán añadirse:

- imports de archivos aún no terminados
- llamadas a funciones inexistentes
- estados sin uso
- componentes provisionales
- código "para más adelante"

Si una dependencia no está terminada, primero deberá completarse.

---

## Desarrollo guiado

Antes de modificar cualquier archivo deberán revisarse todas sus dependencias.

No se desarrollará nunca "a ciegas".

Si una funcionalidad depende de componentes, formularios, servicios o cálculos aún incompletos, se detendrá el desarrollo hasta terminarlos.

El objetivo es evitar volver continuamente sobre los mismos archivos para parchearlos.

---

## Confirmación de cada bloque

Nunca se asumirá que un paso ya está realizado.

Antes de continuar deberá comprobarse que:

- el código existe
- compila correctamente
- funciona
- el usuario confirma que el bloque está terminado

Solo entonces podrá comenzarse el siguiente bloque.

---

## Refactorización

No se reorganizarán carpetas, componentes o imports mientras una funcionalidad no esté completamente terminada.

Toda refactorización se realizará únicamente cuando el flujo completo funcione de principio a fin.

---

## UX

El desarrollo se divide en dos fases claramente diferenciadas.

### Fase 1

Conseguir que toda la funcionalidad funcione correctamente.

### Fase 2

Mejorar:

- validaciones
- accesibilidad
- experiencia de usuario
- diseño visual
- animaciones
- optimización del flujo
- simplificación de formularios

No se interrumpirá el desarrollo funcional para realizar mejoras visuales salvo que exista un problema crítico de usabilidad.

Todas las mejoras detectadas durante el desarrollo deberán anotarse para implementarlas durante esta fase.

---

# Organización de módulos

Cada módulo debe seguir la misma estructura siempre que sea necesario:

- Form
- Card
- Detail
- SummaryCard
- InfoCard
- HistoryCard

No todos los módulos necesitan todos los componentes.

Cuando existan deberán mantener la misma nomenclatura para conservar una arquitectura homogénea.

---

# Servicios

Cada módulo dispone de su propio Service.

Ejemplos:

- goalService
- investmentService
- debtService
- balanceService

Responsabilidades:

- crear
- actualizar
- eliminar
- registrar movimientos
- modificar el estado del módulo

Toda modificación de datos debe realizarse exclusivamente desde su Service.

---

# Cálculos

Todos los cálculos viven separados de la interfaz.

Ejemplos:

- investmentCalculations
- debtCalculations
- balanceCalculations

Nunca se repetirán cálculos entre componentes.

Toda lógica matemática deberá centralizarse en los archivos de cálculo correspondientes.

---

# Componentes reutilizables

Siempre que sea posible deberán reutilizarse:

- PageHeader
- PrimaryButton
- Modal
- ConfirmModal
- EmptyState
- ActionMenu
- ClickableCardHeader

Antes de crear un componente nuevo deberá comprobarse si alguno existente puede reutilizarse.

El objetivo es mantener una interfaz homogénea en toda la aplicación.

---

# Estados vacíos

Todos los módulos deberán ofrecer un estado inicial limpio cuando todavía no existan datos.

Siempre deberá utilizarse `EmptyState`.

Cada estado vacío deberá explicar:

- qué representa la sección
- por qué todavía no hay información
- cuál es el siguiente paso recomendado

Nunca deberán existir pantallas vacías.

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

En futuras versiones las operaciones repercutirán automáticamente sobre Balance.

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

En futuras versiones Balance recibirá automáticamente movimientos procedentes de:

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

Todos los módulos deberán utilizar las utilidades comunes:

- loadData()
- saveData()

No deberá accederse directamente a LocalStorage desde los Context.

---

# Responsive

La aplicación se desarrolla siguiendo una estrategia Mobile First.

Todas las funcionalidades deberán diseñarse pensando primero en:

- móvil
- tablet
- escritorio

La adaptación responsive forma parte del desarrollo de cada componente.

---

# Diseño

Durante el desarrollo se prioriza completar funcionalidades.

El diseño visual se perfeccionará posteriormente durante la fase de UX.

La interfaz debe transmitir:

- simplicidad
- claridad
- rapidez
- sensación de control

Se evitarán pantallas sobrecargadas.

---

# Gráficas

Las gráficas deberán trabajar siempre sobre históricos persistentes.

Nunca representarán únicamente el estado actual.

Esto permitirá mostrar correctamente la evolución financiera del usuario.

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

Los módulos deberán diseñarse para poder comunicarse entre sí.

En futuras versiones:

- pagar una deuda afectará automáticamente a Balance
- cobrar un dividendo generará un ingreso en Balance
- comprar participaciones registrará un gasto
- vender participaciones registrará un ingreso
- alcanzar un objetivo modificará el Dashboard
- los inmuebles repercutirán sobre Balance y Patrimonio cuando corresponda

Cada módulo continuará siendo independiente, compartiendo información mediante sus Services.

---

# Filosofía del proyecto

NummoPlan busca convertirse en un asistente financiero personal.

No pretende sustituir a un banco.

Pretende ayudar al usuario a comprender mejor su situación económica y a tomar mejores decisiones.

Todas las decisiones técnicas deberán priorizar siempre:

- Arquitectura
- Escalabilidad
- Código limpio
- Reutilización
- Mantenibilidad
- Experiencia de usuario
- Desarrollo ordenado
- Integración únicamente sobre funcionalidades completas