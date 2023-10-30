// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

// 1.задача переписать код, чтобы разрозненные функции стали методами объекта personalMovieDB:
// 2.задача создать метод toggleVisibleMyDB, который проверяет св-во privat. Если false,
// он переключает его в true и наоборот!
const personalMovieDB = {
  count: {},
  movies: {},
  actors: {},
  genres: [],
  // privat: {},
  // checkPrivatStatus: () => {
  //   personalMovieDB.privat = confirm('Это частная информация?');
  //   console.log(personalMovieDB.privat);
  // },
  privat: false,
  numbOfFilms: () => {
    personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
    while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
      personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
    }
  },
  rememberMyFilms: () => {
    for (let i = 0; i < 2; i++) {
      const a = prompt('Один из последних просмотренных фильмов?', '');
      const b = +prompt('На сколько оцените его?', '');  
      if (a != null && b != null && a != '' && b != '' && a.length < 50) {
        personalMovieDB.movies[a] = b;
        console.log('DONE');
      } else {
        console.log('ERROR');
        i--;
      }
    }
  },
  detectPersonalLevel: () => {
    if (personalMovieDB.count <= 1) {
      console.log('Вы не можете оценивать, результаты некорректны!');
    } else if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
      console.log('Просмотрено слишком мало фильмов для оценки!');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
      console.log('Вы классический зритель!');
    } else if (personalMovieDB.count >= 30) {
      console.log('Вы настоящий киноман!');
    } else {
      console.log('ERROR');
    }
  },
  showMyDB: () => {
    for (let i = 0; i < 1; i++) {
      if (personalMovieDB.privat == false) {
        console.log(personalMovieDB);
      } else {
        console.log('Это частная информация!');
      }
    }
  },
  toggleVisibleMyDB: () => { // 2-я задача!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (personalMovieDB.privat) {
      personalMovieDB.privat = false;
    } else {
      personalMovieDB.privat = true;
    }
    console.log(personalMovieDB.privat);
  },
  writeYourGenres: () => {
    for (let i = 1; i <= 3; i++) {
      personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}:`);
    }
  },
};// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// personalMovieDB.checkPrivatStatus();
personalMovieDB.numbOfFilms();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB();
personalMovieDB.toggleVisibleMyDB();
personalMovieDB.writeYourGenres();
