'use strict';

// КОД не удаляемый сборщиком мусора:

function func() {
	window.smth = 'string'; // window.smth - глобальная переменная не может быть удалена сборщиком мусора, если прописана таким образом с директивой 'use strict'!!!
}


const someResult = getData(); // ресурсы, которые получены с помощью определенной функции, например от сервера или другой функции
const node = document.querySelector('.class'); // получен элемент со страницы
setInterval(function() { // запускаем setInterval()
	if (node) { // если элемент node на странице существует
		node.innerHTML = someResult; // то, в элемент node будем записывать какой-то результат someResult
	}
}, 1000); // интервал запускается каждую 1 сек, это может забивать оперативную память ненужными таймерами, потому лучше останавливать все ненужное!!!


function outer() { // внешняя функция
	const potentiallyHugeArray = []; // потенциальный крупный массив с данными
	return function inner() { // внутренняя функция, которая возвращается из внешней
		potentiallyHugeArray.push('Hello'); // пушим туда данные
		console.log('Hello'); // выводим запушенное
	};
}
const sayHello = outer(); // переменная записывает в себя данные расчетов функции inner(), в sayHello находяится через замыкание ссылка на potentiallyHugeArray[], который все время будет находиться в памяти, что приведет к её утечке!!!


function createElement() { // запуск функции по созданию нового элемента
	const div = document.createElement('div'); // создается блок
	div.id = 'test'; // назначается ему id => 'test'
	document.body.append(div); // помещаем данную переменную на страницу, когда функция закончит работу, то все, что в createElement() будет удалено сборщиком мусора, что не даст утечку памяти
}
createElement();
function deleteElement() {
	document.body.removeChild(document.getElementById('test'));
}
deleteElement();