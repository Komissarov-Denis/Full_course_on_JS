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
    console.log('Test') // так записываются методы!!!
  }
};
options.makeTest(); // мы можем создавать собственные методы!!!!!!!!!!!!!

// ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТА!!!!
const { border, bg } = options.colors; // запись деструктурированного объекта!!!!
console.log(border); // вытаскиваем кусочки свойств в качестве отдельных переменных!!!
console.log(bg); // вытаскиваем кусочки свойств в качестве отдельных переменных!!!

console.log(options.name);
console.log(options.colors);
console.log(options['colors']['border']); // запись не особо правильная, для этого существует деструктуризация объекта =>
console.log(options.colors.border); 
console.log(options['colors']['bg']);
console.log(options.colors.bg);
// delete options.name; // оператор удаления
// console.log(options);
console.log(Object.keys(options)); // метод перебора ключей объекта
// у строк и у массивово есть свойство length
console.log(Object.keys(options).length); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
console.log(counter);
