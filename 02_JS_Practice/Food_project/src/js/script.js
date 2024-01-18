/* eslint-disable linebreak-style */
import 'es6-promise'; // добавил полифилы из node_modules после установки в package.json
import 'nodelist-foreach-polyfill'; // добавил полифилы из node_modules после установки в package.json

import tabs from './modules/tabs.js';
import cards from './modules/cards.js';
import timer from './modules/timer.js';
import modal from './modules/modal.js';
import forms from './modules/forms.js';
import carousel from './modules/carousel.js';
import calculator from './modules/calculator.js';
import {openModalWindow} from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 60000); // функция автооткрытия модального окна

	// TABS-----------------------------------------------------------
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');

	// TAIMER-(обратного отсчета)-------------------------------------
	timer('.timer', '2024-01-25');

	// MODAL----------------------------------------------------------	
	modal('[data-modal]', '.modal', modalTimerId);

	// CLASSES-for-CARDS----------------------------------------------
	cards();

	// SEND-FORMS----fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ
	forms('form', modalTimerId);

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

});