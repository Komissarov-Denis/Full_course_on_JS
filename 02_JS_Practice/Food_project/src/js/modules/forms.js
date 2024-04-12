import {openModalWindow, closeModalWindow} from './modal.js';
import {postData} from '../services/services.js';

// SEND-FORMS---------fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ 
export default function forms(formSelector, modalTimerId) { // forms('form', modalTimerId)
	const forms = document.querySelectorAll(formSelector); // получаем все 'form'
	const message = { // добавляем список сообщений, выводимых по факту проверки статуса запроса
		// loading: 'Загрузка...', // текст комментируем, так как будем использовать спиннер картинку
		loading: 'img/form/spinner.svg', // добавляем картинку спиннера вместо надписи в блоке div Загрузка...
		success: 'Спасибо! Скоро с Вами свяжемся!',
		failure: 'Что-то пошло не так...',
	};
	forms.forEach(item => { // переберем все созданные 'form' и подвяжем под каждую из них функцию bindpostData()
		bindPostData(item); // в атрибут item передаем form == 'form'
	});
	function bindPostData(form) { // к функции будем (bind) привязывать какую-то форму, очень удобно навесить на нее обработчик события submit, =>
		form.addEventListener('submit', (e) => { // которое будет срабатывать каждый раз при отправке форм
			e.preventDefault(); // отменяем дефолтную перезагрузку и поведение браузера при отправке формы
			// const statusMessage = document.createElement('div'); // создаем блок для сообщений
			const statusMessage = document.createElement('img'); // вместо блока 'div' теперь будем использовать картинку спиннера
			// statusMessage.classList.add('status'); // добавляем класс блоку сообщений
			statusMessage.src = message.loading; // указываем путь к спиннеру
			// statusMessage.textContent = message.loading; // заполняем блок главным сообщением 'Загрузка...'
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`; // добавляем стили спиннеру
			// form.append(statusMessage); // к форме добавляем это сообщение 'Загрузка...'
			form.insertAdjacentElement('afterend', statusMessage); // чтобы спиннер не сбивал верстку используем insertAdjacentElement(), первый аргумент - afterend (куда вставляем), второй - что вставляем!!!
			const formData = new FormData(form); // new FormData(form) - это специальный объект с набором ключей и их значений, который позволяет с определенной формы быстро сформировать данные, заполняемые пользователем!!!
			// FormData(form) отыскивает в html АТРИБУТ name В ТЕГАХ input всех форм, без него работать не будет!!!

			// postData('http://localhost:3000/requests', JSON.stringify(objectJson)) // конвертируем json в строку JSON с двойными ковычками =>
			// это упрощеная форма создания объекта objectJson, есть более элегантый способ  с помощью методов Json => берем formData и превращаем ее в массив массивов с помощью formData.entries(), 
			const json = JSON.stringify(Object.fromEntries(formData.entries())); // далее в классический объект Object.fromEntries(formData.entries(), а затем, переводим в формат JSON данные запроса через JSON.stringify(Object.fromEntries(formData.entries()))			
			postData('http://localhost:5000/requests', json)
			// .then(data => data.text()) // данная строка уже не нужна, она создается в postData асинхронной функции и уже там прописана внутри
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
	function showThanksModal(message) { // создаем функцию showThanksModal() динамической замены элементов мадального окна с отправкой сообщения message
		const prevModalDialog = document.querySelector('.modal__dialog'); // получаем элемент 'modal__dialog', который будем модифицировать
		prevModalDialog.classList.add('hide'); // добавляем класс hide элементу 'modal__dialog'
		openModalWindow('.modal', modalTimerId); // функция открытия модальных окон
		const thanksModal = document.createElement('div'); // создаем новый 'div' - контент обертку
		thanksModal.classList.add('modal__dialog'); // будем заменять один 'modal__dialog' другим с новым контентом
		thanksModal.innerHTML = ` 
			<div class="modal__content">
				<div class="modal__close" data-close>&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`; // создаем новый контент и в первоначальном скрипте (MODAL---- modalWindow.addEventListener('click', (e) => {}) настраиваем ДЕЛЕГИРОВАНИЕ СОБЫТИЙ!!!
		document.querySelector('.modal').append(thanksModal); // в блок '.modal' помещаем новое модальное окно thanksModal
		setTimeout(() => { // чтобы новый динамический блок исчезал через 4 сек. и появлялся предыдущий сверстанный блок 'modal__dialog', применим асинхронную операцию setTimeout()
			thanksModal.remove(); // thanksModal будем удалять, чтобы вновь созданные блоки не накапливались
			prevModalDialog.classList.add('show'); // заменяем классы отображения сверстанного модального окна 'modal__dialog'
			prevModalDialog.classList.remove('hide');
			closeModalWindow('.modal'); // закрываем модальное окно, чтобы не мешать пользователю
		}, 4000);
	}
}