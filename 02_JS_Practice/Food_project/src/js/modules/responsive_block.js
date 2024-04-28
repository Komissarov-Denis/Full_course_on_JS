// для работы скрипта необходимы два класса: block_modifed - как показатель адаптивности блока, min-width_160 - минимальное значение ширины блока, максимальное скрипт берет из CSS свойств

export default function responsiveblock() {
	const blockSizeModifed = document.querySelectorAll('.block_modifed'); // есть доступ к массиву по классу
	// console.log(blockSizeModifed);
	blockSizeModifed.forEach(function(item, i) {
		let computedBlockSize = [];
		let maxBlockSize = [];
		let minBlockSize = [];
		computedBlockSize[i] = window.getComputedStyle(blockSizeModifed[i]).width; // есть доступ к текущему массиву свойств CSS 'font-size: 48px и 36px' 
		maxBlockSize[i] = parseFloat(computedBlockSize[i]); // метод parseFloat() возвращает число или строку в десятичном варианте с плавающей точкой, получил: 48 36
		// console.log(maxBlockSize[i]);
		// console.log(item.classList.contains('min-width_16'));
		function condition() { // сравниваем соответствующий класс 'min-width_20' в текстовом блоке на true/false, при соответствии назначаем минимальную величину шрифта
			if (item.classList.contains('min-width_300')) {
				minBlockSize[i] = 300;		
			} else if(item.classList.contains('min-width_290')) {
				minBlockSize[i] = 290;
			} else if(item.classList.contains('min-width_280')) {
				minBlockSize[i] = 280;
			} else if(item.classList.contains('min-width_270')) {
				minBlockSize[i] = 270;
			} else if(item.classList.contains('min-width_260')) {
				minBlockSize[i] = 260;
			} else if(item.classList.contains('min-width_250')) {
				minBlockSize[i] = 250;
			} else if(item.classList.contains('min-width_240')) {
				minBlockSize[i] = 240;
			} else if(item.classList.contains('min-width_230')) {
				minBlockSize[i] = 230;
			} else if(item.classList.contains('min-width_220')) {
				minBlockSize[i] = 220;
			} else if(item.classList.contains('min-width_210')) {
				minBlockSize[i] = 210;
			} else if(item.classList.contains('min-width_200')) {
				minBlockSize[i] = 200;
			} else if(item.classList.contains('min-width_190')) {
				minBlockSize[i] = 190;
			} else if(item.classList.contains('min-width_180')) {
				minBlockSize[i] = 180;
			} else if(item.classList.contains('min-width_170')) {
				minBlockSize[i] = 170;
			} else if(item.classList.contains('min-width_160')) {
				minBlockSize[i] = 160;
			} else if(item.classList.contains('min-width_150')) {
				minBlockSize[i] = 150;
			} else if(item.classList.contains('min-width_140')) {
				minBlockSize[i] = 140;
			} else if(item.classList.contains('min-width_130')) {
				minBlockSize[i] = 130;
			} else if(item.classList.contains('min-width_120')) {
				minBlockSize[i] = 120;
			} else if(item.classList.contains('min-width_110')) {
				minBlockSize[i] = 110;
			} else if(item.classList.contains('min-width_100')) {
				minBlockSize[i] = 100;
			}
		} condition();
		calcResponsiveBlockSize(minBlockSize[i], maxBlockSize[i], 320, 1920);
		function calcResponsiveBlockSize(blockMin, blockMax, viewportMin, viewportMax) {
			window.addEventListener('resize', event => { // window.addEventListener('resize', event => {} данный слушатель событий работает только на элементе window!!!
				let pageWidth = document.documentElement.scrollWidth; // есть общая динамическая ширина окна браузера
				event.pageWidth = pageWidth;
				// console.log(pageWidth);			
				// let pageHeight = document.documentElement.scrollHeight; // есть общая динамическая высота окна браузера
				// event.pageHeight = pageHeight;
				// console.log(pageHeight);
				if (pageWidth >= 1920) {
					blockSizeModifed[i].style.width = `${blockMax}px`;		
					// console.log(blockSizeModifed[i]);
				} else if(pageWidth < 1920 && pageWidth > 320) {
					let a = (blockMax - blockMin)/(viewportMax - viewportMin);
					let b = (blockMin - (a * viewportMin));
					let result = +((a * pageWidth + b)).toFixed(2);
					// console.log(result);
					blockSizeModifed[i].style.width = `${result}px`; 
					// console.log(blockSizeModifed[i]);
				} else if(pageWidth <= 320) {
					blockSizeModifed[i].style.width = `${blockMin}px`;
					// console.log(blockSizeModifed[i]);
				}
			}, false);	
		}		
	});

}