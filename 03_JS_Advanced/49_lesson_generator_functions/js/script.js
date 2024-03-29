// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Функции генераторы выдают результат последовательно: при первом вызове один результат, второй вызов дает другой результат и т.д., за это отвечает (yield '';)
function* generator() { // синтаксис function* () {}
	yield 'S';
	yield 'c';
	yield 'r';
	yield 'i';
	yield 'p';
	yield 't';
}
const str = generator(); // помещаем во внутрь перенменной генератор, чтобы вызвать следующий щаг генератора, необходимо использовать встроенный метод next()

console.log(str.next()); // получил: { value: 'S', done: false } // получаем объект с двумя полями "значение" и "выполнение" (выполнился ли генератор полностью или нет)
console.log(str.next()); // получил: { value: 'c', done: false }
console.log(str.next()); // получил: { value: 'r', done: false }

console.log(str.next()); // получил: { value: 'S', done: false }
console.log(str.next()); // получил: { value: 'c', done: false }
console.log(str.next()); // получил: { value: 'r', done: false }
console.log(str.next()); // получил: { value: 'i', done: false }
console.log(str.next()); // получил: { value: 'p', done: false }
console.log(str.next()); // получил: { value: 't', done: false }
console.log(str.next()); // получил: { value: undefined, done: true } т.е. новых значений нет, зато генератор выполнился полностью!!!

console.log(str.next().value); // получил: S

//------------------------------------------------------------------------
function* count(n) {
	for (let i = 0; i < n; i++) {
		yield i;
	}
}
const counter = count(7);
console.log(counter.next()); // получил: { value: 0, done: false }
console.log(counter.next()); // получил: { value: 1, done: false }
console.log(counter.next()); // получил: { value: 2, done: false }
console.log(counter.next()); // получил: { value: 3, done: false }

console.log(counter.next().value); // получил: 0
console.log(counter.next().value); // получил: 1
console.log(counter.next().value); // получил: 2
console.log(counter.next().value); // получил: 3

//------------------------------------------------------------------------
function* count2(n) {
	for (let i = 0; i < n; i++) {
		yield i;
	}
}
for (let k of count2(7)) {
	console.log(k);
}
// получил:
// 0
// 1
// 2
// 3
// 4
// 5
// 6