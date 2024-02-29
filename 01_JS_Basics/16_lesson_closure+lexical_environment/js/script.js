// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ - ЭТО ВНУТРЕННИЙ ТЕХНИЧЕСКИ СКРЫТЫЙ ОБЪЕКТ КОДА, ПРИ ЭТОМ ОКРУЖЕНИЕ ДЕЛИТСЯ НА ВНУТРЕННЕЕ И ВНЕШНЕЕ!!!

// ВНУТРЕННЕЕ ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ - ЭТО ОБЪЕКТ, В КОТОРОМ КАК СВОЙСТВА ХРАНЯТСЯ ВСЕ ЛОКАЛЬНЫЕ ПЕРЕМЕННЫЕ ЭТОЙ ФУНКЦИИ В ТОМ ЧИСЛЕ И THIS!!!

// ВНЕШНЕЕ ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ - ЭТО КОД СНАРУЖИ ФУНКЦИИ!!!

// ЗАМЫКАНИЕ => ФУНКЦИЯ ПЫТАЕТСЯ НАЙТИ ПЕРЕМЕННЫЕ ВНУТРИ СЕБЯ, ПОТОМ ИДЕТ НА УРОВЕНЬ ВЫШЕ, В ГЛОБАЛЬНОЙ ОБЛАСТИ ВИДИМОСТИ!!!

// КАЖДЫЙ ВЫЗОВ ФУНКЦИИ - ЭТО СОЗДАНИЕ НОВОГО ЛЕКСИЧЕСКОГО ОКРУЖЕНИЯ СО СВОИМИ СПЕЦИФИЧНЫМИ ЛОКАЛЬНЫМИ ПЕРЕМЕННЫМИ И ПАРАМЕТРАМИ!!!

// ФУНКЦИЯ БЕРЕТ ТЕКУЩЕЕ/ПОСЛЕДНЕЕ ЗНАЧЕНИЕ ГЛОБАЛЬНЫХ/ЛОКАЛЬНЫХ ПЕРЕМЕННЫХ ИЗ СВОЕГО ЛЕКСИЧЕСКОГО ОКРУЖЕНИЯ, СТАРЫЕ ПЕРЕМЕННЫЕ НЕ СОХРАНЯЮТСЯ!!!

let number = 5; debugger;
// logNumber(); // если вызвать функцию до объявления, то получим: 5, так как функция будет видеть переменную number = 5!!!
function logNumber() { // функция logNumber уже существует и имеет значение undefined, так как это объявленная функция, т.е. мы можем ее вызвать до ее объявления
	number = 4; debugger;  // если number объявить внутри функции, то получим: 4, так как функция будет видеть локальную переменную number = 4!!!
	console.log(number); // получил: 4
}
number = 6; // если вызвать функцию после объявления, то получим: 6, так как функция будет видеть переменную number = 5, потом заменит на 6, а затем заменит данные на 4!!!
logNumber(); debugger;
number = 10; // получим: 10, т.е. а затем заменит данные на 10!!!
logNumber(); debugger;

// функция logNumber() работает так:
// на 1 шаге number = 5 (присваивается значение 5)
// на 2 шаге number = 5 (ссылка на глобальное значение 5, переход к глобальной переменной number = 6)
// на 3 шаге number = 6 (5 меняется на 6, переход к вызову функции logNumber())
// на 4 шаге logNumber() = undefined, number = 6 (вызывается функция logNumber() со значением undefined, переход к локальной number = 4, создается лексическое окружение)
// на 5 шаге logNumber() = undefined, number = 4 (глобальная переменная 6 меняется на локальную переменную 4)
// на 6 шаге console.log(number) = 4 (возвращается в консоль ссылка на расчитанное значение 4)
// на 7 шаге logNumber() = undefined, Вернуть значение: undefined, передается ссылка на значение локальных вычислений number = 4, удаляется лексическое окружение)
// на 8 шаге number = 4 (присваивается значение 4, переход к глобальной переменной number = 10)
// на 9 шаге number = 10 (4 меняется на 10)
// на 10 шаге number = 10 (переход к вызову функции logNumber())
// на 11 шаге logNumber() = undefined, number = 10 (вызывается функция logNumber() со значением undefined, переход к локальной number = 4, создается лексическое окружение)
// на 12 шаге logNumber() = undefined, number = 4 (глобальная переменная 10 меняется на локальную переменную 4)
// на 13 шаге console.log(number) = 4 (возвращается в консоль ссылка на расчитанное значение 4)
// на 14 шаге logNumber() = undefined, Вернуть значение: undefined, передается ссылка на значение локальных вычислений number = 4, удаляется лексическое окружение)
// на 15 шаге number = 4 (присваивается значение 4 и выводится данное итоговое значение)

