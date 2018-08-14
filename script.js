/* eslint-env browser */


// Define UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Store task
function storeTask(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// addTask
function addTask(e) {
  if (taskInput.value === '') {
    return;
  }

  // Create li element.
  const li = document.createElement('li');

  // Add Class
  li.classList.add('collection-item');

  // Create textNode and append
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');

  // Add Class
  link.classList.add('delete-item');
  link.classList.add('secondary-content');

  // Add icon
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';

  // Append link to li
  li.appendChild(link);

  // Append to taskList
  taskList.appendChild(li);

  // Store in Local Storage
  storeTask(taskInput.value);

  // Clear Input
  taskInput.value = '';


  e.preventDefault();
}

// removeTask
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

// clearTask
function clearTask() {
  taskList.innerHTML = '';
}

// filterTask
function filterTask(e) {
  const text = e.target.value;

  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

// getTasks from LS
// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.classList.add('delete-item');
    link.classList.add('secondary-content');
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Load EventListeners
function loadEventListener() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // addTask Event
  form.addEventListener('submit', addTask);
  // removeTask Event
  taskList.addEventListener('click', removeTask);
  // clearTask Event
  clearBtn.addEventListener('click', clearTask);
  // filterTask Event
  filter.addEventListener('keyup', filterTask);
}

loadEventListener();
