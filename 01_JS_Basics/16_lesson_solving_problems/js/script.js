// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// 1) Какое будет выведено значение?
let x = 5;
alert(x++); // останется в постфиксном инкременте 5, так как ++ идет после возвращенного
// результата
alert(++x); // прирастет префиксный инкремент до 6, так как ++ до возвращенного результата

// 2) Чему равно такое выражение: [ ] + false - null + true?
console.log([ ] + false - null + true); // [] -пустой массив равет пустой строке!!!
// console.log('' + false); // пустая строка + false = 'false' строковые данные
// console.log('false' - null); // false - null = NaN
// console.log(NaN + true); // NaN + true = NaN

// 3) Что выведет этот код: let y = 1; let x = y = 2; alert(x); ?
let y2 = 1;
let x2 = y2 = 2; // сначала у присваивается 2, потом х присваивается 2 с права на лево!!!
alert(x2); // х = 2
alert(y2);

// 4) Чему равна сумма [ ] + 1 + 2?
console.log([ ] + 1 + 2);
// console.log([ ] + 1); // '' + 1 = '1' строковое значение
// console.log('1' + 2); // '1' + 2 = '12' строковое значение

// 5) Что выведет этот код: alert( "1"[0] )?
alert( '1'[0] ); // к каждому элементу строки можно обратиться по его символу, так как строка
// очень простая, то символ под номером 0 - это 1. Ответ: 1

// 6) Чему равно 2 && 1 && null && 0 && undefined ?
console.log(2 && 1 && null && 0 && undefined); // оператор ИИ запирается на ЛЖИ!!!
// Так как ИИ запнулся на NULL, его он и возвратит. Ответ: null

// 7) Есть ли разница между выражениями? !!( a&& b ) и (a && b)?
console.log(!!(1 && 2) === (1 && 2)); // Ответ: false, так как !! возвращает boolean выражение,
// а оно не будет равняться (1 && 2)

// 8) Что выведет этот код: alert( null || 2 && 3 || 4 ); ?
alert(null || 2 && 3 || 4 ); // оператор ИЛИ запирается на ПРАВДЕ!!! Ответ: 3
// ОТВ          3
// ОТВ  3
// ОТВ                  3

// 9) a = [1, 2, 3]; b = [1, 2, 3]; Правда ли что a == b ?
const a = [1, 2, 3];
const b = [1, 2, 3];
console.log(a == b); // Ответ: false, два ящика с яблоками, но они не идентичны

// 10) Что выведет этот код: alert( +"Infinity" ); ?
alert(+'Infinity'); // Ответ: число Infinity

// 11) Верно ли сравнение: "Ёжик" > "яблоко"?
console.log('Ёжик' > 'яблоко'); // Ответ: false, в Юникод можно посмотреть приоритет символов

// 12) Чему равно 0 || "" || 2 || undefined || true || falsе ?
console.log(0 || '' || 2 || undefined || true || falsе); // Ответ: 2
// ОТВ:   false false true - на этом остановка!!!