/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((module) => {

/* eslint-disable linebreak-style */
function myModule() { // создаем модуль, который будет отграничен в маленьком файлике с помощью функций конструктор
	this.hello = function() { // через контекст вызова this создаем функцию hello
		console.log('Hello!');
	};
	this.goodbye = function() { // через контекст вызова this создаем функцию goodbye
		console.log('Bye!');
	};
}
module.exports = myModule; // необходимо, чтобы функция myModule() перешла из main.js в index.js, где мы можем ее переиспользовать много раз с новыми методами =>
// для этого мы обращаемся к обекту module, у которого есть свойство exports, и в это свойство exports помещаем то, что намерены экспортировать - myModule!!!

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/* eslint-disable linebreak-style */
const myModule = __webpack_require__(/*! ./main */ "./src/js/main.js"); // для импортирования функции myModule из main.js, создаем переменную myModule с синтаксисом функции require(путь к файлу)
const myModuleInstance = new myModule(); // создаем экземпляр модуля для применения к нему различных методов =>
myModuleInstance.hello();
myModuleInstance.goodbye();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map