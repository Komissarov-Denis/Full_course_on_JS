// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// КАЖДАЯ СУЩНОСТЬ НА html СТРАНИЦЕ ПО ФАКТУ ЯВЛЯЕТСЯ УЗЛОМ, НО НЕ КАЖДЫЙ УЗЕЛ БУДЕТ ЭЛЕМЕНТОМ, Т.Е. ВСЕ ЧТО В ТЕГАХ - ЭЛЕМЕНТЫ, ВСЕ ЧТО В ТОМ ЧИСЛЕ НЕ ВИДИМО (ПЕРЕНОС СТРОКИ, ТЕКСТОВЫЕ НАДПИСИ) - УЗЛЫ!!!

// МЕТОДЫ ОБРАЩЕНИЯ К ВНУТРЕННИМ УЗЛАМ РОДИТЕЛЯ - ПОЗВОЛЯЕТ ВЗЯТЬ ЭЛЕМЕНТ И ПОМЕНЯТЬ КЛАСС У ЕГО РОДИТЕЛЯ!!!
console.log(document.documentElement); // предоставляет доступ к тегу <html lang="en"> и его содержимому
console.log(document.head); // предоставляет доступ к тегу <head> и его содержимому
console.log(document.body); // предоставляет доступ к тегу <body> и его содержимому
console.log(document.body.childNodes); // предоставляет доступ к наследуемым узлам родительского тега <body> и их содержимому: (NodeList(6) [text, div.wrapper, text, comment, text, script])
console.log(document.body.firstChild); // предоставляет доступ к первому наследуемому узлу родительского тега <body> и его содержимому: (#text) - это перенос строки, текстовая нода
console.log(document.body.lastChild); // предоставляет доступ к последнему наследуемому узлу родительского тега <body> и его содержимому: (<script src="js/script.js"></script>)
console.log(document.body.firstElementChild); // предоставляет доступ к первому наследуемому елементу родительского тега <body> и его содержимому: (<div class="wrapper"></div>)
console.log(document.body.lastElementChild); // предоставляет доступ к последнему наследуемому елементу родительского тега <body> и его содержимому: (<script src="js/script.js"></script>)

// МЕТОД ОБРАЩЕНИЯ К ВНУТРЕННИМ УЗЛАМ ЛЮБОГО ЭЛЕМЕНТА!!!
console.log(document.querySelector('#current').parentNode); // предоставляет доступ к родительскому узлу дочернего #current и его содержимому: (div.first)
console.log(document.querySelector('#current').parentNode.parentNode); // предоставляет доступ к родительскому узлу родительского узла (выше на уровень) дочернего #current и его содержимому: (div.wrapper)
console.log(document.querySelector('#current').parentElement); // предоставляет доступ к родительскому элементу дочернего #current и его содержимому: (<div class="first"></div>)

// ПРИМЕНЕНИЕ ДАТА АТРИБУТОВ!!!
// "<li data-current="3">3</li>" - дата атрибуты "data"- основная; "-current" - именование произвольное по смыслу блока, ' ="3" или = true'
console.log(document.querySelector('[data-current="3"]')); // предоставляет доступ к элементу [data-current="3"] и его содержимому: (<li data-current="3">3</li>) 
console.log(document.querySelector('[data-current="3"]').nextSibling); // предоставляет доступ к последующему братскому узлу [data-current="3"] и его содержимому: (#text) - это перенос строки, текстовая нода
console.log(document.querySelector('[data-current="3"]').previousSibling); // предоставляет доступ к предыдущему братскому узлу [data-current="3"] и его содержимому: (#text) - это перенос строки, текстовая нода
console.log(document.querySelector('[data-current="3"]').nextElementSibling); // предоставляет доступ к последующему братскому элементу [data-current="3"] и его содержимому: (<li>4</li>)
console.log(document.querySelector('[data-current="3"]').previousElementSibling); // предоставляет доступ к предыдущему братскому элементу [data-current="3"] и его содержимому: (<li>2</li>)

// МЕТОД for(...of...)!!!
for (let node of document.body.childNodes) {
	if (node.nodeName == '#text') {
		continue; // остановит выполнение оператора при обнаружении '#text' и продолжит искать другие!!!
	}
	console.log(node);
}