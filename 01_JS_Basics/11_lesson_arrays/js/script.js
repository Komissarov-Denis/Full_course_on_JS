// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const arr = [1, 2, 3, 6, 8];
// МЕТОД - это функция с коллбэк функцией внутри, метод forEach() проходится по каждому элементу массива и применяет коллбэк функцию на каждом из этих элементов!!!
// ПСЕВДОМАССИВ - обычный массив без методов, так как является структурой, хранящей данные по порядку!!!

// Структура forEach(function(){}) - это метод с коллбэк функцией внутри, сначала выполняется forEach(), а потом уже function(), ТУТ ОПЕРАТОРЫ BREAK и CONTINUE не работают!!!
// item - значение элемента в массиве, i - номер (индекс массива) по порядку, arr - необходимый массив
arr.forEach(function(item, i, arr) {
	console.log(`${i}: ${item} внутри массива ${arr}`);
}); // получил:
// 0: 1 внутри массива 1,2,3,6,8
// 1: 2 внутри массива 1,2,3,6,8
// 2: 3 внутри массива 1,2,3,6,8
// 3: 6 внутри массива 1,2,3,6,8
// 4: 8 внутри массива 1,2,3,6,8

const arr1 = [1, 2, 3, 6, 8];
arr1[99] = 0; 
console.log(arr1.length); // получил: 100, количество элементов массивов, т.е. (индекс +1), так как начинается с нулевого индекса
console.log(arr1); // получил: [ 1, 2, 3, 6, 8, <94 empty items>, 0 ], некорректное поведение, не должны быть пустых ячеек!!!

const arr2 = [1, 2, 3, 6, 8];
arr2.pop(); // метод, удаляющий последний эдемент из нашего массива: 8
arr2.push(10); // метод, добавляющий последний элемент в массив: 10
console.log(arr2); // получил: [ 1, 2, 3, 6, 10 ]

const arr3 = [1, 2, 3, 6, 8];
for (let i = 0; i < arr3.length; i++) { // цикл перебора массива
	console.log(arr3[i]); // получил: 1 2 3 6 8
}

// конструкция подобного перебора массива for(of) !!!
const arr33 = [1, 2, 3, 6, 8];
for (let value of arr33) {
	console.log(value);  // получил: 1 2 3 6 8
}

const str = prompt('', '');
const products = str.split(', '); // превращает строку в массив с разделителем ","!!!
console.log(products);

products.sort(); // метод сортировки массива как СТРОКИ!!!

console.log(products.join('; ')); // объединяет элементы массива в строку с разделителем ";"!!!

const arr4 = [14, 2, 13, 8, 6];
arr4.sort(); // метод сортировки массива как СТРОКИ!!!
console.log(arr4); // получил: [ 13, 14, 2, 6, 8 ]

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const arr5 = [14, 2, 13, 8, 6];
arr5.sort(compareNum);
console.log(arr5); // получил: [ 2, 6, 8, 13, 14 ], за счет коллбэк функции и алгоритма Быстрой Сортировки
function compareNum(a, b) {
	return a - b;
}
// функция compareNum() работает так, отыскивает минусовую разницу и меняет местами a и b:
//                             исходник => [14, 2, 13, 8, 6]
// на 1 шаге a =  2, b = 14, return = -12  [2, 14, 13, 8, 6]
// на 2 шаге a = 13, b =  2, return =  11  остается на месте
// на 3 шаге a = 13, b = 14, return =  -1  [2, 13, 14, 8, 6]
// на 4 шаге a = 13, b =  2, return =  11  остается на месте
// на 5 шаге a =  8, b = 13, return =  -5  [2, 8, 13, 14, 6]
// на 6 шаге a =  8, b =  2, return =   6  остается на месте
// на 7 шаге a =  6, b = 13, return =  -7  [2, 8, 6, 13, 14]
// на 8 шаге a =  6, b =  8, return =  -2  [2, 6, 8, 13, 14]
// на 9 шаге a =  6, b =  2, return =   4  остается на месте
// на 10 шаге возвращает результат  =>     [2, 6, 8, 13, 14]
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!