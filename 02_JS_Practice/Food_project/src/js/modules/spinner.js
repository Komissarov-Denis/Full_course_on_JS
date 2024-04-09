
// SPINNER--------------------------------------------------------
export default function spinner() {
	const loadingClass = document.querySelectorAll('.loading');  // получаем все '.loading'
	loadingClass.forEach(item => { // переберем все созданные классы '.loading' и подвяжем под каждый из них функцию showSpinner()
		showSpinner(item); // в атрибут item передаем loadingClass == '.loading'
	});
	function showSpinner(loadingClass) { // создаем функцию showSpinner() с аргументом loadingClass == '.loading'
		const spinnerMessage = {loading: 'img/form/spinner.svg'}; // переменной spinnerMessage присваиваем картинку спиннера с указанием пути к ней
		const spinnerImg = document.createElement('img'); // на странице html создаем элемент img внутри span.loading{}
		spinnerImg.src = spinnerMessage.loading; // указываем путь к спиннеру
		loadingClass.insertAdjacentElement('beforeEnd', spinnerImg); // чтобы спиннер не сбивал верстку используем insertAdjacentElement(), первый аргумент - beforeEnd (куда вставляем), второй - что вставляем!!!
	}
}