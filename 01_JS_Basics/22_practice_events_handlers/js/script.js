// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

document.addEventListener('DOMContentLoaded', () => { // коллбэк ф-ция запустится когда DOM структура загрузится!!!
  const movieDB = { // оптимизация выполнения JS на странице после загрузки всей верстки!!!
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
  const deleteAdv = (array) => { // array - аргумент, позволяющий уйти от привязки к элем-м страницы
    array.forEach(item => { // adv.forEach(function (item) {
      item.remove();
    });
  };
  deleteAdv(adv);

  // 2) задача: Изменить жанр фильма, поменять "комедия" на "драма"
  // 3) задача: Изменить задний фон постера с фильмом на изображение "bg.jpg".
  // Оно лежит в папке img.
  // Реализовать только при помощи JS
  const poster = document.querySelector('.promo__bg');
  const genre = poster.querySelector('.promo__genre');
  const makeChanges = () => {
    genre.textContent = 'ДРАМА';
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };
  makeChanges();

  // -----------------------------------------------------------------------------------------------
  // Задания на урок:

  // 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
  // новый фильм добавляется в список. Страница не должна перезагружаться.
  // Новый фильм должен добавляться в movieDB.movies.
  // Для получения доступа к значению input - обращаемся к нему как input.value
  // (внутренности ИНПУТА);
  // P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
  // 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
  // 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
  // 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
  // "Добавляем любимый фильм"
  // 5) Фильмы должны быть отсортированы по алфавиту

  const addForm = document.querySelector('form.add');
  const addInput = addForm.querySelector('.adding__input');
  const checkbox = addForm.querySelector('[type="checkbox"]');

  addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newFilm = addInput.value; // addInput.value - проверяем значение введенное пользователем,
    // сначала это пустая строка
    const favorite = checkbox.checked; // данный атрибут имеет булиновое значение
    if (newFilm) { // выполняется тогда, когда Input.value заполнен => newFilm = true!!!!
      // newFilm = false => не выполнится при пустой строке!
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`; // проверяем длину нашего фильма, длиннее 21 - ставим три точки!!!
      }
      if (favorite) {
        alert('"Добавляем любимый фильм!"'); // выполняется тогда, когда favorite = true!!!!
      }
      movieDB.movies.push(newFilm); // помещаем в массив фильм
      sortArray(movieDB.movies); // movieDB.movies.sort() - заменил, сортировку по фильмам
      createMovieList(movieDB.movies, movieList);
    }
    event.target.reset();
  });

  // *) задача: Список фильмов на странице сформировать на основании данных из этого JS файла.
  // Отсортировать их по алфавиту
  // *) задача: Добавить нумерацию выведенных фильмов
  const movieList = document.querySelector('.promo__interactive-list'); // querySelectorAll не подходит!
  const sortArray = (array) => {
    array.sort(); // сортируем элементы по порядку
  };
  function createMovieList(film, parent) { // parent - родительский блок использует фильмы,
    // помещаем в него изменения фильмов
    parent.innerHTML = ''; // записываем пустую строку в элементы!!! Чистим страницу!
    sortArray(movieDB.movies); // вызываем сортировку при создании нового списка фильмов
    film.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
            <div class="delete"></div>
        </li>
      `;
    });
    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1); // метод, вырезающий определенный элемент из массива под
        // номером - i, 1 - это количество удаляемых элементов!!!
        createMovieList(film, parent); // рекурсия - ф-ция вызыв саму себя внутри ф-ции
        // при удалении элемента, вызывается рекуурсия и перестраивается заново нумерация списка!!!!
      });
    }); // метод forEach для повторяющихся событий!!!
  }
  createMovieList(movieDB.movies, movieList);
});
