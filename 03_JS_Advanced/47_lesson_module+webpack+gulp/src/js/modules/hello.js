/* eslint-disable linebreak-style */

// function MyModule() { // создаем модуль, который будет отграничен в маленьком файлике с помощью функций конструкторов
// 	this.hello = function() { // через контекст вызова this создаем функцию hello
// 		console.log('Hello!');
// 	};
// 	this.goodbye = function() { // через контекст вызова this создаем функцию goodbye
// 		console.log('Bye!');
// 	};
// 	this.hye = function() {
// 		console.log('HELLO WORLD!');
// 	};
// }
// export default MyModule; // default - говорит, что по умолчанию из данного файлика будет экспортироваться именно эта функция

// поименнованный синтаксис
export let one = 1;

let two = 2;
export {two};

export function sayHi() {
	console.log('Hi... Function!');
}

export default function sayHi2() { // export default - дает преимущество прямого экспортирования и использования уже как самую отдельную функцию при этом на странице должен быть только один!!!
	console.log('Hi... NEW Function!');
}