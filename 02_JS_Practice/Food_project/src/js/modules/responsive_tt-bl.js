// для работы скрипта необходимы два класса: tt-bl_mod - как показатель адаптивности блока, min-w_160 - минимальное значение ширины блока, максимальное скрипт берет из CSS свойств

export default function responsiveTextBlock() {
	const textBlockSizeModifed = document.querySelectorAll('.tt-bl_mod'); // есть доступ к массиву по классу
	// console.log(textBlockSizeModifed);
	textBlockSizeModifed.forEach(function(item, i) {
		let computedBlockWidth = [];
		let maxBlockWidth = [];
		let minBlockWidth = [];
		computedBlockWidth[i] = window.getComputedStyle(textBlockSizeModifed[i]).width; // есть доступ к текущему массиву свойств CSS width
		maxBlockWidth[i] = parseFloat(computedBlockWidth[i]); // метод parseFloat() возвращает число или строку в десятичном варианте с плавающей точкой
		// console.log(maxBlockSize[i]);
		// console.log(item.classList.contains('min-width_16'));
		function widthValue() {
			let value = 0;
			for ( let j = 0; j < 192; j++) {
				// value++;
				value = value + 10;
				// console.log(value);
				let classValue = 'min-w_'+`${value}`;
				// console.log(classValue);
				// console.log(typeof(classValue));
				let widthValue = value;
				// console.log(widthValue);
				if (item.classList.contains(classValue)) { // сравниваем соответствующий класс 'min-width_20' в текстовом блоке на true/false, при соответствии назначаем минимальную величину блока
					minBlockWidth[i] = widthValue;
				}
			}
		} widthValue();
		calcResponsiveBlockSize(minBlockWidth[i], maxBlockWidth[i], 320, 1920);
		function calcResponsiveBlockSize(blockMinWidth, blockMaxWidth, viewportMin, viewportMax) {
			window.addEventListener('resize', event => { // window.addEventListener('resize', event => {} данный слушатель событий работает только на элементе window!!!
				let pageWidth = document.documentElement.scrollWidth; // есть общая динамическая ширина окна браузера
				event.pageWidth = pageWidth;
				// console.log(pageWidth);			
				// let pageHeight = document.documentElement.scrollHeight; // есть общая динамическая высота окна браузера
				// event.pageHeight = pageHeight;
				// console.log(pageHeight);
				if (pageWidth >= 1920) {
					textBlockSizeModifed[i].style.width = `${blockMaxWidth}px`;		
					// console.log(textBlockSizeModifed[i]);
				} else if(pageWidth < 1920 && pageWidth > 320) {
					let a = (blockMaxWidth - blockMinWidth)/(viewportMax - viewportMin);
					let b = (blockMinWidth - (a * viewportMin));
					let result = +((a * pageWidth + b)).toFixed(2);
					// console.log(result);
					textBlockSizeModifed[i].style.width = `${result}px`; 
					// console.log(textBlockSizeModifed[i]);
				} else if(pageWidth <= 320) {
					textBlockSizeModifed[i].style.width = `${blockMinWidth}px`;
					// console.log(textBlockSizeModifed[i]);
				}
			}, false);	
		}		
	});

}