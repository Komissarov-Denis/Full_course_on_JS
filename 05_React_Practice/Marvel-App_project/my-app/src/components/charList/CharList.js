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
		loading: true,
		error: false,
	}

	marvelService = new MarvelService();

	componentDidMount () {
		this.marvelService.getAllCharacters()
			.then(this.onCharacterListLoaded)
			.catch(this.onError)

		// this.foo.bar = 0; // вносим для проверки ErrorBoundary несуществующее свойство
	}

	onCharacterListLoaded = (characterList) => {
		this.setState({
			characterList,
			loading: false,
		})
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
		const {characterList, loading, error} = this.state;
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
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;