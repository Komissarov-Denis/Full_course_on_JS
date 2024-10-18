// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Конструкция для отлова ошибок и поддержания функционала приложений

try { // код берет все внутри try, если все идёт без ошибок, то выводит сообщение Normal...
	console.log('Normal...');
	console.log(abcd);
	console.log('result');
} catch(error) { // но в случае возникновения ошибки в участке try, код переходит в catch(e), где отлавливает ошибки
	console.log('Error!!!');
	console.log(error.name);
	console.log(error.massage);
	console.log(error.stack);
} finally { // работает также как и в промисах, код в этой части выполнится всегда, задача завершить начатые операции при любом ходе событий

}

console.log('Still normal...');

// получил:
// Normal..., главный плюс, в том - что код, написанный после конструкции, не поломается и продолжит работать
// Error!!!
// ReferenceError
// undefined
// ReferenceError: abcd is not defined
//     at Object.<anonymous> (h:\progr\HTML+CSS+JS\HTML_CSS_JS\Full_course_on_JS\03_JS_Advanced\48_lessons_correcting_errors\js\script.js:9:14)
//     at Module._compile (node:internal/modules/cjs/loader:1254:14)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1308:10)
//     at Module.load (node:internal/modules/cjs/loader:1117:32)
//     at Module._load (node:internal/modules/cjs/loader:958:12)
//     at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
//     at node:internal/main/run_main_module:23:47
// Still normal...