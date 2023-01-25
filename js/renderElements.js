import * as elements from './createElements.js';
import {getStorage, user} from './storage.js';
import {
  createNewTaskRow,
  createStorageRow,
} from './createElements.js';
const renderTasks = (arrayObj) => {
  arrayObj.map((item) => createStorageRow(item, arrayObj.indexOf(item)));
};
export const renderNewTask = (arrayObj) => {
  arrayObj.map((item) => (
    item.id === user.lastNewTask ?
      createNewTaskRow(item, arrayObj.indexOf(item)) : {}),
  );
};

export const disableSubmitBtn = () => {
  if (elements.formControl.value !== '') {
    elements.submitBtn.removeAttribute('disabled');
  } else {
    elements.submitBtn.setAttribute('disabled', 'disabled');
  }
};

const updateRowOrder = () => {
  const allTr = document.querySelectorAll('tr');
  [...allTr].forEach((item, index, array) =>
    item.firstElementChild.textContent = `${index++}`);
  // for (let i = 0; i < allTr.length; i++) {
  //   allTr[i].firstElementChild.textContent = `${i++}`  };
};

export const removeRow = (rowToDelete) => {
  const idToDel = rowToDelete.dataset.id;
  rowToDelete.remove();
  updateRowOrder();
  return idToDel;
};
export const renderFinishRow = (finishRow) => {
  finishRow.className = 'table-success';
  finishRow.children[1].classList.replace(
      'task', 'text-decoration-line-through');
  finishRow.children[2].innerText = 'Выполнено';
};

export const enableEditRow = (editRow) => {
  if (!editRow.children[1].hasAttribute('contenteditable')) {
    editRow.children[1].setAttribute(
        'contenteditable', 'true');
    editRow.children[1].focus();
    editRow.children[3].children[2].classList.replace(
        'btn-primary', 'btn-warning');
    editRow.children[3].children[2].innerText = 'Cохранить';
  } else {
    editRow.children[1].removeAttribute(
        'contenteditable');
    editRow.children[3].children[2].classList.replace(
        'btn-warning', 'btn-primary');
    editRow.children[3].children[2].innerText = 'Редактировать';
    return editRow.children[1].innerText;
  }
};

export const renderDom = () => {
  elements.appContainer.append(elements.h3, elements.form,
      elements.tableWrapper);
  elements.formGroup.append(elements.formControl);
  elements.formGroup2.append(elements.selectUrgency);
  elements.form.append(elements.formGroup, elements.formGroup2,
      elements.submitBtn, elements.resetBtn);
  elements.tableWrapper.append(elements.table);
  renderTasks(getStorage(user.name));
};
