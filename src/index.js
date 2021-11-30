/* eslint-disable linebreak-style */
import './style.css';

function getComponent() {
  return import('lodash')
    .then(({ default: _ }) => {
      const element = document.createElement('div');

      element.innerHTML = _.join(['Hello', 'webpack'], ' ');

      return element;
    })
    .catch(() => 'An error occurred while loading the component');
}

getComponent().then((component) => {
  document.body.appendChild(component);
});