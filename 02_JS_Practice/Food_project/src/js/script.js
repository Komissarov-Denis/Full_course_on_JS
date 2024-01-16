/* eslint-disable linebreak-style */
import tabs from './modules/tabs.js';
import cards from './modules/cards.js';
import timer from './modules/timer.js';
import modal from './modules/modal.js';
import forms from './modules/forms.js';
import carousel from './modules/carousel.js';
import calculator from './modules/calculator.js';

window.addEventListener('DOMContentLoaded', () => {

	// TABS-----------------------------------------------------------
	tabs();

	// TAIMER-(обратного отсчета)-------------------------------------
	timer();

	// MODAL----------------------------------------------------------	
	modal();

	// CLASSES-for-CARDS----------------------------------------------
	cards();

	// SEND-FORMS----fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ
	forms();

	// SLIDER----------------------ПРОСТОЙ ВАРИАНТ--------------------
	carousel();

	// CALCULATOR-----------------------------------------------------
	calculator();

});