// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';


// CALLBACK-FUNCTION : ЕСЛИ Ф-ЦИИ В КОДЕ ИДУТ ОДНА ЗА ДРУГОЙ, ТО ЭТО НЕ ЗНАЧИТ,
// ЧТО ОНИ БУДУТ ВЫПОЛНЯТЬСЯ ТОЧНО В ТАКОЙ ЖЕ ПОСЛЕДОВАТЕЛЬНОСТИ!!!!

function first() {
  // do something и имеет задержку для общения с сервером
  setTimeout(function() {
    console.log(1);
  }, 500);
}

function second() {
  console.log(2);
}
first(); // обязательно необходимо вызывать функцию!!!! пишем в форате CamelCase!!!!
second();

function learnJS(lang, callback) { // классический пример коллбэка!!!!!!
  console.log(`Я учу: ${lang}`);
  callback(); // вызывем коллбэк
}
function done() {
  console.log('Я прошел этот урок!');
}
learnJS('JavaScript', done);
