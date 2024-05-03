// для работы скрипта необходимы три класса: img-bl_mod - как показатель адаптивности блока, min-w_160 / min-h_160 - минимальное значение ширины / высоты блока, максимальное скрипт берет из CSS свойств

export default function responsiveImgBlock() {
	const imgBlockSizeModifed = document.querySelectorAll('.img-bl_mod'); // есть доступ к массиву по классу
	// console.log(imgBlockSizeModifed);
	imgBlockSizeModifed.forEach(function(item, i) {
		let computedBlockWidth = [];
		let computedBlockHeight = [];
		let maxBlockWidth = [];
		let maxBlockHeight = [];
		let minBlockWidth = [];
		let minBlockHeight = [];
		// console.log(imgBlockSizeModifed);
		// console.log(minBlockWidth);
		// console.log(minBlockHeight);
		computedBlockWidth[i] = window.getComputedStyle(imgBlockSizeModifed[i]).width; // есть доступ к текущему массиву свойств CSS width
		computedBlockHeight[i] = window.getComputedStyle(imgBlockSizeModifed[i]).height;
		maxBlockWidth[i] = parseFloat(computedBlockWidth[i]); // метод parseFloat() возвращает число или строку в десятичном варианте с аeightющей точкой
		maxBlockHeight[i] = parseFloat(computedBlockHeight[i]);
		// console.log(maxBlockWidth[i]);
		// console.log(maxBlockHeight[i]);
		// console.log(item.classList.contains('min-width_300'));
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
		function heightValue() {
			let value = 0;
			for ( let j = 0; j < 50; j++) {
				// value++;
				value = value + 10;
				// console.log(value);
				let classValue = 'min-h_'+`${value}`;
				// console.log(classValue);
				// console.log(typeof(classValue));
				let heightValue = value;
				// console.log(heightValue);
				if (item.classList.contains(classValue)) { // сравниваем соответствующий класс 'min-height_20' в текстовом блоке на true/false, при соответствии назначаем минимальную величину блока
					minBlockHeight[i] = heightValue;
				}
			}
		}
		heightValue();
		calcResponsiveBlockSize(minBlockWidth[i], maxBlockWidth[i], minBlockHeight[i], maxBlockHeight[i], 320, 1920);
		// console.log(minBlockHeight[i]);
		// console.log(maxBlockHeight[i]);
		function calcResponsiveBlockSize(blockMinWidth, blockMaxWidth, blockMinHeight, blockMaxHeight, viewportMin, viewportMax) {
			window.addEventListener('resize', event => { // window.addEventListener('resize', event => {} данный слушатель событий работает только на элементе window!!!
				let pageWidth = document.documentElement.scrollWidth; // есть общая динамическая ширина окна браузера
				event.pageWidth = pageWidth;
				// console.log(pageWidth);			
				// let pageHeight = document.documentElement.scrollHeight; // есть общая динамическая высота окна браузера
				// event.pageHeight = pageHeight;
				// console.log(pageHeight);
				if (pageWidth >= 1920) {
					imgBlockSizeModifed[i].style.width = `${blockMaxWidth}px`;	
					imgBlockSizeModifed[i].style.height = `${blockMaxHeight}px`;		
					// console.log(imgBlockSizeModifed[i]);
				} else if(pageWidth < 1920 && pageWidth > 320) {
					let aW = (blockMaxWidth - blockMinWidth)/(viewportMax - viewportMin);
					let bW = (blockMinWidth - (aW * viewportMin));
					let resultW = +((aW * pageWidth + bW)).toFixed(2);
					imgBlockSizeModifed[i].style.width = `${resultW}px`;
					// console.log(resultW);
					// console.log(imgBlockSizeModifed[i]);
					let aH = (blockMaxHeight - blockMinHeight)/(viewportMax - viewportMin);
					let bH = (blockMinHeight - (aH * viewportMin));
					let resultH = +((aH * pageWidth + bH)).toFixed(2);
					imgBlockSizeModifed[i].style.height = `${resultH}px`;
					// console.log(resultH);
					// console.log(imgBlockSizeModifed[i]);
				} else if(pageWidth <= 320) {
					imgBlockSizeModifed[i].style.width = `${blockMinWidth}px`;
					imgBlockSizeModifed[i].style.height = `${blockMinHeight}px`;
					// console.log(imgBlockSizeModifed[i]);
				}
			}, false);	
		}		
	});

}