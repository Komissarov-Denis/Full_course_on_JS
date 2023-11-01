// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели?', '');
const personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	privat: false,
};
// ------------------------------------------------------------------------------
// const a = prompt('Один из последних просмотренных фильмов?', '');
// const b = +prompt('На сколько оцените его?', '');
// const c = prompt('Один из последних просмотренных фильмов?', '');
// const d = +prompt('На сколько оцените его?', '');
// personalMovieDB.movies[a] = b;
// personalMovieDB.movies[c] = d;
// console.log(personalMovieDB);

// -------------------------------------------------------------------------------
// function (personalMovieDB) {
// автоматизируем двойные вопросы
// Если ЮЗЕР оставляет пустую строку, отменяет ответ или вводит название кино длиннее 50 символов,
// возвращаем его снова проходить вопросы
// при нажатии отмена в модальном окне в "А" попадает "null"
// длинну строки можно проверисть с помощью "string.length"
// '' - пустая строка
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

// при помощи условий проверить personalMovieDB.count, если он меньше 10 -
// "Просмотрено мало фильмов для оценки!", если от 10 до 30 - "Вы классический зритель!",
// если больше 30 - "Вы настоящий киноман!", в противном счлучае - "ERROR"
if (personalMovieDB.count <= 0) {
	console.log('Вы не можете оценивать!');
} else if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
	console.log('Просмотрено слишком мало фильмов для оценки!');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
	console.log('Вы классический зритель!');
} else if (personalMovieDB.count >= 30) {
	console.log('Вы настоящий киноман!');
} else {
	console.log('ERROR');
}
console.log(personalMovieDB);
