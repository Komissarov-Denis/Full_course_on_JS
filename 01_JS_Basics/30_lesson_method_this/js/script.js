// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// КОНТЕКСТ ВЫЗОВА ФУНКЦИИ - THIS - это то, что окружает функцию и в каких условиях она вызывается!!!
// Например: БОМЖ - не имеет конкретного места жительства и может функционировать по всему миру, так как у него нет привязки к определенному месту!!!
// Но, если мы его поместим в спецучреждение, в котором он сможет чем-то заниматься, то он получит так называемый "контекст вызова", так как у него будет свое место функционирования!!!

function showThis() {
	console.log(this); // получаем: глобальный контекст WINDOW и работает правило без строгого режима // 'use strict';
} // в сторогом режиме получаем: undefined
showThis(); // если функция запускается без строгого режима, когда мы используем в ней контекст вызова, то этот контекст будет ссылаться на глобальный объект WINDOW{}


// 1) обычная функция this == window, но если стоит use strict => получаем: undefined!!!!
function showThis2(a, b) {
	console.log(this); // получаем: undefined
	function sum() {
		console.log(this); // получаем: undefined
		// return this.a + this.b; // получаем: Window и NaN некорректное поведение
		return a + b; // в связи с замыканием функции, функция sum() ищет переменные внутри себя, не найдя, обращается к родительской функции showThis2 и выполняет сложение
	}
	console.log(sum());
}
showThis2(4, 5);


// 2) методы объектов - также функции!!! КОНТЕКСТ у метода объекта - сам ОБЪЕКТ!!! Если использовать метод внутри объекта, то контекст вызова всегда будет ссылаться на этот объект!!!
const obj = {
	a: 20,
	b: 15,
	sum: function() {
		console.log(this); // получил: Object = {a: 20, b: 15, sum: ƒ}, т.е. если создать функцию внутри объекта => контекст в ней поменяется!!!
		function shout() { // функция внутри метода - просто функция!!!
			console.log(this); // получил: undefined - в данном случае, это простой вызов функции и он не относится к методу!!!
		}
		shout(); // функция внутри метода, поэтому КОНТЕКСТ вызова THIS она потеряла, причину СМ. пункт 1)!!!
	}
};
obj.sum();


// 3) ФУНКЦИЯ КОНСТРУКТОР - её вызов создаст новый ОБЪЕКТ!!! THIS в конструкторах и классах - это новый экземпляр объекта!!!
function User(name, id, age) { // для каждого пользователя будем указывать свой номер, возраст и имя!
	this.name = name; // все эти свойства из функции формируют конструктор, с помощью которого можно создавать новых пользователей!
	this.id = id; // тут прописываются свойства, которые обращаются к THIS.XXXX = XXXX и имеют значение!
	this.age = age;
	this.human = true;
	this.hello = function() { // также можно сюда добавлять методы
		console.log(`Hello ${this.name}!`); // в данном прототипе переменная с контекстом THIS ссылается на новый объект denis и его значения свойств!!!
	};
}
const denis = new User('Denis', 1, 43); // соответственно, командой NEW User() мы создаем новый объект denis и новые свойства с их значениями ('Denis', 1, 43) в него записываем,
console.log(denis); // т.е. THIS ВСЕГДА ССЫЛАЕТСЯ НА ЭКЗЕМПЛЯР new User('Denis', 1, 43) С ЕГО НОВЫМИ ЗНАЧЕНИЯМИ СВОЙСТВ!!!
// получил:
// User {
// 	name: 'Denis',
// 	id: 1,
// 	age: 43,
// 	human: true,
// 	hello: [Function (anonymous)]
// }


// 4) Ручное присвоение THIS любой функции методами call() и apply()
function sayName(surname) {
	console.log(this);
	console.log(this.name);
	console.log(this.name + ' ' + surname);
}
const user = {
	name: 'John'
};
sayName.call(user); // получил: { name: 'John' } John John undefined
sayName.apply(user); // получил: { name: 'John' } John John undefined, идентичные методы, указываем функции sayName обработать объект user и вывести значение свойства name
sayName.call(user, ' Smith'); // получил: { name: 'John' } John John  Smith, (call - вызывать)
sayName.apply(user, [' Smith']);  // получил: { name: 'John' } John John  Smith, разница в синтаксисе (apply - применить)

// 4) Ручное присвоение THIS любой функции методом bind() - создает новую функцию, связанную с новым контекстом (bind - связывать)
function count(num) {
	return this * num; // return() возвращает вычисления за рамки функции
}
const double = count.bind(2); // double - это новая функция, у которой есть привязанный контекст this == 2, ЧАСТО ПРИМЕНЯЕТСЯ В БИБЛИОТЕКЕ REACT!!!
console.log(double(3)); // получаем: 6, теперь в фукцию double мы можем передавать только один аргумент (3) и (13), который будет всегда удваиваться!!!
console.log(double(13)); // получаем: 26

const btn = document.querySelector('button');
btn.addEventListener('click', function() { // когда обработчик события назначен в классическом варианте function() {}, контекстом вызова будет сам элемент события:
	console.log(this); // получаем <button type="button">Click</button>, т.е. this == <button type="button">Click</button>
	this.style.backgroundColor = 'red';
});

const btn2 = document.querySelector('button');
btn2.addEventListener('click', () => {
	console.log(this); // получаем: window - как некорректного поведения, так как у стрелочной функции нет своего контекста вызова, она будет брать его у своего родителя!!!
}); // чтобы стрелочная функция отработала также как классическая, прописываем целевое событие (event.target)!!! =>

const btn3 = document.querySelector('button');
btn3.addEventListener('click', (e) => {
	e.target.style.backgroundColor = 'green'; // теперь поведение корректно!!!
});

const obj2 = {
	num: 5,
	sayNumber: function() {
		const say = () => {
			console.log(this); // так как у стрелочной функции нет своего контекста вызова и она будет брать его у своего родителя, то this ссылается на obj2!!!
		};
		say();
	}
};
obj2.sayNumber(); // получаем: 5 => { num: 5, sayNumber: [Function: sayNumber] }

const double2 = a => a * 2; // если действие функции помещается в одну строчку, то ее можно записать вот подобным образом!!!
console.log(double2(4)); // получаем: 8

const double3 = (a, b) => a * 2 + b; // если действие функции помещается в одну строчку, то ее можно записать вот подобным образом!!!
console.log(double3(4, 5)); // получаем: 13