// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// взять элемент и поменять класс у его родителя

// метод обращения к внутреним узлам родителя
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(document.body.childNodes);
console.log(document.body.firstChild);
console.log(document.body.lastChild);
console.log(document.body.firstElementChild);
console.log(document.body.lastElementChild);

// метод обращения к внутреним узлам любого элемента
console.log(document.querySelector('#current').parentNode); // родительский узел дочернего current
console.log(document.querySelector('#current').parentNode.parentNode);
console.log(document.querySelector('#current').parentElement);

// "<li data-current="3">3</li>" - дата атрибуты "data"-основная;
// "-current="3"-произвольная по смыслу, ' ="3" или = true'
console.log(document.querySelector('[data-current="3"]'));
console.log(document.querySelector('[data-current="3"]').nextSibling);
console.log(document.querySelector('[data-current="3"]').previousSibling);
console.log(document.querySelector('[data-current="3"]').nextElementSibling);
console.log(document.querySelector('[data-current="3"]').previousElementSibling);

for (let node of document.body.childNodes) {
  if (node.nodeName == '#text') {
    continue; // остановит выполнение оператора и при обнаружении '#text' и продолжит искать другие!!!
  }
  console.log(node);
}
