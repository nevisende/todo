/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
import './normalize.css';
import './style.css';

const toDoInput = document.getElementById('todo');
const listElement = document.querySelector('.todo-list');
const clearAll = document.getElementById('clear-all');
const refreshIcon = document.querySelector('.fa-sync');

class todoObject {
  constructor(checked, description, index) {
    this.checked = checked;
    this.description = description;
    this.index = index;
  }

  static getObject(checked, description, index) {
    return { checked, description, index };
  }
}

function showInList(toDo) {
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

function showAllList() {
  listElement.innerHTML = '';
  const toDoListStorage = JSON.parse(localStorage.getItem('toDoListStorage')) || [];
  toDoListStorage.forEach((toDo) => {
    showInList(toDo);
  });
}

function addToDo() {
  const toDoListStorage = JSON.parse(localStorage.getItem('toDoListStorage')) || [];
  const toDo = todoObject.getObject(false, toDoInput.value, (toDoListStorage.at(-1)?.index || 0) + 1);
  showInList(toDo);
  toDoListStorage.push(toDo);
  localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
  toDoInput.value = '';
}

function updateDescription(toDoListStorage) {
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

function loopCheckBoxes(toDoListStorage) {
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

function getToDoListStorage() {
  const toDoListStorage = JSON.parse(localStorage.getItem('toDoListStorage')) || [];
  return toDoListStorage;
}

function deleteToDoList(toDoListStorage) {
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
      localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
      iTrashElement.parentElement.style.display = 'none';
    });
  });
}

function deleteAll() {
  const toDoListStorage = [];
  localStorage.setItem('toDoListStorage', JSON.stringify(toDoListStorage));
  showAllList();
}

function focusElements() {
  const listElements = document.querySelectorAll('.todo-list li');

  listElements.forEach((listElement) => {
    const inputElement = listElement.querySelector('[name="input-list"]');
    const iElement = listElement.querySelector('i');
    const iEllipsisElements = listElement.querySelectorAll('.fa-ellipsis-v');

    inputElement.addEventListener('focusin', () => {
      listElement.classList.add('active');
      iElement.classList.replace('fa-ellipsis-v', 'fa-trash-alt');
      listElement.querySelector('.fa-trash-alt').addEventListener('click', deleteToDoList());
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

function main() {
  deleteToDoList(getToDoListStorage());
  updateDescription(getToDoListStorage());
  loopCheckBoxes(getToDoListStorage());
  focusElements();
}

document.body.onload = () => {
  showAllList();
  main();

  toDoInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      addToDo();
    }
    main();
  });

  clearAll.addEventListener('click', (e) => {
    e.preventDefault();
    deleteAll();
  });

  refreshIcon.addEventListener('click', () => {
    location.reload();
  });
};