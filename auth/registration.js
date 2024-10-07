import { registerWithGoogle } from '../api/user';
import { errorHandler } from '../utils/errorHandler';

async function onSubmit(event) {
  event.preventDefault();
  try {
    await registerWithGoogle();
  } catch (error) {
    errorHandler(error);
  }
}

async function start() {
  try {
    const registerButton = document.querySelector('#registerButton');

    registerButton.addEventListener('click', onSubmit);
  } catch (error) {
    errorHandler(error);
  }
}

start();
