# 🤖 AI_INSTRUCTIONS.md

Este documento describe la forma de trabajar durante el desarrollo de **NummoPlan**.

Debe utilizarse junto con:

- README.md
- ProjectStatus.md
- RoadMap.md
- Decisions.md

Si existe alguna contradicción entre documentos, prevalecerá el contenido de **Decisions.md**.

---

# Objetivo del proyecto

NummoPlan es una aplicación de planificación financiera personal cuyo objetivo es centralizar toda la información económica del usuario.

El proyecto prioriza:

- código limpio
- arquitectura escalable
- reutilización
- simplicidad de uso
- compatibilidad móvil

---

# Forma de trabajar

El usuario **no sabe programar**.

Por tanto, todas las explicaciones deben asumir ese contexto.

Nunca se debe responder con instrucciones ambiguas como:

- "añade esto"
- "cambia aquello"

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

- Busca este bloque.
- Justo debajo pega esto.
- Sustituye este código.
- Elimina este bloque.
- Añade este import al principio.

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

- Form
- Card
- Detail
- SummaryCard
- InfoCard
- HistoryCard

---

# Reutilización

Antes de crear un componente nuevo comprobar siempre si ya existe uno reutilizable.

Priorizar el uso de:

- Modal
- PrimaryButton
- PageHeader
- EmptyState
- ActionMenu
- ClickableCardHeader

Evitar duplicar componentes.

---

# Cálculos

Nunca repetir cálculos.

Todos los cálculos deben vivir dentro de:

```
src/domain
```

Ejemplos

- investmentCalculations
- debtCalculations

---

# Servicios

Cada módulo tendrá un único Service responsable de:

- crear
- actualizar
- eliminar
- registrar movimientos

Ejemplos

- goalService
- investmentService
- debtService

---

# Context

Cada módulo dispone de su propio Context.

Los Context únicamente almacenan estado.

No contienen lógica de negocio.

---

# Persistencia

Actualmente la aplicación utiliza LocalStorage.

Los nuevos módulos deberán seguir el mismo sistema mientras no exista sincronización en la nube.

---

# Responsive

La prioridad actual del proyecto es adaptar completamente la aplicación para móviles y tablets.

Todas las nuevas funcionalidades deben diseñarse pensando primero en:

- móvil
- tablet
- escritorio

Evitar rehacer componentes posteriormente.

---

# Dashboard

El Dashboard será uno de los últimos módulos del proyecto.

No contendrá lógica propia.

Únicamente consumirá información de:

- Objetivos
- Patrimonio
- Deudas
- Inmuebles
- Ingresos y gastos

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

- mejoras de arquitectura
- mejoras de rendimiento
- mejoras de UX
- simplificaciones

Pero no debe implementarlas directamente sin explicarlas primero.

---

# Documentación

Cuando se complete una fase importante del proyecto, recordar actualizar:

- README.md
- ProjectStatus.md
- RoadMap.md
- Decisions.md

---

# Comunicación

Las respuestas deben ser claras.

Siempre indicar:

- archivo
- lugar exacto
- código a sustituir
- código nuevo

Si un cambio afecta a varios archivos, enumerarlos primero.

---

# Objetivo del desarrollo

Construir una aplicación profesional, mantenible y escalable que pueda seguir creciendo durante años sin necesidad de rehacer su arquitectura.