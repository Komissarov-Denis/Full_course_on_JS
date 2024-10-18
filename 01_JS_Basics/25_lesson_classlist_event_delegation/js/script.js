// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const btn = document.querySelectorAll('button'), // выбираем через селектор тега и делегируем свойства его классам:
	wrapper = document.querySelector('.btn-block');

console.log(btn[0].classList); // так как у псевдомассива нет свойства classList, обратились к конкретному элементу по индексу и получил свойство: classList
console.log(btn[0].classList.length); // получил: 2 (length - длинна или количество элементов в массиве)
console.log(btn[0].classList.item(0)); // метод item(0) позволяет получать класс элемента под индексом 0: blue !!!
console.log(btn[0].classList.item(1)); // класс элемента под индексом 1: some !!!
console.log(btn[0].classList.add('red')); // метод add('class') позволяет добавлять выбранному элементу новый класс!!!
console.log(btn[2].classList.add('blue', 'ertrert', 'pop')); // через запятую можно добавлять несколько классов
console.log(btn[0].classList.remove('blue')); // метод remove('class') позволяет удалять у выбранного элемента класс!!!
console.log(btn[0].classList.toggle('some')); // метод toggle('class') позволяет переключать или удалять у выбранного элемента класс, если он есть и наоборот !!!
console.log(btn[0].classList.toggle('some')); // теперь он добавился!!!! КРАЙНЕ КРУТОЕ СВОЙСТВО!!!

// условие if contains('class') - позволяет проверять наличие класса на элементе и, в случае true, выполняет действия
console.log(btn[1].classList.add('red'));
if (btn[1].classList.contains('red')) {
	console.log('red');
	console.log(btn[1].classList.toggle('some2'));
}

btn[3].addEventListener('click', () => { // обращаемся к кнопке 4, назначаем обработчик события addEventListener по КЛИКУ кнопки мыши
	if (!btn[6].classList.contains('red')) { // если у 7 кнопки нет класса red
		console.log(btn[6].classList.add('red')); // можно тут использовать add('class) - добавляем red класс
	} else { // иначе - если класс есть, то удаляем этот класс
		console.log(btn[6].classList.remove('red')); // можно тут использовать remove('class)
	}
});

// вариант с методом toggle гораздо более короткий и оптимальный, но в сложных скриптах не всегда применим!!!!
btn[3].addEventListener('click', () => {
	console.log(btn[6].classList.toggle('red'));
});

// ДЕЛЕГИРОВАНИЕ СОБЫТИЙ - ОДНО И ТОЖЕ СОБЫТИЕ НАЗНАЧАЕТСЯ СРАЗУ НЕСКОЛЬКИМ ЭЛЕМЕНТАМ ЧЕРЕЗ РОДИТЕЛЯ ЭЛЕМЕНТОВ, экономит размер скрипта!!!
wrapper.addEventListener('click', (event) => { // делегировали всем кнопкам, (event) - содержит всю информацию о элементе, на котором происходит событие
	if (event.target && event.target.tagName == 'BUTTON') { // просматриваем событие event.target на существование в качестве объекта, находим свойство кнопки button tagName: 'BUTTON'
		console.dir(event.target); // event.target поддерживает событие клика
		console.log('Hello!');
	}
});

wrapper.addEventListener('click', (event) => { // делегировали всем кнопкам с классом red
	console.dir(event.target);
	if (event.target && event.target.classList.contains('red')) { // просматриваем событие event.target на существование в качестве объекта, находим свойство кнопки button tagName: 'BUTTON'
		console.log('Hello2!');
	}
});


// без делегирования события, кнопка 8NEW не выводит сообщения, так как динамическая верстка выводит ее после данного скрипта, это может вызвать ошибку!!!
const btns = document.querySelectorAll('button');
btns.forEach(btn => {
	btn.addEventListener('click', () => {
		console.log('Hello, Den!');
	});
});

wrapper.addEventListener('click', (event) => {
	console.dir(event.target); // просматриваем событие event.target на существование в качестве объекта, находим свойство кнопки button tagName: 'BUTTON'
	if (event.target && event.target.matches('button.blue')) { // более продвинутое делегирование, метод matches ищет совпадения тегов button с классами blue
		console.log('Hello!');
	}
});
const btnNew = document.createElement('button');
btnNew.classList.add('blue'); // назначаем класс
wrapper.append(btnNew); // так как wrapper динамический элемент, мы пользуемся методом append('') для добавления новой кнопки в обертку
btnNew.textContent = '8 NEW'; // добавляем текст в выбранную новую кнопку