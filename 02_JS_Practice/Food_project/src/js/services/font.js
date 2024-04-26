// для работы скрипта необходимы два класса: font-size_modifed - как показатель адаптивности текста, min-fz_16 - минимальное значение шрифта, максимальное скрипт берет из CSS свойств

const textFontSizeModifed = document.querySelectorAll('.font-size_modifed'); // есть доступ к массиву по классу
textFontSizeModifed.forEach(function(item, i) {
	let computedFontSize = [];
	let maxFontSize = [];
	let minFontSize = [];
	computedFontSize[i] = window.getComputedStyle(textFontSizeModifed[i]).getPropertyValue('font-size'); // есть доступ к текущему массиву свойств CSS 'font-size: 48px и 36px' 
	maxFontSize[i] = parseFloat(computedFontSize[i]); // метод parseFloat() возвращает число или строку в десятичном варианте с плавающей точкой, получил: 48 36
	// console.log(maxFontSize[i]);
	// console.log(item.classList.contains('min-fz_16'));
	function condition() { // сравниваем соответствующий класс 'min-fz_20' в текстовом блоке на true/false, при соответствии назначаем минимальную величину шрифта
		if (item.classList.contains('min-fz_30')) {
			minFontSize[i] = 30;		
		} else if(item.classList.contains('min-fz_29')) {
			minFontSize[i] = 29;
		} else if(item.classList.contains('min-fz_28')) {
			minFontSize[i] = 28;
		} else if(item.classList.contains('min-fz_27')) {
			minFontSize[i] = 27;
		} else if(item.classList.contains('min-fz_26')) {
			minFontSize[i] = 26;
		} else if(item.classList.contains('min-fz_25')) {
			minFontSize[i] = 25;
		} else if(item.classList.contains('min-fz_24')) {
			minFontSize[i] = 24;
		} else if(item.classList.contains('min-fz_23')) {
			minFontSize[i] = 23;
		} else if(item.classList.contains('min-fz_22')) {
			minFontSize[i] = 22;
		} else if(item.classList.contains('min-fz_21')) {
			minFontSize[i] = 21;
		} else if(item.classList.contains('min-fz_20')) {
			minFontSize[i] = 20;
		} else if(item.classList.contains('min-fz_19')) {
			minFontSize[i] = 19;
		} else if(item.classList.contains('min-fz_18')) {
			minFontSize[i] = 18;
		} else if(item.classList.contains('min-fz_17')) {
			minFontSize[i] = 17;
		} else if(item.classList.contains('min-fz_16')) {
			minFontSize[i] = 16;
		} else if(item.classList.contains('min-fz_15')) {
			minFontSize[i] = 15;
		} else if(item.classList.contains('min-fz_14')) {
			minFontSize[i] = 14;
		} else if(item.classList.contains('min-fz_13')) {
			minFontSize[i] = 13;
		} else if(item.classList.contains('min-fz_12')) {
			minFontSize[i] = 12;
		} else if(item.classList.contains('min-fz_11')) {
			minFontSize[i] = 11;
		} else if(item.classList.contains('min-fz_10')) {
			minFontSize[i] = 10;
		}
	} condition();
	calcFluidFontSize(minFontSize[i], maxFontSize[i], 320, 1920);
	function calcFluidFontSize(fontMin, fontMax, viewportMin, viewportMax) {
		window.addEventListener('resize', event => { // window.addEventListener('resize', event => {} данный слушатель событий работает только на элементе window!!!
			let pageWidth = document.documentElement.scrollWidth; // есть общая динамическая ширина окна браузера
			event.pageWidth = pageWidth;
			// console.log(pageWidth);			
			let pageHeight = document.documentElement.scrollHeight; // есть общая динамическая высота окна браузера
			event.pageHeight = pageHeight;
			// console.log(pageHeight);
			if (pageWidth >= 1920) {
				textFontSizeModifed[i].style.cssText = `font-size: ${fontMax}px`;		
				// console.log(textFontSize2);
			} else if(pageWidth < 1920 && pageWidth > 320) {
				let a = (fontMax - fontMin)/(viewportMax - viewportMin);
				let b = (fontMin - a * viewportMin);
				let result = (a * pageWidth + b);
				textFontSizeModifed[i].style.cssText = `font-size: ${result}px`; 
				// console.log(textFontSize2);
			} else if(pageWidth <= 320) {
				textFontSizeModifed[i].style.cssText = `font-size: ${fontMin}px`;
				// console.log(textFontSize2);
			}
		}, false);	
	}		
});