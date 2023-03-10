import * as elements from './createElements.js';
import {
  createFormDataTask,
  getStorage, modifyStorage,
  removeStorage,
  user,
  getValueInStorage,
} from './storage.js';
import {
  renderNewTask,
  disableSubmitBtn,
  removeRow,
  renderFinishRow, enableEditRow, renderUnFinishRow,
} from './renderElements.js';
import {table} from './createElements.js';


export const initEvents = () => {
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createFormDataTask(formData);
    renderNewTask(getStorage(user.name));
    elements.form.reset();
    disableSubmitBtn();
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && e.target !== elements.formControl) {
      elements.submitBtn.click();
    }
  });

  elements.formControl.addEventListener('input', (e) => {
    disableSubmitBtn();
  });


  table.addEventListener('click', (e) => {
    const target = e.target;
    if (target === target.closest('.btn-danger')) {
      const thisRow = target.closest('tr');
      confirm('Вы действительно хотите удалить зачаду?') ?
        removeStorage(user.name, removeRow(thisRow)) : {};
    } else if (target === target.closest('.btn-success')) {
      const thisRow = target.closest('tr');
      if (getValueInStorage(
          user.name,
          thisRow.dataset.id,
          'status') === 'В процессе') {
        renderFinishRow(thisRow);
        modifyStorage(user.name, thisRow.dataset.id,
            'Выполнено', undefined);
      } else {
        const currentUrgencyStatus = getValueInStorage(
            user.name,
            thisRow.dataset.id,
            'urgency');
        renderUnFinishRow(thisRow, currentUrgencyStatus);
        modifyStorage(user.name, thisRow.dataset.id,
            'В процессе', undefined);
      }
    } else if (target === target.closest('.btn-primary') ||
      target === target.closest('.btn-warning')) {
      const thisRow = target.closest('tr');
      const newText = enableEditRow(thisRow);
      modifyStorage(user.name, thisRow.dataset.id,
          undefined, newText);
    }
  });
};
