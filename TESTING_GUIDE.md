# 🚀 Guía Rápida de Ejecución - Portal B2B

## Comandos para PowerShell

### 1. Navegar al Proyecto
```powershell
cd "c:\Users\costo\OneDrive\Documentos\PROYECTOS\PORTAL B2B"
```

### 2. Instalar Dependencias (solo la primera vez)
```powershell
npm install
```

**Tiempo estimado:** 1-2 minutos

### 3. Iniciar Servidor de Desarrollo
```powershell
npm run dev
```

**Verás algo como:**
```
  VITE v5.4.2  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### 4. Abrir en Navegador
Abre tu navegador y ve a: **http://localhost:5173**

---

## 🧪 Pruebas Paso a Paso

### Prueba 1: Login como Mayorista

1. **Abrir:** http://localhost:5173
2. **Ingresar credenciales:**
   - Email: `cliente@empresa.com`
   - Password: `123456`
3. **Click:** "Iniciar Sesión"
4. **✅ Resultado esperado:** 
   - Redirige a `/dashboard`
   - Muestra "Bienvenido, Cliente Mayorista"
   - Aparecen 6 recursos en tarjetas

### Prueba 2: Filtrar Recursos

1. **Click en "Videos"**
   - ✅ Debe mostrar solo 2 recursos (videos)
2. **Click en "Manuales"**
   - ✅ Debe mostrar solo 2 recursos (manuales)
3. **Click en "Contratos"**
   - ✅ Debe mostrar solo 2 recursos (contratos)
4. **Click en "Todos"**
   - ✅ Debe mostrar los 6 recursos

### Prueba 3: Intentar Acceder a Admin (como Mayorista)

1. **En la barra de direcciones, ir a:** http://localhost:5173/admin
2. **✅ Resultado esperado:**
   - Redirige automáticamente a `/dashboard`
   - No permite acceso al panel admin

### Prueba 4: Logout

1. **Click en "Cerrar Sesión"**
2. **✅ Resultado esperado:**
   - Redirige a `/login`
   - Ya no hay sesión activa

### Prueba 5: Login como Admin

1. **Ingresar credenciales:**
   - Email: `admin@portal.com`
   - Password: `123456`
2. **Click:** "Iniciar Sesión"
3. **✅ Resultado esperado:**
   - Redirige a `/admin`
   - Muestra "Bienvenido, Administrador Portal"
   - Aparece formulario de creación a la izquierda
   - Lista de recursos a la derecha

### Prueba 6: Crear Nuevo Recurso

1. **Llenar el formulario:**
   - Título: `Manual de Prueba 2024`
   - Tipo: `PDF`
   - Categoría: `Manuales`
   - URL: `https://example.com/manual-prueba.pdf`
   - Descripción: `Este es un recurso de prueba`
2. **Click:** "Crear Recurso"
3. **✅ Resultado esperado:**
   - Aparece mensaje verde: "✓ Recurso creado exitosamente"
   - El formulario se limpia
   - El nuevo recurso aparece en la lista de la derecha
   - El contador cambia a "Recursos Existentes (7)"

### Prueba 7: Ver Dashboard como Admin

1. **En la barra de direcciones, ir a:** http://localhost:5173/dashboard
2. **✅ Resultado esperado:**
   - El admin también puede ver el dashboard
   - Aparecen ahora 7 recursos (incluyendo el que creaste)

### Prueba 8: Persistencia de Sesión

1. **Estando logueado, presionar F5 (refrescar)**
2. **✅ Resultado esperado:**
   - Permanece logueado
   - No redirige a login
   - Mantiene la misma vista

### Prueba 9: Protección de Rutas

1. **Hacer logout**
2. **En la barra de direcciones, intentar ir a:** http://localhost:5173/dashboard
3. **✅ Resultado esperado:**
   - Redirige automáticamente a `/login`
4. **Intentar ir a:** http://localhost:5173/admin
5. **✅ Resultado esperado:**
   - Redirige automáticamente a `/login`

### Prueba 10: Credenciales Incorrectas

1. **Ingresar credenciales incorrectas:**
   - Email: `wrong@email.com`
   - Password: `wrongpass`
