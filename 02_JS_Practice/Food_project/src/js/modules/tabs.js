/* eslint-disable linebreak-style */
// TABS-----------------------------------------------------------
export default function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	const tabs =  document.querySelectorAll(tabsSelector);
	const tabsContent = document.querySelectorAll(tabsContentSelector);
	const tabsParent = document.querySelector(tabsParentSelector);
	function hideTabContent() { // функция скрывает часть табов
		tabsContent.forEach(item => {
			// item.style.display = 'none';
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}
	function showTabContent(i = 0) { // ES6 позволяет по умолчанию задать значение аргумента в "0"!!!
		// tabsContent[i].style.display = 'block';
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}
	hideTabContent();
	showTabContent();
	tabsParent.addEventListener('click', (event) => {
		const target = event.target; // ЧАСТОЕ ИСПОЛЬЗОВАНИЕ event.target УДОБНО ПЕРЕОПРЕДЕЛИТЬ В ПЕРЕМЕННУЮ!!!
		if (target && target.classList.contains(tabsSelector.slice(1))) { // убираем точку у селектора '.tabheader__item'
			tabs.forEach((item, i) => { // для каждого элемента item (tab) с номером i в массиве
				if (target == item) { // если целевое событие соответствует этому элементу по клику
					hideTabContent();
					showTabContent(i); // при переключении tab скрываем остальные
				}
			});
		}
	});
}