// для работы скрипта необходимы два класса: fz_mod - как показатель адаптивности текста, min-fz_16 - минимальное значение шрифта, максимальное скрипт берет из CSS свойств
// Таблица заголовков:
// <h1>A</h1> 32px max 100% min 30px - vw320px
// <h2>A</h2> 24px max 75%  min 22px - vw320px
// <h3>A</h3> 18px max 75%  min 16px - vw320px
// <h4>A</h4> 14px max 78%  min 12px - vw320px
// <h5>A</h5> 13px max 92%  min 11px - vw320px
// <h6>A</h6> 11px max 84%  min 10px - vw320px
// Если текст находится в блоке, то margin: 100% или его отсутствие для блока влияет на расчет величины шрифта!!!

// export default function responsiveFont() {
// 	const fontSizeModifed = document.querySelectorAll('.fz_mod'); // есть доступ к массиву по классу
// 	// console.log(fontSizeModifed);
// 	fontSizeModifed.forEach(function(item, i) {
// 		let computedFontSize = [];
// 		let maxFontSize = [];
// 		let minFontSize = [];
// 		computedFontSize[i] = window.getComputedStyle(fontSizeModifed[i]).getPropertyValue('font-size'); // есть доступ к текущему массиву свойств CSS 'font-size: 48px и 36px' 
// 		maxFontSize[i] = parseFloat(computedFontSize[i]); // метод parseFloat() возвращает число или строку в десятичном варианте с плавающей точкой, получил: 48 36
// 		// console.log(maxFontSize[i]);		
// 		const fzClassValue = item.classList;
// 		// console.log(fzClassValue);
// 		fzClassValue.forEach(function(elem, e) {
// 			// console.log(item.classList[e]);
// 			// console.log(item.classList[e].slice(0, 6));
// 			const slicedFzClass = 'min-fz_';
// 			// console.log(slicedFzClass);
// 			if (item.classList[e].slice(0, 7) === slicedFzClass) {
// 				// console.log('true');
// 				// console.log(item.classList[e]);
// 				const fzValue = item.classList[e].slice(7, 15); 
// 				// console.log(fzValue);
// 				minFontSize[i] = +fzValue;
// 				// console.log(typeof(minFontSize[i]));
// 				// console.log(minFontSize[i]);
// 			} //  else (
// 			// console.log('false')
// 			// );
// 		});
// 		calcResponsiveFontSize(minFontSize[i], maxFontSize[i], 320, 1920);
// 		function calcResponsiveFontSize(fontMin, fontMax, viewportMin, viewportMax) {
// 			window.addEventListener('resize', event => { // window.addEventListener('resize', event => {} данный слушатель событий работает только на элементе window!!!
// 				let pageWidth = document.documentElement.scrollWidth; // есть общая динамическая ширина окна браузера
// 				event.pageWidth = pageWidth;
// 				// console.log(pageWidth);			
// 				let pageHeight = document.documentElement.scrollHeight; // есть общая динамическая высота окна браузера
// 				event.pageHeight = pageHeight;
// 				// console.log(pageHeight);
// 				if (pageWidth >= 1920) {
// 					fontSizeModifed[i].style.fontSize = `${fontMax}px`;	
// 					// console.log(textFontSize2);
// 				} else if(pageWidth < 1920 && pageWidth > 320) {
// 					let a = (fontMax - fontMin)/(viewportMax - viewportMin);
// 					let b = (fontMin - (a * viewportMin));
// 					let result = +((a * pageWidth) + b).toFixed(2);
// 					// console.log(result);
// 					fontSizeModifed[i].style.fontSize  = `${result}px`;
// 					// console.log(textFontSize2);
// 				} else if(pageWidth <= 320) {
// 					fontSizeModifed[i].style.fontSize = `${fontMin}px`;
// 					// console.log(textFontSize2);
// 				}
// 			}, false);	
// 		}		
// 	});

// }





// для работы скрипта необходимы два класса: fz_mod - как показатель адаптивности текста, min-fz_16 - минимальное значение шрифта, максимальное скрипт берет из CSS свойств
// Таблица заголовков:
// <h1>A</h1> 32px max 100% min 30px - vw320px
// <h2>A</h2> 24px max 75%  min 22px - vw320px
// <h3>A</h3> 18px max 75%  min 16px - vw320px
// <h4>A</h4> 14px max 78%  min 12px - vw320px
// <h5>A</h5> 13px max 92%  min 11px - vw320px
// <h6>A</h6> 11px max 84%  min 10px - vw320px
// Если текст находится в блоке, то margin: 100% или его отсутствие для блока влияет на расчет величины шрифта!!!



