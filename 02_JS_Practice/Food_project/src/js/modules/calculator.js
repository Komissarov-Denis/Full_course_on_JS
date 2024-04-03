// CALCULATOR-----------------------------------------------------
export default function calculator() {
	const result = document.querySelector('.calculating__result span'); // получили по селектору класс, в который будем записывать результат расчета
	let sex, height, weight, age, ratio = 1.375; // объявили несколко переменных (через let так как они будут меняться): пол, рост, вес, возраст и коэффициент активности
	if (localStorage.getItem('sex')) { // назначим проверку при получении значений элементов из localStorage
		sex = localStorage.getItem('sex'); // присваиваем значение переменной sex из localStorage
	} else {
		sex = 'female'; // если нет значения элементов sex из localStorage, то вводим их вручную
		localStorage.setItem('sex', 'female'); // присваиваем в localStorage опционально значение полу
	}
	if (localStorage.getItem('ratio')) { // назначим проверку при получении значений элементов из localStorage
		ratio = localStorage.getItem('ratio'); // присваиваем значение переменной ratio из localStorage
	} else {
		ratio = 1.375; // если нет значения элементов ratio из localStorage, то вводим их вручную
		localStorage.setItem('ratio', 1.375); // присваиваем в localStorage опционально значение активности
	}
	function initLocalSettings(selector, activeClass) { // перебираем все элементы в sex и ratio, при совпадении с ключами в localStorage с sex: female и ratio: 1.375, назначаем класс активности
		const elements = document.querySelectorAll(selector); // присваиваем селектор переменной elements
		elements.forEach(elem => { // начинаемперебирать все элементы в sex и ratio
			elem.classList.remove(activeClass); // удаляем сразу все классы активности заранее
			if (elem.getAttribute('id') === localStorage.getItem('sex')) { // перебираем по id соответствия в localStorage с sex: female с назначением класса активности
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // перебираем по id соответствия в localStorage с ratio: 1.375 с назначением класса активности
				elem.classList.add(activeClass);
			}
		});
	} // при этом данная функция должна вызываться один раз при занесенных пользователем данных!!!!
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
	function calcTotal() { // подсчитываем конечный результат, но начинать подсчет будем с проверки наличия всех заполненных данных, запускаться будет при внесении изменений
		if (!sex || !height || !weight || !age || !ratio) { // строка (+'fbgdfj') при преобразовании в числовой формат дает NaN, а NaN == false; при проверке значения: true, т.е. на наличие =>
			result.textContent = ''; // => всех заполненых переменных, они преобразуются в конструкции switch к числу (+input.value;); но если хотя бы одно значение будет NaN == false, то =>
			return; // => прерываем досрочно функцию с сообщением '...' и все условия после return работать не будут!!!
		}
		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // метод Math.round() - округляет до целого числа 
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); // метод Math.round() - округляет до целого числа 
		}
	}
	calcTotal();
	function getStaticInformation(selector, activeClass) { // применять функцию будем на двух аргументах: на селекторе и классе активности, для получения информации со статических блоков
		const elements = document.querySelectorAll(selector); // получим элементы (все div) внутри блоков #gender и .calculating__choose_big
		elements.forEach(elem => {
			elem.addEventListener('click', (e) => { // отслеживаем все клики по родительскому элементу, который содержит все div (делегирование событий) при помощи коллбэк функции
				if (e.target.getAttribute('data-ratio')) { // если это блок - ratio (т.е. содержит атрибут data-ratio), то получаем значения по data-ratio атрибуту, 
					ratio = +e.target.getAttribute('data-ratio'); // присваиваем переменной ratio числовое значение атрибута data-ratio
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // добавляем в localStorage постоянные данные, выбранные пользователем
				} else {
					sex = e.target.getAttribute('id'); // если блок - gender/sex, то значаения получаем по id
					localStorage.setItem('sex', e.target.getAttribute('id')); // добавляем в localStorage постоянные данные, выбранные пользователем
				}
				console.log(ratio, sex);
				elements.forEach(elem => { // меняем классы активности
					elem.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);
				calcTotal();
			});
		});
		// function getStaticInformation(parentSelector, activeClass) { // применять функцию будем на двух аргументах: на родительском селекторе и классе активности, для получения информации со статических блоков
		// 	const elements = document.querySelectorAll(`${parentSelector} div`); // получим элементы (все div) внутри родительского блока
		// document.querySelector(parentSelector).addEventListener('click', (e) => { // отслеживаем все клики по родительскому элементу, который содержит все div (делегирование событий) при помощи коллбэк функции
		// 	if (e.target.getAttribute('data-ratio')) { // если это блок - ratio (т.е. содержит атрибут data-ratio), то получаем значения по data-ratio атрибуту, 
		// 		ratio = +e.target.getAttribute('data-ratio'); // присваиваем переменной ratio числовое значение атрибута data-ratio
		// 	} else {
		// 		sex = e.target.getAttribute('id'); // если блок - gender/sex, то значаения получаем по id 
		// 	}
		// 	console.log(ratio, sex);
		// 	elements.forEach(elem => { // меняем классы активности
		// 		elem.classList.remove(activeClass);
		// 	});
		// 	e.target.classList.add(activeClass);
		// 	calcTotal();
		// }); // !!!но делегирование в данном случае создает сложность, когда кликаешь на родительский блок, он подсвечивается, так как ему назначается класс активности!!!
		// }
	}
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	function getDynamicInformation(selector) { // функция обрабатывает каждый отдельный input
		const input = document.querySelector(selector);
		input.addEventListener('input', () => { // используем switch case конструкцию
			if (input.value.match(/\D/g)) { // если мы вводим в input значение value не соответствующее цифрам, то не позволяем выполнять вычисления!!!
				input.style.border = '2px solid red'; // так же задаём красныую обводку блоку input
			} else {
				input.style.border = 'none'; // ПРОВЕРКА НА ОТМЕТКУ/ВВОД ДАННЫХ В ИНПУТ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			switch(input.getAttribute('id')) { // проверяем input по уникальному идентификатору
			case 'height': // если это рост, то записываем в него значение роста
				height = +input.value;
				break;
			case 'weight': // если это вес, то записываем в него значение веса
				weight = +input.value;
				break;
			case 'age': // если это возраст, то записываем в него значение возраста
				age = +input.value;
				break;
			}
			calcTotal();
		});
	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}