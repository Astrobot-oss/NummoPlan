# 🏗 PROJECT_ARCHITECTURE

Este documento describe la arquitectura técnica de NummoPlan.

No explica el funcionamiento para el usuario final, sino cómo está organizado internamente el proyecto para facilitar su mantenimiento y evolución.

---

# Filosofía

NummoPlan sigue una arquitectura modular inspirada en Clean Architecture.

Cada módulo es independiente.

La lógica de negocio nunca depende de la interfaz.

La interfaz únicamente representa datos.

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

Cada capa tiene una única responsabilidad.

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

---

# Componentes reutilizables

Toda la aplicación reutiliza siempre que sea posible:

- PageHeader
- PrimaryButton
- Modal
- ConfirmModal
- EmptyState
- ActionMenu
- ClickableCardHeader

Antes de crear un nuevo componente debe comprobarse si alguno de estos puede reutilizarse.

---

# Context

Existe un Context por módulo.

Responsabilidad:

- almacenar estado
- actualizar estado
- persistir datos

Nunca contiene lógica de negocio.

Actualmente existen:

- GoalsContext
- InvestmentContext
- DebtsContext
- BalanceContext

Pendientes:

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

Ejemplos:

- goalService
- investmentService
- debtService
- balanceService

## Calculations

Responsable de:

- estadísticas
- porcentajes
- resúmenes
- métricas
- cálculos reutilizables

Ejemplos:

- investmentCalculations
- debtCalculations
- balanceCalculations

---

# Organización de Features

Cada módulo intenta seguir la misma estructura.

```
Card

Form

Detail

SummaryCard

InfoCard

HistoryCard
```

No todos los módulos necesitan exactamente todos los componentes, pero siempre que sea posible se mantiene esta organización.

---

# Persistencia

Actualmente toda la información se almacena mediante LocalStorage.

Cada módulo utiliza:

Context

↓

utils/storage

↓

LocalStorage

En el futuro podrá sustituirse por una API sin modificar la interfaz.

---

# Responsive

Toda nueva funcionalidad debe diseñarse siguiendo este orden:

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

La deuda nunca guarda valores calculados.

Todo se obtiene mediante debtCalculations.

---

## Balance

Modelo basado en movimientos.

Tipos previstos:

Ingresos

- salario automático
- paga extra
- ingreso puntual

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

El salario se configura como un ingreso recurrente.

Las pagas extraordinarias serán opcionales.

Todos los movimientos convivirán en un único historial.

---

# Interconexión futura

Una de las características principales de NummoPlan será la comunicación entre módulos.

Ejemplos:

Patrimonio

↓

Compra de acciones

↓

Genera automáticamente un gasto en Balance.

---

Venta de acciones

↓

Genera un ingreso.

---

Dividendos

↓

Generan ingresos automáticos.

---

Deudas

↓

Registrar pago

↓

Genera automáticamente un gasto.

---

Inmuebles

↓

Cobro alquiler

↓

Genera ingreso.

---

Pago de IBI

↓

Genera gasto.

---

Dashboard

Consumirá información de:

- Objetivos
- Patrimonio
- Balance
- Deudas
- Inmuebles

Nunca almacenará información propia.

---

# Filosofía del Balance

El Balance no pretende ser un extracto bancario.

Su objetivo es responder preguntas como:

- ¿Dónde desaparece mi dinero?
- ¿Cuánto ahorro realmente?
- ¿Qué categoría está creciendo demasiado?
- ¿Cuánto podría invertir todos los meses?
- ¿Qué gastos son innecesarios?
- ¿Qué porcentaje del salario está comprometido?
- ¿Estoy mejor que el mes pasado?
- ¿Cuánto necesito realmente para vivir?

El módulo debe ayudar al usuario a tomar decisiones, no únicamente mostrar movimientos.

---

# Evolución prevista

Una vez finalizados todos los módulos se desarrollarán:

- Dashboard inteligente
- Simulador FIRE
- Proyección patrimonial
- Simulador de jubilación
- Exportación
- Sincronización en la nube