export default function responsiveFont(activeClass) {
	const fontSizeModifed = document.querySelectorAll('.fz_mod'); // есть доступ к массиву по классу
	// console.log(fontSizeModifed);
	fontSizeModifed.forEach(function(item) {
		// console.log(fontSizeModifed[i]);
		const fzClassValue = item.classList;
		console.log(fzClassValue);
		fzClassValue.forEach(function(elem, e) {
			// console.log(item.classList[e]);
			// console.log(item.classList[e].slice(-6)); // получил active
			const slicedFzClass = 'active';
			// console.log(slicedFzClass);
			if (item.classList[e].slice(-6) === slicedFzClass) {
				console.log('true');
				item.classList.remove('fz_mod');
				fontSizeModifedActive();
			// } else if (item.classList[e].slice(-6) !== slicedFzClass) {
			// 	console.log('false');
			} else {
				// console.log('false');
				fontSizeModifedUnactive();
			}
		});
		console.log(fzClassValue);
	});

	function fontSizeModifedActive() {		
		const fontSizeModifedActive = document.querySelectorAll(activeClass); // есть доступ к массиву по классу
		fontSizeModifedActive.forEach(function(item, i) {
			// console.log(fontSizeModifedActive);
			let computedFontSize = [];
			let maxFontSize = [];
			let minFontSize = [];
			computedFontSize[i] = window.getComputedStyle(fontSizeModifedActive[i]).getPropertyValue('font-size'); // есть доступ к текущему массиву свойств CSS 'font-size: 48px и 36px' 
			maxFontSize[i] = parseFloat(computedFontSize[i]) + 10; // метод parseFloat() возвращает число или строку в десятичном варианте с плавающей точкой, получил: 48 36
			console.log(maxFontSize[i]);
			const fzClassValue = item.classList;
			// console.log(fzClassValue);
			fzClassValue.forEach(function(elem, e) {
				// console.log(item.classList[e]);
				// console.log(item.classList[e].slice(0, 6));
				const slicedFzClass = 'min-fz_';
				// console.log(slicedFzClass);
				if (item.classList[e].slice(0, 7) === slicedFzClass) {
					// console.log('true');
					// console.log(item.classList[e]);
					const fzValue = item.classList[e].slice(7, 15); 
					// console.log(fzValue);
					// minFontSize[i] = +fzValue;
					minFontSize[i] = +fzValue + 4;
					// console.log(typeof(minFontSize[i]));
					console.log(minFontSize[i]);
				} else {
					// console.log('false');
				}
			});
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
						fontSizeModifedActive[i].style.fontSize = `${fontMax}px`;	
						// console.log(textFontSize2);
					} else if (pageWidth < 1920 && pageWidth > 320) {
						let a = (fontMax - fontMin)/(viewportMax - viewportMin);
						let b = (fontMin - (a * viewportMin));
						let result = +((a * pageWidth) + b).toFixed(2);
						// console.log(result);
						fontSizeModifedActive[i].style.fontSize  = `${result}px`;
						// console.log(textFontSize2);
					} else if (pageWidth <= 320) {
						fontSizeModifedActive[i].style.fontSize = `${fontMin}px`;
						// console.log(textFontSize2);
					}
				}, false);	
			}		
		});
	}	

	function fontSizeModifedUnactive() {
		const fontSizeModifedUnactive = document.querySelectorAll('.fz_mod'); // есть доступ к массиву по классу
		fontSizeModifedUnactive.forEach(function(item, i) {
			let computedFontSize = [];
			let maxFontSize = [];
			let minFontSize = [];
			computedFontSize[i] = window.getComputedStyle(fontSizeModifedUnactive[i]).getPropertyValue('font-size'); // есть доступ к текущему массиву свойств CSS 'font-size: 48px и 36px' 
			maxFontSize[i] = parseFloat(computedFontSize[i]); // метод parseFloat() возвращает число или строку в десятичном варианте с плавающей точкой, получил: 48 36
			// console.log(maxFontSize[i]);		
			const fzClassValue = item.classList;
			// console.log(fzClassValue);
			fzClassValue.forEach(function(elem, e) {
				// console.log(item.classList[e]);
				// console.log(item.classList[e].slice(0, 6));
				const slicedFzClass = 'min-fz_';
				// console.log(slicedFzClass);
				if (item.classList[e].slice(0, 7) === slicedFzClass) {
					// console.log('true');
					// console.log(item.classList[e]);
					const fzValue = item.classList[e].slice(7, 15); 
					// console.log(fzValue);
					minFontSize[i] = +fzValue;
					// console.log(typeof(minFontSize[i]));
					// console.log(minFontSize[i]);
				} else {
					// console.log('false');
				}
			});
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
						fontSizeModifedUnactive[i].style.fontSize = `${fontMax}px`;	
						// console.log(textFontSize2);
					} else if (pageWidth < 1920 && pageWidth > 320) {
						let a = (fontMax - fontMin)/(viewportMax - viewportMin);
						let b = (fontMin - (a * viewportMin));
						let result = +((a * pageWidth) + b).toFixed(2);
						// console.log(result);
						fontSizeModifedUnactive[i].style.fontSize  = `${result}px`;
						// console.log(textFontSize2);
					} else if (pageWidth <= 320) {
						fontSizeModifedUnactive[i].style.fontSize = `${fontMin}px`;
						// console.log(textFontSize2);
					}
				}, false);	
			}		
		});
	}
}