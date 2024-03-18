'use strict';

// SET - особый вид коллекции по типу массива, где каждое значение встречается только однажды!!!

const arr = [1, 1, 2, 2, 4, 5, 6, 5];
const set = new Set(arr);
console.log(set); // получил: Set(5) {1, 2, 4, 5, 6}


const array = ['Alex', 'Ann', 'Oleg', 'Alex'];
const setName = new Set(array);
console.log(setName); // получил: Set(3) {'Alex', 'Ann', 'Oleg'}

function unique(array) {
	return Array.from(new Set(array)); // создаем массив Array.from() из набора данных Set(array) без дублирующих данных!!!
}
console.log(unique(array)); // получил: (3) ['Alex', 'Ann', 'Oleg']


// МЕТОД add()
setName.add('Ivan');
setName.add('Oleg'); // повтор не добавляется
console.log(setName); // получил: Set(4) {'Alex', 'Ann', 'Oleg', 'Ivan'}


// // МЕТОД delete()
// set.delete(value); // удаление значений

// // МЕТОД has()
// set.has(value); // проверяем наличие значений

// // МЕТОД clear()
// set.clear(value); // полностью можем очистить set

// // МЕТОД size()
// set.size(); // получение размера набора данных set

// МЕТОД перебора данных for (...of...)
for (let value of set) console.log(value); // получил: 1, 2, 4, 5, 6

// МЕТОД перебора данных forEach()
setName.forEach((value, valueAgain) => {
	console.log(value, valueAgain); // получил: Alex Alex   Ann Ann   Oleg Oleg   Ivan Ivan
});

// МЕТОД values() 
setName.values();
console.log(setName.values()); // получил: SetIterator {'Alex', 'Ann', 'Oleg', 'Ivan'}

// МЕТОД keys()
setName.keys();
console.log(setName.keys()); // получил: SetIterator {'Alex', 'Ann', 'Oleg', 'Ivan'}

// МЕТОД
setName.entries();
console.log(setName.entries()); // получил: SetIterator {'Alex' => 'Alex', 'Ann' => 'Ann', 'Oleg' => 'Oleg', 'Ivan' => 'Ivan'}