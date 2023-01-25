export const appContainer = document.querySelector('.app-container');
appContainer.classList.add('vh-100', 'w-100', 'd-flex',
    'align-items-center', 'justify-content-center', 'flex-column');
export const insertText = (elem, innerText) => {
  elem.innerText = `${innerText}`;
};
export const createElem = (tagName, classesNames, type, innerText) => {
  const elem = document.createElement(tagName);
  // classesNames.forEach(className => elem.classList.add(className));
  classesNames ? elem.classList.add(...classesNames) : {};
  type ? elem.setAttribute('type', type) : {};
  innerText ? insertText(elem, innerText) : {};
  return elem;
};

export const h3 = createElem(
    'h3',
    '',
    '',
    'Todo App');
export const form = createElem(
    'form',
    ['d-flex', 'align-items-center', 'mb-3'],
    '',
    '');
export const tableWrapper = createElem(
    'div',
    ['table-wrapper'],
    '',
    '');
export const formGroup = createElem(
    'label',
    ['form-group', 'me-3', 'mb-0'],
    '',
    '');
export const formControl = createElem(
    'input',
    ['form-control'],
    'text',
    '');
formControl.setAttribute('placeholder', 'ввести задачу');
formControl.setAttribute('name', 'task');
formControl.setAttribute('required', 'required');

export const formGroup2 = createElem(
    'label',
    ['form-group', 'me-3', 'mb-0'],
    '',
    '');
export const selectUrgency = createElem(
    'select',
    ['form-select', 'form-select-me', 'me-3', 'mb-0'],
    '',
    '',
);
selectUrgency.required = true;
selectUrgency.setAttribute('name', 'urgency');
selectUrgency.insertAdjacentHTML('afterbegin', `
    <option value="" selected>Выбрать...</option>
    <option value="table-light">Обычная</option>
    <option value="table-warning">Важная</option>
    <option value="table-danger">Срочная</option>
`);

export const submitBtn = createElem(
    'button',
    ['btn', 'btn-primary', 'me-3'],
    'submit',
    'Сохранить');
submitBtn.setAttribute('disabled', 'disabled');
export const resetBtn = createElem(
    'button',
    ['btn', 'btn-warning'],
    'reset',
    'Очистить');

export const table = createElem(
    'table',
    ['table', 'table-hover', 'table-bordered'],
    '',
    '');
table.insertAdjacentHTML('afterbegin', `
        <thead>
          <tr>
            <th>№</th>
            <th>Задача</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody></tbody>
`);

export const createStorageRow = (obj, objIndex) => {
  const checkTaskStatus = (elem) => {
    if (elem === 'tr') {
      return obj.status === 'В процессе' ?
        `${obj.urgency}` : 'table-success';
    } else if (elem === 'td') {
      return obj.status === 'В процессе' ?
        'task' : 'text-decoration-line-through';
    }
  };
  checkTaskStatus();

  const newRow = createElem(
      'tr',
      [`${checkTaskStatus('tr')}`],
      '',
      '');
  newRow.dataset.id = `${obj.id}`;
  newRow.innerHTML = `
            <td>${objIndex + 1}</td>
            <td class="${checkTaskStatus('td')}">
              ${obj.task}
            </td>
            <td>${obj.status}</td>
            <td>
              <button class="btn btn-danger">
                Удалить
              </button>
              <button class="btn btn-success">
                Завершить
              </button>
              <button class="btn btn-primary">
                Редактировать
              </button>
            </td>`;
  table.children[1].append(newRow);
};

export const createNewTaskRow = (obj, objIndex) => {
  const newRow = createElem(
      'tr',
      [`${obj.urgency}`],
      '',
      '');
  newRow.dataset.id = `${obj.id}`;
  newRow.innerHTML = `
            <td>${objIndex + 1}</td>
            <td class="task">
              ${obj.task}
            </td>
            <td>${obj.status}</td>
            <td>
              <button class="btn btn-danger">Удалить</button>
              <button class="btn btn-success">Завершить</button>
              <button class="btn btn-primary">Редактировать</button>
            </td>`;
  table.children[1].append(newRow);
};

