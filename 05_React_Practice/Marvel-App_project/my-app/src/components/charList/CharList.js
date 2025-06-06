import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import { ErrorMessageImg } from '../errorMessage/ErrorMessage';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

	// constructor(props) { // используем конструктор для вызова метода updateCharacter()
	// 	super(props); // теперь конструктор не нужен при применении ХУКОВ: componentDidMount() и 
	// 	console.log('constructor');
	// }

	state = {
		characterList: [],
		loading: true, // тут загрузка первоначальная в принципе должна быть в true, так как при загрузке приложения происходит подгрузка данных персонажей
		error: false,
		newItemLoading: false, // тут загрузка в должна быть в false, так как вызывается вручную по клику на кнопку
		offset: 210, // данное состояние передаем в метод onCharacterListLoaded() для изменения состояние путем наращивания по клику на кнопку, число может быть любое
	}

	marvelService = new MarvelService();

	componentDidMount () { // в момент создания компонента первый раз, запускается метод onRequest() без аргумента, т.е. offset = null =>
		this.onRequest();

		// this.foo.bar = 0; // вносим для проверки ErrorBoundary несуществующее свойство
	}
	//=>
	onRequest = (offset) => { // далее уходит запрос к серверу и в offset ничего не передается, а это значит что из модуля MarvelService() будет подставлен базовый отступ offset = this._apiBaseOffset = 210 =>
 		this.onCharacterListLoading(); // при первом запуске данного метода, состояние объекта setState({newItemLoading}) переключится в позицию true, это нормально, так как интерфейс не постоен, но после первичной загрузки данных персонажей, нам нужно состояние объекта setState({newItemLoading}) перевести в false через метод onCharacterListLoaded() =>
		this.marvelService.getAllCharacters(offset) // но, при повторном изменении компонента, при клике на кнопку в offset будет подставляться число, которое будет формировать новый запрос
			.then(this.onCharacterListLoaded)
			.catch(this.onError)
	}

	onCharacterListLoading = () => { // метод процесса запуска подгрузки данных персонажей по клику на кнопку
		this.setState({
			newItemLoading: true,
		})
	}

	onCharacterListLoaded = (newCharacterList) => { // тут персонажи загрузились
		this.setState(({offset, characterList}) => ({ // деструктурируем объект, берем аргумент characterList, который изначально был в текущем state={characterList: []}, в начале это пустой массив, потом 9 элементов, 18 элементов, 27 и т.д.
			characterList: [...characterList, ...newCharacterList], // данное состояние объекта будет формироваться из двух сущностей для подгрузки дополнительных персонажей по клику на кнопку, поэтому помещаем все в коллбэк функцию, для возвращения нового объекта из этой функции с новым состоянием, зависящем от предыдущего
			loading: false, // [...characterList, ...newCharacterList] разворачиваем старый массив и добавляем в него новые элементы, которые пришли от сервера в onRequest(offset) в .then(this.onCharacterListLoaded) уже с offset
			newItemLoading: false, // => отрабатывает после onRequest() и как только тут персонажи загрузились, newItemLoading переключаем в false
			offset: offset + 9, // состояние отступа offset будет прирастать по клику на кнопку: 210 + 9 = 219, 219 + 9 = 228 и т.д.
		}))
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		})
	}

	renderItems (array) { // Этот метод создан для оптимизации, чтобы не помещать такую конструкцию в метод render
		const items = array.map((item) => {
			let imgStyle = { objectFit: 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit' : 'unset'}; // меняем стиль картинки при возникновении картинки с указанием отсутствия изображения
			}		
			return ( // в приеме ПОДЪЕМА СОСТОЯНИЯ, из родительского компонента App, получаем /props/ метода /onCharacterSelected()/ по каждому элементу /item/ персонажа с персональным /ID/, т.е по клику получаем id
				<li	className="char__item"
					key = {item.id} // данный ID получаем из компонента MarvelService из метода _transformCharacter()
					onClick={() => this.props.onCharacterSelected(item.id)}> 
					<img src={item.thumbnail} alt={item.name} style={imgStyle}/>
					<div className="char__name">{item.name}</div>
				</li>
			)
		});
		return ( // А эта конструкция вынесена для центровки спиннера/ошибки
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	render () {
		const {characterList, loading, error, offset, newItemLoading} = this.state;
		const items = this.renderItems(characterList);
		const errorMessageImg = error ? <ErrorMessageImg/> : null;
		const spinner = loading ? <Spinner/> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{errorMessageImg}
				{spinner}
				{content}
				{/* <ul className="char__grid">
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item char__item_selected">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss"/>
						<div className="char__name">Abyss</div>
					</li>
				</ul> */}
				<button 
					className="button button__main button__long"
					disabled={newItemLoading}
					onClick={() => this.onRequest(offset)}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;