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
		slideOffset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1); // т.е. долистываем до самого начала блока слайдов и переключаемся на последний слайд - отступ равен ширине одного слайда (из строки '650px' вырезаем длину символов минус последние два ) умноженного на (число слайдов минус один) 
	} else {
		slideOffset -= +sliderWidth.slice(0, sliderWidth.length - 2); // когда мы нажимаем стрелочку вперед, к slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
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
		slideOffset = 0; // т.е. долистываем до самого конца блока слайдов и переключаемся на первый слайд
	} else {
		slideOffset += +sliderWidth.slice(0, sliderWidth.length - 2); // когда мы нажимаем стрелочку вперед, к slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
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

// Вариант оптимизированного кода с применением регулярок и функции:
// CAROUSEL-------------------------------------БОЛЕЕ СЛОЖНЫЙ ВАРИАНТ------------
const slides = document.querySelectorAll('.offer__slide'); // получаем все слайды на странице (length: 4)
const slider = document.querySelector('.offer__slider'); // получаем весь блок слайдера
const prev = document.querySelector('.offer__slider-prev'); // получаем стрелки перелистывания слайдов
const next = document.querySelector('.offer__slider-next'); // получаем стрелки перелистывания слайдов
const totalSlides = document.querySelector('#total'); // получаем общее значение элементов по идентификатору
const currentSlide = document.querySelector('#current'); // получаем текущее значение элемента по идентификатору
const slidesWrapper = document.querySelector('.offer__slider-wrapper'); // получаем блок-обертку слайдеров
const sliderInner = document.querySelector('.offer__slider-inner'); // получаем дополнительно созданный блок, объединяющий в линию все слайды
const sliderWidth = window.getComputedStyle(slidesWrapper).width; // получаем значение ширины слайдера из блока-обёртки слайдов (применим для расчета ширины одного слайда) = 650px
let slideIndex = 1; // назначаем индекс каждому слайду	
let slideOffset = 0; // назначим отступ как ориентир сдвига слайдов
if (slides.length < 10) { // если количество слайдов меньше
	totalSlides.textContent = `0${slides.length}`; // то добавляем к порядковому значению слайда "0"
	currentSlide.textContent = `0${slideIndex}`;
} else { // иначе
	totalSlides.textContent = slides.length; // просто записываем порядковое значение слайда
	currentSlide.textContent = slideIndex;
}
sliderInner.style.width = 100 * slides.length + '%'; // 100% значение ширины блока offer__slide умножаем на количество слайдов slides.length (это запись css стилей), чтобы слайды помещались в блок offer__slider-inner (получаем 400%)
sliderInner.style.display = 'flex'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды выстроились в строку
sliderInner.style.transition = '0.5s all'; // присваиваем CSS свойства блоку offer__slider-inner для того, чтобы слайды перемещались плавно
slidesWrapper.style.overflow = 'hidden'; // ограничим отображение сверх блока offer__slider-wrapper
slides.forEach(slide => { // ограничим ширину всех слайдов, обратившись к каждому слайду на странице, установив определенную ширину
	slide.style.width = sliderWidth; // получаем значение 650px
});
slider.style.position = 'relative'; // присваиваем значение всему блоку offer__slider
const dots = document.createElement('ol'); // создаем переменную dots для навигации по слайдеру в блоке ol нумерованного списка
const dotsArr = []; // создаем массив для навигации по слайдеру (length: 4) [li, li, li, li]
dots.classList.add('carousel-dots'); // добавляем в блок ol нумерованного списка класс carousel-dots и CSS стили
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
slider.append(dots); // добавляем в слайдер блок ol нумерованного списка
for (let i = 0; i < slides.length; i++) { // добавляем итератор +1 для всего количества слайдов
	const dot = document.createElement('li'); // каждому li - элементу нумерованного списка назначаем =>
	dot.setAttribute('data-slide-to', i + 1); // дата атрибут, т.е. нумерацию (массив начинается с нуля + 1, значит пойдет с единицы) и CSS стили
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
	if (i == 0) { // если первая итерация =>
		dot.style.opacity = 1; // то к первому dot добавляем класс активности (opacity) непрозрачность
	}
	dots.append(dot); // добавляем в слайдер и в блок ol нумерованного списка, навигационные кнопки нумерованного списка
	dotsArr.push(dot); // связываем массив с точками(элементами) нумерованного списка в слайдере (push - добавлять в массив)
}
function deleteNotDigits(str) { // оптимизируем код одной функцией
	return +str.replace(/\D/g, ''); // замещаем в строке (+str) с числовым типом данных все не цифры (\D) с глобальным флагом (g) на пустое место сроки, т.е. 650px => 650
}
function changeIndexСondition() { // оптимизируем код одной функцией с условием
	if (slides.length < 10) {
		currentSlide.textContent = `0${slideIndex}`;
	} else {
		currentSlide.textContent = slideIndex;
	}
}
function changeDotСondition() { // оптимизируем код одной функцией
	dotsArr.forEach(dot => dot.style.opacity = '.5');
	dotsArr[slideIndex - 1].style.opacity = 1;
}
prev.addEventListener('click', () => { // при нажатии на стрелочку "влево",  смещаем слайд вправо на плюсовое значение slideOffset
	if (slideOffset == 0) { // после сравнения и выяснения, что у нас возвращен первый слайд, перемещаемся в самый конец
		slideOffset = deleteNotDigits(sliderWidth) * (slides.length - 1); // т.е. долистываем до самого начала блока слайдов и переключаемся на последний слайд - отступ равен ширине одного слайда (из строки '650px' с длинной символов 5 - вырезаем последние два) умноженного на (число слайдов минус один) = 1950
		sliderInner.style.transition = '0.25s all';
	} else {
		slideOffset -= deleteNotDigits(sliderWidth); // по нажатию стрелочки "влево", к -slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
		sliderInner.style.transition = '0.5s all';
	}
	sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), так как значение плюсовое - сдвиг вправо 
	if (slideIndex == 1) { // если текущий slideIndex равен 1 
		slideIndex = slides.length; // присваиваем значение slideIndex количество слайдов
	} else {
		slideIndex--; // иначе уменьшаем на единицу
	}
	changeIndexСondition();
	changeDotСondition();
});
next.addEventListener('click', () => { // при нажатии на стрелочку "вправо", смещаем слайд влево на минусовое значение slideOffset 
	if (slideOffset == deleteNotDigits(sliderWidth) * (slides.length - 1)) { // отступ равен ширине одного слайда (из строки '650px' с длинной символов 5 - вырезаем последние два) умноженного на (число слайдов минус один)
		sliderInner.style.transition = '0.25s all';
		slideOffset = 0; // т.е. долистываем до самого конца блока слайдов и переключаемся на первый слайд
	} else {
		sliderInner.style.transition = '0.5s all';
		slideOffset += deleteNotDigits(sliderWidth); // когда мы нажимаем стрелочку "вправо", к +slideOffset добавляется ширина еще одного слайда и слайд смещается на определенную величину
	}
	sliderInner.style.transform = `translateX(-${slideOffset}px)`; // сдвигаем слайд с помощью transform: translateX(), так как значение минусовое - сдвиг влево 
	if (slideIndex == slides.length) { // если текущий slideIndex равен количеству слайдов
		slideIndex = 1; // присваиваем значение slideIndex единицу
	} else {
		slideIndex++; // иначе увеличиваем на единицу
	}
	changeIndexСondition();
	changeDotСondition();
});
dotsArr.forEach(dot => {
	dot.addEventListener('click', (e) => { // назначаем каждой из точек событие
		const slideTo = e.target.getAttribute('data-slide-to'); // присваиваем переменной slideTo новый атрибут data-slide-to
		slideIndex = slideTo; // присваиваем переменной slideIndex значение slideTo
		slideOffset = deleteNotDigits(sliderWidth) * (slideTo - 1);
		sliderInner.style.transform = `translateX(-${slideOffset}px)`;
		changeIndexСondition();
		changeDotСondition();
	});
});