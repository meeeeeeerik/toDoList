import { creaetTaskHtml } from './htmlTemplates';

export function renderUser(user) {
  const userContainer = document.querySelector('#user');

  userContainer.innerHTML = user.email;
}

export function renderTaskLoader() {
  const tasksContainer = document.querySelector('#tasksContainer');

  tasksContainer.innerHTML = `<div class="custom-loader"></div>`;
}

export function renderTasks(tasks) {
  const tasksContainer = document.querySelector('#tasksContainer');

  if (tasks.length) {
    const taskHtml = tasks.map((task) => creaetTaskHtml(task)).join('');

    tasksContainer.innerHTML = taskHtml;
  } else {
    tasksContainer.innerHTML = `<div class="text-zinc-500">Нет задач</div>`;
  }
}

export function renderNewTask(task) {
  const tasksContainer = document.querySelector('#tasksContainer');

  const tasks = tasksContainer.querySelectorAll('.task');

  const newTask = creaetTaskHtml(task, true);

  if (tasks.length) {
    tasksContainer.insertAdjacentHTML('beforeend', newTask);
  } else {
    tasksContainer.innerHTML = newTask;
  }
}

export function renderUpdatedTask(task) {
  const taskContainer = document.querySelector(
    `[data-taskContainerId="${task.id}"]`
  );

  taskContainer.insertAdjacentHTML('afterend', creaetTaskHtml(task));

  taskContainer.remove();
}
