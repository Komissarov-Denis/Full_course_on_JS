'use strict';

// ФЛАГИ:
// WRITABLE - перезаписываемые, если флаг стоит в позиции true, то свойство объекта можно будет изменить, false - наоборот
// ENUMERABLE - если флаг стоит в позиции true, то свойство объекта будет перечисляться в циклах, false - наоборот
// CONFIGURABLE - если флаг стоит в позиции true, то свойство объекта можно будет удалить, а атрибуты можно изменить, false - наоборот

const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/1993',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
};
console.log(Object.getOwnPropertyDescriptor(user, 'name')); // метод Object.getOwnPropertyDescriptor() - первый аргумент: объект, второй аргумент: ключевое свойство, на котором буду применяться флаги!!!
// получил:
// {value: 'Alex', writable: true, enumerable: true, configurable: true}
// configurable: true
// enumerable: true
// value: "Alex"
// writable: true
// [[Prototype]]: Object

Object.defineProperty(user, 'name', {writable: false}); // метод Object.defineProperty() позволяет изменить флаги - первый аргумент: объект, второй аргумент: ключевое свойство, на котором буду применяться флаги, третий - сам флаг!!!
// user.name = 'asdsdvbsfbds'; // получил: script.js:26  Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>' at script.js:26:11

// Создадим новое свойство
Object.defineProperty(user, 'gender', {value: 'male'}); // метод Object.defineProperty() все ключевые флаги опционально выставил в false при ручном создании свойств объекта!!!
console.log(Object.getOwnPropertyDescriptor(user, 'gender'));
// получил: 
// {value: 'male', writable: false, enumerable: false, configurable: false}
// configurable: false
// enumerable: false
// value: "male"
// writable: false
// [[Prototype]]: Object


Object.defineProperty(user, 'birthday', {writable: false}); // в подобном случае, при первичном заполнении пользователем анкеты, дата рождения должна сохраняться неизменной
console.log(Object.getOwnPropertyDescriptor(user, 'birthday'));
// user.birthday = '74164591'; // получил: script.js:42  Uncaught TypeError: Cannot assign to read only property 'birthday' of object '#<Object>' at script.js:42:15


// Object.defineProperty(user, 'middleName', {value: prompt('Фамилия?'), enumerable: true, configurable: true});
// console.log(Object.getOwnPropertyDescriptor(user, 'middleName')); // получили неперезаписываемое свойство, что очень удобно!!! 
// получил:
// {value: 'Кириллов', writable: false, enumerable: true, configurable: true}
// configurable: true
// enumerable: true
// value: "Кириллов"
// writable: false
// [[Prototype]]: Object


Object.defineProperty(user, 'showMyPublicData', {enumerable: false});
for (let key in user) console.log(key); // чтобы в переборе не выводился метод showMyPublicData(), необходимо установить флаг: (user, 'showMyPublicData', {enumerable: false})


// Свойство Math(PI) - свойство, которое устанавливается раз и менять его нельзя!!!
console.log(Object.getOwnPropertyDescriptor(Math, 'PI')); 
// получил:
// {value: 3.141592653589793, writable: false, enumerable: false, configurable: false}
// configurable: false
// enumerable: false
// value: 3.141592653589793
// writable: false
// [[Prototype]]: Object

// ОПТИМИЗАЦИЯ - Object.defineProperty для нескольких свойств
Object.defineProperties(user, {
	name: {writable: false},
	surname: {writable: false},
});

//----------------------------------------------------------------------------------------------------------------

// МЕТОД Object.preventExtensions() - предотвращает любое расширение объекта, т.е. после его создания никаките ключевые свойства не добавляются
Object.preventExtensions();

// МЕТОД Object.seal() - запечатываемый объект - предотвращает добавление новых свойств к объекту и делает все существующие ключевые свойства не настраиваемыми, но значения свойств могут изменяться
Object.seal();

// МЕТОД Object.freeze() - замораживает объект - объект становится эффективно неизменным в принципе , ничего не удаляется, не добвавляется и не изменяется
Object.freeze();

// МЕТОД Object.isExtensible() - определяет, разрешено ли расширение объекта
Object.isExtensible();

// МЕТОД Object.preventExtensions() - предотвращает любое расширение объекта
Object.preventExtensions();

// МЕТОД - определяет, был ли объект заморожен
Object.isFrozen();

// МЕТОД - определяет, был ли объект запечатан
Object.isSealed();

// МЕТОД