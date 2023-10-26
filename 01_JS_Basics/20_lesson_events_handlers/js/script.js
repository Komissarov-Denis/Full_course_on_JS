// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';


// ОБработчик события - это функция, которая срабатывает как только событие произошло
// <button onclick="alert('Click')" id="btn">Нажми меня</button>
// <!-- onclick - обработчик событий, alert - функция

const btn = document.querySelector('button');
btn.onclick = function() {
  alert('Click');
}; // неудачный пример, в результате которого может поломаться функционал!!!
btn.onclick = function() {
  alert('Second click');
};
// самый оптимальный вариант: =>
btn.addEventListener('click', function() {
  alert('Click');
});// click - аргумент, function - коллбэк ф-ция!!!
btn.addEventListener('click', function() {
  alert('Second click');
});// события в JS выполняюися по порядку поступления

btn.addEventListener('mouseenter', function(event) {
  console.log(event); // (event) или (е) - событие отрабатывает при наведении мыши!!!!
  console.log(event.target); // по (event.target) получаем доступ к объекту
  event.target.remove(); // удаляет элемент при наведении
  // console.log('Hover');
});

btn.addEventListener('click', function(event) {
  console.log(event); // (event) или (е) - событие отрабатывает при клике мыши!!!!
  console.log(event.target); // по (event.target) получаем доступ к объекту
  event.target.remove(); // удаляет элемент при клике
  // console.log('Hover');
});

let i = 0;
const deleteElement = function(e) {
  console.log(e.target);
  i++;
  if (i == 1) {
    btn.removeEventListener('click', deleteElement); // обработчик применяемый только раз с последующим удалением
  }
};
btn.addEventListener('click', deleteElement);

const btn2 = document.querySelector('button');
const overlay = document.querySelector('.overlay');
const deleteElement = function(e) {
  console.log(e.currentTarget);
  console.log(e.type);
};
btn2.addEventListener('click', deleteElement);
overlay.addEventListener('click', deleteElement);
// ВСПЛЫТИЕ СОБЫТИЙ - ЭТО КОНДА ОБРАБОТЧИК ОТРАБАТЫВАЕТ НА САМОМ ЭЛЕМЕНТЕ,
// ПОТОМ НА РОДИТЕЛЕ, ПОТОМ НА УРОВНИ ВЫШЕ И ВЫШЕ ПО ИЕРАРХИИ!!!

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.preventDefault(); // для отмены стандартного поведения!!!!
  // ПОМЕЩАЕТСЯ В САМОЕ НАЧАЛО КОДА ОБРАБОТЧИКА СОБЫТИЙ!!!!
  // в данно случае не переход по ссылке, а вывод в консоль!
  console.log(e.target);
});

// навесить функцию на множество элементов:
const deleteElement2 = function(e) {
  console.log(e.currentTarget);
  console.log(e.type);
};
const btns = document.querySelectorAll('button');
btns.forEach(btn => {
  btn.addEventListener('click', deleteElement2, { once: true }); // {once: true} - опции события!!!
});
