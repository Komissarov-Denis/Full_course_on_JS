/* eslint-disable linebreak-style */
function myModule() { // создаем модуль, который будет отграничен в маленьком файлике с помощью функций конструктор
	this.hello = function() { // через контекст вызова this создаем функцию hello
		console.log('Hello!');
	};
	this.goodbye = function() { // через контекст вызова this создаем функцию goodbye
		console.log('Bye!');
	};
}
module.exports = myModule; // необходимо, чтобы функция myModule() перешла из main.js в index.js, где мы можем ее переиспользовать много раз с новыми методами =>
// для этого мы обращаемся к обекту module, у которого есть свойство exports, и в это свойство exports помещаем то, что намерены экспортировать - myModule!!!