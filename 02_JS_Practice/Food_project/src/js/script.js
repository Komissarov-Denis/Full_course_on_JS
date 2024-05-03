import 'es6-promise'; // добавил полифилы из node_modules после установки в package.json
import 'nodelist-foreach-polyfill'; // добавил полифилы из node_modules после установки в package.json

import tabs from './modules/tabs.js';
import cards from './modules/cards.js';
import timer from './modules/timer.js';
import modal from './modules/modal.js';
import forms from './modules/forms.js';
import spinner from './modules/spinner.js';
import carousel from './modules/carousel.js';
import calculator from './modules/calculator.js';
import {openModalWindow} from './modules/modal.js';
import responsiveFont from './modules/responsive_fz.js';
import responsiveTextBlock from './modules/responsive_tt-bl.js';
import responsiveImgBlock from './modules/responsive_img-bl.js';

window.addEventListener('DOMContentLoaded', () => {

	const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 60000); // функция автооткрытия модального окна

	// TABS-----------------------------------------------------------
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); // передаем в вызов функции tabs() соответствующие аргументы из модуля: =>
	// tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass)

	// TAIMER-(обратного отсчета)-------------------------------------
	timer('.timer', '2024-12-31T24:00:00.000+03:00'); // где YYYY-MM-DDTHH:mm:ss.sss GMT+3, Т - разделитель TIME!!!
	// timer(id, deadLine)

	// MODAL----------------------------------------------------------	
	modal('[data-modal]', '.modal', modalTimerId);
	// modal(triggerSelector, modalSelector, modalTimerId)

	// CLASSES-for-CARDS----------------------------------------------
	cards();

	// SEND-FORMS----fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ
	forms('form', modalTimerId);
	//forms(formSelector, modalTimerId)

	// SLIDER----------------------ПРОСТОЙ ВАРИАНТ--------------------
	carousel({ // принцип деструктуризации, создаем объект аргументов
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
	});

	// CALCULATOR-----------------------------------------------------
	calculator();

	// SPINNER--------------------------------------------------------
	spinner();

	// RESPONSIVE-FONT------------------------------------------------ 
	responsiveFont();

	// RESPONSIVE-TEXT-BLOCK------------------------------------------
	responsiveTextBlock();

	// RESPONSIVE-IMG-BLOCK-------------------------------------------
	responsiveImgBlock();

});