# Arquitectura del Sistema - Portal B2B Origen Botánico

**Versión:** 1.0
**Fecha:** Diciembre 2025

Este documento define la estructura técnica, decisiones de diseño y pautas para el desarrollo escalable de la plataforma. Como el desarrollo es asistido por IA, este archivo sirve como "Memoria Técnica".

---

## 1. Stack Tecnológico

*   **Frontend Core:** React 18+ (Hooks Functional Components).
*   **Build Tool:** Vite (Rápido, Hot Module Replacement).
*   **Estilos:** Tailwind CSS (Sistema de diseño utilitario para velocidad y consistencia).
*   **Backend / BaaS:** Firebase (Auth para usuarios, Firestore para datos, Storage para archivos).
*   **Routing:** React Router DOM v6.

## 2. Estructura de Carpetas

```
/src
  /components
    /layout       # Componentes estructurales (Sidebar, Header, MainLayout)
    /modals       # Modales de acción (Upload, Forms)
    /ui           # Componentes base reusables (Buttons, Cards, Inputs)
  /context        # Estado global (AuthContext)
  /data           # Datos estáticos y Demo (demoData.js)
  /pages          # Vistas principales (rutas)
    /marketing    # Sub-rutas de marketing
  /services       # Lógica de negocio y llamadas a API (dataService.js, authService.js)
```

## 3. Patrones de Diseño Actuales

### Abstracción de Datos (`dataService.js`)
Para permitir un desarrollo rápido sin depender de la base de datos final desde el día 1, utilizamos un patrón de servicio.
*   **Modo Demo:** Si no hay backend, `dataService` lee de `localStorage` inicializado desde `demoData.js`.
*   **Modo Producción:** En el futuro, este servicio cambiará sus funciones internas para llamar a Firebase sin romper los componentes de la UI.

### Lazy Loading (Optimización de Rendimiento)
Se utiliza `React.lazy` y `Suspense` en `App.jsx`.
*   **Objetivo:** No cargar el código de "Administración" a un usuario que solo quiere ver "Precios".
*   **Regla:** Toda nueva página principal debe ser importada con `lazy()` en `App.jsx`.

---

## 4. Estrategia de Escalabilidad (Roadmap Técnico)

Dado que se espera una plataforma con "miles de usuarios" y contenido "pesado":

### A. Gestión de Estado (Recomendación Futura)
Actualmente usamos `useState` y `Context` simples.
*   **Problema futuro:** Cuando el carrito de compras, filtros complejos y notificaciones crezcan, el `Context` será ineficiente.
*   **Solución:** Implementar **Zustand** o **TanStack Query (React Query)**. React Query es ideal para cachear los datos de Firebase y evitar lecturas costosas (ahorro de dinero).

### B. Calidad de Código y Tipado
*   **Estado Actual:** JavaScript estándar.
*   **Mejora Crítica:** Migrar a **TypeScript**.
    *   *Por qué:* Validar que un "Producto" siempre tenga "precio" y "SKU" antes de subir el código evita pantallas blancas en producción. Indispensable para equipos grandes.

### C. Almacenamiento de Contenido Pesado
*   **Vídeos:** No subir a Firebase Hosting ni Storage. Usar **Vimeo Pro** o **YouTube Unlisted** embebido.
*   **Documentos (PDFs):** AWS S3 es más económico que Firebase Storage para terabytes de datos. O continuar con Firebase Storage con reglas de ciclo de vida.

---

## 5. Flujo de Trabajo con IA

Para mantener la integridad del código mientras la IA programa:

1.  **Consultar este archivo:** Antes de pedir una nueva "Feature Grande", pedir a la IA que revise `ARCHITECTURE.md`.
2.  **Componentes Pequeños:** Pedir cambios modulares ("Crea un componente `PricingTable`") en lugar de cambios monolíticos ("Haz la página de precios entera").
3.  **Pruebas:** Solicitar a la IA que verifique la integridad visual y lógica (ej: "Revisa que el Lazy Loading no rompa la navegación").

---

## Referencia de Datos (Modelo Demo)
El archivo `src/data/demoData.js` es la fuente de la verdad para el entorno de pruebas. Contiene:
*   `DEMO_PRODUCTS`: Catálogo.
*   `DEMO_USERS`: Usuarios de prueba (admin@portal.com, cliente@portal.com).
*   `DEMO_CONTRACTS`: PDF simulados.

Cualquier cambio en la estructura de datos debe reflejarse primero aquí.
