// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

let num = 50;
while (num <= 55) { // пока условие выполняеется, цикл повторяется
  num++;
  console.log(num);
}

let num1 = 50;
do { // цикл повторяется,  пока условие выполняеется
  num1++;
  console.log(num1);
}
while (num1 <= 55);

for (let i = 1; i < 8; i++) { // цикл приращивает на 1 переменную до выполнения условия
  console.log(i);
}

let num2 = 60;
for (let i = 1; i < 8; i++) {
  num2++;
  console.log(num2);
}

for (let i = 1; i < 50; i++) {
  if (i === 6) {
    break;
  } // цикл приращивает на 1 переменную до строгого равенства с 6 и обрывает его
  console.log(i);
}

for (let i = 1; i < 10; i++) {
  if (i === 6) {
    continue; // цикл приращивает на 1 переменную до строгого равенства
  } // с 6 и обрывает его и продлжает его после 6 до выполнения условияы
  console.log(i);
}
