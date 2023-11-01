// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// to String - все что получаем от пользователя, всегда будет иметь тип STRING.
// Это и данные и PROMPT, данные из INPUT / TEXTAREA и прочее. ВСЕ ЭТО СТРОКИ!!!
// 1)
console.log(typeof(String(null)));
console.log(String(null));
console.log(typeof(String(4)));

// 2)
console.log(typeof(5 + '')); // ПРИ СЛОЖЕНИИ СО СТРОКОЙ ПОЛУЧАЕМ СТРОКУ!!!

const num = 5;
console.log('http://vk.com/catalog' + num); // старый код, сейчас используется интерполяция, ссылка на каталог для динамического перехода на пятую строчку каталога!!!

const fontSize = 26 + 'px'; // динамическая типизация при передаче стилей в строковом выражении
console.log(fontSize);

// to Number
// 1)
console.log(typeof(Number('4'))); // пользуются редко!

// 2)
console.log(typeof(+'5')); // применяется унарный плюс чаще!

// 3)
console.log(typeof(parseInt('15px', 10)));

// to Boolean
// 1)
// 0, '', null, undefined, NaN - превращается в FALSE!!!!!!!!!!
let switcher = null;
if (switcher) {
	console.log('Working...'); // тут скрипт работать не будет так как в switcher значение FALSE!
}
switcher = 1;
if (switcher) {
	console.log('Working...'); // тут скрипт отработает так как в switcher значение TRUE!
}

// 2)
console.log(typeof(Boolean('4'))); // булиновое значение

// 3)
console.log(typeof(!!'4444444')); // булиновое значение, крайне редко встречается!!!
