// Define UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

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

// Load EventListeners
function loadEventListener() {
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
