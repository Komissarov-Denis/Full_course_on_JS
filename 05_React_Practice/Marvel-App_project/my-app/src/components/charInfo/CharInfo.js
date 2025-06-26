import { Component } from 'react';
import PropTypes from 'prop-types'; // не работает теперь в React19
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import { ErrorMessageImg } from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {	

	// constructor(props) { // используем конструктор для вызова метода updateCharacter()
	// 	super(props); // теперь конструктор не нужен при применении ХУКОВ: componentDidMount() и 
	// 	console.log('CharInfo constructor started');
	// }

	state = { // у компонента прописываем индивидуальное состояние
		character: null,
		loading: false, // в данном случае загрузка информации о персонаже начнется с момента осуществления действий пользователи при выборе из 9 персонажей, но сначала будет заглушка skeleton
		error: false,
	}

	marvelService = new MarvelService();

	componentDidMount () { // ХУК этапа монтажа компонента с обновлением данных персонажа, который указывает, что компонент отрендерился
		this.updateCharacter(); 
		// console.log('CharInfo mounted + updateCharacter');
	}

	componentDidUpdate (prevProps) { // ХУК этапа обновления компонента c аргументами предыдущих свойств и предыдущего состояния: componentDidUpdate (prevProps, prevState)
		if (this.props.characterId !== prevProps.characterId) { // если свойства конкретного персонажа с индивидуальным id не соответствуют предыдущим свойствам, только тогда запускаем метод обновления данных персонажа
			this.updateCharacter();
		}
		// console.log('CharInfo updated');
	}

	updateCharacter = () => { // в приеме ПОДЪЕМА СОСТОЯНИЯ, из родительского компонента App, получаем /props/ метода /characterId={this.state.selectedCharacter}/ по каждому элементу /item/ персонажа с персональным /ID/, т.е по клику по клику обновляем персонажа с конкретным id
		const {characterId} = this.props; // деструктурируем characterId из props
		if (!characterId) { // если в characterId ничего нет, то останавливаем выполнение этого метода и это условие будет срабатывать каждый раз вначале, так как в App в state = {selectedCharacter: null}
			return; // поэтому отображаться будет заглушка skeleton
		}

		this.onCharacterLoading(); // будет отображаться Spinner при процессе загрузки
		this.marvelService // если в characterId есть данные, то делаем запрос на сервер
			.getCharacter(characterId) // когда придет ответ от нашего сервиса marvelService по characterId в формате одного объекта с персонажем =>
			.then(this.onCharacterLoaded) // он попадет в onCharacterLoaded в качестве аргумента character и запишется в наше состояние state
			.catch(this.onError); // если произошла ошибка, то обрабатываем ее методом catch()

		// this.foo.bar = 0; // вносим для проверки ErrorBoundary несуществующее свойство

	} // в запросе мы опираемся на props (из App передали props = characterId, в котором id нашего персонажа) 

	onCharacterLoaded = (character) => { // метод загрузки данных персонажа, если он действительно загрузился
		this.setState ({
			character,
			loading: false,
		}) // выполняется заполнение объекта state = {character: character}, лаконично записывать this.setState({character}) и как только данные загружены loading: true преобразуется в loading: false
	}

	onCharacterLoading = () => {
		this.setState ({
			loading: true,
		})
	} // меняет состояние setState объекта на загружаемый = true при продолжающейся загрузке

	onError = () => { // метод отображения ошибки
		this.setState ({
			loading: false, // при ошибке - загрузка отсутствует, то /error: true/ - и это корректная логика
			error: true,
		})
	}


	render () {
		const {character, loading, error} = this.state;
		const skeleton = character || loading || error ? null : <Skeleton/>; // если есть данные персонажа либо идет загрузка, либо вышла ошибка загрузки - ставим "ничего", иначе рендерим заглушку - компонент Skeleton
		const errorMessageImg = error ? <ErrorMessageImg/> : null; // в переменной errorMessageImg будет содержаться: при ошибке - либо компонент с ошибкой, либо при её отсутствии - "ничего"
		const spinner = loading ? <Spinner/> : null; // в переменной spinner будет содержаться: при загрузке - либо компонент Spinner, либо при её отсутствии - ничего
		const content = !(loading || error || !character) ? <View character={character}/> : null; // в переменной content будет рендериться: если сейчас у нас нет загрузки или нет ошибок при загрузке, но есть данные персонажа, то рендерим компонент <View character={character}/> с данными персонажа /character/, либо при их наличии - "ничего"
		// console.log('CharInfo rendered');

		return (
			<div className="char__info">
				{skeleton}
				{errorMessageImg}
				{spinner}
				{content}
				{/* <div className="char__basics">
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
				</ul> */}
			</div>
		)
	}
}

const View = ({character}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = character;
    let imgStyle = {'objectFit' : 'cover'}; // создаем объект картинки со свойством заполнить блок 
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
        imgStyle = {'objectFit' : 'contain'}; // меняем стиль картинки на вместить в блок при возникновении картинки с указанием отсутствия изображения
    }
	return ( // используем React фрагмент, так как нет ни одного родительского компонента
		<> 			
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : 'There is no comics with this character'} 
				{ // если количество комиксов больше нуля, то ничего не выводим, иначе - выводим сообщение
					comics.map((item, i) => { // данная функция будет перебирать методом map() комиксы как item с индексом i по порядку, {item.name} - название комикса, 
						// eslint-disable-next-line
						if (i > 9) return; // ограничивает количество строк комиксов в 10 штук, но если комиксов будет больше 1000, то производительность просядет, так как цикл продолжит передирать все комиксы, поэтому ESLint ругается и просит переписать на цикл в break
						return ( // в атрибут key={i} ставим номер по порядку, так как комиксы динамически меняться не будут, при нажатии на конкретного персонажа данные его полностью заменяются в верстке
							<li key={i} className="char__comics-item">
								{item.name}
							</li>
						)
					})
				}
				{/* <li className="char__comics-item">
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
				</li> */}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	characterId: PropTypes.number, // не проверяет PropTypes в React19, не работает...
}

export default CharInfo;