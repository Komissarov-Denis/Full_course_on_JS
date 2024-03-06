// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// РЕКУРСИЯ - ПРИЕМ ВЛОЖЕННОСТИ ФУНКЦИИ, КОГДА ФУНКЦИЯ ВЫЗЫВАЕТ САМА СЕБЯ!!!


// Задача: pow - возведение в степень, первый аргумент - что возводим, второй аргумент - в какую степень возводим

// Используем оператор ** - возведения в степень!!!
function pow(a, b) {
	return (a ** b);
}
let result0 = pow(2, 0);
let result1 = pow(2, 1);
let result2 = pow(2, 2);
let result3 = pow(2, 3);
let result4 = pow(2, 4);
console.log(result0, result1, result2, result3, result4); // получил: 1 2 4 8 16, РЕШЕНО!!!

// Используем цикл for()
function pow2(x, n) {
	let result = 1;
	for (let i = 0; i < n; i++) {
		result *= x; // result = result * x
	}
	return result;
}
console.log(pow2(2, 0)); // получил: 1
console.log(pow2(2, 1)); // получил: 2
console.log(pow2(2, 2)); // получил: 4
console.log(pow2(2, 3)); // получил: 8
console.log(pow2(2, 4)); // получил: 16
// получил: 1 2 4 8 16, РЕШЕНО!!!


//-------------------------------------------------------------
// ПРИМЕНИМ РЕКУРСИВНЫЙ СПОСОБ!!!
function pow3(x, n) { // АРГУМЕНТ (n) - ЭТО ГЛУБИНА РЕКУРСИИ
	if (n === 0) { // ЭТО БАЗА РЕКУРСИИ
		return 1;
	} else if (n === 1) { // ЭТО БАЗА РЕКУРСИИ
		return x;
	} else {
		return x * pow3(x, n - 1); // ШАГ РЕКУРСИИ, (n - 1) - ДАННЫЙ АРГУМЕНТ УПРОЩАЕТСЯ, ИЗМЕНЯЕТСЯ ЕГО ЗНАЧЕНИЕ
	}
} // работает это так:
console.log(pow3(2, 0)); // выполнилось условие (n === 0), получил: 1
console.log(pow3(2, 1)); // выполнилось условие (n === 1), получил: 2
console.log(pow3(2, 2)); // return 2 * pow3(2, 1) => функция pow3(2, 2) самозапускает расчет pow3(2, 2 - 1) с аргументами 2 и со степенью 1, возвращает х = 2 = pow3(2, 1), а потом возвращает умножение х = 2 * 2, получил: 4
console.log(pow3(2, 3)); // return 2 * pow3(2, 2) => функция pow3(2, 3) самозапускает расчет pow3(2, 3 - 1) с аргументами 2 и со степенью 2, возвращает х = 4 = pow3(2, 2), а потом возвращает умножение х = 2 * 4, получил: 8
console.log(pow3(2, 4)); // return 2 * pow3(2, 3) => функция pow3(2, 4) самозапускает расчет pow3(2, 4 - 1) с аргументами 2 и со степенью 3, возвращает х = 8 = pow3(2, 3), а потом возвращает умножение х = 2 * 8, получил: 16
// получил: 1 2 4 8 16, РЕШЕНО!!!

// БАЗА РЕКУРСИИ - ЭТО СЛУЧАЙ, КОТОРЫЙ ПРИВОДИТ СРАЗУ К ЗАВЕРШЕНИЮ ФУНКЦИИ
// ШАГ РЕКУРСИИ - ЭТО ЗАПУСК ВЛОЖЕННОЙ ФУНКЦИИ, НО С ДРУГИМ ИЗМЕНЕННЫМ ЗНАЧЕНИЕМ
// ГУБИНА РЕКУРСИИ - ЭТО ОБЩЕЕ КОЛИЧЕСТВО ВЛОЖЕННЫХ ВЫЗОВОВ ВМЕСТЕ С САМЫМ ПЕРВЫМ
//-------------------------------------------------------------

// Задача: вычислить общий % прогресса студентов по всем курсам, т.е. средний прогресс со всех студентов по всем курсам (общий % делим на число студентов) + МЕТОДЫ Object.values() + Array.isArray()
let students = {
	js: [{
		name: 'john',
		progress: 100,
	}, {
		name: 'Ivan',
		progress: 60,
	}],

	html: {
		basic: [{
			name: 'Peter',
			progress: 20,
		}, {
			name: 'Ann',
			progress: 18,
		}],

		pro: [{
			name: 'Sam',
			progress: 10,
		}],
	}
};

// Используем цикл for()
function getTotalProgressByIteration(data) {
	let totalProgress = 0; // общий прогресс
	let students = 0; // общее количество студентов
	for (let course of Object.values(data)) { // метод Object.values() возвращает массив значений перечисляемых свойств объекта, перебираем значения course в массиве js и объекте html
		// console.log(Object.values(course)); // получил: [{ name: 'john', progress: 100 }, { name: 'Ivan', progress: 60 }]   [[{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }], [{ name: 'Sam', progress: 10 }]]
		
		if(Array.isArray(course)) { // метод Array.isArray() возвращает true, если объект является массивом, false - наоборот

			// console.log(Array.isArray(course)); // получил true
			
			students += course.length; // если объект оказался массивом, students = students + course.length => 0 + 2
			// console.log(students); // получил: 2
			for (let i = 0; i < course.length; i++) { // запускаем цикл перебора массива для вычисления общего прогресса
				totalProgress += course[i].progress; // totalProgress = totalProgress + course[i].progress
			}
		} else {
			for (let subCourse of Object.values(course)) {
				students += subCourse.length;
				for (let i = 0; i < course.length; i++) {
					totalProgress += subCourse[i].progress;
				}
			}
		}
	}
	return totalProgress / students;
}
console.log(getTotalProgressByIteration(students)); // получил: 32

// ПРИМЕНИМ РЕКУРСИВНЫЙ СПОСОБ!!!