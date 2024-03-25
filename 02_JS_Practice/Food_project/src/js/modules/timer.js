// TAIMER-(обратного отсчета)-------------------------------------
export default function timer(id, deadLine) { // timer('.timer', '2024-03-25T11:57:00.000+03:00');

	// const deadLine = '2023-12-31'; // переводим в миллисекунды строку, создав новую переменную в виде строки... setClock('.timer', deadLine);
	function getTimeRemaining(endTime) { // функция оставшегося времени 
		let days, hours, minutes, seconds;
		const t = Date.parse(endTime) - Date.parse(new Date()); // определяем разницу между deadLine (endTime) и текущим временем (new Date()) в миллисекундах
		// console.log(Date.parse(new Date())); // получил: 1711099417000 миллисекунд, метод Date.parse() - переводит строку в миллисекунды
		// console.log(new Date()); // Fri Mar 22 2024 12:21:51 GMT+0300 (Москва, стандартное время)
		if (t <= 0) { // если t меньше нуля, не выполняем расчетов и назначаем нуль кадому элементу
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {		
			days = Math.floor(t / (1000 * 60 * 60 * 24)); // определяем оставшееся количество дней, Math.floor() - округление до ближайшего целого (миллисек * сек * мин * час в сутках)!
			hours = Math.floor((t / (1000 * 60 * 60) % 24)); // определяем оставшееся количество часов, % - остаток от деления, например 50 / 24 = 2 дня и 2 часа, возвращаем 2 часа!
			minutes = Math.floor((t / 1000 / 60) % 60); //  определяем оставшееся количество минут
			seconds = Math.floor((t / 1000) % 60); //  определяем оставшееся количество секунд
		}
		return { // останавливает выполнение функции getTimeRemaining() и возвращает наружу данные расчета в виде объекта!!!
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}
	function getZero(num) { // функция подставления 0 до двузначного числа и вывода информации 0 при остановке таймера!!!
		if (num >= 0 && num < 10) {
			return `0${num}`; // возвращаем измененное значение в виде строки с нулем вначале - при выводе однозначного числа
		}	else if (num < 0) {
			return '00'; // при отрицательном значении -  возвращаем нуль, во избежание мигания
		}	else {
			return num; // в остальных случаях выводим двузначное число
		}
	}
	function setClock(selector, endTime) { // функция установки таймера на страничку
		const timer = document.querySelector(selector); // это div.timer так как setClock(id, deadLine) === timer('.timer', '2024-03-25T11:57:00.000+03:00')
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000); // функция timeInterval() будет обновлять каждые 1000 миллисекунд таймер === функция updateClock(), с помощью метода setInterval()
		updateClock(); // функция запускается один раз первоначально, для избежания мигания таймера, потом устанавливается setInterval в 1000 миллисекунд
		function updateClock () { // расчет времени на данную секунду, разница между планируемым временем и текущим
			const t = getTimeRemaining(endTime); // расчет времени запишется на страницу, применим полученные данные из возвращенного объекта функции getTimeRemaining()
			days.innerHTML = getZero(t.days); // заполняем данными страницу HTML
			hours.innerHTML = getZero(t.hours); // заполняем данными страницу HTML
			minutes.innerHTML = getZero(t.minutes); // заполняем данными страницу HTML
			seconds.innerHTML = getZero(t.seconds); // заполняем данными страницу HTML
			if (t.total <= 0) {
				clearInterval(timeInterval); // останавливаем таймер как только время выйдет, когда (new Date()) будет больше (endTime), т.е. уйдет в минус
			}
		}
	}
	setClock(id, deadLine);
	function showEndTime(endTime) {
		const time = new Date(endTime);
		const endDate = document.querySelector('.promotion__end-date');
		const yearBlock = endDate.querySelector('#year');
		const monthBlock = endDate.querySelector('#month');
		const dayBlock = endDate.querySelector('#day');
		const hourBlock = endDate.querySelector('#hour');
		const minBlock = endDate.querySelector('#min');
		yearBlock.innerHTML = getZero(time.getFullYear());
		monthBlock.innerHTML = getZero(time.getMonth() + 1);
		dayBlock.innerHTML = getZero(time.getDate());
		hourBlock.innerHTML = getZero(time.getHours());
		minBlock.innerHTML = getZero(time.getMinutes());
	} 
	showEndTime(deadLine); // 2024-03-25T00:00:00.000+03:00

}