/* eslint-disable linebreak-style */
import { updateDescription } from '../main.js';

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
  test('Should be edited with the updateDescription function', () => {
    page.once('load', () => console.log('Page loaded!'));

    document.body.innerHTML = ` <div id="todo">
         <span id="username" />
         <input type="text" value="Add To-do item for test" id="todo"/>
       <ul class="todo-list"><li class="">
                <input type="checkbox" name="list">
                <input type="text" name="input-list" data-test="one" value="asdas4" id="0">
                <i class="fas fa-ellipsis-v"></i>
            </li><li class="">
                <input type="checkbox" name="list">
                <input type="text" name="input-list" value="asdnmds" id="1">
                <i class="fas fa-ellipsis-v"></i>
            </li><li class="">
                <input type="checkbox" name="list">
                <input type="text" name="input-list" value="adnmadn" id="2">
                <i class="fas fa-ellipsis-v"></i>
            </li></ul>
      </div>`;
    const fakeListObj = [
      { checked: false, description: "asdas4ki", index: 0 },
      { checked: false, description: "asdas4k", index: 0 },
      { checked: false, description: "asdas4k", index: 0 },
    ];
    localStorage.setItem('toDoListStorage', JSON.stringify(fakeListObj));
    const storage = JSON.parse(localStorage.getItem('toDoListStorage')) ;
    updateDescription(storage);
    document.querySelector('[data-test="one"]').value = 'Changed';
    
    
    console.log(document.querySelector('#todo').querySelector('[data-test="one"]').value )
    expect(JSON.parse(localStorage.getItem('toDoListStorage'))[0].description).toBe('Changed');
  });
});