

class MarvelService { // в данном случае не нужен препроцессор JSX и Props, не наследуем компонент и не прописываем данный класс как в React Component принято, а прописываем как отдельный класс на чистом JavaScript

    getResources = async (url) => { // function expression - без объявления присваивается в переменную, getResources отвечает за получение данных с сервера + async() в связи с асинхронностью выполнения
        const result = await fetch(url); // фетч запрос вернет промис, в переменной result нет ничего - пока промис не вернет от сервера данные, но fetch() сигналы 404, 403, 401 не распознает как ОШИБКИ!!! 
        // ошибками для него являются отсутствие Интернета или критические неполадки в запросе!!! Поэтому создаем условие на сравнение:
        if (!result.ok) { // если с result.ok что-то не то...., то необходимо вернуть ошибку
            throw new Error(`Could not fetch ${url}, status: ${result.status}`); // throw new Error() - это конструктор объекта ошибки, оператор throw() выбрасывает ошибку: url - это адрес самого запроса, result.status - это статус выполнения промиса
        }
        return await result.json(); // возвращаем из функции postData промис (result.json()) для дальнейшей обработки через цепочку .then() - так как это АСИНХРОННЫЙ КОД + await() дожидается обработки данных в result.json()!!!
    };

    getAllCharacters = () => {
        return this.getResources('');
    }

}

export default MarvelService;