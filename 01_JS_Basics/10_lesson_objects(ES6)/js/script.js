// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const options = {
	name: 'test',
	width: 1024,
	heigth: 1024,
	colors: {
		border: 'black',
		bg: 'red',
	},
	makeTest: function() {
		console.log('Test'); // получил: Test, так записываются методы!!!
	}
};
options.makeTest(); // мы можем создавать собственные методы!!!

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

delete options.name;// оператор удаления
console.log(options); // получил: 
// {
// 	width: 1024,
// 	heigth: 1024,
// 	colors: { border: 'black', bg: 'red' },
// 	makeTest: [Function: makeTest]
// }

console.log(Object.keys(options));  // получил: [ 'width', 'heigth', 'colors', 'makeTest' ], метод перебора ключей объекта после удаления ключа: name!!!
console.log(Object.keys(options).length);  // получил: 4, у строк и у массивов есть свойство length!!!

// подсчет свойств во всем объекте!!!!
let counter = 0;
for (let key in options) {
	if (typeof(options[key]) === 'object') {
		for (let i in options[key]) {
			console.log(`Свойство - ${i} имеет значение - ${options[key][i]}`);
			// counter++; // всего свойств в объекте!!!
		}
	} else {
		console.log(`Свойство - ${key} имеет значение - ${options[key]}`);
		counter++; // количество свойств на верхнем уровне!!!!!
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