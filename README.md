# Portal B2B - Recursos para Mayoristas

Portal web profesional para mayoristas con arquitectura de Service Layer, desarrollado con React, Vite y Tailwind CSS.

## 🚀 Características

- **Autenticación con Roles**: Sistema de login con roles de Admin y Mayorista
- **Service Layer Pattern**: Arquitectura desacoplada para fácil integración futura con Firebase
- **Datos Simulados**: Mocks para validar UI sin backend
- **Rutas Protegidas**: Control de acceso basado en roles
- **Diseño Moderno**: UI corporativa con Tailwind CSS y gradientes

## 📁 Estructura del Proyecto

```
src/
├── mocks/          # Datos simulados (usuarios y recursos)
├── services/       # Capa de servicios (auth y data)
├── context/        # Estado global (AuthContext)
├── pages/          # Vistas principales
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── AdminPanel.jsx
├── components/     # Componentes reutilizables
│   └── ResourceCard.jsx
├── App.jsx         # Configuración de rutas
└── main.jsx        # Punto de entrada
```

## 🔑 Credenciales de Prueba

**Administrador:**
- Email: `admin@portal.com`
- Password: `123456`

**Mayorista:**
- Email: `cliente@empresa.com`
- Password: `123456`

## 🛠️ Instalación y Ejecución

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:5173
   ```

## 📦 Dependencias Principales

- **React 18**: Biblioteca UI
- **React Router DOM 6**: Enrutamiento
- **Tailwind CSS 3**: Estilos
- **Vite 5**: Build tool

## 🎯 Funcionalidades Implementadas

### Para Mayoristas
- ✅ Login seguro
- ✅ Dashboard con grid de recursos
- ✅ Filtros por categoría (Videos, Manuales, Contratos)
- ✅ Visualización de recursos con tarjetas
- ✅ Estadísticas de recursos

### Para Administradores
- ✅ Panel de administración
- ✅ Formulario para crear recursos
- ✅ Lista de recursos existentes
- ✅ Notificaciones de éxito

### Sistema
- ✅ Persistencia de sesión (localStorage)
- ✅ Rutas protegidas por rol
- ✅ Redirecciones automáticas
- ✅ Loading states
- ✅ Manejo de errores

## 🔄 Próximos Pasos (Integración Firebase)

La arquitectura actual está preparada para integrar Firebase fácilmente:

1. Reemplazar `src/services/authService.js` con Firebase Auth
2. Reemplazar `src/services/dataService.js` con Firestore
3. Agregar Firebase Storage para archivos reales
4. Mantener la misma interfaz de servicios

## 📝 Notas Técnicas

- **Service Layer**: Toda la lógica de negocio está en `/services`
- **Mocks**: Los datos falsos están en `/mocks/data.js`
- **Context API**: Gestión de estado de autenticación
- **Protected Routes**: Componente `ProtectedRoute` en `App.jsx`

## 🎨 Diseño

- Paleta de colores: Azul/Índigo corporativo
- Gradientes modernos
- Sombras y transiciones suaves
- Responsive design
- Iconos SVG integrados

---

**Desarrollado con ❤️ usando React + Vite + Tailwind CSS**
