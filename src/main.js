/* eslint-disable no-use-before-define *//* eslint-disable linebreak-style */
/* eslint-disable max-len */
export class todoObject {
  constructor(checked, description, index) {
    this.checked = checked;
    this.description = description;
    this.index = index;
  }

  static getObject(checked, description, index) {
    return { checked, description, index };
  }
}

export function getToDoListStorage() {
  const toDoListStorage = JSON.parse(localStorage.getItem('toDoListStorage')) || [];
  return toDoListStorage;
}

export function showInList(toDo) {
  const listElement = document.querySelector('.todo-list');

  let finishClass;
  let checked;
  if (toDo.checked === true) {
    finishClass = 'finish';
    checked = 'checked';
  } else {
    finishClass = '';
    checked = '';
  }
  const toDoElement = `<li class="${finishClass}">
                <input type="checkbox" name="list" ${checked}>
                <input type="text" name="input-list" value="${toDo.description}" id="${toDo.index}">
                <i class="fas fa-ellipsis-v"></i>
            </li>`;
  listElement.insertAdjacentHTML('beforeend', toDoElement);
}

export function showAllList() {
  const listElement = document.querySelector('.todo-list');
  listElement.innerHTML = '';
  const toDoListStorage = JSON.parse(localStorage.getItem('toDoListStorage')) || [];
  toDoListStorage.forEach((toDo) => {
    showInList(toDo);
  });
}

export function addToDo() {
  const toDoListStorage = JSON.parse(localStorage.getItem('toDoListStorage')) || [];
  const toDoInput = document.getElementById('todo');
  const length = (toDoListStorage[toDoListStorage.length - 1]?.index + 1) || 0;

  const toDo = todoObject.getObject(false, toDoInput.value, length);
  showInList(toDo);
  toDoListStorage.push(toDo);
  localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
  toDoInput.value = '';
}

export function deleteToDoList(toDoListStorage) {
  const iTrashElements = document.querySelectorAll('.fa-trash-alt');

  iTrashElements.forEach((iTrashElement) => {
    const inputElement = iTrashElement.parentElement.querySelector('[name="input-list"]');
    iTrashElement.addEventListener('click', () => {
      let index = 0;
      toDoListStorage.forEach((el, idx) => {
        if (el.index === +inputElement.id) {
          index = idx;
        }
      });
      toDoListStorage.splice(index, 1);
      toDoListStorage.forEach((el, index) => {
        el.index = index;
      });
      localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
      showAllList();
      main();
    });
  });
}

export function updateDescription(toDoListStorage) {
  const listElement = document.querySelector('.todo-list');
  const toDoList = listElement.querySelectorAll('li');
  toDoList.forEach((toDo) => {
    const inputInToDo = toDo.querySelector('[name="input-list"]');
    const indexFromInput = inputInToDo.id;
    inputInToDo.addEventListener('keyup', () => {
      toDoListStorage.forEach((el) => {
        if (+el.index === +indexFromInput) {
          el.description = inputInToDo.value;
          localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
        }
      });
    });
  });
}

export function loopCheckBoxes(toDoListStorage) {
  const checkBoxes = document.querySelectorAll('[name="list"]');

  checkBoxes.forEach((checkBox) => {
    const indexFromInput = checkBox.parentElement.querySelector('[name="input-list"]').id;

    updateDescription(toDoListStorage);

    checkBox.addEventListener('click', () => {
      if (checkBox.checked) {
        checkBox.parentElement.classList.add('finish');
        toDoListStorage.forEach((el) => {
          if (+el.index === +indexFromInput) {
            el.checked = true;
            localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
          }
        });
      } else {
        checkBox.parentElement.classList.remove('finish');
        toDoListStorage.forEach((el) => {
          if (+el.index === +indexFromInput) {
            el.checked = false;
            localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
          }
        });
      }
    });
  });
}

export function focusElements() {
  const listElements = document.querySelectorAll('.todo-list li');

  listElements.forEach((listElement) => {
    const inputElement = listElement.querySelector('[name="input-list"]');
    const iElement = listElement.querySelector('i');
    const iEllipsisElements = listElement.querySelectorAll('.fa-ellipsis-v');

    inputElement.addEventListener('focusin', () => {
      listElement.classList.add('active');
      iElement.classList.replace('fa-ellipsis-v', 'fa-trash-alt');
      listElement.querySelector('.fa-trash-alt').addEventListener('click', deleteToDoList(getToDoListStorage()));
    });

    inputElement.addEventListener('focusout', () => {
      listElement.classList.remove('active');
      iElement.classList.replace('fa-trash-alt', 'fa-ellipsis-v');
    });

    iEllipsisElements.forEach((iEllipsisElement) => {
      iEllipsisElement.addEventListener('click', () => {
        inputElement.focus();
      });
    });
  });
}

export default function main() {
  deleteToDoList(getToDoListStorage());
  updateDescription(getToDoListStorage());
  loopCheckBoxes(getToDoListStorage());
  focusElements();
}

export function deleteAllChecked(toDoListStorage) {
  const arr = toDoListStorage
    .filter((el) => el.checked === false)
    .map((el, index) => {
      el.index = index;
      return el;
    });
  localStorage.setItem('toDoListStorage', JSON.stringify(arr));
  showAllList();
  main();
}