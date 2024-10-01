import { getActiveTasks, getArchiveTasks } from './api/task';
import { getUser } from './api/user';
import { errorHandler } from './utils/errorHandler';
import { onLogoutButtonClick } from './utils/logoutHandler';
import {
  renderActiveTaskLoader,
  renderActiveTasks,
  renderArchiveTaskLoader,
  renderArchiveTasks,
  renderUser,
} from './utils/renders';
import { openTaskModal } from './utils/taskModalHandlers';
import {
  onActiveTasksContainerClick,
  onArchiveTasksContainerClick,
} from './utils/tasksContainerHandlers';

function removeUserLoader() {
  const loader = document.querySelector('#loader').remove();

  if (loader) {
    loader.remove();
  }
}

async function getAndRenderActiveTasks() {
  try {
    renderActiveTaskLoader();

    const activeTasks = await getActiveTasks();

    renderActiveTasks(activeTasks);
  } catch (error) {
    errorHandler(error);
  }
}

async function getAndRenderArchiveTasks() {
  try {
    renderArchiveTaskLoader();

    const archiveTasks = await getArchiveTasks();

    renderArchiveTasks(archiveTasks);
  } catch (error) {
    errorHandler(error);
  }
}

async function start() {
  try {
    const user = await getUser();

    if (!user) {
      window.location.href = '/auth/login.html';
    }

    renderUser(user);

    removeUserLoader();

    await getAndRenderActiveTasks();

    await getAndRenderArchiveTasks();

    const logoutButton = document.querySelector('#logout-button');
    const addTaskButton = document.querySelector('#add-task-button');
    const activeTasksContainer = document.querySelector('#tasks-container');
    const archiveTasksContainer = document.querySelector(
      '#archive-tasks-container'
    );

    logoutButton.addEventListener('click', onLogoutButtonClick);
    addTaskButton.addEventListener('click', () => openTaskModal());
    activeTasksContainer.addEventListener('click', onActiveTasksContainerClick);
    archiveTasksContainer.addEventListener(
      'click',
      onArchiveTasksContainerClick
    );
  } catch (error) {
    errorHandler(error);
  }
}

start();
