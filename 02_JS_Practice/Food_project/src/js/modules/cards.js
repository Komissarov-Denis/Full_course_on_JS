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
			this.classes = classes; // создаем рест оператор с поименованием его ...classes, будем работать с ним как с массивом, новых классов может быть множество
			this.parentSelector = document.querySelector(parentSelector); // тут теперь лежит DOM element от родителького селектора '.menu .container', который передается в настройку нашего класса!!!	
			this.changeToRub(); // создаем changeToRub() - метод конвертирования цены из долларов в рубли после построения всех свойств объекта
		}
		changeToRub() {
			this.price = (+this.price) * (+this.transfer); // унарный "+" переводит в числовое счисление
		}
		render() { // классическое название для формирование верстки - метод render()
			const element = document.createElement('div'); // создаем элемент div, помещаем его в переменную, к которой можно обращаться 
			if (this.classes.length === 0) { // если в массив this.classes ничего не передается, ни один элемент и он пуст (rest оператор формирует массивы на каждом шаге из 3), то проходим по всем элементам, по каждому =>
				this.element = 'menu__item'; // и присваиваем дефолтный класс '.menu__item' всем создаваемым element/div элементам поочередно
				element.classList.add(this.element); // далее на каждом шаге из трех (три карточки), добавляется класс '.menu__item' в класс лист (псевдомассив) => element.classList.add('menu__item') - тоже самое в одну строку!!!
			} else { // если в массив this.classes хоть один класс передан, то каждому добавляем класс => назовем каждый элемент внутрии массива classes как className, так как стрелочная функция будет принимать этот аргумент className
				this.classes.forEach(className => element.classList.add(className)); // для каждого элемента массива обращаемся к classList созданного в массиве element/div и добавляем каждый класс, который находится в массиве className				
			} // атрибуту "class" соответствует свойство className в JS, т.е. class="menu__item" соответствует className = 'menu__item'
			element.innerHTML =`					
				<img src=${this.srcImg} alt=${this.altText}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span></div>
					<div>руб./день</div>
				</div>				
			`; // динамически создаем вложенную структуру каждого элемента div
			this.parentSelector.append(element); // метод append() добавляет на каждом шаге в конец родительского '.menu .container' новый DOM element/div
			this.element = 'new-card'; // на каждом шаге из трех (три карточки), добавляется к каждому новому элементу класс '.new-card'
			element.classList.add(this.element); // на каждом шаге из трех (три карточки), добавился класс '.new-card' в класс лист (псевдомассив)
			const newCards = document.querySelectorAll('.new-card'); // создаем новые элементы newCards с классом '.new-card', для дальнейшего использования
			const prototypeCards = document.querySelectorAll('.prototype-card'); // создаем новые элементы prototypeCards с классом '.prototype-card', для дальнейшего использования
			// console.log(prototypeCards); // NodeList(3) [div.menu__item.prototype-card, div.menu__item.prototype-card, div.menu__item.prototype-card]
			// console.log(newCards); // NodeList(3) [div.menu__item.new-card, div.menu__item.new-card, div.menu__item.new-card]
			prototypeCards[0].replaceWith(newCards[0]); // на каждом шаге из трех (три карточки), каждый вновь созданный элемент с классом '.new-card' замещает заглушечный элемент с классом '.prototype-card'
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
			data.forEach(({img, altimg, title, descr, price}) => { // перебираем весь массив db.json состоящий из объектов, деструктурировав его методом forEach({img, altimg, title, descr, price})
				new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
			});
		});


	// new MenuCards( // эта запись позволяет создавать объект без переменой => заменили верстку динамическим формированием MenuCards с помощью запросов к серверу 
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

}