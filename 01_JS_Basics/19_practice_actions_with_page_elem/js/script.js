// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

const movieDB = {
	movies: [
		'ЛОГАН',
		'ЛИГА СПРАВЕДЛИВОСТИ',
		'ЛА-ЛА ЛЕНД',
		'ОДЕРЖИМОСТЬ',
		'СКОТТ ПИЛИГРИМ ПРОТИВ...',
	],
};

// 1) задача: Удалить все рекламные блоки со страницы (правая часть сайта)
const adv = document.querySelectorAll('.promo__adv img');
adv.forEach(item => { // adv.forEach(function (item) {}
	item.remove();
});

// 2) задача: Изменить жанр фильма, поменять "комедия" на "драма"
// 3) задача: Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
// Реализовать только при помощи JS
const poster = document.querySelector('.promo__bg'); // выбираем родителя .promo__bg
const genre = poster.querySelector('.promo__genre'); // выбираем в родительском блоке .promo__bg дочерний элемент .promo__genre
genre.textContent = 'ДРАМА'; // у дочергнего элемента меняем текст жанра на 'ДРАМА'
poster.style.backgroundImage = 'url("img/bg.jpg")'; // у дочергнего элемента меняем задний фон через CSS (учитывается комбинирование кавычек)

// 4) задача: Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту
// 5) задача: Добавить нумерацию выведенных фильмов
const movieList = document.querySelector('.promo__interactive-list'); // получили родительский блок .promo__interactive-list
movieList.innerHTML = ''; // записываем пустую строку в элементы!!! Чистим страницу!!! innerHTML работает только с querySelector()
movieDB.movies.sort(); // сортируем элементы по порядку
movieDB.movies.forEach((film, i) => {
	movieList.innerHTML += `
		<li class="promo__interactive-item">${i + 1} ${film}
				<div class="delete"></div>
		</li>
	`;
});