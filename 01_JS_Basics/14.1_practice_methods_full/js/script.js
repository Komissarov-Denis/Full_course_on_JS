// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';


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
    while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
      personalMovieDB.count = +prompt('Сколько фильмов Вы уже посмотрели?', '');
    }
  },
  rememberMyFilms: function() {
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
  detectPersonalLevel: function() {
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
  showMyDB: function() {
    for (let i = 0; i < 1; i++) {
      if (personalMovieDB.privat == false) {
        console.log(personalMovieDB);
      } else {
        console.log('Это частная информация!');
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
    personalMovieDB.genres.forEach((item, i) => { // коллбэк ф-ия, где item - каждый перебираемый
      // элемент массива - жанры, i - это номер по порядку в каждой итерации цикла
      console.log(`Любимый жанр ${i + 1} - это ${item}`); // для сохранения номеров по порядку - прибавляем 1-ку!
    });
  },
};
personalMovieDB.checkPrivatStatus();
personalMovieDB.numbOfFilms();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.showMyDB();
personalMovieDB.writeYourGenres();
