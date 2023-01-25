import {renderDom} from './renderElements.js';
import {user, createUserData} from './storage.js';
import {initEvents} from './createEvents.js';
import {renderModal} from './modal.js';

renderModal();
export const init = () => {
  createUserData(user.name);
  renderDom();
  initEvents();
};
  // document.addEventListener('DOMContentLoaded', init);


