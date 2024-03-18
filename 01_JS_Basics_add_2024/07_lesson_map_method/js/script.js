'use strict';

// MAP - картами называют специфические виды данных (массив массивов - [[Entries]]), которые очень похожи на объект, только у них вместо свойств могут использоваться и объект, и массив, и функция, и все что угодно!!!

const user = {
	name: 'Alex',
	surname: 'Smith',
	birthday: '20/04/1993',
	showMyPublicData: function() {
		console.log(`${this.name} ${this.surname}`);
	}
};
console.log(typeof(Object.keys(user)[0])); // получил: name - string
console.log(typeof(Object.values(user)[0])); // получил: Alex - string

const userMap = new Map(Object.entries(user)); // преобразуем объект user{} в Map сущность (массив с массивом)!!!
console.log(userMap);
// получил: 
// Map(4) {'name' => 'Alex', 'surname' => 'Smith', 'birthday' => '20/04/1993', 'showMyPublicData' => ƒ}
// [[Entries]]
// 0: {"name" => "Alex"}
// 1: {"surname" => "Smith"}
// 2: {"birthday" => "20/04/1993"}
// 3: {"showMyPublicData" => function() { console.log(`${this.name} ${this.surname}`); }}
// size: 4
// [[Prototype]]: Map

const newUserObject = Object.fromEntries(userMap); // преобразуем Map сущность (массив с массивом) в объект newUserObject{}!!!
console.log(newUserObject);
// получил: 
// {name: 'Alex', surname: 'Smith', birthday: '20/04/1993', showMyPublicData: ƒ}
// birthday: "20/04/1993"
// name: "Alex"
// showMyPublicData: ƒ ()
// surname: "Smith"
// [[Prototype]]: Object


const shops = [
	{rice: 500},
	{oil: 200},
	{bread: 50},
];
const budget = [5000, 15000, 55000];

const map = new Map([[{paper: 400}, 8000]]); // создаем новый особый объект - массив массивов
shops.forEach((shop, i) => {
	map.set(shop, budget[i]); // map.set() - это метод, который принимает два аргумента - ключ и его значение, т.е. имеет вид объекта
});
console.log(map);
// получил:
// Map(4) {
// 	{ paper: 400 } => 8000,
// 	{ rice: 500 } => 5000,
// 	{ oil: 200 } => 15000,
// 	{ bread: 50 } => 55000
//   }

console.log(map.get(shops[0])); // получаем данные бюджета первого магазина - 5000
console.log(map.has(shops[0])); // проверяет, существует ли объект внутри карты - true
map.delete(key); // удаляет из карты сущность
map.clear(key); // полностью очищает карту
map.size; // отображает количество элементов внутри карты

// МЕТОД keys()
map.keys(); // возвращает итерируемый объект по ключам

const goods = [];
for (let shop of map.keys()) { // превращаем карту в массив с объектами, и перебираем все объекты
	goods.push(Object.keys(shop)[0]); // чтобы вытащить только их свойства: paper, rice, oil, bread - мы преобразуем goods в массив свойств по ключам
}
console.log(goods);
// получил
// (4) ['paper', 'rice', 'oil', 'bread']
// 0: "paper"
// 1: "rice"
// 2: "oil"
// 3: "bread"
// length: 4
// [[Prototype]]: Array(0)


// МЕТОД values()
map.values(); // возвращает итерируемый объект по значениям ключевых свойств

for (let price of map.values()) {
	console.log(price);
} // получил:
// 8000
// 5000
// 15000
// 55000


// МЕТОД entries()
map.entries(); // возвращает итерируемый объект по значениям ключевых свойств

for (let [shop, price] of map.entries()) {
	console.log(shop, price);
} // получил:
// {paper: 400}  8000
// {rice: 500}  5000
// {oil: 200}  15000
// {bread: 50}  55000


// МЕТОД forEach() - встроенный метод
map.forEach((value, key, map) => {
	console.log(value, key, map);
});
// 8000 {paper: 400} Map(4) {{…} => 8000, {…} => 5000, {…} => 15000, {…} => 55000}
// 5000 {rice: 500} Map(4) {{…} => 8000, {…} => 5000, {…} => 15000, {…} => 55000}
// 15000 {oil: 200} Map(4) {{…} => 8000, {…} => 5000, {…} => 15000, {…} => 55000}
// 55000 {bread: 50} Map(4) {{…} => 8000, {…} => 5000, {…} => 15000, {…} => 55000}