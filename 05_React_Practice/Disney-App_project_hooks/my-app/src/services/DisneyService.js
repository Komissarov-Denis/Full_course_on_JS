import { ErrorMessageText } from '../components/errorMessage/ErrorMessage.js';
	const errorMessageText = <ErrorMessageText/>;
	
class DisneyService { // в данном случае не нужен препроцессор JSX и Props, не наследуем компонент и не прописываем данный класс как в React Component принято, а прописываем как отдельный класс на чистом JavaScript
	
	_apiBase = 'https://api.disneyapi.dev/'; // нижнее подчеркивание /lodash/ указывает, что просто так программисты не меняют эти значения!!!
	_apiBaseOffset = 1; // отступ задан эмпирическим путем, чтобы более менее интересные персонажи подгружались из всего списка

	//------------------------------------TEST---------------------------------------
	// getResource = async (url) => { // образец запроса
	// 	const result = await fetch(url);
	// 	if (!result.ok) {
	// 		throw new Error(`Could not fetch ${url}, status: ${result.status}`);
	// 	}
	// 	return await result.json();
	// };	
	// getAllChars = async (offset = this._apiBaseOffset) => { // тестовые запросы
	// 	return this.getResource(`${this._apiBase}character?page=${offset}&pageSize=9`);
	// }
	// getChar = async (id) => {
	// 	return this.getResource(`${this._apiBase}character/${id}?`);
	// }
	//-------------------------------------------------------------------------------

	getResources = async (url) => { // function expression - без объявления присваивается в переменную getResources, отвечает за получение данных с сервера + функция async() в связи с асинхронностью выполнения
		const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего - пока промис не вернет от сервера данные, но fetch() сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
		// ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
		if (!result.ok) { // если с result.ok что-то не то...., то необходимо вернуть ошибку
			throw new Error(`Could not fetch ${url}, status: ${result.status}`); // throw new Error() - это конструктор объекта ошибки, оператор throw() выбрасывает ошибку: url - это адрес самого запроса, result.status - это статус выполнения промиса
		}
		return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через цепочку .then() - так как это АСИНХРОННЫЙ КОД + await() дожидается обработки данных в result.json()!!!
	};
	
	getAllCharacters = async (offset = this._apiBaseOffset) => { // метод получения целого объекта, содержащего все персонажи из асинхронной функции, аргумент offset = this._apiBaseOffset делает функцию getAllCharacters() более гибкой для манипуляций со стороны, так как она будет отталкиваться от аргумента, а если мы его не передаем, то по умолчанию offset = 0
		const result = await this.getResources(`${this._apiBase}character?page=${offset}&pageSize=9`); // сохраним промежуточный результат в переменную result как большой объект, в котором есть массив с полученными результатами
		// console.log(result);
		// console.log(result.data[0]);
		// console.log(result.data.length);
		return result.data.map(this._transformCharacter); // большой массив содержится в result.data и так как это массив, мы можем применить метод map() для формирования массива с новыми объектами по порядку, полученными из метода _transformCharacter()
	}

	getCharacter = async (id) => { // метод получения только одного конкретного персонажа по ID из асинхронной функции
		const result = await this.getResources(`${this._apiBase}character/${id}?page=1&pageSize=11000`); // сохраним промежуточный результат в переменную result
		// console.log(result);
		// console.log(id);
		return this._transformCharacter(result.data); // в _transformCharacter(result) передаем полученный большой объект для трансформации
	}
		
	_transformCharacter = (character) => { // не изменяемым методом _transformCharacter() будем трансформировать данные: получаем результат character в качестве аргумента и возвращаем трансформированный объект		
		// console.log(character.films.length);
		// console.log(character.shortFilms.length);
		// console.log(character.tvShows.length);
		// console.log(character.videoGames.length);
		// console.log(character.parkAttractions.length);
		// console.log(character);
		// console.log(character.imageUrl);
		// console.log(character.imageUrl.status);
		// console.log(character.imageUrl.statusText);
		// console.log(character._id);		
		return { // это и есть трансформация данных!!!
            id: character._id, // данный id приходит из данных каждого персонажа, по нему идет заполнение карточек в компоненте CharList
			name: character.name ? `${character.name.slice(0, 210)}` : errorMessageText, // чтобы null заменился на реальные данные нужно: взять получаемый результат character как один большой объект, сослаться на свойство data /полученные данные от сервера/ и выбирать в data поле [с индексом] /массив с данными/, и т.е. берем один персонаж - [0] со значением name
			// description: character.description ? `${character.description.slice(0, 210)}...` : '!!! There is no description for this character !!!', // стандартное условие: если character.description в true, то обрезаем длину по 210 символ, если в false - выводим сообщение
			// description: character.description ? `${character.description.slice(0, 210)}...` : errorMessageText, // если есть описание персонажа, то обрезаем длину текста по 210 символ, иначе выводим сообщение об ошибке
			thumbnail: character.imageUrl, // прописываем путь к картинке с соответствующими полями path и extension
			wiki: 'https://ru.wikipedia.org/wiki/The_Walt_Disney_Company',
			homepage: 'https://www.disney.com/',
			// homepage: character.urls[0].url,
			// wiki: character.urls[1].url,
			// comics: character.comics.items, // получаем данные для компонента CharInfo по комиксам
			films: character.films, // получаем данные для компонента CharInfo по фильмам
			tvShows: character.tvShows,
			shortFilms: character.shortFilms,
			videoGames: character.videoGames,
			parkAttractions: character.parkAttractions,
			dataLength: character.length,
			filmsLength: character.films.length,
			shortFilmsLength: character.shortFilms.length,
			tvShowsLength: character.tvShows.length,
			videoGamesLength: character.videoGames.length,
			parkAttractionsLength: character.parkAttractions.length,
		}		
	}	
}	

export default DisneyService;