//-----------------------------------------------------------------------------------------------------------------------

function createCounter() { debugger; // создаем функцию счетчика createCounter()
	let counter = 0; debugger; // создаем переменную счетчика counter со значением undefined и присваиваем ей 0 внутри createCounter(), при этом создается новое локальное лексическое окружение 
	const myFunction = function() { debugger; // создаем вложенное функциональное выражение в createCounter() со значением undefined и помещаем его в переменную myFunction
		counter = counter + 1; debugger; // создаем счетчик counter, прибавляющий + 1
		return counter; debugger; // возвращаем значение счетчика counter, в локальном лексическом окружении будет храниться ссылка на переменную counter
	};
	return myFunction; debugger; // возвращаем через return функции счетчика createCounter() вложенное функциональное выражение myFunction (одна функция возвращает другую) =>
} debugger; // при этом внутреннее лексическое окружение myFunction будет уничтожено по выполнению return myFunction!!! Но, наружу возвращаем описание действий вложенного функционального выражения myFunction - это ее ЗАМЫКАНИЕ!!!
const increment = createCounter(); debugger; // помещаем в переменную increment со значением undefined функциональное выражение createCounter() с ее вызывом и возвращением функционального выражения myFunction
const c1 = increment(); debugger; // возвращенное значение функции createCounter() в переменной increment присваиваем переменной c1, при вызове increment() и запуске createCounter() создается новое лексическое окружение
const c2 = increment(); debugger; // возвращенное значение функции createCounter() в переменной increment присваиваем переменной c2, при вызове increment() и запуске createCounter() создается новое лексическое окружение
const c3 = increment(); debugger; // возвращенное значение функции createCounter() в переменной increment присваиваем переменной c3, при вызове increment() и запуске createCounter() создается новое лексическое окружение
console.log(c1, c2, c3); debugger; // получил 1 2 3

// функция createCounter() работает так:
// на 1 шаге: так как функция createCounter() не запускалась через increment(), расчетов нет, получаем значения:
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 2 шаге переходим в переменную increment и вызываем функцию createCounter(), создается локальное лексическое окружение, получаем значения:
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 3 шаге вызвали функцию createCounter(), получаем значения:
	// createCounter() undefined
	// counter:<значение недоступно> создается переменная counter, в которой нет ничего
	// myFunction:<значение недоступно></значение> создается переменная myFunction, в которой нет ничего
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 4 шаге переходим к переменной counter, получаем значения:
	// createCounter() undefined
	// counter:<значение недоступно>
	// myFunction:<значение недоступно></значение> undefined
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 5 шаге присваиваем переменной counter локальное значение 0, получаем значения:
	// createCounter() undefined
	// counter: 0
	// myFunction:<значение недоступно></значение> undefined
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 6 шаге переходим к вложенному функциональному выражению в createCounter() со значением undefined и помещаем его в переменную myFunction, получаем значения:
	// createCounter() undefined
	// counter: 0
	// myFunction:<значение недоступно></значение> undefined
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 7 шаге переходим в return myFunction, возвращаем расчитанное значение функции myFunction(), получаем значения:
	// createCounter() undefined
	// Вернуть значение: ƒ () возвращается присвоенное значение переменной counter равное 0, удаляется локальное лексическое окружение createCounter()
		// length: 0
	// counter: 0 
	// myFunction: ƒ ()
		// length: 0
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment:<значение недоступно></значение> undefined

