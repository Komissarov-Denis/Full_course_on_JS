/* eslint-disable linebreak-style */
// TAIMER-(обратного отсчета)-------------------------------------
export default function timer(id, deadLine) {
	// const deadLine = '2023-12-31'; // переводим в миллисекунды строку, создав новую переменную в виде строки... setClock('.timer', deadLine);
	function getTimeRemaining(endTime) { // функция оставшегося времени определяет разницу между deadLine (endTime) и текущим временем (new Date())
		const t = Date.parse(endTime) - Date.parse(new Date()); // метод Date.parse - переводит строку в миллисекунды
		const days = Math.floor(t / (1000 * 60 * 60 * 24)); // Math.floor - округление до ближайшего целого (миллисек * сек * мин * час в сутках)!
		const hours = Math.floor((t / (1000 * 60 * 60) % 24)); // % - остаток от деления, например 50 / 24 = 2 дня и 2 часа, возвращаем 2 часа!
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);
		return { // создаем объект!!!
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}
	function getZero(num) { // функция подставления 0 до двузначного числа!!!
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector); // это div.timer так как setClock('.timer', deadLine);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000); // функция updateClock будет запускаться каждые 1000 миллисекунд
		updateClock(); // функция запускается один раз первоначально, для избежания мигания таймера, потом устанавливается setInterval в 1000 миллисекунд
		function updateClock () { // расчет времени на данную секунду, разница между планируемым временем и текущим
			const t = getTimeRemaining(endTime); // расчет времени запишется на страницу
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			if (t.total <= 0) {
				clearInterval(timeInterval); // останавливаем таймер как только время выйдет, когда (new Date()) будет больше (endTime)
			}
		}
	}
	setClock(id, deadLine);
}