# 🤖 AI_INSTRUCTIONS.md

Este documento describe la forma de trabajar durante el desarrollo de **NummoPlan**.

Debe utilizarse junto con:

* README.md
* ProjectStatus.md
* RoadMap.md
* Decisions.md

Si existe alguna contradicción entre documentos, prevalecerá el contenido de **Decisions.md**.

---

# Objetivo del proyecto

NummoPlan es una aplicación de planificación financiera personal cuyo objetivo es centralizar toda la información económica del usuario.

El proyecto prioriza:

* código limpio
* arquitectura escalable
* reutilización
* simplicidad de uso
* compatibilidad móvil

NummoPlan **no debe comportarse como una aplicación bancaria**. El objetivo es ayudar al usuario a comprender, planificar y mejorar su situación financiera mediante análisis, proyecciones y recomendaciones útiles.

---

# Filosofía del producto

La aplicación debe responder preguntas reales como:

* ¿Cuánto dinero necesito realmente para vivir?
* ¿Qué gastos podría eliminar sin afectar a mi calidad de vida?
* ¿Cuánto podría invertir cada mes?
* ¿Qué porcentaje de mis ingresos ya está comprometido?
* ¿Cuánto dinero pierdo en suscripciones?
* ¿Qué categoría está creciendo demasiado rápido?
* ¿Cuánto gasto en necesidades frente a caprichos?
* ¿Qué decisiones están frenando más mi patrimonio?

Cada módulo debe aportar **información accionable**, no solo almacenar datos.

---

# Forma de trabajar

El usuario **no sabe programar**.

Por tanto, todas las explicaciones deben asumir ese contexto.

Nunca se debe responder con instrucciones ambiguas como:

* “añade esto”
* “cambia aquello”

Siempre debe indicarse exactamente dónde realizar cada modificación.

---

# Cómo entregar modificaciones

## Cambios pequeños

Cuando un cambio afecte únicamente a unas pocas líneas:

Siempre indicar:

### Archivo

Ejemplo

```
Archivo:

src/features/investments/InvestmentDetail.jsx
```

### Lugar exacto

Ejemplos

* Busca este bloque.
* Justo debajo pega esto.
* Sustituye este código.
* Elimina este bloque.
* Añade este import al principio.

Nunca asumir que el usuario sabe dónde pegar el código.

---

## Cambios grandes

Cuando un archivo cambie de forma importante:

Devolver siempre el archivo completo listo para sustituir.

No devolver únicamente fragmentos si el cambio afecta a gran parte del archivo.

---

# Arquitectura

Debe respetarse siempre la arquitectura existente.

La lógica de negocio vive exclusivamente en:

```
src/domain
```

Los componentes únicamente renderizan información.

Los Context únicamente gestionan el estado.

No mover lógica a componentes salvo petición expresa.

---

# Organización de módulos

Cada módulo seguirá, siempre que sea necesario, esta estructura:

* Form
* Card
* Detail
* SummaryCard
* InfoCard
* HistoryCard

---

# Reutilización

Antes de crear un componente nuevo comprobar siempre si ya existe uno reutilizable.

Priorizar el uso de:

* Modal
* PrimaryButton
* PageHeader
* EmptyState
* ActionMenu
* ClickableCardHeader

Evitar duplicar componentes.

---

# Cálculos

Nunca repetir cálculos.

Todos los cálculos deben vivir dentro de:

```
src/domain
```

Ejemplos:

* investmentCalculations
* debtCalculations
* balanceCalculations

---

# Servicios

Cada módulo tendrá un único Service responsable de:

* crear
* actualizar
* eliminar
* registrar movimientos

Ejemplos:

* goalService
* investmentService
* debtService
* balanceService

---

# Context

Cada módulo dispone de su propio Context.

Los Context únicamente almacenan estado.

No contienen lógica de negocio.

---

# Persistencia

Actualmente la aplicación utiliza LocalStorage mediante las utilidades comunes:

```
src/utils/storage.js
```

Los nuevos módulos deberán usar siempre `loadData` y `saveData` en lugar de acceder directamente a `localStorage`.

---

# Responsive

La prioridad actual del proyecto es adaptar completamente la aplicación para móviles y tablets.

Todas las nuevas funcionalidades deben diseñarse pensando primero en:

* móvil
* tablet
* escritorio

Evitar rehacer componentes posteriormente.

---

# Estados vacíos

Todos los módulos deben mantener una experiencia coherente cuando no existan datos.

Un estado vacío debe incluir:

* icono representativo
* título claro
* descripción breve
* un único CTA principal

No mostrar paneles vacíos ni tablas sin contenido.

---

# Dashboard

El Dashboard será uno de los últimos módulos del proyecto.

No contendrá lógica propia.

Únicamente consumirá información de:

* Objetivos
* Patrimonio
* Deudas
* Inmuebles
* Balance

El Dashboard actuará como un resumen inteligente del resto de módulos.

---

# Módulo Balance

Balance es el **centro financiero** de NummoPlan.

No debe entenderse como una simple sección de ingresos y gastos.

## Estructura prevista

1. Resumen del mes
2. Ingresos recurrentes
3. Registrar movimiento
4. Historial de movimientos
5. Gráficos
6. Análisis inteligentes

## Ingresos recurrentes

El concepto “salario” se sustituye por **ingresos recurrentes**, permitiendo registrar:

* nómina
* pensión
* alquiler recibido
* negocio
* prestación
* beca
* cualquier ingreso periódico

Modelo base:

```js
recurringIncome: [
  {
    id,
    name,
    amount,
    frequency,
    payDay,
    active,
  },
];
```

## Integraciones futuras

Los movimientos creados en:

* Patrimonio
* Deudas
* Objetivos
* Inmuebles

deberán repercutir automáticamente en Balance.

## Análisis inteligentes

Balance deberá generar recomendaciones progresivas.

### Nivel 1

Comparativas simples.

### Nivel 2

Tendencias por categorías.

### Nivel 3

Recomendaciones financieras.

### Nivel 4

Análisis global combinando todos los módulos.

Ejemplos:

* “Este mes has ahorrado un 12 % más.”
* “El 41 % de tus ingresos ya está comprometido.”
* “Podrías invertir 320 € al mes.”
* “La alimentación ha aumentado un 18 %.”

---

# Calidad del código

Prioridades:

1. Arquitectura
2. Funcionalidad
3. Compatibilidad móvil
4. Reutilización
5. Optimización
6. Diseño

Nunca sacrificar arquitectura por rapidez.

---

# Propuestas

El asistente puede proponer:

* mejoras de arquitectura
* mejoras de rendimiento
* mejoras de UX
* simplificaciones

Pero no debe implementarlas directamente sin explicarlas primero.

---

# Documentación

Cuando se complete una fase importante del proyecto, recordar actualizar:

* README.md
* ProjectStatus.md
* RoadMap.md
* Decisions.md

---

# Comunicación

Las respuestas deben ser claras.

Siempre indicar:

* archivo
* lugar exacto
* código a sustituir
* código nuevo

Si un cambio afecta a varios archivos, enumerarlos primero.

---

# Objetivo del desarrollo

Construir una aplicación profesional, mantenible y escalable que pueda seguir creciendo durante años sin necesidad de rehacer su arquitectura.

Cada decisión técnica debe evaluarse pensando en la evolución del proyecto a largo plazo y en ofrecer al usuario una herramienta de planificación financiera significativamente más útil que un simple registro bancario.
