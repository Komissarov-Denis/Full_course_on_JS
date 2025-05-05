import { Component } from 'react';
import Spinner from '../spinner/Spinner.js';
import MarvelService from '../../services/MarvelService.js';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
	constructor(props) { // используем конструктор для вызова метода updateChar()
		super(props);
		this.updateChar();
	}

	state = { // применим синтаксис полей классов, конструктора не будет
		character: {}, // это тоже самое, если бы все наши объекты записывались в null как тут =>
																								// name: null,
																								// description: null,
																								// thumbnail: null,
																								// homepage: null,
																								// wiki: null,
		loading: true,	//	данный параметр будет отвечать за наличие или отсутствие загрузки компонента
	}

	marvelService = new MarvelService(); // применим синтаксис полей классов и создадим в переменной marvelService новый экземпляр или нового потомка класса MarvelService() внутри класса RandomChar
	// marvelService.getAllCharacters().then(result => result.data.results.forEach(item => console.log(item.name))); // получаем массив данных персонажей, которые будут храниться в data.results, чтобы перебрать элементы массива по именам - применим метод forEach()
	
	onCharLoaded = (character) => { // метод загрузки данных персонажа, если он действительно загрузился
		this.setState({
			character,
			loading: false}) // выполняется заполнение объекта character: character, лаконично записывать this.setState({character}) и как только данные загружены - loading: false
	}
	
	updateChar = () => { // данный метод будет обновлять данные нашего персонажа, используем стрелочную функцию, чтобы не терять контекст вызова
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // для получения случайного id применим метод Math.floor() для округления результата, так как id только целые числа
		this.marvelService
			.getCharacter(id) // данные персонажа /объект/ будем получать по уникальному идентификатору и передавать в аргумент коллбэк функции .then(result => {})
			// .then(result => { // далее result /объект/ передаем в this.setState(result)
				// this.setState(result) // тут нет зависимости от предыдущего state потому, что каждый раз приходит какой-то другой персонаж, даже если это один и тот же..., поэтому раскрываем объект и формируем =>				
			// }) // весь result /объект/ передается из _transformCharacter  '../../services/MarvelService.js'
			.then(this.onCharLoaded)
	}

	render() { // применим принцип деструктуризации объекта character{}
		const {character, loading} = this.state; // с помощью контекста вызова this.state и с применением принципа деструктуризации, вытаскиваем из state переменные name, description, thumbnail, homepage, wiki
		
		// if (loading) { // сокращенно: если loading = true, то возвращаем компонент Spinner и дальнейший код будет недостижим /начиная с 48 строки/
			// return <Spinner/>
		// } => в 50 строку преобразовано 
		
		return ( // если loading = true, то возвращаем компонент View с аргументом character - 50 строка /рендерим или спиннер, или компонент с данными/ 
			<div className="randomchar">
				{loading ? <Spinner/> : <View character={character}/>}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br/>
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
				</div>
			</div>
		)
	}
}

const View = ({character}) => { // простой рендарящий компонент без логики, данный компонент будет отображать определенный кусочек верстки и он в качестве аргумента принимает /character/ объект с данными о персонаже
	const {name, description, thumbnail, homepage, wiki} = character;

	return ( // возвращаем кусочек верстки
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img"/>
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