const apiUrl = 'http://localhost:5167/api';
const messages = document.getElementById('messages');
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const logoutButton = document.getElementById('logout-button');

function showMessage(text, type = 'success') {
  messages.innerHTML = `<div class="message ${type}">${text}</div>`;
}

function clearMessage() {
  messages.innerHTML = '';
}

function getToken() {
  return localStorage.getItem('authToken');
}

function setToken(token) {
  localStorage.setItem('authToken', token);
}

function removeToken() {
  localStorage.removeItem('authToken');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function updateUi() {
  const isLogged = Boolean(getToken());
  authSection.classList.toggle('hidden', isLogged);
  appSection.classList.toggle('hidden', !isLogged);
  if (isLogged) {
    fetchTasks();
  } else {
    taskList.innerHTML = '';
  }
}

async function registerUser(event) {
  event.preventDefault();
  clearMessage();

  const formData = new FormData(registerForm);
  const payload = {
    username: formData.get('username').toString().trim(),
    password: formData.get('password').toString().trim(),
  };

  try {
    const response = await fetch(`${apiUrl}/Auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await response.json();
    if (!response.ok) throw new Error(body.mensaje || 'Error al registrar');

    showMessage(body.mensaje || 'Usuario registrado correctamente');
    registerForm.reset();
  } catch (error) {
    showMessage(error.message || 'Error inesperado', 'error');
  }
}

async function loginUser(event) {
  event.preventDefault();
  clearMessage();

  const formData = new FormData(loginForm);
  const payload = {
    username: formData.get('username').toString().trim(),
    password: formData.get('password').toString().trim(),
  };

  try {
    const response = await fetch(`${apiUrl}/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await response.json();
    if (!response.ok) throw new Error(body.mensaje || 'Error al iniciar sesión');

    setToken(body.token);
    showMessage('Sesión iniciada correctamente');
    loginForm.reset();
    updateUi();
  } catch (error) {
    showMessage(error.message || 'Error inesperado', 'error');
  }
}

async function fetchTasks() {
  try {
    const response = await fetch(`${apiUrl}/tareas`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    if (response.status === 401) {
      removeToken();
      updateUi();
      throw new Error('Token inválido o expirado. Por favor inicia sesión de nuevo.');
    }

    const tareas = await response.json();
    taskList.innerHTML = tareas.length
      ? tareas.map(t => `<li><p class="task-title">${t.titulo}</p><p class="task-description">${t.descripcion}</p></li>`).join('')
      : '<li>No hay tareas creadas aún.</li>';
  } catch (error) {
    showMessage(error.message || 'No se pudieron cargar las tareas', 'error');
  }
}

async function createTask(event) {
  event.preventDefault();
  clearMessage();

  const formData = new FormData(taskForm);
  const payload = {
    titulo: formData.get('titulo').toString().trim(),
    descripcion: formData.get('descripcion').toString().trim(),
  };

  try {
    const response = await fetch(`${apiUrl}/tareas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json();
    if (!response.ok) throw new Error(body.mensaje || 'Error al crear la tarea');

    showMessage('Tarea creada correctamente');
    taskForm.reset();
    fetchTasks();
  } catch (error) {
    showMessage(error.message || 'Error inesperado', 'error');
  }
}

function logout() {
  removeToken();
  showMessage('Sesión cerrada');
  updateUi();
}

registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);
taskForm.addEventListener('submit', createTask);
logoutButton.addEventListener('click', logout);

updateUi();
