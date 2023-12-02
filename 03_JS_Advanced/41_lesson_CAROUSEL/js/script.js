// ПЕРВОЕ ПРИЛОЖЕНИЕ!!!

'use strict';

// Из проекта FOOD
// CAROUSEL-------------------------------------БОЛЕЕ СЛОЖНЫЙ ВАРИАНТ------------
const slides = document.querySelectorAll('.offer__slide'); // получаем все слайды на странице
const slider = document.querySelector('.offer__slider');
const prev = document.querySelector('.offer__slider-prev'); // получаем стрелки перелистывания слайдов
const next = document.querySelector('.offer__slider-next'); // получаем стрелки перелистывания слайдов
const totalSlides = document.querySelector('#total'); // получаем значение элементов по идентификатору
const currentSlide = document.querySelector('#current'); // получаем значение элемента по идентификатору
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
const sliderInner = document.querySelector('.offer__slider-inner');
const sliderWidth = window.getComputedStyle(slidesWrapper).width;
let slideIndex = 1; // назначаем индекс каждому слайду	
let slideOffset = 0; // назначим отступ как ориентир сдвига слайдов
if (slides.length < 10) { // если количество слайдов меньше
	totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
	currentSlide.textContent = `0${slideIndex}`;
} else { // иначе
	totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
	currentSlide.textContent = slideIndex;
}
sliderInner.style.width = 100 * slides.length + '%'; // 100% умножаем на значение ширины блока offer__slide (это запись css стилей), чтобы слайды помещались в блок offer__slider-inner
sliderInner.style.display = 'flex'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды выстроились в строку
sliderInner.style.transition = '0.5s all'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды перемещались плавно
slidesWrapper.style.overflow = 'hidden'; // ограничим отображение сверх блока offer__slider-wrapper
slides.forEach(slide => { // ограничим ширину всех слайдов, обратившись к каждому слайду на странице, установив определенную ширину
	slide.style.width = sliderWidth;
});
slider.style.position = 'relative';
const dots = document.createElement('ol');
const dotsArr = []; 
dots.classList.add('carousel-dots');
dots.style.cssText = `
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 15;
	display: flex;
	justify-content: center;
	margin-right: 15%;
	margin-left: 15%;
	list-style: none;
`;
slider.append(dots);
for (let i = 0; i < slides.length; i++) {
	const dot = document.createElement('li');
	dot.setAttribute('data-slide-to', i + 1); // устанавливаем каждому дата атрибуту нумерацию (начинается с нуля, значит пойдет с единицы)
	dot.style.cssText = `
		box-sizing: content-box;
		flex: 0 1 auto;
		width: 30px;
		height: 6px;
		margin-right: 3px;
		margin-left: 3px;
		cursor: pointer;
		background-color: #fff;
		background-clip: padding-box;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		opacity: .5;
		transition: opacity .6s ease;
	`;
	if (i == 0) { // если первая итерация
		dot.style.opacity = 1; // то к первому dot добавляем белый класс активности
	}
	dots.append(dot);
	dotsArr.push(dot); // создаем массив с точками
}
prev.addEventListener('click', () => { // при нажатии на стрелочку "влево",  смещаем слайд вправо на плюсовое значение slideOffset
	if (slideOffset == 0) { // после сравнения и выяснения, что у нас возвращен первый слайд, перемещаемся в самый конец
		slideOffset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1); // т.е. долистываем до самого начала блока слайдов и переклоючаемся на последний слайд - отступ равен ширине одного слайда (из строки '650px' вырезаем длину символов минус последние два ) умноженного на (число слайдов минус один) 
	} else {
		slideOffset -= +sliderWidth.slice(0, sliderWidth.length - 2); // когда мы нажимаем срелочку вперед, к slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
	}
	sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), сдвиг влево - то значение плюсовое
	if (slideIndex == 1) { // если текущий slideIndex равен 1 
		slideIndex = slides.length; // присваиваем значение slideIndex количество слайдов
	} else {
		slideIndex--; // иначе уменьшаем на единицу
	}
	if (slides.length < 10) {
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		currentSlide.textContent = slideIndex;
	}
	dotsArr.forEach(dot => dot.style.opacity = '.5');
	dotsArr[slideIndex - 1].style.opacity = 1;
});
next.addEventListener('click', () => { // при нажатии на стрелочку "вправо", смещаем слайд влево на минусовое значение slideOffset 
	if (slideOffset == +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1)) { // отступ равен ширине одного слайда (из строки '650px' вырезаем длину символов минус последние два ) умноженного на (число слайдов минус один) 
		slideOffset = 0; // т.е. долистываем до самого конца блока слайдов и переклоючаемся на первый слайд
	} else {
		slideOffset += +sliderWidth.slice(0, sliderWidth.length - 2); // когда мы нажимаем срелочку вперед, к slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
	}
	sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), сдвиг вправо - то значение минусовое
	if (slideIndex == slides.length) { // если текущий slideIndex равен количеству слайдов
		slideIndex = 1; // присваиваем значение slideIndex единицу
	} else {
		slideIndex++; // иначе увеличиваем на единицу
	}
	if (slides.length < 10) {
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		currentSlide.textContent = slideIndex;
	}
	dotsArr.forEach(dot => dot.style.opacity = '.5');
	dotsArr[slideIndex - 1].style.opacity = 1;
});
dotsArr.forEach(dot => {
	dot.addEventListener('click', (e) => { // назначаем каждой из точек событие
		const slideTo = e.target.getAttribute('data-slide-to');
		slideIndex = slideTo;
		slideOffset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slideTo - 1);
		sliderInner.style.transform = `translateX(-${slideOffset}px)`;
		if (slides.length < 10) {
			currentSlide.textContent = `0${slideIndex}`;
		} else {
			currentSlide.textContent = slideIndex;
		}
		dotsArr.forEach(dot => dot.style.opacity = '.5');
		dotsArr[slideIndex - 1].style.opacity = 1;
	});
});