// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// 1.задача переписать код, чтобы разрозненные функции стали методами объекта personalMovieDB:
// 2.задача в методе writeYourGenres запретить пользователю нажимать кнопку "ОТМЕНА" или оставлять
// пустую строку. В противном случае, отправлять его к этому же вопросу. После введения всех жанров,
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
		personalMovieDB.showMyDB();
	},
	showMyDB: function() {
		if (personalMovieDB.privat == false) {
			console.log(personalMovieDB);
			console.log('Доступ открыт! Ответьте пожалуйста на вопросы!');
			alert('Доступ открыт! Ответьте пожалуйста на вопросы!');
		} else {
			console.log('Доступ закрыт! Опрос завершен!');
			alert('Доступ закрыт! Опрос завершен!');
			return;
		}		
		personalMovieDB.numbOfFilms();
		personalMovieDB.detectPersonalLevel();
	},
	numbOfFilms: function() {
		personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '').trim();
		while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count) || personalMovieDB.count <= 0) {
			alert('Вы не можете оценивать, результаты будут некорректны!');
			personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '').trim();
		}
	},
	detectPersonalLevel: function() {
		if (personalMovieDB.count >= 1 && personalMovieDB.count <= 3) {
			console.log(`Просмотрено слишком мало фильмов для оценки! Всего ${personalMovieDB.count} фильм(а)ов. Опрос завершен!`);
			alert(`Просмотрено слишком мало фильмов для оценки! Всего ${personalMovieDB.count} фильм(а)ов. Опрос завершен!`);
			return; 
		}	else if (personalMovieDB.count > 3 && personalMovieDB.count < 30) {
			console.log(`Вы классический зритель, так как просмотрели ${personalMovieDB.count} фильм(а)ов!`);
			alert(`Вы классический зритель, так как просмотрели ${personalMovieDB.count} фильм(а)ов!`);
		}	else if (personalMovieDB.count >= 30) {
			console.log(`Вы настоящий киноман, так как просмотрели ${personalMovieDB.count} фильм(а)ов!`);
			alert(`Вы настоящий киноман, так как просмотрели ${personalMovieDB.count} фильм(а)ов!`);
		}	else {
			console.log('ERROR');
			alert('ERROR');
		}
		personalMovieDB.rememberMyFilms();
		personalMovieDB.writeYourGenres();
	},
	rememberMyFilms: function() {
		const num = personalMovieDB.count;
		for (let i = 0; i < num; i++) {
			console.log(personalMovieDB.count);
			console.log(num);
			console.log(i);
			const a = prompt('Один из последних просмотренных фильмов?', '').trim(); // удаляет пробелы в начале и в конце строки!!!
			const b = +prompt('На сколько оцените его?', '').trim(); // + превращает строку в числовой тип данных, а пустую строку в нуль!!!
			if (a != null && b != null && a != '' && b != '' && !isNaN(b)  && a.length > 3 && a.length < 50) { // null - это клик по кнопке "Отмена"
				personalMovieDB.movies[a] = b;
				console.log('DONE');
			} else {
				console.log('ERROR');
				i--; // так как выводится сообщение об ошибке в 'else', то нужно вернуться на цикл назад!!!
			}
		}
	},
	writeYourGenres: function() {
		for (let i = 1; i <= 3; i++) {
			let genre = prompt(`Ваш любимый жанр под номером ${i}:`).trim();
			if (genre == '' || genre == null || !isNaN(genre) || genre.length < 3 || genre.length > 10) {
				console.log('Вы не ввели данные о жанре!');
				alert('Вы не ввели данные о жанре!');
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