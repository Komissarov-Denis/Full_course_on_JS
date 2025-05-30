import { Component } from 'react';
import Spinner from '../spinner/Spinner.js';
import MarvelService from '../../services/MarvelService.js';
import { ErrorMessageImg } from '../errorMessage/ErrorMessage.js';

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {	

	// constructor(props) { // используем конструктор для вызова метода updateCharacter()
	// 	super(props); // теперь конструктор не нужен при применении ХУКОВ: componentDidMount() и 
	// 	console.log('constructor');
	// }

	state = {
		characterList: {},
		loading: true,
		error: false,
	}

	marvelService = new MarvelService();

	updateCharacter = () => { // в приеме ПОДЪЕМА СОСТОЯНИЯ, из родительского компонента App, получаем /props/ метода /characterId={this.state.selectedCharacter}/ по каждому элементу /item/ персонажа с персональным /ID/, т.е по клику по клику обновляем персонажа с конкретным id
		const {characterId} = this.props; // деструктурируем characterId из props
		if (!characterId) { // если в characterId ничего нет, то останавливаем выполнение этого метода и это условие будет срабатывать каждый раз вначале, так как в App в state = {selectedCharacter: null}
			return; // поэтому отображаться будет заглушка skeleton
		}

		this.marvelService // если в characterId есть данные, то делаем запрос на сервер
			.getCharacter(characterId)
			.then()
			.catch();
	} // в запросе мы опираемся на props (из App передали props = characterId, в котором id нашего персонажа) 


	render () {
		return (
			<div className="char__info">
				<div className="char__basics">
					<img src={thor} alt="abyss"/>
					<div>
						<div className="char__info-name">thor</div>
						<div className="char__btns">
							<a href="#" className="button button__main">
								<div className="inner">homepage</div>
							</a>
							<a href="#" className="button button__secondary">
								<div className="inner">Wiki</div>
							</a>
						</div>
					</div>
				</div>
				<div className="char__descr">
					In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
				</div>
				<div className="char__comics">Comics:</div>
				<ul className="char__comics-list">
					<li className="char__comics-item">
						All-Winners Squad: Band of Heroes (2011) #3
					</li>
					<li className="char__comics-item">
						Alpha Flight (1983) #50
					</li>
					<li className="char__comics-item">
						Amazing Spider-Man (1999) #503
					</li>
					<li className="char__comics-item">
						Amazing Spider-Man (1999) #504
					</li>
					<li className="char__comics-item">
						AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
					</li>
					<li className="char__comics-item">
						Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
					</li>
					<li className="char__comics-item">
						Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
					</li>
					<li className="char__comics-item">
						Vengeance (2011) #4
					</li>
					<li className="char__comics-item">
						Avengers (1963) #1
					</li>
					<li className="char__comics-item">
						Avengers (1996) #1
					</li>
				</ul>
			</div>
		)
	}
}

export default CharInfo;