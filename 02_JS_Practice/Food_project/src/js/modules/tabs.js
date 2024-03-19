// TABS-----------------------------------------------------------
export default function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	const tabs =  document.querySelectorAll(tabsSelector); // '.tabheader__item'
	const tabsContent = document.querySelectorAll(tabsContentSelector); // '.tabcontent'
	const tabsParent = document.querySelector(tabsParentSelector); // '.tabheader__items'
	function hideTabContent() { // функция скрывает часть табов
		tabsContent.forEach(item => { // перебираем каждый элемент псевдомассива методом forEach()
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade'); // toggle() не подходит, так как это наведет кашу в классах, можно добавить список классов
		});
		tabs.forEach(item => {
			item.classList.remove(activeClass); // 'tabheader__item_active' - точку не ставим, так как уже метод classList() на это указывает
		});
	}
	function showTabContent(i = 0) { // ES6 позволяет по умолчанию задать значение аргумента в "0"!!!
		// tabsContent[i].style.display = 'block';
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass); // 'tabheader__item_active' - точку не ставим, так как уже метод classList() на это указывает
	}
	hideTabContent();
	showTabContent();
	tabsParent.addEventListener('click', (event) => { // применим делегирование событий для tabsParent или '.tabheader__items' по клику
		const target = event.target; // ЧАСТОЕ ИСПОЛЬЗОВАНИЕ event.target УДОБНО ПЕРЕОПРЕДЕЛИТЬ В ПЕРЕМЕННУЮ!!!
		if (target && target.classList.contains(tabsSelector.slice(1))) { // проверяем на ниличие целевого события и что точно кликнули в tabs, а не в родителя; убираем точку у селектора '.tabheader__item'
			tabs.forEach((item, i) => { // перебираем каждый элемент псевдомассива методом forEach(), т.е. каждый элемент/таб - item с номером i по порядку в псевдомассиве tabs
				if (target == item) { // если целевое событие соответствует этому элементу по клику, т.е. если элемент/таб псевдомассива совпадает с элементом/табом, в который кликнул пользователь:
					hideTabContent(); // => тогда все лишние элементы скрываем со страницы
					showTabContent(i); // => тогда берем его номер и показываем на странице
				} // если кликнули в 3-й таб, то метод forEach() перебирает все табы, когда доходит до третьего, первые два и последний четвертый скрыты, а третьему назначаются классы 'show', 'fade'
			});
		}
	});
}