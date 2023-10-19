// // ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// // 'use strict';

let a = 5;
let b = a;
b = b + 5;
console.log(a);
console.log(b); // получили обжидаемый результат 5
//                                               10
// так как эта схема реботает только с примитивами!!!

const obj = {
  a: 5,
  b: 1,
};
const copy0 = obj;
copy0.a = 10;
console.log(obj);
console.log(copy0);
// в итоге получили { a: 10, b: 1 } НЕКОРРЕКТНОЕ ПОВЕДЕНИЕ!!!!!!!!!!
//                  { a: 10, b: 1 }
// т.е. изменяя в copy мы повлияли и на сотояние самого obj - ОЧЕНЬ ВАЖНО!!!
// ТУТ ЗНАЧЕНИЕ ПЕРЕДАЕТСЯ ПО ССЫЛКЕ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function copy(mainObj) {
  let objCopy = {}; // создаем пустой объект objCopy
  let key; // создаем переменную key, можно и вне цикла!
  for (key in mainObj) { // с помощью цикла for (...in...) перебираем все key в mainObj
    objCopy[key] = mainObj[key]; // создаем новое св-во в objCopy через []. Присваиваем ему значения из mainObj
  }
  return objCopy; // возвращаем новый скопированный объект
}
const numbers = {
  a: 2,
  b: 5,
  c: {
    x: 7,
    y: 4,
  },
};
const newNumbers = copy(numbers);
newNumbers.a = 9; // это ПОВЕРХНОСТНАЯ копия объекта первого уровня - замена свойства!!!
newNumbers.c.x = 8; // это ПОВЕРХНОСТНАЯ копия объекта второго уровная - ссылочная копия!!!!
console.log(numbers);
console.log(newNumbers);
// { a: 2, b: 5, c: { x: 8, y: 4 } }
// { a: 9, b: 5, c: { x: 8, y: 4 } }

const numbers2 = {
  a: 2,
  b: 5,
  c: {
    x: 7,
    y: 4,
  },
};
const add = {
  d: 17,
  e: 20,
};
console.log(Object.assign(numbers2, add)); // Object.assign метод объединения объектов

const clone = Object.assign({}, add); // это ПОВЕРХНОСТНАЯ копия объекта первого уровня - замена свойства!!!
clone.d = 20;
console.log(add);
console.log(clone);

const oldArray = ['a', 'b', 'c'];
const newArray = oldArray.slice(); // метод копирующий старый массив!!!!!
newArray[1] = 'asdasfasfasf';
console.log(oldArray);
console.log(newArray);

const video = ['youtube', 'vimeo', 'rutube']; // оператор spread - разворота!!!!
const blogs = ['wordpress', 'livejournal', 'blogger'];
const internet = [...video, ...blogs, 'vk', 'facebook'];
console.log(internet);

function log(f, g, h) {
  console.log(f);
  console.log(g);
  console.log(h);
}
const num = [2, 5, 7];
log(...num); // оператор spread - разворота!!!! ES8

const array = ['a', 'b'];
const newArray2 = [...array]; // оператор spread - разворота ES8 в массивах!!!
const q = {
  one: 1,
  two: 2,
};
const newObj = { ...q }; // оператор spread - разворота ES8 в объектах!!!
console.log(newArray2);
console.log(newObj);
