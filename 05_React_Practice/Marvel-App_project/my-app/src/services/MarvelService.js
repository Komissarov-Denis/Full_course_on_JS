class MarvelService { // в данном случае не нужен препроцессор JSX и Props, не наследуем компонент и не прописываем данный класс как в React Component принято, а прописываем как отдельный класс на чистом JavaScript
    _apiBase = 'http://gateway.marvel.com/v1/public/'; // нижнее подчеркивание /lodash/ указывает, что просто так программисты не меняют эти значения!!!
    _apiPrivateKey = 'apikey=863599558f7a3696fbf6a2b87f4f0d10'

    getResources = async (url) => { // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async() в связи с асинхронностью выполнения
        const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего - пока промис не вернет от сервера данные, но fetch() сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
        // ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
        if (!result.ok) { // если с result.ok что-то не то...., то необходимо вернуть ошибку
            throw new Error(`Could not fetch ${url}, status: ${result.status}`); // throw new Error() - это конструктор объекта ошибки, оператор throw() выбрасывает ошибку: url - это адрес самого запроса, result.status - это статус выполнения промиса
        }
        return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через цепочку .then() - так как это АСИНХРОННЫЙ КОД + await() дожидается обработки данных в result.json()!!!
    };

    getAllCharacters = () => { // метод получения целого объекта, содержащего все персонажи /v1/public/characters
        return this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiPrivateKey}`);
    }

    getCharacter = async (id) => { // метод получения только одного конкретного персонажа по ID /v1/public/characters/{characterid} из асинхронной функции
        const result = await this.getResources(`${this._apiBase}characters/${id}?${this._apiPrivateKey}`); // сохраним промежуточный результат в переменную result
        return this._transformCharacter(result); // в _transformCharacter(result) передаем полученный большой объект для трансформации
    }

    _transformCharacter = (result) => { // не изменяемым методом _transformCharacter() будем трансформировать данные: получаем результат result в качестве аргумента и возвращаем трансформированный объект
        return { // это и есть трансформация данных!!!
            name: result.data.results[0].name, // чтобы null заменил на реальные данные нужно: берем получаемый результат result как один большой объект, ссылаемся на свойство data /полученные данные от сервера/ и выбираем в data поле results /массив с данными/, и так как берем один персонаж - [0] и берем его name
            description: result.data.results[0].description,
            thumbnail: result.data.results[0].thumbnail.path + '.' + result.data.results[0].thumbnail.extension, // прописываем путь к картинке с соответствующими полями path и extension
            homepage: result.data.results[0].urls[0].url,
            wiki: result.data.results[0].urls[1].url,
        } 
    }

}

export default MarvelService;