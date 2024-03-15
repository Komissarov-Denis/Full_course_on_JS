'use strict';

// MAP - картами называют спицефические виды данных, которые очень похожи на объект, только у них вместо свойств могут использоваться и объект, и массив, и функция, и все что угодно!!!

// const user = {
// 	name: 'Alex',
// 	surname: 'Smith',
// 	birthday: '20/04/1993',
// 	showMyPublicData: function() {
// 		console.log(`${this.name} ${this.surname}`);
// 	}
// };
// console.log(typeof(Object.keys(user)[0])); // получил: name - string
// console.log(typeof(Object.values(user)[0])); // получил: Alex - string

const shops = [
	{rice: 500},
	{oil: 200},
	{bread: 50},
];
const map = new Map();
map.set(shops[0], 5000);
console.log(map); // получил: Map(1) { { rice: 500 } => 5000 }