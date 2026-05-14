# Auth-token

## Descripción general

Este proyecto es un sistema de gestión de tareas con autenticación basada en JWT. Está organizado como un monolito con:

- Un backend en ASP.NET Core 10
- Un frontend estático en HTML/CSS/JavaScript
- Una base de datos MySQL para usuarios y tareas

El backend es el servicio funcional y el frontend consume sus endpoints para registrar usuarios, iniciar sesión, crear tareas y listar tareas del usuario autenticado.

## Estructura del proyecto

- `backend/`
  - `Program.cs`: configuración de servicios, autenticación JWT, CORS y mapeo de controladores.
  - `Controllers/`
    - `AuthController.cs`: registro y login de usuarios.
    - `TareasController.cs`: endpoints protegidos de creación y listado de tareas.
  - `Data/`
    - `AppDbContext.cs`: contexto de Entity Framework Core para MySQL.
  - `Models/`
    - `Usuario.cs`, `Tarea.cs`: modelos de datos.
  - `Services/`
    - `JwtService.cs`: generación de tokens JWT.
  - `appsettings.json`: configuración de conexión a MySQL y ajustes JWT.

- `frontend/`
  - `index.html`: interfaz de usuario principal.
  - `styles.css`: estilos de la app.
  - `app.js`: lógica del frontend para interactuar con el backend.
  - `README.md`: instrucciones de uso del frontend.

## Cómo funciona

### Autenticación

1. El usuario se registra enviando `username` y `password` a `POST /api/Auth/register`.
2. El usuario inicia sesión en `POST /api/Auth/login`.
3. El backend valida las credenciales y genera un JWT firmado.
4. El frontend almacena el token en `localStorage` y lo incluye en cada petición protegida.

### Gestión de tareas

- `GET /api/tareas`: lista todas las tareas del usuario autenticado.
- `POST /api/tareas`: crea una nueva tarea y la asigna al usuario que aparece en el JWT.

El backend extrae el `UsuarioId` directamente del claim del token y lo usa para filtrar y guardar tareas.

## Tecnologías usadas

### Backend

- ASP.NET Core 10
- Entity Framework Core 8
- Pomelo MySQL Provider
- JWT Bearer Authentication
- BCrypt para hashing de contraseñas
- Swagger para documentación de API

### Frontend

- HTML
- CSS
- JavaScript nativo
- Fetch API para llamadas HTTP

## Configuración y ejecución

### Backend

1. Abre la carpeta `backend`.
2. Ajusta la cadena de conexión en `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "server=localhost;user=root;password=admin;database=actividad3"
   }
   ```
3. Ejecuta:
   ```bash
   dotnet run
   ```
4. El backend quedará disponible en `http://localhost:5167`.

### Frontend

1. Abre la carpeta `frontend`.
2. Inicia un servidor estático. Por ejemplo:
   ```bash
   python -m http.server 5500
   ```
3. Abre en el navegador:
   ```
   http://localhost:5500
   ```

## Flujo de uso

1. Registrarse con un nuevo usuario.
2. Iniciar sesión con ese usuario.
3. Crear tareas usando el formulario.
4. Visualizar las tareas asociadas al usuario autenticado.

## Importante

- El frontend fue construido como una app estática ligera, no usa Angular ni frameworks front-end.
- El backend requiere que el token JWT se envíe en el header `Authorization: Bearer <token>`.
- CORS ya está habilitado en el backend para permitir peticiones desde el frontend local.
- El modelo de datos MySQL usa las tablas `usuarios` y `tareas`.

## Endpoints principales

- `POST /api/Auth/register`
- `POST /api/Auth/login`
- `GET /api/tareas`
- `POST /api/tareas`

## Notas finales

Este README describe el estado actual del monolito y cómo ejecutar la solución completa. Si quieres, puedo ayudarte a convertir el frontend en una aplicación React/Vite más avanzada.
