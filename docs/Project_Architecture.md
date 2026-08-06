# 🏗 PROJECT_ARCHITECTURE

Este documento describe la arquitectura técnica de NummoPlan.

No explica el funcionamiento para el usuario final, sino cómo está organizado internamente el proyecto para facilitar su mantenimiento, escalabilidad y evolución.

---

# Filosofía

NummoPlan sigue una arquitectura modular inspirada en Clean Architecture.

Cada módulo es completamente independiente.

La lógica de negocio nunca depende de la interfaz.

La interfaz únicamente representa información.

Cada capa tiene una única responsabilidad.

La arquitectura debe favorecer:

- escalabilidad
- reutilización
- mantenibilidad
- facilidad de pruebas
- independencia entre módulos

---

# Metodología de desarrollo

## Desarrollo por bloques completos

Toda nueva funcionalidad deberá desarrollarse como un bloque completo.

Antes de comenzar la integración deberán existir y estar completamente terminados todos los archivos que formen parte de dicha funcionalidad.

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

Si una funcionalidad necesita 30 archivos para funcionar, primero deberán terminarse esos 30 archivos.

Solo entonces comenzará la integración.

Queda prohibido construir funcionalidades apoyándose en componentes incompletos.

---

## Orden obligatorio

Toda feature seguirá siempre el mismo orden.

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

No deberá alterarse este orden salvo para corregir errores críticos.

---

## Integración

La integración siempre será el último paso.

Nunca deberán añadirse:

- imports de archivos aún inexistentes
- llamadas a funciones no implementadas
- estados que todavía no se utilizan
- componentes provisionales
- código "para más adelante"

Si cualquier dependencia está incompleta deberá terminarse antes de continuar.

---

## Desarrollo guiado

Antes de modificar un archivo deberán comprobarse todas sus dependencias.

No se desarrollará nunca "a ciegas".

Si una funcionalidad depende de archivos todavía incompletos se detendrá el desarrollo hasta finalizarlos.

El objetivo es evitar volver continuamente sobre los mismos archivos para parchearlos.

---

## Confirmación de cada bloque

Nunca se asumirá que un paso ya está terminado.

Antes de continuar deberá comprobarse que:

- el código existe
- compila
- funciona correctamente
- el usuario confirma que el bloque está finalizado

Solo entonces comenzará el siguiente bloque.

---

## Refactorización

La reorganización de carpetas, componentes o imports únicamente podrá realizarse cuando una funcionalidad esté completamente terminada.

No se refactorizarán funcionalidades parcialmente implementadas.

---

## Desarrollo funcional y UX

Todo módulo se desarrollará en dos fases.

### Fase 1

Conseguir que toda la funcionalidad funcione.

### Fase 2

Mejorar:

- validaciones
- experiencia de usuario
- accesibilidad
- animaciones
- simplificación de formularios
- mejoras visuales

Las mejoras detectadas durante el desarrollo deberán anotarse para implementarlas durante esta segunda fase.

---

# Flujo de datos

Todos los módulos siguen el mismo flujo.

```
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
```

Cada capa posee una única responsabilidad.

---

# Estructura del proyecto

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

Cada carpeta posee una responsabilidad claramente diferenciada.

---

# Componentes reutilizables

Siempre que sea posible deberán reutilizarse componentes existentes.

Actualmente:

- PageHeader
- PrimaryButton
- Modal
- ConfirmModal
- EmptyState
- ActionMenu
- ClickableCardHeader

Antes de crear un componente nuevo deberá comprobarse si alguno existente puede reutilizarse.

---

# Context

Existe un Context por módulo.

Responsabilidades:

- almacenar estado
- actualizar estado
- persistir datos

Nunca contendrá lógica de negocio.

Actualmente existen:

- GoalsContext
- InvestmentContext
- DebtsContext
- BalanceContext

Pendiente:

- RealEstateContext

---

# Domain

Toda la lógica vive dentro de:

```
src/domain
```

Cada módulo posee dos archivos principales.

