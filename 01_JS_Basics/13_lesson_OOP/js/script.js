// // ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// // 'use strict';

const soldier = {
  health: 400,
  armor: 80,
  sayHallo: function() {
    console.log('Hallo!');
  }
};
const john = {
  health: 100,
};
// john.__proto__ = soldier; // данный метод скйчас не используется и взамен: установка прототипа!!
Object.setPrototypeOf(john, soldier); // первый аргумент кому - прототип, второй сущность прототипа!
console.log(john.health);
console.log(john.armor); //  прототипное наследование!!!!!!!
john.sayHallo();

const sam = Object.create(soldier); // метод создания объекта с прототипным наследованием!!!!
sam.sayHallo();
