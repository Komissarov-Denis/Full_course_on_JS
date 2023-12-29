/* eslint-disable linebreak-style */

function myModule() { // создаем модуль, который будет отграничен в маленьком файлике с помощью функций конструкторов
	this.hello = function() { // через контекст вызова this создаем функцию hello
		console.log('Hello!');
	};
	this.goodbye = function() { // через контекст вызова this создаем функцию goodbye
		console.log('Bye!');
	};
	this.hye = function() {
		console.log('HELLO WORLD!');
	};
}
export default myModule;