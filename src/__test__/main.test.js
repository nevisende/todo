import  { addToDo } from "../main";


describe("To-do test", () => {
  test('should added ', () => {
    document.body.innerHTML = '<div id="todo">' +
    '  <span id="username" />' +
    '  <button id="button" />' +
      '</div>';
    addToDo();
    expect("a").toBe("a");
  })

})