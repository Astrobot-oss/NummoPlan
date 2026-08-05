# 📌 ProjectStatus

Estado actualizado del proyecto NummoPlan.

---

# Estado general

| Módulo | Estado |
|---------|--------|
| 🎯 Objetivos | ✅ Funcional |
| 💼 Patrimonio | ✅ Funcional |
| 💳 Deudas | ✅ Funcional |
| ⚖️ Balance | 🚧 En desarrollo |
| 🏠 Inmuebles | ⏳ Pendiente |
| 📱 Responsive | 🚧 En desarrollo |
| 📊 Dashboard | ⏳ Pendiente |
| ⚙️ Ajustes | ⏳ Pendiente |

---

# 🎯 Objetivos

Estado:

✅ Funcional

Incluye:

- CRUD completo
- Página detalle
- Historial de aportaciones
- Barra de progreso
- SummaryCard
- InfoCard
- HistoryCard
- Persistencia mediante LocalStorage
- Arquitectura modular

Pendiente:

- Adaptación responsive completa
- Integración con Dashboard

---

# 💼 Patrimonio

Estado:

✅ Funcional

Incluye:

- CRUD completo
- Compra inicial
- Compras posteriores
- Venta de participaciones
- Registro de dividendos
- Actualización del valor de mercado
- Precio medio automático
- Histórico de movimientos
- Histórico de precios
- Gráfica individual
- Página detalle
- SummaryCard
- InfoCard
- HistoryCard
- Persistencia mediante LocalStorage

Pendiente:

- Adaptación responsive completa
- Integración automática con Balance
- Integración con Dashboard

---

# 💳 Deudas

Estado:

✅ Funcional

Incluye:

- CRUD completo
- Registro de pagos
- Barra de progreso
- Indicador de deuda liquidada
- Página detalle
- SummaryCard
- InfoCard
- HistoryCard
- DebtProgressGauge
- Persistencia mediante LocalStorage
- Responsive mejorado

Pendiente:

- Integración automática con Balance
- Adaptación responsive final
- Integración con Dashboard

---

# ⚖️ Balance

Estado:

🚧 En desarrollo

Completado:

- Arquitectura del módulo
- BalanceContext
- balanceService
- balanceCalculations
- Persistencia mediante LocalStorage
- Modelo de datos inicial
- Estructura preparada para ingresos recurrentes

En desarrollo:

- Página principal
- Registro manual de ingresos
- Registro manual de gastos
- Categorías
- Ingresos recurrentes
- Tarjetas resumen

Pendiente:

- Estadísticas inteligentes
- Comparativas mensuales
- Gráfico circular de gastos
- Evolución del ahorro
- Integración automática con Patrimonio
- Integración automática con Deudas
- Integración automática con Inmuebles
- Reglas automáticas de movimientos
- Dashboard

---

# 🏠 Inmuebles

Estado:

⏳ Pendiente

Planificado:

- CRUD completo
- Valor de mercado
- Hipoteca asociada
- Gastos asociados
- Rentabilidad
- Histórico de valor
- Integración con Balance
- Integración con Dashboard

---

# 📱 Responsive

Estado:

🚧 En desarrollo

Completado:

- MainLayout adaptable
- Sidebar adaptable
- Modal adaptable
- PrimaryButton adaptable
- PageHeader adaptable
- Gran parte del módulo Patrimonio
- Gran parte del módulo Deudas

Pendiente:

- Objetivos
- Balance
- Inmuebles
- Dashboard
- Ajustes
- Optimización para tablets

---

# 📊 Dashboard

Estado:

⏳ Pendiente

El Dashboard se desarrollará cuando todos los módulos estén terminados.

Consumirá información de:

- Objetivos
- Patrimonio
- Deudas
- Balance
- Inmuebles

No contendrá lógica de negocio propia.

Mostrará únicamente información agregada y análisis.

---

# Arquitectura

Todos los módulos siguen la misma estructura:

```
Context
      ↓
Service
      ↓
Calculations
      ↓
Components
      ↓
Detail
      ↓
Page
```

Esto garantiza:

- Separación entre lógica y presentación
- Escalabilidad
- Reutilización
- Facilidad de mantenimiento

---

# Persistencia

Actualmente utilizan LocalStorage:

- Objetivos
- Patrimonio
- Deudas
- Balance

Todos los módulos futuros seguirán el mismo sistema hasta la incorporación de sincronización en la nube.

---

# Próximo objetivo

Orden de desarrollo actual:

1. Completar Balance.
2. Finalizar Responsive.
3. Desarrollar Inmuebles.
4. Construir Dashboard inteligente.
5. Completar Ajustes.
6. Interconectar todos los módulos automáticamente.

---

# Visión del producto

NummoPlan no pretende ser únicamente un registro de movimientos.

El objetivo es convertirse en un asistente financiero que ayude al usuario a comprender cómo afectan sus decisiones a su patrimonio.

Para ello se desarrollarán análisis como:

- Capacidad real de ahorro.
- Dinero disponible para invertir.
- Gastos que más crecen.
- Comparativas mensuales.
- Gastos prescindibles.
- Dependencia del salario.
- Proyección de independencia financiera.
- Impacto de cada decisión económica sobre el patrimonio futuro.

---

# Estado del MVP

Actualmente NummoPlan dispone de:

- Arquitectura consolidada.
- Componentes reutilizables.
- Persistencia local.
- Objetivos funcionales.
- Patrimonio funcional.
- Deudas funcionales.
- Inicio del módulo Balance.

La siguiente gran fase consiste en convertir los distintos módulos en un único ecosistema financiero totalmente interconectado.