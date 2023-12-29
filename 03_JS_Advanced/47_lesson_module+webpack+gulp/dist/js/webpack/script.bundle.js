/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/hello.js":
/*!*********************************!*\
  !*** ./src/js/modules/hello.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* eslint-disable linebreak-style */

function myModule() { // создаем модуль, который будет отграничен в маленьком файлике с помощью функций конструкторов
	this.hello = function() { // через контекст вызова this создаем функцию hello
		console.log('Hello!');
	};
	this.goodbye = function() { // через контекст вызова this создаем функцию goodbye
		console.log('Bye!');
	};
	this.hye = function() {
		console.log('HELLO WORLD!');
	};
}
/* harmony default export */ __webpack_exports__["default"] = (myModule);

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

console.log('SCRIPT FILE:');

  // для импортирования функции myModule из /modules/hello.js, создаем переменную myModule с синтаксисом функции

const myModuleInstance = new _modules_hello_js__WEBPACK_IMPORTED_MODULE_0__["default"](); // создаем экземпляр модуля для применения к нему различных методов =>

myModuleInstance.hello();
myModuleInstance.goodbye();
myModuleInstance.hye();
}();
/******/ })()
;
//# sourceMappingURL=script.bundle.js.map