// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const box = document.getElementById('box');
const btns = document.getElementsByTagName('button');
const circles = document.getElementsByClassName('circle');
const hearts = document.querySelectorAll('.heart');
// const oneHeart = document.querySelector('.heart');
const num = 200;
const width = 150;
const heigth = 100;

// console.dir(box); // можно вывести элемент в качестве объекта!!!

box.style.backgroundColor = 'blue';
box.style.width = '500px'; // принцип работы с INLINESTYLES, они имеют самый ВЫСОКИЙ ПРИОРИТЕТ!!!
btns[1].style.borderRadius = '100%';
circles[1].style.backgroundColor = 'red';
box.style.cssText = 'background-color: green; width: 650px'; // можно передавать сразу несколько CSS свойств через CSS текст
box.style.cssText = `background-color: green; width: ${num}px`; // можно передавать переменные

// for (let i = 0; i < hearts.length; i++) { // цикл работает пока все элементы массива будут перебраны
//   hearts[i].style.backgroundColor = 'blue'; // но они практически не используются, взмен есть методы!!! =>
// }

// МЕТОД forEach(item, i, arr)
hearts.forEach(item => { // идут аргументы: item, затем номер по порядку i, затем ссылка на перебираемый массив arr!!!
	item.style.backgroundColor = 'blue';
});

// МЕТОДЫ ФОРМИРОВАНИЯ СТРАНИЦЫ В JS
const divBlack = document.createElement('div'); // создание блока внутри JS файла и на странице он не появится, только по факту выполнения JS!!!
const text = document.createTextNode('Тут был я!'); // создние текстового узла в JS файле, используется крайне редко
console.log(text);
divBlack.classList.add('div__black'); // добавляем классы к блоку
document.body.append(divBlack); // добавляем div в конец body
divBlack.style.cssText = `background-color: black; width: ${width}px`;
divBlack.style.height = `${heigth}px`;

const divRed = document.createElement('div');
divRed.classList.add('div__red'); // добавляем классы к блоку
divRed.style.cssText = `background-color: red; width: ${width}px`;
divRed.style.height = `${heigth}px`;

const wrapper = document.querySelector('.wrapper'); // выбираем div в wrapper
wrapper.append(divRed); // добавляем div в wrapper последним элементом
// wrapper.appendChild(divRed); // добавляем div в wrapper последним элементом УСТАРЕВШИЙ!!!
wrapper.prepend(divRed); // добавляем div в wrapper первым элементом

const divYellow = document.createElement('div');
divYellow.classList.add('div__yellow');
divYellow.style.cssText = `background-color: yellow; width: ${width}px`;
divYellow.style.height = `${heigth}px`;
hearts[1].before(divYellow); // добавляем div в hearts перед элементом
// wrapper.insertBefore(divYellow, hearts[1]); // добавляем div в hearts перед элементом УСТАРЕВШЕЕ!
hearts[1].after(divYellow); // добавляем div в hearts после элемента

circles[2].remove(); // удаление объектов по порядку
// wrapper.removeChild(hearts[1]); // удаление объектов по порядку УСТАРЕВШЕЕ!

hearts[1].replaceWith(circles[1]); // замещение одного предмета другим по порядку, указываем какой элемент меняем на какой элемент
// wrapper.replaceChild(circles[0], hearts[0]); // замещение одного предмета другим по порядку УСТАРЕВШЕЕ!

// ДОБАВЛЕНИЕ html КОД ИЛИ ТЕКСТ В ЭЛЕМЕНТЫ;
const divMod = document.createElement('div');
divMod.classList.add('div__mod'); // добавляем классы к блоку
document.body.append(divMod);
divMod.style.cssText = `width: ${width + 300}px`;
divMod.style.height = `${heigth + 30}px`;
divMod.innerHTML = 'Hello World!'; // добавляем текст в блок
divMod.innerHTML = '<p>Hello World!</p>'; // добавляем параграф в блок - только работа с HTML структурой!!!
divMod.textContent = 'Hello'; // применяем, когда хотим получить от пользователя ТОЛЬКО ТЕКСТ!!! Если ввести теги, то они будут выводиться как текст!!!
divMod.insertAdjacentHTML('beforebegin', '<h2>Hello!!!!</h2>'); // метод ставит код перед блоком
divMod.insertAdjacentHTML('afterbegin', '<h2>Bye!</h2>'); // метод ставит код в начале блока
divMod.insertAdjacentHTML('beforeend', '<h2>Hello!</h2>'); // метод ставит код в конце блока
divMod.insertAdjacentHTML('afterend', '<h2>Bye!!!!</h2>'); // метод ставит код после блока

// Если есть родительский блок в переменной, то обращаясь к нему можно получать все дочерние элементы блока
const wrapper2 = document.querySelector('.wrapper');
const hearts2 = wrapper2.querySelector('.hearts');
const oneHeart2 = wrapper2.querySelector('.heart');


const сarouselWrapper = document.createElement('div');
сarouselWrapper.classList.add('wrapper_crsl');
document.body.prepend(сarouselWrapper);
сarouselWrapper.style.cssText = 'display: flex; justify-content: center; align-items: center; margin: 0 auto; width: 1200px; height: 200px';
function inner() {	// динамическая система формирования структуры сайта
	сarouselWrapper.innerHTML = ` 
		<div class='сarousel'>1</div>
		<div class='сarousel'>2</div>
		<div class='сarousel'>3</div>
		<div class='replacer'>2</div>
		<div class='replacer'>2</div>	
		<div class='replacer'>2</div>	
	`;
}
inner();
const сarousel = document.querySelectorAll('.сarousel');
сarousel.forEach(item => {
	item.style.cssText = 'display: inline-block; margin: 10px; width: 100px; height: 100px; background-color: red';
});
const replacer = document.querySelectorAll('.replacer');
replacer.forEach(item => {
	item.style.cssText = 'display: inline-block; margin: 10px; width: 100px; height: 100px; background-color: green';
});
function replaced() {
	setTimeout(() => { 	
		for (let i = 0; i < 3; i++) { 
			setTimeout(() => { 
				сarousel[i].after(replacer[i]);
				// сarousel[i].after(replacer[i]);
				// сarousel[i].replaceWith(replacer[i]); 
			}, i * 2000); // устанавливаем задержку последовательных замен квадратов
		}
	}, 4000);		
}
replaced(); 
