/* eslint-disable linebreak-style */

console.log('SCRIPT FILE:');

import myModule from './modules/hello.js';  // для импортирования функции myModule из /modules/hello.js, создаем переменную myModule с синтаксисом функции

const myModuleInstance = new myModule(); // создаем экземпляр модуля для применения к нему различных методов =>

myModuleInstance.hello();
myModuleInstance.goodbye();
myModuleInstance.hye();