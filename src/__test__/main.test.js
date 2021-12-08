/* eslint-disable linebreak-style */
import { addToDo, showInList } from '../main.js';

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
});