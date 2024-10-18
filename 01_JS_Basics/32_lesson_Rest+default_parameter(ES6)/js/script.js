// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Оператор REST записывается как(, ...rest) - применяется, когда мы не знаем какие еще аргументы будут применяться!!!
const log = function(a, b, ...rest) { // называть rest оператор можно как угодно, главное начинается он с многоточия ...с или ...fin
	console.log(a, b, rest);
};
log('basic', 'else', 'operator', 'usage'); // получил - basic else [ 'operator', 'usage' ] - rest сущности оператор собрал в массив!!!


// Параметры по умолчанию
function calcOrDouble(number, basis) { // если аргумент basis не будет передан, то должен быть передан параметр по умолчанию
	basis = basis || 2; // оператор ИЛИ вернет первую "правду", соответственно undefine || true и из этого выражения вернется 2, так как она имеет значение true
	console.log(number * basis);
}
calcOrDouble(3); // но это не надежная проверка и в (ES6) параметры по умолчанию можно прописывать при объявлении функции =>


function calcOrDouble2(number, basis = 2) { // это вид записи (basis = 2) параметра по умолчанию
	console.log(number * basis);
}
calcOrDouble2(3); // получил: 6


function calcOrDouble3(number, basis) {
	console.log(number * basis);
}
calcOrDouble3(3, 4);  // получил: 12