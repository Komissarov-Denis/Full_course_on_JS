/* eslint-disable linebreak-style */
const myModule = require('./main'); // для импортирования функции myModule из main.js, создаем переменную myModule с синтаксисом функции require(путь к файлу)
const myModuleInstance = new myModule(); // создаем экземпляр модуля для применения к нему различных методов =>
myModuleInstance.hello();
myModuleInstance.goodbye();