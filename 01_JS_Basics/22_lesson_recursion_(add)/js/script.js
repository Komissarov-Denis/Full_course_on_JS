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

// Используем цикл for(...of...)
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

function getTotalProgressByIteration(data) {
	let totalProgress = 0; // общий прогресс
	let students = 0; // общее количество студентов
	for (let course of Object.values(data)) { // метод Object.values(data) возвращает в переменную course массивы значений перечисляемых свойств объекта students{}, перебираем значения course в массиве js[] и объекте html{}

		// console.log(Object.values(data)); // получил массивы: [[{ name: 'john', progress: 100 }, { name: 'Ivan', progress: 60 } ], { basic: [ [Object], [Object] ], pro: [ [Object] ]}]
		//                                                       [[{ name: 'john', progress: 100 }, { name: 'Ivan', progress: 60 } ], { basic: [ [Object], [Object] ], pro: [ [Object] ]}]

		// console.log(Object.values(course)); // получил массивы: [{ name: 'john', progress: 100 }, { name: 'Ivan', progress: 60 }] 
		//                                                         [[{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }], [{ name: 'Sam', progress: 10 }]]
		
		if (Array.isArray(course)) { // метод Array.isArray(course) возвращает true, если объект course{} является массивом, false - наоборот

			// console.log(Array.isArray(course)); // так как только js[] явился массивом с двумя объектами, а html{} - это объект с массивами, то получил: js => true, html => false
			
			students += course.length; // так как только js[] явился массивом с двумя объектами, то в расчет берется значения его свойств: students = students + course.length => 0 + 2, получил: 2

			// console.log(course.length); // получил: 2
			// console.log(students); // получил: 2
			
			for (let i = 0; i < course.length; i++) { // запускаем цикл перебора массива js[] для вычисления общего прогресса студентов, шагов цикла 2
				totalProgress += course[i].progress; // totalProgress = totalProgress + course[i].progress, первый шаг: totalProgress = 0 + 100, второй шаг: totalProgress = 100 + 60

				// console.log(totalProgress); // получил: первый шаг 100, второй 160

			}
		} else { // далее условие идет на уровень глубже, внутрь объекта html{}, в котором есть два массива basic[] и pro[]
			for (let subCourse of Object.values(course)) { // метод Object.values(course) возвращает в переменную subCourse массивы значений перечисляемых свойств объекта html{}, перебираем значения course в массивах basic[] и pro[]

				// console.log(Object.values(course)); // получил массивы: [[{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }], [{ name: 'Sam', progress: 10 }]]
				//                                                         [[{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }], [{ name: 'Sam', progress: 10 }]]

				// console.log(Object.values(subCourse)); // получил массивы: [{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }]  [{ name: 'Sam', progress: 10 }]

				students += subCourse.length; // так как basic[] и pro[] являются массивами с объектами, то в расчет берется значения их свойств:
				// students = students + course.length => 2 + 2, получил: 4
				// students = students + course.length => 4 + 1, получил: 5

				// console.log(subCourse.length); // получил: 2 и 1 всего 3
				// console.log(students); // получил: 5

				for (let i = 0; i < subCourse.length; i++) { // запускаем цикл перебора массивов для вычисления общего прогресса студентов, шагов цикла 3
					// console.log(subCourse.length);
					totalProgress += subCourse[i].progress;// totalProgress = totalProgress + subCourse[i].progress, первый шаг: totalProgress = 160 + 20, второй шаг: totalProgress = 180 + 18, второй шаг: totalProgress = 198 + 10

					// console.log(totalProgress); // получил: на первом шаге 180, на втором шаге 198, на третьем шаге 208

				}
			}
		}
	}
	return totalProgress / students; // 208 разделить на 5 = 41.6
}
console.log(getTotalProgressByIteration(students)); // получил: 41.6 Но, если в объекте students{} появится еще какой-либо курс с подкурсами и подкурсами второго уровня, то данный вариант не сработает!!! Лучший вариант - РЕКУРСИЯ

