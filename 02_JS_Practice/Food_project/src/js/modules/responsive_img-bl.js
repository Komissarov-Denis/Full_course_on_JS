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
		const widthСlassValue = item.classList;
		// console.log(widthСlassValue);
		widthСlassValue.forEach(function(elem, e) {
			// console.log(item.classList[e]);
			// console.log(item.classList[e].slice(0, 6));
			const slicedWidthClass = 'min-w_';
			// console.log(slicedWidthClass);
			if (item.classList[e].slice(0, 6) === slicedWidthClass) {
				// console.log('true');
				// console.log(item.classList[e]);
				const widthValue = item.classList[e].slice(6, 15); 
				// console.log(widthValue);
				minBlockWidth[i] = +widthValue;
				// console.log(typeof(minBlockWidth[i]));
				// console.log(minBlockWidth[i]);
			} //  else (
			// console.log('false')
			// );
		});
		// console.log(maxBlockHeight[i]);
		const heightСlassValue = item.classList;
		// console.log(heightСlassValue);
		heightСlassValue.forEach(function(elem, e) {
			// console.log(item.classList[e]);
			// console.log(item.classList[e].slice(0, 6));
			const slicedHeightClass = 'min-h_';
			// console.log(slicedWidthClass);
			if (item.classList[e].slice(0, 6) === slicedHeightClass) {
				// console.log('true');
				// console.log(item.classList[e]);
				const heightValue = item.classList[e].slice(6, 15); 
				// console.log(heightValue);
				minBlockHeight[i] = +heightValue;
				// console.log(typeof(minBlockHeight[i]));
				// console.log(minBlockHeight[i]);
			} //  else (
			// console.log('false')
			// );
		});
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