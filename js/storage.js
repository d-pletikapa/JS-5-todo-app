export const user = {
  name: null,
};

export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const addStorage = (key, newObj) => {
  const data = getStorage(key);
  data.push(newObj);
  setStorage(key, data);
};
export const removeStorage = (key, taskId) => {
  let data = getStorage(key);
  data = data.filter(item => item.id !== taskId);
  localStorage.removeItem(key);
  setStorage(key, data);
};

export const createUserData = (userName) => {
  if (!localStorage[`${userName}`]) {
    setStorage(userName, []);
  }
};

export const createFormDataTask = (formData) => {
  const newTask = Object.fromEntries(formData);
  newTask.id = Math.random().toString().substring(2, 10);
  newTask.status = 'В процессе';
  user.lastNewTask = newTask.id;
  addStorage(user.name, newTask);
};

export const getValueInStorage = (key, taskId, propertyToCheck) => {
  let value;
  getStorage(key).forEach((item) => {
    item.id === taskId && (value = item[`${propertyToCheck}`]);
  });
  return value;
};

export const modifyStorage = (key, taskId, newStatus, newText) => {
  const data = getStorage(key);
  if (newStatus) {
    data.forEach(item => (item.id === taskId ? item.status = newStatus : {}));
    localStorage.removeItem(key);
    setStorage(key, data);
  } else if (newText) {
    data.forEach(item => (item.id === taskId ? item.task = newText : {}));
    localStorage.removeItem(key);
    setStorage(key, data);
  }
};
