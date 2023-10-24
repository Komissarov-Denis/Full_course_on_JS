// Задания на урок:

'use strict';

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
const promoAdv = document.getElementsByClassName('promo__adv');
promoAdv[0].remove();

// 2) задача: Изменить жанр фильма, поменять "комедия" на "драма"
const promoGenreIsReplaced = document.getElementsByClassName('promo__genre');
const promoBg = document.querySelector('.promo__bg');
const promoGenreIsPlaced = document.createElement('div');
promoGenreIsPlaced.classList.add('promo__genre-dramma');
promoGenreIsPlaced.innerHTML = 'ДРАМА';
promoGenreIsPlaced.style.cssText = 'font-weight: bold; font-size: 18px; line-height: 21px; color: #FFFFFF; text-transform: uppercase';
promoBg.prepend(promoGenreIsPlaced);
promoGenreIsReplaced[0].replaceWith(promoGenreIsPlaced[0]);

// 3) задача: Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
// Реализовать только при помощи JS

// 4) задача: Список фильмов на странице сформировать на основании данных из этого JS файла.
// Отсортировать их по алфавиту

// 5) задача: Добавить нумерацию выведенных фильмов
