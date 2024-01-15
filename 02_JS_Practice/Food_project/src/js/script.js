/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import Tabs from './modules/tabs.js';
import Cards from './modules/cards.js';
import Timer from './modules/timer.js';
import Modal from './modules/modal.js';
import Forms from './modules/forms.js';
import Carousel from './modules/carousel.js';
import Calculator from './modules/calculator.js';

window.addEventListener('DOMContentLoaded', () => {

	// TABS-----------------------------------------------------------
	const moduleTabs = new Tabs();
	// moduleTabs();

	// TAIMER-(обратного отсчета)-------------------------------------
	const moduleTimer = new Timer();
	// moduleTimer();

	// MODAL----------------------------------------------------------
	const moduleModal = new Modal();
	// moduleModal();

	// CLASSES-for-CARDS----------------------------------------------
	const moduleCards = new Cards();
	// moduleCards();

	// SEND-FORMS----fetch() НОВЫЙ ТИП ЗАПРОСОВ гораздо ПРОЩЕ и КОРОЧЕ
	const moduleForms = new Forms();
	// moduleForms();

	// SLIDER----------------------ПРОСТОЙ ВАРИАНТ--------------------
	const moduleCarousel = new Carousel();
	// moduleCarousel();

	// CALCULATOR-----------------------------------------------------
	const moduleCalculator = new Calculator();
	// moduleCalculator();

});