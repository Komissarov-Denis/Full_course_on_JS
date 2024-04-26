// для работы скрипта необходимы два класса: fz_modifed - как показатель адаптивности текста, min-fz_16 - минимальное значение шрифта, максимальное скрипт берет из CSS свойств
// Таблица заголовков:
// <h1>A</h1> 32px max 100% min 30px - vw320px
// <h2>A</h2> 24px max 75%  min 22px - vw320px
// <h3>A</h3> 18px max 75%  min 16px - vw320px
// <h4>A</h4> 14px max 78%  min 12px - vw320px
// <h5>A</h5> 13px max 92%  min 11px - vw320px
// <h6>A</h6> 11px max 84%  min 10px - vw320px
// Если текст находится в блоке, то margin: 100% или его отсутствие для блока влияет на расчет величины шрифта!!!

export default function responsiveFont() {
	const fontSizeModifed = document.querySelectorAll('.fz_modifed'); // есть доступ к массиву по классу
	fontSizeModifed.forEach(function(item, i) {
		let computedFontSize = [];
		let maxFontSize = [];
		let minFontSize = [];
		computedFontSize[i] = window.getComputedStyle(fontSizeModifed[i]).getPropertyValue('font-size'); // есть доступ к текущему массиву свойств CSS 'font-size: 48px и 36px' 
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
		calcResponsiveFontSize(minFontSize[i], maxFontSize[i], 320, 1920);
		function calcResponsiveFontSize(fontMin, fontMax, viewportMin, viewportMax) {
			window.addEventListener('resize', event => { // window.addEventListener('resize', event => {} данный слушатель событий работает только на элементе window!!!
				let pageWidth = document.documentElement.scrollWidth; // есть общая динамическая ширина окна браузера
				event.pageWidth = pageWidth;
				// console.log(pageWidth);			
				let pageHeight = document.documentElement.scrollHeight; // есть общая динамическая высота окна браузера
				event.pageHeight = pageHeight;
				// console.log(pageHeight);
				if (pageWidth >= 1920) {
					fontSizeModifed[i].style.cssText = `font-size: ${fontMax}px`;		
					// console.log(textFontSize2);
				} else if(pageWidth < 1920 && pageWidth > 320) {
					let a = (fontMax - fontMin)/(viewportMax - viewportMin);
					let b = (fontMin - a * viewportMin);
					let result = +(a * pageWidth + b).toFixed(2);
					console.log(result);
					fontSizeModifed[i].style.cssText = `font-size: ${result}px`; 
					// console.log(textFontSize2);
				} else if(pageWidth <= 320) {
					fontSizeModifed[i].style.cssText = `font-size: ${fontMin}px`;
					// console.log(textFontSize2);
				}
			}, false);	
		}		
	});

}