## Service

Responsable de:

- crear
- actualizar
- eliminar
- registrar movimientos
- modificar el estado del módulo

Ejemplos:

- goalService
- investmentService
- debtService
- balanceService

Toda modificación de datos deberá realizarse exclusivamente desde su Service.

---

## Calculations

Responsable de:

- estadísticas
- métricas
- porcentajes
- resúmenes
- cálculos reutilizables

Ejemplos:

- investmentCalculations
- debtCalculations
- balanceCalculations

Nunca deberán repetirse cálculos entre componentes.

---

# Organización de Features

Siempre que sea posible los módulos seguirán la misma estructura.

```
Card

Form

Detail

SummaryCard

InfoCard

HistoryCard
```

No todos los módulos necesitarán todos los componentes.

Cuando existan deberán mantener esta nomenclatura.

---

# Persistencia

Actualmente toda la información se almacena mediante LocalStorage.

El flujo es:

```
Context

↓

utils/storage

↓

LocalStorage
```

Los Context nunca accederán directamente a LocalStorage.

En el futuro podrá sustituirse por una API sin modificar el resto de la arquitectura.

---

# Responsive

Toda nueva funcionalidad seguirá una estrategia Mobile First.

Orden de desarrollo:

1. móvil
2. tablet
3. escritorio

No se desarrollarán componentes exclusivos para escritorio.

---

# Módulos actuales

## Objetivos

Estado:

Finalizado.

Incluye:

- CRUD
- Historial
- Aportaciones
- Página detalle

---

## Patrimonio

Modelo basado en movimientos.

Tipos actuales:

- buy
- sell
- dividend

Toda la información se calcula dinámicamente.

---

## Deudas

Modelo basado en pagos.

Cada pago genera un movimiento.

La deuda nunca almacena valores calculados.

Toda la información procede de debtCalculations.

---

## Balance

Modelo basado en movimientos e ingresos recurrentes.

Los ingresos recurrentes permiten representar:

- nómina
- pensión
- alquiler
- negocio
- prestación
- cualquier ingreso periódico

Los movimientos incluyen:

Ingresos

- ingreso recurrente
- ingreso puntual
- paga extraordinaria

Gastos

- vivienda
- alimentación
- transporte
- suministros
- ocio
- salud
- educación
- impuestos
- suscripciones
- compras
- viajes
- mascota
- otros

Todos convivirán en un único historial.

---

# Interconexión futura

Uno de los pilares de NummoPlan será la comunicación automática entre módulos.

Ejemplos:

Patrimonio

↓

Compra de acciones

↓

Genera automáticamente un gasto en Balance.

---

Venta de acciones

↓

Genera automáticamente un ingreso.

---

Dividendos

↓

Generan ingresos automáticos.

---

Deudas

↓

Registrar un pago

↓

Genera automáticamente un gasto.

---

Inmuebles

↓

Cobro de alquiler

↓

Genera un ingreso.

---

Pago de IBI

↓

Genera un gasto.

---

Dashboard

Consumirá información procedente de:

- Objetivos
- Patrimonio
- Balance
- Deudas
- Inmuebles

Nunca almacenará información propia.

---

# Filosofía del Balance

Balance no pretende ser un extracto bancario.

Su objetivo es responder preguntas como:

- ¿Dónde desaparece mi dinero?
- ¿Cuánto ahorro realmente?
- ¿Qué categoría está creciendo demasiado?
- ¿Cuánto podría invertir todos los meses?
- ¿Qué gastos son innecesarios?
- ¿Qué porcentaje de mis ingresos está comprometido?
- ¿Estoy mejor que el mes pasado?
- ¿Cuánto necesito realmente para vivir?

Debe ayudar al usuario a comprender su situación financiera y tomar mejores decisiones.

---

# Evolución prevista

Una vez finalizados todos los módulos se desarrollarán:

- Dashboard inteligente
- Simulador FIRE
- Proyección patrimonial
- Simulador de jubilación
- Exportación
- Sincronización en la nube