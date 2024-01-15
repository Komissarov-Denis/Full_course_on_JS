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
import * as data from './modules/hello.js';
console.log(`${data.one} + ${data.two} = ${data.one + data.two}`); // получил: 1 + 2 = 3, так как data это объект, который включает в себя все экспортируемое из файла hello.js
data.sayHi();  // получил: Hi... Function!

import sayHi2 from './modules/hello.js';
sayHi2(); // export default - дает преимущество прямого экспортирования и использования уже как самую отдельную функцию,  // получил:  Hi... NEW Function!