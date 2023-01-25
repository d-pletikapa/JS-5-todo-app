import {appContainer, createElem} from './createElements.js';
import {user} from './storage.js';
import {init} from './index.js';

export const renderModal = () => {
  const modalOverlay = createElem(
      'div',
      ['crm-modal-window', 'show'],
      '',
      '',
  );
  modalOverlay.style.display = ' flex';
  modalOverlay.style.height = '100%';
  modalOverlay.style.width = '100%';
  modalOverlay.style.transform = 'translate(0%, 100%)';

  modalOverlay.insertAdjacentHTML('afterbegin', `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Привет Гость!</h5>
<!--        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>-->
      </div>
      <div class="modal-body">
<!--action="https://jsonplaceholder.typicode.com/posts" method="POST" enctype="application/x-www-form-urlencoded"-->
      <form class="crm-modal-window__form" id="crm-modal-window__form">
      <fieldset class="crm-modal-window__list">
        <label class="crm-modal-window__item crm-modal-window__item--username">
          <span class="crm-modal-window__legend-username">Логин:</span>
          <input name="user-name" type="text" required="required">
        </label>
      </fieldset>
      </form>

      </div>
      <div class="modal-footer">
<!--        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>-->
        <button type="submit" class="btn btn-primary" form="crm-modal-window__form">Войти</button>
      </div>
    </div>
  </div>
`);
  appContainer.before(modalOverlay);
  const formModal = document.querySelector('.crm-modal-window__form');
  formModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    user.name = (formData.get('user-name'));
    formModal.reset();
    modalOverlay.classList.add('modal');
    init();
  });
};
