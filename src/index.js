/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
import './normalize.css';
import './style.css';
import main, {
  addToDo, deleteAllChecked, getToDoListStorage, showAllList,
} from './main.js';

const toDoInput = document.getElementById('todo');
const clearAll = document.getElementById('clear-all');
const refreshIcon = document.querySelector('.fa-sync');

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
    deleteAllChecked(getToDoListStorage());
  });

  refreshIcon.addEventListener('click', () => {
    location.reload();
  });
};