// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// ОБЪЕКТЫ в JS - это ассоциативные массивы!!!
// const obj = new Object {}; - такой способ не используется...

const options = {
	name: 'test',
	width: 1024,
	heigth: 720,
	colors: {
		border: 'black',
		bg: 'red',
	},
	makeTest: function() {
		console.log('Test'); // получил: Test, так записываются методы!!!
	}
};
options.makeTest(); // мы можем создавать собственные методы в объектах!!!
console.log(options.width); // получил: 1024
console.log(options['heigth']); // получил: 720

delete options.name;// оператор удаления
console.log(options); // получил: 
// {
// 	width: 1024,
// 	heigth: 720,
// 	colors: { border: 'black', bg: 'red' },
// 	makeTest: [Function: makeTest]
// }

// ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТА!!!!
const {border, bg} = options.colors; // запись деструктурированного объекта!!!
console.log(border); // получил: black, вытаскиваем кусочки свойств в качестве отдельных переменных!!!
console.log(bg); // получил: red, вытаскиваем кусочки свойств в качестве отдельных переменных!!!
console.log(options.name); // получил: test
console.log(options.colors); // получил: { border: 'black', bg: 'red' }
console.log(options['colors']['border']);  // получил: black, запись не особо правильная, для этого существует деструктуризация объекта =>
console.log(options.colors.border);  // получил: black
console.log(options['colors']['bg']); // получил: red
console.log(options.colors.bg); // получил: red

// подсчет свойств во всем объекте for (in) !!!
let counter = 0; // переменная счетчик, подсчитывающая количество ключевых свойств объекта
for (let key in options) { // перебираем все ключевые свойства внутри объекта options
	if (typeof(options[key]) === 'object') { // если ключ является объектом, то запускаем перебор внутри перебора!!!
		for (let i in options[key]) { // теперь перебираем i - это ключи внутри встроенного объекта colors
			console.log(`Свойство - ${i} имеет значение - ${options[key][i]}`); // ${options[key][i]} так мы достучимся до значений ключей border и bg
			// counter++; // всего свойств в объекте!!! получил 5
		}
	} else {
		console.log(`Свойство - ${key} имеет значение - ${options[key]}`); // если ключ не является объектом, то выводим значения ключей options{}
		counter++; // количество свойств на верхнем уровне!!!!! Но этот метод не удобен!!! есть Object.keys()!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	}
}
console.log(counter); // получил:
// Свойство - width имеет значение - 1024
// Свойство - heigth имеет значение - 1024
// Свойство - border имеет значение - black
// Свойство - bg имеет значение - red
// Свойство - makeTest имеет значение - function() {
// 		console.log('Test'); // получил: Test, так записываются методы!!!
// }
// 3

console.log(Object.keys(options));  // получил: [ 'width', 'heigth', 'colors', 'makeTest' ], метод перебора ключей объекта после удаления ключа: name!!!
console.log(Object.keys(options).length);  // получил: 4, у строк и у массивов есть свойство length!!!