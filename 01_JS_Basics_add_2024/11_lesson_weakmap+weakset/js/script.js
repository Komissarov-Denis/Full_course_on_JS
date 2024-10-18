'use strict';

let user = {
	name: 'Ivan',
};
const arr = [user];
user = null; // производим удаление
console.log(user); // получил: null
console.log(arr[0]); // получил: {name: 'Ivan'} - вывод: пока массив [user] существует, то объект user{} также будет существовать в памяти, хотя других ссылок уже нет!!!


// Пока существует карта Map, объект будет находиться в памяти!!!
let user2 = {
	name: 'Ivan',
};
const map = new Map();
map.set(user2, 'data');
user2 = null; // производим удаление
console.log(map.keys());
// получил: 
// MapIterator {{…}}
// [[Entries]]
// 	0: 
// 		value: {name: 'Ivan'}
// 		constructor: ƒ Iterator()
// 		[[Prototype]]: Map Iterator
// 		[[IteratorHasMore]]: true
// 		[[IteratorIndex]]: 0
// 		[[IteratorKind]]: "keys"


// WeakMap() - слабая карта: в ней ключами могут быть только объекты; если нет ссылки на этот объект и он существует только в Weakmap, то он будет удален из это слабой карты!!!
// Поддерживает только: set(), get(), delete(), has()
let user3 = {
	name: 'Ivan',
};
const map2 = new WeakMap();
map2.set(user3, 'data');
user3 = null; // производим удаление
console.log(map2.has(user3)); // получил: false, так как объект удален автоматически!!!
console.log(map2);
// получил:
// WeakMap {{…} => 'data'}
// 	[[Entries]]
// 		Нет свойств
// 			[[Prototype]]: WeakMap


//Задача - если пользователь начинает заходить в чат, то он кэшируется и запоминается в пользовательских данных
const cache = new WeakMap();
function cacheUser(user) {
	if (!cache.has(user)) { // если нет user внутри WeakMap()
		cache.set(user, Date.now()); // то user добавляется, метод Date.now() показывает текущую дату и время, когда пользователь зашел в чат
	}
	return cache.get(user); // иначе возвращаем того закэшированного user из WeakMap()
}
let lena = {name: 'Elena'};
let alex = {name: 'Alex'};
cacheUser(lena);
cacheUser(alex);
lena = null; // Лена вышла из чата, переводим в null
console.log(cache.has(lena)); // получил: false - пользователь удален из памяти и не перегружает структуру
console.log(cache.has(alex)); // получил: true


// WeakSet() - аналогична обычному Set, но в него можем добавлять только объекты, без примитивов и назначений; объект присутствует в множестве, только до тех пор, пока он где-то доступен ещё!!!
// Поддерживает только: add(), has(), delete()
let messages = [
	{text: 'Hello', name: 'John'},
	{text: 'World', name: 'Alex'},
	{text: '.....', name: 'Max'},
];
let readMessages = new WeakSet(); // прочитанные сообщения
readMessages.add(messages[0]); // читаем сообщения и помечаем их

readMessages.add(messages[0]);
console.log(readMessages.has(messages[0])); // получил: true, первое сообщение находится в структуре данных
messages.shift(); // метод удаления первого элемента массива
console.log(readMessages.has(messages[0])); // получил: false