import { creaetTaskHtml } from './htmlTemplates';

export function renderNewTask(task) {
  const tasksContainer = document.querySelector('#tasksContainer');

  tasksContainer.insertAdjacentHTML('beforeend', creaetTaskHtml(task));
}
