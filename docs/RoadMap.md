# 🛣 RoadMap

## Módulos principales

### Objetivos

- [x] CRUD
- [x] Detalle
- [x] Historial
- [x] Barra de progreso
- [x] Menú contextual

---

### Patrimonio

- [x] CRUD
- [x] Compra inicial
- [x] Compra posterior
- [x] Precio medio automático
- [x] Actualización de valor
- [x] Histórico
- [x] Gráfica
- [x] Detalle

---

### Deudas

- [x] Context
- [x] Service
- [x] Calculations
- [x] DebtForm
- [x] Debts.jsx
- [x] DebtCard
- [ ] PaymentModal
- [ ] DebtDetail
- [ ] SummaryCard
- [ ] InfoCard
- [ ] HistoryCard

---

### Presupuestos

- [ ] Context
- [ ] CRUD
- [ ] Detail

---

### Gastos fijos

- [ ] Context
- [ ] CRUD
- [ ] Detail

---

### Dashboard

- [ ] Resumen financiero
- [ ] Patrimonio
- [ ] Objetivos
- [ ] Deudas
- [ ] Presupuestos
- [ ] Gastos
- [ ] Alertas

---

## Fase final

- [ ] Mejoras visuales
- [ ] Animaciones
- [ ] Responsive completo
- [ ] Exportación
- [ ] Configuración

# Decisiones

## Patrimonio

- Las inversiones se modelan mediante movimientos (buy, sell, dividend).
- El precio actual es independiente del precio medio de compra.
- El detalle de inversión centraliza las operaciones principales.

## Persistencia

Pendiente de migrar todos los Context a localStorage mediante un helper común.