// на 8 шаге переходим в переменную increment с вызовом присвоенной ей функции createCounter(), получаем значения:
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 9 шаге переходим в переменную с1, вызываем функцию myFunction(), получаем значения:
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 10 шаге переходим в функцию myFunction(), создается локальное лексическое окружение, получаем значения:
	// myFunction() undefined
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 11 шаге переходим в счетчик переменной counter = counter + 1, получаем значения:
	// myFunction() undefined
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 12 шаге срабатывает счетчик counter = counter + 1, 1 присваивается переменной counter, получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter) 
		// counter: 1
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"		

// на 13 шаге получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter) удаляется локальное лексическое окружение myFunction(), ЗАМЫКАНИЕ
		// counter: 1
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"		

// на 14 шаге переходим в return counter, возвращаем расчёт counter, получаем значения:
	// myFunction() undefined
	// Вернуть значение: 1
	// Закрытие (createCounter) 
		// counter: 1
	// c1:<значение недоступно> undefined
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 15 шаге переходим в переменную с1, присваиваем значение 1 переменной с1, получаем значения:
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 16 шаге переходим в переменную с2, получаем значения:
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 17 шаге переходим в функцию myFunction(), создается локальное лексическое окружение, получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter)
		// counter: 1
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 18 шаге переходим в счетчик переменной counter = counter + 1, получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter)
		// counter: 1
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 19 шаге срабатывает счетчик counter = counter + 1, 2 присваивается переменной counter, получаем значения:		
	// myFunction() undefined
	// Закрытие (createCounter) 
		// counter: 2
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 20 шаге получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter) удаляется локальное лексическое окружение myFunction(), ЗАМЫКАНИЕ
		// counter: 2
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"	

// на 21 шаге переходим в return counter, возвращаем расчёт counter, получаем значения:
	// myFunction() undefined
	// Вернуть значение: 2
	// Закрытие (createCounter)
		// counter: 2
	// c1: 1
	// c2:<значение недоступно> undefined
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 22 шаге переходим в переменную с2, присваиваем значение 2 переменной с2, получаем значения:
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 23 шаге переходим в переменную с3, получаем значения:
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 24 шаге переходим в функцию myFunction(), создается локальное лексическое окружение, получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter)
		// counter: 2
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 25 шаге переходим в счетчик переменной counter = counter + 1, получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter)
		// counter: 2
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 26 шаге срабатывает счетчик counter = counter + 1, 3 присваивается переменной counter, получаем значения:	
	// myFunction() undefined
	// Закрытие (createCounter)
		// counter: 3
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 27 шаге получаем значения:
	// myFunction() undefined
	// Закрытие (createCounter) удаляется локальное лексическое окружение myFunction(), ЗАМЫКАНИЕ
		// counter: 3
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 28 шаге переходим в return counter, возвращаем расчёт counter, получаем значения:
	// myFunction() undefined
	// Вернуть значение: 3
	// Закрытие (createCounter) 
		// counter: 3
	// c1: 1
	// c2: 2
	// c3:<значение недоступно> undefined
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 29 шаге переходим в переменную с3, присваиваем значение 3 переменной с3, получаем значения:
	// c1: 1
	// c2: 2
	// c3: 3
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 30 шаге переходим в console.log(c1, c2, c3), возвращаем значения:
	// c1: 1
	// c2: 2
	// c3: 3
	// increment: ƒ ()
		// length: 0
		// name: "myFunction"

// на 30 шаге вывели в консоль: 1 2 3