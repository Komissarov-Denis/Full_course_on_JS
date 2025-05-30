// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// API -  Application Programming Interface - программный интерфейс приложения!!!
// fetch API - технология не поддерживается старыми (можно использовать полифил), но поддерживается всеми современными браузерами.
// https://jsonplaceholder.typicode.com/ - это виртуальная база данных в виде сервера для тестирования наших запросов на основе PROMISE!!!


fetch('https://jsonplaceholder.typicode.com/posts', { // по fetch запросу возвращается промис в виде объекта с ключами и их свойствами, далее он обрабатывается цепочкой .then()
	method: 'POST', // method - это обязательное ключевое свойство
	body: JSON.stringify({name: 'Alex'}), // body - это обязательное ключевое свойство
	headers: { // headers - это тоже обязательное ключевое свойство
		'Content-type': 'application/json'
	}
})
	.then(response => response.json()) // тут мы получаем response ответ от сервера в формате json (метод response.json() в fetch соответствует методу parse() в AJAX), т.е. из response.json() вернется PROMISE в виде объекта
	.then(json => console.log(json)); // если PROMISE успешен =>то дальше в json находится объект и мы его используем в консоли
// Получил:
// {name: 'Alex', id: 101}
// соответственно: нам вернулась 101 запись, так как на фетче уже 100 постов, это корректное поведение для проверки, с ним работа проще чем с XMLHttpRequest