// ПРИМЕНИМ РЕКУРСИВНЫЙ СПОСОБ!!!--------------------------------------------------
let students2 = {

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

function getTotalProgressByRecursion(data) {
	if (Array.isArray(data)) { // метод Array.isArray(data) вернет true, если сущность data{} является массивом и false - наоборот, при этом функция берет данные из объекта students2{},
		let total = 0;	// первоначально, присваиваем переменной total значение нуля; далее в переменную total будет передаваться массив!!!
		for (let i = 0; i < data.length; i++) { // запускаем цикл перебора первого уровня, если обнаружен массив: js[] в объекте students2{} и подмассивы в объекте html{} для вычисления общего прогресса студентов
			total += data[i].progress; // total = total + data[i].progress, каждый шаг: total => 0 + 100, => 100 + 60; => 0 + 20, => 20 + 18; => 0 + 10; количество значений массива определяет количество шагов цикла
			// console.log(total); // получил:         100  160  20  38 10
			// console.log(data.length); // получил:   2    2    2   2  1
		}
		// console.log(total); // получил:         160  38  10
		// console.log(data.length); // получил:   2    2   1
		// console.log([total, data.length]); // [ 160, 2 ]  [ 38, 2 ]  [ 10, 1 ]
		return [total, data.length]; // с помощью return можно вернуть и массив с данными!!! ЭТО БАЗА РЕКУРСИИ - КОГДА МЫ НАТЫКАЕМСЯ НА МАССИВ - ФУНКЦИЯ ЗАВЕРШАЕТСЯ (внутри массива будут объекты со студентами, доступными к подсчету)!!!
	} else { // метод Array.isArray(data) вернет false, если сущность data{} является объектом => students2{} или подобъектом html{} - как в данном случае; потому перебираем все, что внутри...
		let total = [0, 0]; // объявляем две переменные в виде массива total[] в качестве промежуточного результата; закономерность присвоения данных total = [0, 0] => [total, data.length]
		for (let subData of Object.values(data)) { // запускаем цикл перебора второго уровня, если обнаружен объект: students2{} или html{}, потому перебираем каждую сущность при ПОИСКЕ МАССИВА, обращаясь к subData!!!
			// console.log(subData); // получил: [{ name: 'john', progress: 100 }, { name: 'Ivan', progress: 60 }]  {basic: [{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }], pro: [{ name: 'Sam', progress: 10 }]}
			//                                                                                                              [{ name: 'Peter', progress: 20 }, { name: 'Ann', progress: 18 }]       [{ name: 'Sam', progress: 10 }]
			const subDataArray = getTotalProgressByRecursion(subData); // ЭТО РЕКУРСИЯ!!! Так как у нас есть вложенные данные, то мы должны запустить саму же функцию на этих вложенных данных, в подмассив subDataArray[] вернется массив [total, data.length]
			// console.log(subDataArray); // получил: [ 160, 2 ]  [ 38, 2 ]  [ 10, 1 ]  [ 48, 3 ]
			// getTotalProgressByRecursion(subData) - тут каждый раз будет запускаться рекурсия до тех пор, пока не дойдет до БАЗЫ РЕКУРСИИ => пока не наткнется на конечный массив со всеми зарегистрированными студентами
			total[0] += subDataArray[0]; // в total[0] массива total[] записываются данные расчета общего progress студентов: total[0] = total[0] + subDataArray[0]
			total[1] += subDataArray[1]; // в total[1] массива total[] записываются данные расчета общего количества студентов: total[1] = total[1] + subDataArray[1]
			// console.log(subDataArray); // получил:   [ 160, 2 ]  [ 38, 2 ]  [ 10, 1 ]  [ 48, 3 ]  =  [total, data.length]
			// console.log(total[0]); // получил:         160         38         48         208
			// console.log(total[1]); // получил:              2          2          3          5
		}
		return total; // возвращаем массив с данными total, далее функция продолжает поиск массива... total = [total[0], total[1]] = [total, data.length]
	}
}
const result = getTotalProgressByRecursion(students2); // в переменную result передается массив total = [total[0], total[1]] = [total, data.length]
// console.log(result[0]); // получил: 208
// console.log(result [1]); // получил:  5
console.log(result[0] / result[1]); // получил: 41.6 => в result[0] передано total[0], в result[1] передано total[1] = data.length => (208 / 5)
//---------------------------------------------------------------------------------