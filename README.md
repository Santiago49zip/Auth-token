# Auth-token
backend frontend token
Arquitectura y capas

El sistema sigue una arquitectura tipo N capas:

1 Capa de presentación (Frontend)

Angular maneja toda la interacción con el usuario.

Componentes principales:

LoginComponent: formulario de login.

TareasComponent: lista y creación de tareas.

Se comunica con el backend mediante HTTP requests.

2 Capa de negocio (Backend / Services)

Contiene la lógica de negocio:

JwtService: genera y valida tokens JWT.

AuthController: login y autenticación de usuarios.

TareasController: creación y listado de tareas asociadas al usuario.

3 Capa de acceso a datos (Backend / Data)

AppDbContext: Contexto de EF Core que representa la base de datos.

Acceso a tablas Usuarios y Tareas.

Se encarga de la persistencia y recuperación de datos.

Flujo de funcionamiento

Registro/Login de usuario

El usuario ingresa su username y password.

El backend valida credenciales y genera un JWT.

El token se retorna al frontend para ser almacenado (ej. localStorage).

Creación de tareas

El usuario autenticado envía una petición POST con los datos de la tarea.

El backend obtiene el UsuarioId desde el JWT y lo asigna a la tarea.

La tarea se guarda en la base de datos.

Listado de tareas

El frontend solicita las tareas del usuario.

El backend filtra tareas por UsuarioId usando el token JWT.

JWT tiene un tiempo de expiración de 2 horas.

Configura appsettings.json con tu conexión a MySQL

Todas las rutas de TareasController están protegidas y requieren Bearer Token.

Las contraseñas se almacenan hashed con BCrypt.

Angular usa standalone components, por lo que no existe app.module.ts.