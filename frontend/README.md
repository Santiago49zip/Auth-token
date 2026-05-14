# Frontend para Backend de Tareas

Este frontend es una aplicación estática que se conecta a tu backend en `http://localhost:5167`.

## Archivos

- `index.html` - interfaz de usuario.
- `styles.css` - estilos básicos.
- `app.js` - lógica para registro, login, crear tareas y listar tareas.

## Cómo usar

1. Asegúrate de tener el backend corriendo en `http://localhost:5167`.
2. Abre el frontend con un servidor estático:
   - Con Python:
     ```bash
     cd frontend
     python -m http.server 5500
     ```
   - O con Live Server en VS Code.
3. Abre en el navegador:
   - `http://localhost:5500`
4. Registra un usuario, inicia sesión y crea tareas.

## Nota

El backend debe permitir CORS para que el frontend desde el navegador pueda realizar peticiones. Ya agregué soporte CORS en `backend/Program.cs`.