// ОБРАЗЕЦ fetch() запроса для проекта FOOD:
// SEND-FORMS--------------------------------------fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ 
const forms = document.querySelectorAll('form');
const message = {
	// loading: 'Загрузка...', // текст комментируем, так как будем использовать спиннер картинку
	loading: 'img/form/spinner.svg', // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
	success: 'Спасибо! Скоро с Вами свяжемся!',
	failure: 'Что-то пошло не так...',
};
forms.forEach(item => { // берем все созданные формы и подвязываем функцию bindpostData()
	bindPostData(item);
});
const postData = async (url, data) => { // function expression - без объявления присваивается в переменную, postData отвечает за постинг данных при отправке на сервер + оператор async() в связи с асинхронностью 
	const result = await fetch(url, { // в fetch(), url - указываем первым аргументом адрес сервера, data - данные, которые будут поститься на сервер, отправляем сформированный запрос + оператор await() для ожидания ответа от сервера
		method: 'POST',
		headers: {
			'Content-type': 'application/json' 
		},
		body: data,	// создаем новый объект для формирования документа запроса fetch(), метод и заголовки указывать обязательно!!!	
	}); // фетч запрос вернет промис, в переменной result нет ничего, пока промис не вернет от сервера данные
	return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через цепочку .then() - так как это АСИНХРОННЫЙ КОД + оператор await() дожидается обработки данных в result.json()!!!
}; // async() + await() - это операторы, работающие только в паре!!!
function bindPostData(form) { // будем (bind) привязывать какую-то форму, очень удобно навесить на нее обработчик события submit, которое будет срабатывать каждый раз при отправке форм
	form.addEventListener('submit', (e) => {
		e.preventDefault(); // отменяем дефолтную перезагрузку и поведение браузера
		// const statusMessage = document.createElement('div'); // создаем блок для сообщений
		const statusMessage = document.createElement('img'); // вместо блока теперь будем использовать картинку спиннера
		// statusMessage.classList.add('status'); // добавляем класс блоку сообщений
		statusMessage.src = message.loading; // используем путь к спиннеру
		statusMessage.textContent = message.loading; // заполняем блок главным сообщением 'Загрузка...'
		statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`; // добавляем стили спиннеру
		// form.append(statusMessage); // к форме добавляем это сообщение 'Загрузка...'
		form.insertAdjacentElement('afterend', statusMessage); // чтобы спиннер не сбивал верстку используем insertAdjacentElement() - вставить соседний элемент ()!!!
		const formData = new FormData(form); // FormData(form) отыскивает в html атрибут name в тегах input всех форм, без него работать не будет!!!
		
		// postData('http://localhost:3000/requests', JSON.stringify(objectJson)) // конвертируем json в строку JSON с двойными кавычками =>
		// это упрощенная форма создания объекта objectJson, есть более элегантный способ  с помощью методов Json => берем formData и превращаем ее в массив массивов с помощью formData.entries(), =>
		const json = JSON.stringify(Object.fromEntries(formData.entries())); // далее - в классический объект Object.fromEntries(formData.entries(), а затем, переводим в формат JSON данные запроса через JSON.stringify(Object.fromEntries(formData.entries()))			
		postData('http://localhost:3000/requests', json) // метод entries() возвращает массив массивов перечисляемых свойств указанного объекта formData{}, метод fromEntries() возвращает объект их массива
		// .then(data => data.text()) // данная строка уже не нужна, она создается в postData асинхронной функции и уже там прописана внутри
			.then(data => { // сервер вернет данные data, пока это не JSON
				console.log(data); // берем data данные, которые вернул сервер из PROMISE (успешный исход)
				showThanksModal(message.success); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
				statusMessage.remove(); // удаляем наш спиннер по выполнению PROMISE
			}).catch(() => { // catch метод обязательно нужно прописывать для обработок ошибок!!!
				showThanksModal(message.failure);// вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!				
			}).finally(() => { // finally метод обязательно нужно прописывать для обработок оконечных действий
				form.reset(); // очищаем форму после выведением сообщения				
			});
	}); 
}
function showThanksModal(message) { // создаем функцию динамической замены элементов модального окна с отправкой сообщения message
	const prevModalDialog = document.querySelector('.modal__dialog'); // получаем элемент modal__dialog
	prevModalDialog.classList.add('hide'); // добавляем класс hide элементу modal__dialog
	openModalWindow(); // команда открытия модальных окон
	const thanksModal = document.createElement('div'); // создаем новый контент обертку
	thanksModal.classList.add('modal__dialog'); // будем заменять один modal__dialog другим с новым контентом
	thanksModal.innerHTML = ` 
		<div class="modal__content">
			<div class="modal__close" data-close>&times;</div>
			<div class="modal__title">${message}</div>
		</div>
	`; // создаем новый контент и в первоначальном скрипте (MODAL----) настраиваем ДЕЛЕГИРОВАНИЕ СОБЫТИЙ!!!
	document.querySelector('.modal').append(thanksModal); // помещаем новое модальное окно на страницу
	setTimeout(() => { // чтобы новый динамический блок исчезал через 4 сек. и появлялся предыдущий сверстанный блок modal__dialog, применим асинхронную операцию setTimeout()
		thanksModal.remove(); // thanksModal будем удалять, чтобы вновь созданные блоки не накапливались
		prevModalDialog.classList.add('show'); // заменяем классы отображения сверстанного модального окна modal__dialog
		prevModalDialog.classList.remove('hide');
		closeModalWindow(); // закрываем модальное окно, чтобы не мешать пользователю
	}, 4000);
}

const getResources = async (url) => { // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async() в связи с асинхронностью выполнения
	const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего - пока промис не вернет от сервера данные, но fetch() сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
	// ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
	if (!result.ok) { // если с result.ok что-то не то...., то необходимо вернуть ошибку
		throw new Error(`Could not fetch ${url}, status: ${result.status}`); // throw new Error() - это конструктор объекта ошибки, оператор throw() выбрасывает ошибку: url - это адрес самого запроса, result.status - это статус выполнения промиса
	}
	return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через цепочку .then() - так как это АСИНХРОННЫЙ КОД + await() дожидается обработки данных в result.json()!!!
};

getResources('http://localhost:3000/menu') // оптимизируем работу с карточками МЕНЮ проекта FOOD
	.then(data => {
		data.forEach(({img, altimg, title, descr, price}) => { // перебираем весь массив db.json состоящий из объектов деструктурировав его методом ({img, altimg, title, descr, price})
			new MenuCards(img, altimg, title, descr, price, '.menu .container').render(); // запускаем конструктор - MenuCards() для заполнения - render() карточек меню столько раз, сколько объектов в массиве db.json
		});
	});

//***********************************************************************************	
// Второй способ без шаблонизации: оптимизируем работу с карточками МЕНЮ проекта FOOD

getResources('http://localhost:3000/menu')
	.then(data => createMenuCards(data));
function createMenuCards(data) {
	data.forEach(({img, altimg, title, descr, price}) => {
		const element = document.createElement('div');
		element.classList.add('menu__item');
		element.innerHTML = `					
		<img src=${img} alt=${altimg}>
		<h3 class="menu__item-subtitle">${title}</h3>
		<div class="menu__item-descr">${descr}</div>
		<div class="menu__item-divider"></div>
		<div class="menu__item-price">
			<div class="menu__item-cost">Цена:</div>
			<div class="menu__item-total"><span>${price}</span> руб./день</div>
		</div>			
	`;
		document.querySelector('.menu .container').append(element);
	});
}