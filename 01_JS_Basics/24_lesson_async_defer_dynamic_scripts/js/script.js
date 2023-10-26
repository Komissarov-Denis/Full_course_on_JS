// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const p = document.querySelectorAll('p');
console.log(p);

// const script = document.createElement('script');
// script.src = 'js/test.js';
// script.async = false;
// document.body.append(script); // этот скрипт будет добавляться в html
// после выполнения src="js/script.js", т.е. добавление будет с небольшой задержкой!
// чтобы избежать этого, перед document.body.append(script); прописываем script.async = false;

function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}
loadScript('js/test.js');
loadScript('js/some.js'); // выполняются строго друг за другом!!!
