import { getActiveTasks, getArchiveTasks } from './api/task';
import { getUser } from './api/user';
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
  renderActiveTaskLoader();

  const activeTasks = await getActiveTasks();

  renderActiveTasks(activeTasks);
}

async function getAndRenderArchiveTasks() {
  renderArchiveTaskLoader();

  const archiveTasks = await getArchiveTasks();

  renderArchiveTasks(archiveTasks);
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

    const addTaskButton = document.querySelector('#addTaskButton');
    const activeTasksContainer = document.querySelector('#tasksContainer');
    const archiveTasksContainer = document.querySelector(
      '#archiveTasksContainer'
    );

    addTaskButton.addEventListener('click', () => openTaskModal());
    activeTasksContainer.addEventListener('click', onActiveTasksContainerClick);
    archiveTasksContainer.addEventListener(
      'click',
      onArchiveTasksContainerClick
    );
  } catch (error) {
    console.log('error', error);
  }
}

start();
