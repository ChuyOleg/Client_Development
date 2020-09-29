'use strict';

const input = document.querySelector('input');
const button = document.all[7];
const div = document.all[8];

const startLine = div.textContent;

button.addEventListener('click', () => {
  const text = input.value;
  div.textContent = startLine + text;
});

