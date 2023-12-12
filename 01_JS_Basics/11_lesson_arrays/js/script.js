// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const arr = [1, 2, 3, 6, 8];
// метод - это функция с коллбэк функцией внутри, метод forEach проходится по каждому элементу массива и применяет коллбэк функцию на каждом из этих элементов!!!
// item - элемент, i - номер (индекс массива) по порядку, arr - необходимый массив
arr.forEach(function(item, i, arr) {
	console.log(`${i}: ${item} внутри массива ${arr}`);
}); // получил:
// 0: 1 внутри массива 1,2,3,6,8
// 1: 2 внутри массива 1,2,3,6,8
// 2: 3 внутри массива 1,2,3,6,8
// 3: 6 внутри массива 1,2,3,6,8
// 4: 8 внутри массива 1,2,3,6,8

// ПСЕВДОМАССИВ - обычный массив без методов!!!
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
// конструкция подобного перебора массива!!!!
for (const value of arr3) {
	console.log(value);  // получил: 1 2 3 6 8
}

const str = prompt('', '');
const products = str.split(', '); // превращает строку в массив с разделителем ","!!!
console.log(products);
products.sort(); // метод сортировки массива как СТРОКИ!!!
console.log(products.join('; ')); // объединяет элементы массива в строку с разделителем ","!!!

const arr4 = [14, 2, 13, 8, 6];
arr4.sort(); // метод сортировки массива как СТРОКИ!!!
console.log(arr4); // получил: [ 13, 14, 2, 6, 8 ]

const arr5 = [14, 2, 13, 8, 6];
arr5.sort(compareNum);
console.log(arr5); // получил: [ 2, 6, 8, 13, 14 ], за счет коллбэк функции и алгоритма Быстрой Сортировки
function compareNum(a, b) {
	return a - b;
}