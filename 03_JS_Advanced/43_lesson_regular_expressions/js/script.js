// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// REGULAR EXPRESSIONS (РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ) - это шаблон, сопоставляемый с искомой строкой слева направо.
// Состоит из двух частей: паттернов и флагов
// Паттерн - это шаблон
// Флаги - это функциональные отметки или знаки: (i - поиск вне регистра), (g - глобальный флаг), (m - многострочный режим)

// new RegExp('pattern', 'flags'); // полная запись конструктора в классическом синтаксисе, которым никто никогда не пользуется!!!

// /pattern/f - более короткий синтаксис

const answer = prompt('Введите Ваше имя!');
const regexp = /n/ig; // ищем все маленькие буквы 'n'

console.log(answer.search(regexp)); // метод возвращает найденные индексы
// ( const regexp = /n/; ) => в слове 'Ann' найдет первую букву 'n' и выдаст индекс 1 - как первую позицию результата в слове, если мы введём слово без 'n', то получим индекс: -1
// ( const regexp = /n/i; ) => в слове 'ANn' найдет вне регистра первую букву 'n' и выдаст индекс: 1 - как первую позицию результата в слове
// ( const regexp = /n/g; ) => search() будет искать первое совпадение, поэтому флаг 'g' бессмысленен в поиске

console.log(answer.match(regexp)); // метод возвращает совпадения
// ( const regexp = /n/; ) => в слове 'Ann' найдет первую букву 'n' и выдаст индекс: 1 - как первую позицию результата в слове, если мы введём слово без 'n', то получим: null
// ( const regexp = /n/i; ) => в слове 'Ann' выдаст массив ['n', index: 1, input: 'Ann', groups: undefined] - с кусочком строки, где найдена 'n', порядковый индекс: 1 и сама строка 'Ann'
// ( const regexp = /n/ig; ) => в слове 'ANNN' выдаст массив (3)['N', 'N', 'N']

const pass = prompt('Password');
console.log(pass.replace(/\./g, '*')); // это выражение означает (/./g), что регулярка возвратит все элементы, которые попадут в строку (так же как звездочка в css) => (pass.replace(/./g, '*')) все символы пароля заменяем на звездочку
// (pass.replace(/./g, '*')) => при вводе dfgbndfbn получаем *********
// (pass.replace(/\./g, '*')); => (/\./g) это экранирование конкретного знака - точки '.', чтобы отдельно ее выбрать, при вводе ljklk... получил ljklk*** замену только для точек

console.log('12-34-56'.replace(/-/g, ':')); // получил замену дефисов на двоеточие 12:34:56, очень удобно в часах

const answer2 = prompt('Введите Ваше имя!');
const regexp2 = /n/ig; // ищем все маленькие буквы 'n'
console.log(regexp2.test(answer2)); // метод test() возвращает либо булиновые совпадения true, либо false (ввод Ann дает true, App - false)

// КЛАССЫ:
// \d - (digits) ищем цифры
// \w - (words) ищем в словах буквы
// \s - (spaces) ищем все пробелы
const answer3 = prompt('Введите Ваше число!');
const regexp3 = /\d/g; //  при вводе dfdsfg3gdf получаем ['3', index: 6, input: 'dfdsfg3gdf', groups: undefined] - обнаружил цифру под индексом 6
console.log(answer3.match(regexp3)); // (const regexp3 = /\d/g;) => при вводе 200px, получаем: (3)['2', '0', '0'] можно склеить в одну строку и использовать

const str = 'My name is R2D2';
console.log(str.match(/\w\d\w\d/i)); // поиск буква\цифра\буква\цифра и получил: ['R2D2', index: 11, input: 'My name is R2D2', groups: undefined]

// ОБРАТНЫЕ КЛАССЫ:
// \D - поиск не чисел
// \W - поиск не букв
const str2 = 'My name is R2D2';
console.log(str2.match(/\W/i)); // получил первый пробел как не буква [' ', index: 2, input: 'My name is R2D2', groups: undefined]
// (str2.match(/\W/ig)); => получил: (3)[' ', ' ', ' ']
// console.log(str2.match(/\D/ig)); => // получил: (13)['M', 'y', ' ', 'n', 'a', 'm', 'e', ' ', 'i', 's', ' ', 'R', 'D'] 