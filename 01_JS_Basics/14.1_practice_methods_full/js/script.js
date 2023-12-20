// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// 1.задача переписать код, чтобы разрозненные функции стали методами объекта personalMovieDB:
// 2.задача в методе writeYourGenres запретить пользователю нажимать кнопку "ОТМЕНА" или оставлять
// пустую строку. В противном случяае отправлять его к этому же вопросу. После введения всех жанров,
// с помощью метода forEach вывести в консоль сообщения в таком виде: "Любимый жанр №(номер по
// порядку, начиная с 1-го) - это (название их массива)"*/
const personalMovieDB = {
	count: {},
	movies: {},
	actors: {},
	genres: [],
	privat: {},
	checkPrivatStatus: function() {
		personalMovieDB.privat = confirm('Это частная информация?');
		console.log(personalMovieDB.privat);
	},
	numbOfFilms: function() {
		personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
		while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count) || personalMovieDB.count <= 1) {
			alert('Вы не можете оценивать, результаты будут некорректны!');
			personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
		}
	},
	detectPersonalLevel: function() {
		if (personalMovieDB.count > 1 && personalMovieDB.count <= 10) {
			console.log('Просмотрено слишком мало фильмов для оценки!');
		} else if (personalMovieDB.count > 10 && personalMovieDB.count < 30) {
			console.log('Вы классический зритель!');
		} else if (personalMovieDB.count >= 30) {
			console.log('Вы настоящий киноман!');
		} else {
			console.log('ERROR');
		}
	},
	rememberMyFilms: function() {
		const num = personalMovieDB.count;
		for (let i = 0; i < num; i++) {
			console.log(personalMovieDB.count);
			console.log(num);
			console.log(i);
			const a = prompt('Один из последних просмотренных фильмов?', '');
			const b = +prompt('На сколько оцените его?', '');
			if (a != null && b != null && a != '' && b != '' && !isNaN(b) && a.length < 50) {
				personalMovieDB.movies[a] = b;
				console.log('DONE');
			} else {
				console.log('ERROR');
				i--;
			}
		}
	},
	showMyDB: function() {
		for (let i = 0; i < 1; i++) {
			if (personalMovieDB.privat == false) {
				console.log(personalMovieDB);
				console.log('Открытый доступ!');
			} else {
				console.log('Это частная информация!');
				continue;
			}
		}
	},
	writeYourGenres: function() {
		for (let i = 1; i <= 3; i++) {
			let genre = prompt(`Ваш любимый жанр под номером ${i}:`);
			if (genre == '' || genre == null || !isNaN(genre)) {
				console.log('Вы не ввели данные о жанре!');
				i--;
			} else {
				personalMovieDB.genres[i - 1] = genre;
			}
		}
		personalMovieDB.genres.forEach((item, i) => { // коллбэк функция, где item - каждый перебираемый элемент массива - жанры, i - это номер по порядку в каждой итерации цикла
			console.log(`Любимый жанр ${i + 1} - это ${item}`); // для сохранения номеров по порядку - прибавляем 1-ку!
		});
	},
};
personalMovieDB.checkPrivatStatus();
personalMovieDB.showMyDB();
personalMovieDB.numbOfFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.rememberMyFilms();
personalMovieDB.writeYourGenres();


// const result = document.querySelector('.calculating__result span'); // получили по селектору класс, в который будем записывать результат расчета
// let sex, height, weight, age, ratio; // объявили несколко переменных (через let так как они будут меняться): пол, рост, вес, возраст и коэффициент активности
// function calcTotal() { // подсчитываем конечный результат, но начинать подсчет будем с проверки наличия всех заполненных данных, запускаться будет при внесении изменений
// 	if (!sex || !height || !weight || !age || !ratio) {
// 		result.textContent = 'Нет данных!!!';
// 		return; // прерываем досрочно функцию при отсутствии заполнения хотя бы одной переменной, все условия после return работать не будут!!!
// 	}
// 	if
// }