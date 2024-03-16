// Elementos HTML
const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');

// Funciones
/**
 * Optiene una lista de todos los usuarios que pueden existir
 * @returns {Promise<User[]>}
 */
function getAllUsers() {
  return fetch('/data/usuarios.json')
    .then(resp => resp.json());
}

/**
 * Optiene una lista de todas las tareas que hay de todos los usuarios
 * @returns {Promise<Task[]>}
 */
function getAllTasks() {
  return fetch('/data/tareas.json') // Cambiado a 'tareas.json' para obtener las tareas
    .then(resp => resp.json());
}

/**
 * @typedef User Definición de un usuario
 * @property {number} id Identificador único del usuario
 * @property {string} firstname Primer nombre del usuario
 * @property {string} lastname Apellido del usuario
 * @property {string} email Correo electrónico del usuario
  */

/**
 * @typedef Task Definición de una tarea de usuario
 * @property {number} id Identificador único de la tarea
 * @property {number} userId Identificador del usuario a quien corresponde la tarea
 * @property {string} title Título de la tarea
 * @property {boolean} completed Estado de la tarea si está completada o no
 */

/**
 * Muestra la información del usuario seleccionado y sus tareas
 * @param {User} user El usuario seleccionado
 * @param {Task[]} tasks Las tareas asociadas al usuario
 */
function displayUserInfo(user, tasks) {
  // Mostrar información del usuario
  userContainer.innerHTML = `
    <h3>Información del usuario seleccionado</h3>
    <ul>
      <li>Nombre completo: ${user.firstname} ${user.lastname}</li>
      <li>Email: ${user.email}</li>
    </ul>
  `;
  
  // Mostrar tareas del usuario
  const taskList = tasks.map(task => `
    <li>
      <span>${task.title}</span>
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
    </li>
  `).join('');
  
  taskContainer.innerHTML = `
    <h3>Lista de tareas del usuario</h3>
    <ul>${taskList}</ul>
  `;
}

// Event Listener para cuando se cambia de usuario
userSelect.addEventListener('change', async () => {
  const userId = parseInt(userSelect.value);
  
  try {
    const [users, tasks] = await Promise.all([getAllUsers(), getAllTasks()]);
    const user = users.find(user => user.id === userId);
    const userTasks = tasks.filter(task => task.userId === userId);
    
    displayUserInfo(user, userTasks);
  } catch (error) {
    console.error('Error al obtener la información:', error);
  }
});

// Al cargar la página, mostrar información del usuario por defecto
window.addEventListener('load', async () => {
  try {
    const [users, tasks] = await Promise.all([getAllUsers(), getAllTasks()]);
    const defaultUserId = parseInt(userSelect.value);
    const defaultUser = users.find(user => user.id === defaultUserId);
    const defaultUserTasks = tasks.filter(task => task.userId === defaultUserId);
    
    displayUserInfo(defaultUser, defaultUserTasks);
  } catch (error) {
    console.error('Error al obtener la información:', error);
  }
});
