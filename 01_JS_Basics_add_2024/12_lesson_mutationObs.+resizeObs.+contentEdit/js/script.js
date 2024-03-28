'use strict';

// MutationObserver() - технология внесения изменений непосредственно в браузере пользователем, она настраивается (https://developer.mozilla.org/ru/docs/Web/API/MutationObserver) =>
// => срабатывает после внесенных изменений и получаем массив всех внесенных изменений

const box = document.querySelector('.this');
console.log(box);
let observer = new MutationObserver(mutationRecords => { // в новый конструктор new MutationObserver() передаем колбэк функцию mutationRecords для отслеживания изменений и выводим в консоль
	console.log(mutationRecords);
});
observer.observe(box, {
	childList: true, // ноду переводим в true для отслеживания на ней
}); // в переменную observer передали метод observe() с двумя аргументами: box как элемент событий, второй - объект со списком настроек тех узлов/node, которые будем отслеживать 

observer.disconnect(); // данный метод отключает MutationObserver()

// ResizeObserver() - технология внесения изменений непосредственно в браузере пользователем на размеры элементов и работает по подобному принципу 
// https://www.youtube.com/watch?v=M2c37drnnOA&ab_channel=WebDevSimplified