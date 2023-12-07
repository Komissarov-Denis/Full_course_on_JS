// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Из проекта FOOD
axios.get('http://localhost:3000/menu')
	.then(data => {
		data.data.forEach(({img, altimg, title, descr, price}) => { // перебираем весь массив db.json состоящий из объектов деструктурировав его методом ({img, altimg, title, descr, price})
			new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
		});
	});