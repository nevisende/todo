/* eslint-disable linebreak-style */
import $ from 'jquery';
import { deleteToDoList, addToDo, showInList } from '../main.js';

jest.mock('../main', () => {
  const originalModule = jest.requireActual('../main');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked default'),
    showInList: '<input type="text" name="input-list" value="Add To-do item for test" id="todo" id="0">'
    ,
  };
});

describe('To-do test', () => {
  test('should added to localStorage ', () => {
    document.body.innerHTML = '<div id="todo">'
      + '  <span id="username" />'
      + '  <input type="text" value="Add To-do item for test" id="todo"/>'
      + '  <ul class="todo-list"></ul>'
      + '</div>';
    addToDo();
    expect(JSON.parse(localStorage.getItem('toDoListStorage'))).toHaveLength(1);
    expect(showInList).toMatch(/Add To-do item for test/);
  });

  test('should delete from local storage', () => {
    document.body.innerHTML = '<div id="todo">'
    + '  <span id="username" />'
    + '  <input type="text" value="Remove to-do item for test" id="todo"/>'
    + '  <ul class="todo-list"><li> <input name="input-list" id="0"/> <i class="fas fa-trash-alt" id= "delete"></i></li>    </i></ul>'
    + '</div>';
    const storage = JSON.parse(localStorage.getItem('toDoListStorage'));

    deleteToDoList(storage);
    $('#delete').click();

    expect(JSON.parse(localStorage.getItem('toDoListStorage'))).toHaveLength(0);
  });
});