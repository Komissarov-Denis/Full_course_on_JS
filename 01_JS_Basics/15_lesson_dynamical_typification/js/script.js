// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// to String - все что получаем от пользователя, всегда будет иметь тип STRING. Это и данные от PROMPT, и данные из INPUT / TEXTAREA, и прочее. ВСЕ ЭТО СТРОКИ!!!
// 1)
console.log(typeof(String(null))); // получил: string
console.log(String(null)); // получил: null
console.log(typeof(String(4))); // получил: string

// 2)
console.log(typeof(5 + '')); // получил:  string, ПРИ СЛОЖЕНИИ СО СТРОКОЙ ПОЛУЧАЕМ СТРОКУ!!!

const num = 5;
console.log('http://vk.com/catalog' + num); // получил: http://vk.com/catalog5, старый код, сейчас используется интерполяция, ссылка на каталог для динамического перехода на пятую строчку каталога!!!

const fontSize = 26 + 'px'; // динамическая типизация при передаче стилей в строковом выражении
console.log(fontSize); // получил: 26px

// to Number
// 1)
console.log(typeof(Number('4'))); // получил: number, пользуются редко!

// 2)
console.log(typeof(+'5')); // получил: number, применяется унарный плюс чаще!

// 3)
console.log(parseInt('15px', 10)); // получил: 15, переводит в иное счисление строку
console.log(parseInt('15px' + 10)); // получил: 15,
console.log(typeof(parseInt('15px', 10))); // получил: number

// to Boolean
// 1)
// 0, '', null, undefined, NaN - превращается в FALSE!!!
let switcher = null;
if (switcher) {
	console.log('Working...');  // получил: пусто, тут скрипт работать не будет так как в switcher значение FALSE!
}
switcher = 1;
if (switcher) {
	console.log('Working...');  // получил: Working..., тут скрипт отработает так как в switcher значение TRUE!
}

// 2)
console.log(typeof(Boolean('4')));  // получил: boolean, булиновое значение

// 3)
console.log(typeof(!!'4444444'));  // получил: boolean, булиновое значение, крайне редко встречается!!!