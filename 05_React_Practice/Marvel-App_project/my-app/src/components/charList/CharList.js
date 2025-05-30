import { Component } from 'react';
import Spinner from '../spinner/Spinner.js';
import MarvelService from '../../services/MarvelService.js';
import { ErrorMessageImg } from '../errorMessage/ErrorMessage.js';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

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
				imgStyle = {'objectFit' : 'unset'};
			}		
			return (
				<li	className="char__item"
					key = {item.id}>	
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