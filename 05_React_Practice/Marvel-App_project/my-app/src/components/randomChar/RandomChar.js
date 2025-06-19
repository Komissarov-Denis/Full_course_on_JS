import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import { ErrorMessageImg } from '../errorMessage/ErrorMessage';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {

	constructor(props) { // используем конструктор для вызова метода updateCharacter()
		super(props); // теперь конструктор не нужен при применении ХУКОВ: componentDidMount() и 
		console.log('RandomChar constructor started');
	}

	state = { // у компонента прописываем индивидуальное состояние и применим синтаксис полей классов, конструктора не будет
		character: {}, // это тоже самое, если бы все наши объекты записывались в null как тут =>
																								// name: null,
																								// description: null,
																								// thumbnail: null,
																								// homepage: null,
																								// wiki: null,
		loading: true,	//	данный параметр будет отвечать за наличие или отсутствие загрузки компонента, это состояние компонента в целом
		error: false, // параметр при ошибке 404, обрабатываем как замена на другого персонажа при отсутствии данных по текущему персонажу		
	}

	marvelService = new MarvelService(); // применим СИНТАКСИС ПОЛЕЙ КЛАССОВ и создадим в переменной marvelService новый экземпляр или нового потомка класса MarvelService() внутри класса RandomChar
	// marvelService.getAllCharacters().then(result => result.data.results.forEach(item => console.log(item.name))); // получаем массив данных персонажей, которые будут храниться в data.results, чтобы перебрать элементы массива по именам - применим метод forEach()
	
	componentDidMount () { // ХУК этапа монтирования компонента для обновления данных, после того как реакт прорендерит первоначальную структуру, он туда помещает данные от сервера
		this.updateCharacter();
		// this.timerId = setInterval(this.updateCharacter, 3200000); // !!!!!!!!! для автоматической смены отображаемой информации через каждый интервал времени применим метод setInterval()
		console.log('RandomChar mounted');
	}

	componentDidUpdate () { // ХУК этапа обновления компонента
		console.log('RandomChar updated');
	}

	componentWillUnmount () { // ХУК этапа демонтажа компонента по прохождению определенного интервала времени
		clearInterval(this.timerId); // размонтирование компонента и направляется новый запрос после демонтажа
		console.log('RandomChar unmounted');
	}

	onCharacterLoaded = (character) => { // метод загрузки данных персонажа, если он действительно загрузился
		this.setState ({
			character,
			loading: false,
		}) // выполняется заполнение объекта state = {character: character}, лаконично записывать this.setState({character}) и как только данные загружены loading: true преобразуется в loading: false
	}

	onCharacterLoading = () => {
		this.setState ({
			loading: true, // это значение необходимо для подгрузки спиннера для визуализации процесса загрузки
		})
	} // меняет состояние setState объекта на загружаемый = true при продолжающейся загрузке

	onError = () => { // метод отображения ошибки
		this.setState ({
			loading: false, // при ошибке - загрузка отсутствует, поэтому переводим /loading: false, error: true/ - это корректная логика
			error: true,
		})
	}
	
	updateCharacter = () => { // данный метод будет обновлять данные нашего персонажа, используем стрелочную функцию, чтобы не терять контекст вызова
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // для получения СЛУЧАЙНОГО id применим метод Math.floor() для округления результата, так как id только целые числа
		this.onCharacterLoading(); // при обновлении данных персонажа, реализуем спиннер, чтобы видеть процесс загрузки, когда Loading/загрузка имеет значение true
		this.marvelService
			.getCharacter(id) // данные персонажа /объект/ будем получать по уникальному идентификатору и передавать в аргумент коллбэк функции .then(character => {})
			// .then(result => { // далее result /объект/ передаем в this.setState(result)
				// this.setState(result) // тут нет зависимости от предыдущего state потому, что каждый раз приходит какой-то другой персонаж, даже если это один и тот же..., поэтому раскрываем объект и формируем =>				
			// }) // весь result /объект/ передается из _transformCharacter  '../../services/MarvelService.js'
			// .getAllCharacters().then(character => console.log(character)) // тестовый вариант для проверки получения всего массива персонажей для .getAllCharacters()
			.then(this.onCharacterLoaded) // при использовании промисов в цепочке через /.then()/, если в данную функцию updateCharacter() приходит аргумент /character/ из onCharacterLoaded(), то в /this.onCharacterLoaded/ подставляется данный аргумент через /.then()/, т.е. character запишется внутрь state
			.catch(this.onError); // данный метод отлавливает и отображает ошибку при возникновении её в загруженных данных
		
		// this.foo.bar = 0; // вносим для проверки ErrorBoundary несуществующее свойство	
	}

	render() { // применим принцип деструктуризации объекта character{}
		console.log('RandomChar rendered'); // тест этапа рендеринга
		const {character, loading, error} = this.state; // с помощью контекста вызова this.state и с применением принципа деструктуризации, вытаскиваем из state переменные name, description, thumbnail, homepage, wiki
		const errorMessageImg = error ? <ErrorMessageImg/> : null; // в переменной errorMessageImg будет содержаться: при ошибке - либо компонент с ошибкой, либо при её отсутствии - "ничего"
		const spinner = loading ? <Spinner/> : null; // в переменной spinner будет содержаться: при загрузке - либо компонент Spinner, либо при её отсутствии - "ничего"
		const content = !(loading || error) ? <View character={character}/> : null; // в переменной content будет содержаться: если сейчас у нас нет загрузки или нет ошибок при загрузке, выводим компонент <View character={character}/> с данными персонажа /character/, либо при их наличии - "ничего"
		
		// if (loading) { // сокращенно: если loading = true, то возвращаем компонент Spinner и дальнейший код будет недостижим /начиная с 48 строки/
			// return <Spinner/>
		// } => преобразовано в {loading ? <Spinner/> : <View character={character}/>} - конструкция, когда мы загружаем компонент из условия, называется "УСЛОВНЫМ РЕНДЕРИНГОМ"
		
		return ( // если loading = true, то возвращаем компонент View с аргументом character - 50 строка /рендерим или спиннер, или компонент с данными/ и далее выводим переменные в errorMessageImg, spinner, content
			<div className="randomchar">
				{errorMessageImg}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br/>
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button onClick={this.updateCharacter} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
				</div>
			</div>
		) // <button onClick={this.updateCharacter} className="button button__main"> - через контекст вызова /this./ вызываем по клику на кнопку /try it/ выполнение метода updateCharacter()
	}
}

const View = ({character}) => { // простой "РЕНДАРЯЩИЙ КОМПОНЕНТ" без логики, данный компонент будет отображать определенный кусочек верстки и он в качестве аргумента принимает /character/ объект с данными о персонаже
	const {name, description, thumbnail, homepage, wiki} = character;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'}; // меняем стиль картинки при возникновении картинки с указанием отсутствия изображения
    }

	return ( // возвращаем кусочек верстки
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;