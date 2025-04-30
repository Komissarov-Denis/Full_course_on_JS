import { Component } from 'react';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

	state = { // применим синтаксис полей классов, конструктора не будет
		name: null,
		description: null,
		thumbnail: null,
		homepage: null,
		wiki: null,
	}

	marvelService = new MarvelService(); // применим синтаксис полей классов и создадим в переменной marvelService новый экземпляр или нового потомка класса MarvelService() внутри класса RandomChar
	// marvelService.getAllCharacters().then(result => result.data.results.forEach(item => console.log(item.name))); // получаем массив данных персонажей, которые будут храниться в data.results, чтобы перебрать элементы массива по именам - применим метод forEach()
	updateChar = () => { // данный метод будет обновлять данные нашего персонажа, используем стрелочную функцию, чтобы не терять контекст вызова
		const id = 1011005;
		this.marvelService
			.getCharacter(id) // данные персонажа будем получать по уникальному идентификатору
			.then(result => {
				this.setState({ // тут нет зависимости от предыдущего state потому, что каждый раз приходит какой-то другой персонаж, даже если это один и тот же..., поэтому раскрываем объект и формируем =>
					name: result.data.results[0].name, // чтобы null заменил на реальные данные нужно: берем получаемый результат result как один большой объект, ссылаемся на свойство data /полученные данные от сервера/ и выбираем в data поле results /массив с данными/, и так как берем один персонаж - [0] и берем его name
					description: null,
					thumbnail: null,
					homepage: null,
					wiki: null,
				})
			})
	}

	render() {
		const {name, description, thumbnail, homepage, wiki} = this.state; // с помощью контекста вызова this.state и с применением принципа деструктуризации, вытаскиваем из state переменные name, description, thumbnail, homepage, wiki
		return (
			<div className="randomchar">
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

export default RandomChar;