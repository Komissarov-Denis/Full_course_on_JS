import {ErrorMessageText} from '../components/errorMessage/ErrorMessage.js';
	const errorMessageText = <ErrorMessageText/>;
	
class MarvelService { // в данном случае не нужен препроцессор JSX и Props, не наследуем компонент и не прописываем данный класс как в React Component принято, а прописываем как отдельный класс на чистом JavaScript
	
	// образец запроса: https://gateway.marvel.com/v1/public/characters?ts=1&apikey=863599558f7a3696fbf6a2b87f4f0d10&hash=edc92231018e77ce4048ac2de6ce6c99
	_apiBase = 'https://gateway.marvel.com:443/v1/public/'; // нижнее подчеркивание /lodash/ указывает, что просто так программисты не меняют эти значения!!!
	_apiPrivateKey = 'apikey=863599558f7a3696fbf6a2b87f4f0d10';
	_apiTs = 'ts=1';
	_apiHash = 'hash=edc92231018e77ce4048ac2de6ce6c99';
	
	getResource = async (url) => {
		const result = await fetch(url);
		if (!result.ok) {
			throw new Error(`Could not fetch ${url}, status: ${result.status}`);
		}
		return await result.json();
	};

	//------------------------------------TEST---------------------------------------
	// getAllChars = () => { // тестовые запросы
	// 	return this.getResource(`${this._apiBase}characters?${this._apiTs}&${this._apiPrivateKey}&${this._apiHash}`);
	// }
	// getChar = (id) => {
	// 	return this.getResource(`${this._apiBase}characters/${id}?${this._apiTs}&${this._apiPrivateKey}&${this._apiHash}`);
	// }
	//-------------------------------------------------------------------------------

	getResources = async (url) => { // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async() в связи с асинхронностью выполнения
		const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего - пока промис не вернет от сервера данные, но fetch() сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
		// ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
		if (!result.ok) { // если с result.ok что-то не то...., то необходимо вернуть ошибку
			throw new Error(`Could not fetch ${url}, status: ${result.status}`); // throw new Error() - это конструктор объекта ошибки, оператор throw() выбрасывает ошибку: url - это адрес самого запроса, result.status - это статус выполнения промиса
		}
		return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через цепочку .then() - так как это АСИНХРОННЫЙ КОД + await() дожидается обработки данных в result.json()!!!
	};

	getAllCharacters = async () => { // метод получения целого объекта, содержащего все персонажи /v1/public/characters из асинхронной функции
		const result = await this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiPrivateKey}`); // сохраним промежуточный результат в переменную result как большой объект, в котором есть массив с полученными результатами
		return result.data.results.map(this._transformCharacter) // большой массив содержится в result.data.results и так как это массив, мы можем применить метод map() для формирования массива с новыми объектами по порядку, полученными из метода _transformCharacter()
	}

	getCharacter = async (id) => { // метод получения только одного конкретного персонажа по ID /v1/public/characters/{characterid} из асинхронной функции
		const result = await this.getResources(`${this._apiBase}characters/${id}?${this._apiPrivateKey}`); // сохраним промежуточный результат в переменную result
		return this._transformCharacter(result.data.results[0]); // в _transformCharacter(result) передаем полученный большой объект для трансформации
	}

	_transformCharacter = (character) => { // не изменяемым методом _transformCharacter() будем трансформировать данные: получаем результат character в качестве аргумента и возвращаем трансформированный объект		
		return { // это и есть трансформация данных!!!
			name: character.name, // чтобы null заменил на реальные данные нужно: берем получаемый результат character как один большой объект, ссылаемся на свойство data /полученные данные от сервера/ и выбираем в data поле results /массив с данными/, и так как берем один персонаж - [0] и берем его name
			// description: character.description ? `${character.description.slice(0, 210)}...` : '!!! There is no description for this character !!!', // стандартное условие: если character.description в true, то обрезаем длину по 210 символ, если в false - выводим сообщение
			description: character.description ? `${character.description.slice(0, 210)}...` : errorMessageText,
			thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension, // прописываем путь к картинке с соответствующими полями path и extension
			homepage: character.urls[0].url,
			wiki: character.urls[1].url,
		}		
	}
}

export default MarvelService;