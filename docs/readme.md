🐷 NummoPlan

NummoPlan es una aplicación de planificación financiera personal desarrollada con React + Vite cuyo objetivo es ayudar al usuario a comprender, organizar y mejorar su situación financiera desde un único lugar.

Más que registrar movimientos como hace una aplicación bancaria, NummoPlan pretende convertirse en un asistente financiero capaz de responder preguntas como:

¿En qué se está yendo mi dinero?

¿Cuánto puedo invertir cada mes?

¿Qué gastos están creciendo demasiado?

¿Cuánto dinero necesito realmente para vivir?

¿Qué decisiones frenan mi patrimonio?

La filosofía del proyecto consiste en transformar datos financieros en información útil para ayudar al usuario a tomar mejores decisiones.

Funcionalidades

✅ Objetivos de ahorro

Incluye:

CRUD completo

Seguimiento del progreso

Aportaciones

Página de detalle

Historial

Persistencia mediante LocalStorage

✅ Patrimonio e inversiones

Actualmente permite gestionar inversiones de forma completa.

Incluye:

Crear inversiones

Compra de participaciones

Venta de participaciones

Registro de dividendos

Actualización del valor de mercado

Histórico de movimientos

Histórico de precios

Gráfica individual

Calcula automáticamente:

Participaciones

Capital invertido

Precio medio

Valor actual

Rentabilidad

Dividendos recibidos

Persistencia mediante LocalStorage.

✅ Deudas

Incluye:

CRUD completo

Registro de pagos

Historial de pagos

Página detalle

Indicadores de progreso

Persistencia mediante LocalStorage

🚧 Balance

Balance es el centro financiero de NummoPlan y actualmente se encuentra en una fase avanzada de desarrollo.

Ingresos recurrentes

Permite configurar ingresos periódicos como:

nómina

pensión

alquiler

negocio

cualquier ingreso periódico

La configuración admite diferentes frecuencias, días de cobro y pagas extraordinarias.

Movimientos

Permite registrar y gestionar:

ingresos

gastos

categorías

movimientos manuales

movimientos recurrentes

Los movimientos pueden crearse, editarse y eliminarse desde la interfaz de Balance.

Análisis mensual

Actualmente incluye:

resumen de ingresos

resumen de gastos

ahorro mensual

tasa de ahorro

objetivo de ahorro

comparación con el mes anterior

insights mensuales

evolución del ahorro

ahorro acumulado

Distribución de gastos

Incluye una distribución de los gastos por categoría mediante un gráfico circular/donut, con total mensual, porcentajes, leyenda y detalle contextual al pasar sobre cada sector.

Historial mensual

Existe una página de detalle mensual que permite consultar los meses con actividad, navegar entre ellos y revisar:

resumen

comparación mensual

meta de ahorro

distribución de gastos

insights

actividad del mes

La actividad puede filtrarse entre todos los movimientos, movimientos manuales y movimientos recurrentes.

Pendiente

estadísticas anuales

dinero disponible para invertir

visualizaciones adicionales de ingresos y gastos

etiquetas y buscador

integración automática con Patrimonio, Deudas e Inmuebles

Dashboard

⏳ Inmuebles

Pendiente de desarrollo.

Permitirá gestionar:

inmuebles

valor de mercado

hipotecas

gastos asociados

rentabilidad

⏳ Dashboard inteligente

Será el último gran módulo.

Consumirá información procedente de:

Objetivos

Patrimonio

Deudas

Balance

Inmuebles

Nunca almacenará información propia.

Stack tecnológico

React

Vite

React Router

TailwindCSS

Context API

Lucide React

Recharts

Arquitectura

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

Cada módulo mantiene siempre la misma filosofía.

Context

Service

Calculations

Componentes

Formularios

Página principal

Página detalle

La lógica de negocio permanece completamente separada de la interfaz.

Metodología de desarrollo

El proyecto sigue una metodología basada en bloques completos.

Cada nueva funcionalidad se desarrolla en este orden:

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

La integración siempre es el último paso.

No se implementan funcionalidades apoyándose en componentes incompletos, imports inexistentes o código preparado "para más adelante".

Cada bloque debe quedar completamente funcional antes de comenzar el siguiente.

Filosofía del proyecto

NummoPlan sigue una arquitectura inspirada en Clean Architecture.

Los componentes únicamente renderizan información.

Los Context almacenan el estado.

Toda la lógica vive en src/domain.

Las páginas coordinan la interfaz.

Los cálculos permanecen separados de la presentación.

El objetivo es mantener un código limpio, reutilizable y preparado para crecer durante años.

Diferenciación respecto a otras aplicaciones

NummoPlan no pretende sustituir a un banco.

Pretende convertirse en un asistente financiero.

Mientras una aplicación bancaria muestra movimientos, NummoPlan ayuda a comprender qué significan esos movimientos y cómo afectan al patrimonio presente y futuro.

La aplicación evolucionará hacia un ecosistema completamente conectado donde:

comprar una inversión generará automáticamente un gasto

vender una inversión generará un ingreso

cobrar dividendos actualizará Balance

pagar una deuda registrará automáticamente un movimiento

los inmuebles generarán ingresos y gastos automáticamente

Todo ello permitirá obtener un análisis financiero unificado.

Persistencia

Actualmente utilizan LocalStorage:

Objetivos

Patrimonio

Deudas

Balance

En el futuro podrá sustituirse por sincronización en la nube sin modificar la arquitectura.

Responsive

La aplicación sigue una estrategia Mobile First.

El desarrollo funcional tiene prioridad.

Una vez finalizada cada funcionalidad se realiza una revisión completa de:

móvil

tablet

escritorio

Instalación

npm install
npm run dev

Documentación

El proyecto dispone de documentación interna para facilitar su mantenimiento.

ProjectStatus.md

RoadMap.md

Decisions.md

PROJECT_ARCHITECTURE.md

AI_INSTRUCTIONS.md

Estado actual

Actualmente NummoPlan dispone de:

Arquitectura consolidada

Componentes reutilizables

Persistencia local

Objetivos funcionales

Patrimonio funcional

Deudas funcionales

Desarrollo avanzado del módulo Balance

Página de detalle mensual y análisis histórico de Balance

Distribución de gastos por categoría

La siguiente gran fase consiste en cerrar la validación funcional y UX de Balance y después comenzar la integración automática entre todos los módulos.

Futuro de NummoPlan

Entre las funcionalidades previstas destacan:

Dashboard financiero inteligente

Simuladores financieros

Herramientas FIRE

Comparativas históricas

Alertas inteligentes

Exportación de datos

Sincronización en la nube

El objetivo final es convertir NummoPlan en un asistente financiero personal capaz de ayudar al usuario a comprender y mejorar su situación económica mediante análisis inteligentes y una visión global de todo su patrimonio.