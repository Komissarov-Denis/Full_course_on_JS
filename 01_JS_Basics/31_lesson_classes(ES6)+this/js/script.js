// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// КЛАССЫ это те же ФУНКЦИИ
class Rectangle { // (прямоугольник) имя класса прописываем с ЗАГЛАВНОЙ буквы!!!
	constructor(height, width) { // параметры (height, width) будут приходить извне при создании экземпляра класса
		this.height = height; // переданные аргументы записываются в свойства нового объекта, так как классы также служат для создания новых объектов
		this.width = width;
	}															// => КОНЦЕПЦИЯ ЕДИНООБРАЗНЫХ ДЕЙСТВИЙ!!!
	calcArea() { // (вычислитель площади) тут методы записываются без знаков препиния!!!
		return this.height * this.width;
	}
}
const square = new Rectangle(10, 12);
const long = new Rectangle(10, 22);								// => СОЗДАННЫЕ НА ОСНОВЕ КОНЦЕПЦИИ ЭКЗЕМПЛЯРЫ!!!
console.log(square.calcArea());  // получил: 120
console.log(long.calcArea()); // получил: 220	

class ColoredRectangleWithText extends Rectangle { // принцип наследования от Rectangle
	constructor(height, width, text, bgColor) {
		super(height, width); // метод вызывает суперконструктор у родителя, наследует от Rectangle и всегда идет первой строчкой в конструкторе
		this.text = text;
		this.bgColor = bgColor;
	}
	showMyProps() { // покажи свойства
		console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`); // получил Текст: Hello World!, цвет: red
	}
}
const div = new ColoredRectangleWithText(25, 10, 'Hello World!', 'red');
div.showMyProps();
console.log(div.calcArea()); // получил 250