// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Из проекта FOOD
// SLIDER-------------------------------------ПРОСТОЙ ВАРИАНТ--------------------
const slides = document.querySelectorAll('.offer__slide'); // получаем все слайды на странице
const prev = document.querySelector('.offer__slider-prev'); // получаем стрелки перелистывания слайдов
const next = document.querySelector('.offer__slider-next'); // получаем стрелки перелистывания слайдов
const totalSlides = document.querySelector('#total'); // получаем значение элементов по идентификатору
const currentSlide = document.querySelector('#current'); // получаем значение элемента по идентификатору
let slideIndex = 1; // назначаем индекс каждому слайду
showSlides(slideIndex); // инициализируем функцию showSlides() со значением "1"
if (slides.length < 10) { // если количество слайдов меньше
	totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
} else { // иначе
	totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
}
function showSlides(n)  { // присваиваем порядковый номер каждому слайду "n"
	if (n > slides.length) {// если количество слайдов slides.length меньше порядкового номера слайда "n"
		slideIndex = 1; // если ушли в "правую границу" слайдов, то перемещаемся в самое "начало" => slideIndex = 1
	}
	if (n < 1) {// если порядковый номер слайда "n" меньше 1
		slideIndex = slides.length; // если ушли в "левую границу" слайдов, то перемещаемся в самый "конец" => slideIndex = slides.length
	}
	slides.forEach(item => item.style.display = 'none'); // сначала скрываем все слайды на страничке
	slides[slideIndex - 1].style.display = 'block' ; // потом по нажатию показываем нужный слайд, выбираем [slideIndex - 1] так как массив начинается с "0"
	if (slides.length < 10) { // если количество слайдов меньше
		currentSlide.textContent = `0${slideIndex}`; // то добавляем к порядковому значению слайда "0"
	} else { // иначе
		currentSlide.textContent = slideIndex; // просто записываем порядковое значение слайда
	}
}
function plusSlide(n) { // перебираем слайды по нажатию на стрелочки
	showSlides(slideIndex += n); // если n=1, то прибавляем, если n=-1, то отнимаем 
}
prev.addEventListener('click', () => { // при нажатии на стрелочку "влево", передаем в функцию plusSlide() минус один
	plusSlide(-1);
});
next.addEventListener('click', () => { // при нажатии на стрелочку "вправо", передаем в функцию plusSlide() плюс один
	plusSlide(1);
});