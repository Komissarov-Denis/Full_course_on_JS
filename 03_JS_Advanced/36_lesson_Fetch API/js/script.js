// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

//  https://jsonplaceholder.typicode.com/  - это виртуальная база данных в виде сервера для тестирования наших запросов на основе PROMISE!!!
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({name: 'Alex'}),
	headers: {
		'Content-type': 'application/json'
	}
}) // 
	.then(response => response.json())		// тут мы получаем ответ от сервера в формате json (JS объект, который можно дальше использовать), т.е. вернется PROMISE, если он успешен =>
	.then(json => console.log(json));	// то дальше мы его используем в консоли

// Получил:
// {name: 'Alex', id: 101}id: 101name: "Alex"[[Prototype]]: Object
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
forms.forEach(item => { // берем все созданные формы и подвязываем функцию postData
	postData(item);
});
function postData(form) { // передавать будем какую-то форму, очень удобно навесить на нее обработчик события submit, которое будет срабатывать каждый раз при отправке форм
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
		const objectJson = {}; // сождал новый объект для отправки данных в формате json
		formData.forEach(function(value, key) { // forEach переберет все, что есть внутри formData и заполнит objectJson
			objectJson[key] = value;
		});
		fetch('server.php', { // создаем новый объект для формирования документа запроса fetch(), метод и заголовки указывать обязательно!!!
			method: 'POST',
			headers: {
				'Content-type': 'application/json' // закомментировал, так как пока не JSON отправляем!!!
			},
			body: JSON.stringify(objectJson), // конвертируем objectJson в строку JSON с двойными ковычками
		})	
			.then(data => data.text())
			.then(data => { // сервер вернет данные data, пока это не JSON
				console.log(data); // берем data данные, которые вернул сервер из PROMISE (успешный исход)
				showThanksModal(message.success); // вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!
				statusMessage.remove(); // удаляем наш спинер по выполнению PROMISE
			}).catch(() => { // catch метод обязательно нужно прописывать для обратоток ошибок!!!
				showThanksModal(message.failure);// вместо statusMessage.textContent будет показываться модальное окно функции showThanksModal()!!!				
			}).finally(() => { // finally метод обязательно нужно прописывать для обратоток оконечных действий
				form.reset(); // очищаем форму после выведением сообщения				
			});
	}); 
}
function showThanksModal(message) { // создаем функцию динамической замены элементов мадального окна с отправкой сообщения message
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