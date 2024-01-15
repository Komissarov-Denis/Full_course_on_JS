/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/hello.js":
/*!*********************************!*\
  !*** ./src/js/modules/hello.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ sayHi2; },
/* harmony export */   one: function() { return /* binding */ one; },
/* harmony export */   sayHi: function() { return /* binding */ sayHi; },
/* harmony export */   two: function() { return /* binding */ two; }
/* harmony export */ });
/* eslint-disable linebreak-style */

// function MyModule() { // создаем модуль, который будет отграничен в маленьком файлике с помощью функций конструкторов
// 	this.hello = function() { // через контекст вызова this создаем функцию hello
// 		console.log('Hello!');
// 	};
// 	this.goodbye = function() { // через контекст вызова this создаем функцию goodbye
// 		console.log('Bye!');
// 	};
// 	this.hye = function() {
// 		console.log('HELLO WORLD!');
// 	};
// }
// export default MyModule; // default - говорит, что по умолчанию из данного файлика будет экспортироваться именно эта функция

// поименнованный синтаксис
let one = 1;

let two = 2;


function sayHi() {
	console.log('Hi... Function!');
}

function sayHi2() { // export default - дает преимущество прямого экспортирования и использования уже как самую отдельную функцию при этом на странице должен быть только один!!!
	console.log('Hi... NEW Function!');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_hello_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/hello.js */ "./src/js/modules/hello.js");
/* eslint-disable linebreak-style */

// console.log('SCRIPT FILE:'); // получил: SCRIPT FILE:

// import MyModule from './modules/hello.js';  // для импортирования функции myModule из /modules/hello.js, создаем переменную myModule с синтаксисом функции

// const myModuleInstance = new MyModule(); // создаем экземпляр модуля для применения к нему различных методов =>

// myModuleInstance.hello(); // получил: Hello!
// myModuleInstance.goodbye(); // получил: Bye!
// myModuleInstance.hye(); // получил: HELLO WORLD!

// поименнованный синтаксис

// import {one, two} from './modules/hello.js'; // фигурные скобки {} для поименнованного синтаксиса обязательны, так как экспортируется большой объект
// console.log(`${one} + ${two} = ${one + two}`); // получил: 1 + 2 = 3

// import {one as first} from './modules/hello.js'; // при импорте можно сразу переименовывать экспортируемые переменные
// console.log(first); // получил: 1

// другой вариант импортирования всех данных разом:

console.log(`${_modules_hello_js__WEBPACK_IMPORTED_MODULE_0__.one} + ${_modules_hello_js__WEBPACK_IMPORTED_MODULE_0__.two} = ${_modules_hello_js__WEBPACK_IMPORTED_MODULE_0__.one + _modules_hello_js__WEBPACK_IMPORTED_MODULE_0__.two}`); // получил: 1 + 2 = 3, так как data это объект, который включает в себя все экспортируемое из файла hello.js
_modules_hello_js__WEBPACK_IMPORTED_MODULE_0__.sayHi();  // получил: Hi... Function!


(0,_modules_hello_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // export default - дает преимущество прямого экспортирования и использования уже как самую отдельную функцию,  // получил:  Hi... NEW Function!
}();
/******/ })()
;
//# sourceMappingURL=script.bundle.js.map