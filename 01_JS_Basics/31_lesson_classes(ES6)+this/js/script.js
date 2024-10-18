// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// КЛАССЫ (ES6) - это те же ФУНКЦИИ и являются красивой оберткой функций конструкторов, позволяют создавать новые сущности на основе шаблонов!!!

class Rectangle { // начинаем с ключевого слова class, (прямоугольник) имя класса прописываем с ЗАГЛАВНОЙ буквы и параметры заключается в {} !!!
	constructor(height, width) { // применяем свойство constructor() для описания свойств класса, аргументы (height, width) будут приходить извне при создании экземпляра класса!!!
		this.height = height; // переданные аргументы записываются в свойства нового объекта, так как классы также служат для создания новых объектов
		this.width = width;
	}															// => КОНЦЕПЦИЯ ЕДИНООБРАЗНЫХ ДЕЙСТВИЙ (ШАБЛОН)!!!
	calcArea() { // (вычислитель площади) тут методы записываются без знаков препинания как calcArea() !!!
		return this.height * this.width; // return возвращает рассчитываемые данные, this - ссылается на новый объект, который будет создан!!!
	}
}
const square = new Rectangle(10, 12);
const long = new Rectangle(10, 22);								// => СОЗДАННЫЕ ЭКЗЕМПЛЯРЫ НА ОСНОВЕ КОНЦЕПЦИИ (ШАБЛОНА)!!!
console.log(square.calcArea()); // получил: 120
console.log(long.calcArea()); // получил: 220	


class ColoredRectangleWithText extends Rectangle { // принцип наследования от Rectangle за счет extends
	constructor(height, width, text, bgColor) {
		super(height, width); // метод super() вызывает суперконструктор у родителя, наследует от Rectangle и всегда идет первой строчкой в конструкторе!!!
		this.text = text;
		this.bgColor = bgColor;
	}
	showMyProps() { // покажи свойства
		console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`); // получил Текст: Hello World!, цвет: red
	}
}
const div = new ColoredRectangleWithText(25, 10, 'Hello World!', 'red');
div.showMyProps(); // получил: Текст: Hello World!, цвет: red
console.log(div.calcArea()); // получил: 250