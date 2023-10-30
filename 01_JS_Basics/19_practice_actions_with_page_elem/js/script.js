// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

// 'use strict';

const movieDB = {
  movies: [
    'Логан',
    'Лига справедливости',
    'Ла-ла лэнд',
    'Одержимость',
    'Скотт Пилигрим против...',
  ],
};

// 1) задача: Удалить все рекламные блоки со страницы (правая часть сайта)
const adv = document.querySelectorAll('.promo__adv img');
adv.forEach(item => { // adv.forEach(function (item) {
  item.remove();
});

// 2) задача: Изменить жанр фильма, поменять "комедия" на "драма"
// 3) задача: Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
// Реализовать только при помощи JS
const poster = document.querySelector('.promo__bg');
const genre = poster.querySelector('.promo__genre');
genre.textContent = 'ДРАМА';
poster.style.backgroundImage = 'url("img/bg.jpg")';

// 4) задача: Список фильмов на странице сформировать на основании данных из этого JS файла.
// Отсортировать их по алфавиту
// 5) задача: Добавить нумерацию выведенных фильмов
const movieList = document.querySelector('.promo__interactive-list'); // querySelectorAll не подходит!
movieList.innerHTML = ''; // записываем пустую строку в элементы!!! Чистим страницу!
movieDB.movies.sort(); // сортируем элементы по порядку
movieDB.movies.forEach((film, i) => {
  movieList.innerHTML += `
    <li class="promo__interactive-item">${i + 1} ${film}
        <div class="delete"></div>
    </li>
  `;
});
