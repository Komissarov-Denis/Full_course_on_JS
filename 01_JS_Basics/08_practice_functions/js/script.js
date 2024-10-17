// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const personalMovieDB = {
	count: {},
	movies: {},
	actors: {},
	genres: [],
	private: {},
};

function checkPrivateStatus() {
	personalMovieDB.private = confirm('Это частная информация?');
	console.log(personalMovieDB.private);
}
checkPrivateStatus();

function numbOfFilms() {
	personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
	while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) { // isNaN(numberOfFilms) - если не число!!!
		personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
	}
}
numbOfFilms();

// ------------------------------------------------------------------------------
// const a = prompt('Один из последних просмотренных фильмов?', '');
// const b = +prompt('На сколько оцените его?', '');
// const c = prompt('Один из последних просмотренных фильмов?', '');
// const d = +prompt('На сколько оцените его?', '');
// personalMovieDB.movies[a] = b;
// personalMovieDB.movies[c] = d;
// console.log(personalMovieDB);
// -------------------------------------------------------------------------------
// автоматизируем двойные вопросы
// Если ЮЗЕР оставляет пустую строку, отменяет ответ или вводит название кино длиннее 50 символов,
// возвращаем его снова проходить вопросы
// при нажатии отмена в модальном окне в "А" попадает "null"
// длину строки можно проверить с помощью "string.length"
// '' - пустая строка
function rememberMyFilms() {
	for (let i = 0; i < 2; i++) {
		const a = prompt('Один из последних просмотренных фильмов?', '');
		const b = +prompt('На сколько оцените его?', '');

		if (a != null && b != null && a != '' && b != '' && a.length < 50) {
			personalMovieDB.movies[a] = b;
			console.log('DONE');
		} else {
			console.log('ERROR');
			i--; // так как выводится сообщение об ошибке в 'else', то нужно вернуться на цикл назад!!!
		}
	}
}
rememberMyFilms();

// при помощи условий проверить  personalMovieDB.count, если он  меньше 10 -
// "Просмотрено мало фильмов для оценки!", если от 10 до 30 - "Вы классический зритель!",
// если больше 30 - "Вы настоящий киноман!", в противном случае - "ERROR"
function detectPersonalLevel() {
	if (personalMovieDB.count <= 1) {
		console.log('Вы не можете оценивать, результаты некорректны!'); // нужна команда прерывания цикла!!!!!!!!!!!!!!!!!!!!!
	} else if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
		console.log('Просмотрено слишком мало фильмов для оценки!');
	} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
		console.log('Вы классический зритель!');
	} else if (personalMovieDB.count >= 30) {
		console.log('Вы настоящий киноман!');
	} else {
		console.log('ERROR');
	}
}
detectPersonalLevel();

// Функция showMyDB проверяет свойство значение в private объекта personalMovieDB,
// если false - выводит объект personalMovieDB, иначе сообщение 'Это частная информация!'
function showMyDB() {
	for (let i = 0; i < 1; i++) {
		if (personalMovieDB.private == false) {
			console.log(personalMovieDB);
		} else {
			console.log('Это частная информация!');
		}
	}
}
showMyDB();
// другой вариант:
// function showMyDB(hidden) { // в  hidden передается true/false - затем идет сравнение!!!
//   if (!hidden) {
//     console.log(personalMovieDB);
//   } else {
//     console.log('Это частная информация!');
//   }
// }
// showMyDB();

// создаем функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос:
// "Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив
// данных genres
function writeYourGenres() {
	for (let i = 1; i <= 3; i++) {
		// const genres = prompt(`Ваш любимый жанр под номером ${i}`);
		// наклонные кавычки ` позволяют в вопрос добавлять переменные!!!
		personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`);
	}
}
writeYourGenres();
