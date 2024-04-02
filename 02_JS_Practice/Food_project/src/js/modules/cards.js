import {getResources} from '../services/services.js';

// CLASSES-for-CARDS--------------------------------------------------
export default function cards() {    
	class MenuCards {
		constructor(srcImg, altText, title, descr, price, parentSelector, ...classes) { // добавил REST оператор (...classes), так как не известно - будут ли еще изменения в карточках меню
			this.srcImg = srcImg;
			this.altText = altText;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.transfer = 100; // курс доллара к рублю
			this.classes = classes;
			this.parentSelector = document.querySelector(parentSelector); // тут теперь лежит DOM  элемент от родителького селектора '.menu .container'!!!	
			this.changeToRub(); // создаем changeToRub() - метод конвертирования цены из долларов в рубли после построения всех свойств объекта
		}
		changeToRub() {
			this.price = +this.price * this.transfer;
		}
		render() { // классическое название для формирование верстки - метод render()
			const element = document.createElement('div');
			if (this.classes.length === 0 ) { // если у массива this.classes нет классов, то присваиваем класс 'menu__item' всем div элементам
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else { // если у массива this.classes хоть один класс присутствует, то добавляем класс
				this.classes.forEach(className => element.classList.add(className)); // для каждого элемента массива обращаемся к classList созданного в element div и добавляем каждый класс, который находится в массиве className				
			}
			element.innerHTML =`					
				<img src=${this.srcImg} alt=${this.altText}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб./день</div>
				</div>				
			`;
			this.parentSelector.append(element); // метод append() добавляет в container новый element

			const replacerCard = element.parentElement;
			console.log(replacerCard);
			// console.log(Array.from(replacerCard)); 
		}
	}
	// getResources('http://localhost:3000/menu') => еще вариант формирования MenuCards
	// 	.then(data => createMenuCards(data));
	// function createMenuCards(data) {
	// 	data.forEach(({img, altimg, title, descr, price}) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `					
	// 			<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> руб./день</div>
	// 			</div>			
	// 		`;
	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }
	getResources('http://localhost:5000/menu') // оптимизируем работу с карточками МЕНЮ
		.then(data => {
			data.forEach(({img, altimg, title, descr, price}) => { // перебираем весь массив db.json состоящий из объектов деструктурировав его методом ({img, altimg, title, descr, price})
				new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
			});
		});

	// new MenuCards(    => заменили верстку динамическим формированием MenuCards с помощью запросов к серверу
	// 	'img/tabs/vegy.jpg',
	// 	'vegy',
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	'.menu .container',
	// 	'menu__item',  // классы успешно добавляются
	// 	// 'first', // классы успешно добавляются
	// 	// 'first__green', // классы успешно добавляются
	// ).render(); // заполняем новый класс MenuCards с помощью метода render(), карточка создастся, заполнится и метод удалится, так как на него не будет больше ссылок
	// new MenuCards(
	// 	'img/tabs/elite.jpg',
	// 	'elite',
	// 	'Меню "Премиум"',
	// 	'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	// 	21,
	// 	'.menu .container',
	// 	'menu__item',  // классы успешно добавляются
	// 	// 'second', // классы успешно добавляются
	// 	// 'second__blue', // классы успешно добавляются
	// ).render(); // заполняем новый класс MenuCards с помощью метода render(), карточка создастся, заполнится и метод удалится, так как на него не будет больше ссылок
	// new MenuCards(
	// 	'img/tabs/post.jpg',
	// 	'post',
	// 	'Меню "Постное"',
	// 	'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	// 	14,
	// 	'.menu .container',
	// 	'menu__item',  // классы успешно добавляются
	// 	// 'third', // классы успешно добавляются
	// 	// 'third__red',  // классы успешно добавляются
	// ).render(); // заполняем новый класс MenuCards с помощью метода render(), карточка создастся, заполнится и метод удалится, так как на него не будет больше ссылок
	
	// const replacedCard = document.querySelectorAll('.menu__item');
	// console.log(replacedCard);
}