2. **Click:** "Iniciar Sesión"
3. **✅ Resultado esperado:**
   - Aparece mensaje de error rojo: "Credenciales inválidas"
   - No redirige
   - Permanece en la página de login

---

## 📱 Prueba de Diseño Responsive

### Usando DevTools (F12)

1. **Abrir DevTools:** Presiona F12
2. **Activar modo responsive:** Click en el icono de dispositivo móvil
3. **Probar diferentes tamaños:**

   **Móvil (375px):**
   - ✅ Grid de recursos: 1 columna
   - ✅ Filtros apilados verticalmente
   - ✅ Formulario admin ocupa ancho completo

   **Tablet (768px):**
   - ✅ Grid de recursos: 2 columnas
   - ✅ Filtros en fila horizontal
   - ✅ Layout admin en 2 columnas

   **Desktop (1024px+):**
   - ✅ Grid de recursos: 3 columnas
   - ✅ Todo el espacio optimizado

---

## 🎨 Elementos Visuales a Verificar

### Login Page
- ✅ Fondo con gradiente azul-índigo
- ✅ Tarjeta blanca centrada con sombra
- ✅ Logo circular con icono de edificio
- ✅ Inputs con borde y focus azul
- ✅ Botón con gradiente azul
- ✅ Credenciales demo en gris pequeño

### Dashboard
- ✅ Header blanco con sombra
- ✅ Logo y nombre de usuario
- ✅ Botón rojo de logout
- ✅ Filtros: activo con gradiente azul, inactivos blancos
- ✅ Tarjetas con headers de colores:
  - Videos: Gradiente morado-rosa
  - Manuales: Gradiente azul-cyan
  - Contratos: Gradiente verde-esmeralda
- ✅ Panel de estadísticas al final

### Admin Panel
- ✅ Layout de 2 columnas
- ✅ Formulario con todos los campos
- ✅ Botón azul de crear
- ✅ Notificación verde de éxito
- ✅ Lista scrollable de recursos
- ✅ Badges de colores (tipo y categoría)

---

## ⚠️ Solución de Problemas

### El servidor no inicia
```powershell
# Verificar que Node.js está instalado
node --version
npm --version

# Si no aparecen versiones, reinicia PowerShell después de instalar Node.js
```

### Puerto 5173 ocupado
```powershell
# Vite usará automáticamente el siguiente puerto disponible (5174, 5175, etc.)
# Verifica el mensaje en la consola para ver qué puerto usa
```

### Error al instalar dependencias
```powershell
# Eliminar node_modules y package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstalar
npm install
```

### La página está en blanco
```powershell
# Verifica la consola del navegador (F12 > Console)
# Busca errores en rojo
# Asegúrate de que el servidor está corriendo
```

---

## 📊 Checklist de Validación

Marca cada prueba conforme la completes:

- [ ] Login como mayorista funciona
- [ ] Filtros de categoría funcionan
- [ ] Mayorista no puede acceder a /admin
- [ ] Logout funciona
- [ ] Login como admin funciona
- [ ] Crear recurso funciona
- [ ] Notificación de éxito aparece
- [ ] Nuevo recurso aparece en la lista
- [ ] Persistencia de sesión funciona (F5)
- [ ] Rutas protegidas redirigen a login
- [ ] Credenciales incorrectas muestran error
- [ ] Diseño responsive funciona
- [ ] Todos los colores y gradientes se ven bien
- [ ] Animaciones y transiciones funcionan

---

## 🎯 Resumen

**Total de pruebas:** 10 pruebas funcionales + 1 prueba responsive

**Tiempo estimado:** 10-15 minutos

**Credenciales:**
- Admin: `admin@portal.com` / `123456`
- Mayorista: `cliente@empresa.com` / `123456`

**URL:** http://localhost:5173

---

## 📸 Capturas Recomendadas

Si quieres documentar las pruebas, toma capturas de:
1. Página de login
2. Dashboard con filtro "Todos"
3. Dashboard con filtro "Videos"
4. Panel admin con formulario
5. Notificación de éxito al crear recurso
6. Vista móvil del dashboard

---

**¡Listo para probar! 🚀**
