import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import { ErrorMessageImg } from '../errorMessage/ErrorMessage';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

	constructor(props) { // используем конструктор для вызова метода updateCharacter()
		super(props); // теперь конструктор не нужен при применении ХУКОВ: componentDidMount(), componentDidUpdate() и componentWillUnmount()
		console.log('CharList constructor started');
	}

	state = { // у компонента прописываем индивидуальное состояние
		characterList: [], // тут действительно пустой массив Array(0)
		loading: true, // тут загрузка первоначальная в принципе должна быть в true, так как при загрузке приложения происходит подгрузка данных персонажей
		error: false, // состояние наличия ошибки, первоначально оно в false, но при наличии - будет переключаться в true
		newCharactersOnClickLoading: false, // тут загрузка повторная и должна быть в false, так как вызывается вручную по клику на кнопку newCharactersOnClickLoading
		offset: 210, // данное состояние передаем в метод onCharacterListLoaded() для изменения состояние путем наращивания по клику на кнопку, число может быть любое
		characterListEnded: false, // данное состояние указывает на окончание списка персонажей, первоначально оно в false, но по окончании списка будет переключаться в true
	}
	
	marvelService = new MarvelService(); // применим СИНТАКСИС ПОЛЕЙ КЛАССОВ и создадим в переменной marvelService новый экземпляр или нового потомка класса MarvelService() внутри класса RandomChar

	componentDidMount () { // в момент создания компонента первый раз, запускается метод onRequest() без аргумента, т.е. offset = null =>
		this.onRequest(); // при первом запуске состояние this.onCharacterListLoading(), а именно setState({newCharactersOnClickLoading: false,}) переключится в true
		console.log('CharList mounted + onRequest');
		// this.foo.bar = 0; // вносим для проверки ErrorBoundary несуществующее свойство
	}
	//=>
	onRequest = (offset) => { // далее уходит запрос к серверу и в offset ничего не передается, а это значит что из модуля MarvelService() будет подставлен базовый отступ offset = this._apiBaseOffset = 210 =>
 		this.onCharacterListLoading(); // при первом запуске данного метода, состояние объекта setState({newCharactersOnClickLoading}) переключится в позицию true, это нормально, так как интерфейс не построен, но после первичной загрузки данных персонажей, нам нужно состояние объекта setState({newCharactersOnClickLoading}) перевести в false через метод onCharacterListLoaded() => {this.setState(({offset, characterList}) => ({loading: false,}))
		this.marvelService
			.getAllCharacters(offset) // но, при повторном изменении компонента, при клике на кнопку, в offset будет подставляться число, которое будет формировать новый запрос
			// .then(this.onFirstCharacterListLoaded)
			.then(this.onCharacterListLoaded) // при получении данных персонажей от сервера, запускаем onCharacterListLoaded(), который принимает как аргумент newCharacterList новые данные персонажей, из этих новых данных формируется characterList: [...characterList, ...newCharacterList], при первом запуске подразумевалось, что в characterList: [] - пустой массив, а будет только newCharacterList с новыми данными персонажей и оба массива будут объединяться
			.catch(this.onError)
	}

	onCharacterListLoading = () => { // метод процесса запуска подгрузки данных персонажей по клику на кнопку =>
		this.setState({
			newCharactersOnClickLoading: true, // по клику меняем состояние newCharactersOnClickLoading в true
		})
	}

	componentDidUpdate () { // ХУК этапа обновления компонента
		console.log('CharList updated');
	}

	componentWillUnmount () { // ХУК этапа демонтажа компонента по прохождению определенного интервала времени
		console.log('CharList unmounted');
	}	

	onCharacterListLoaded = (newCharacterList) => { // тут персонажи загрузились
		let characterListEnded = false; // переменная изначально в false
		if (newCharacterList.length < 9) { // если количество персонажей меньше 9, переключаем characterListEnded в true
			characterListEnded = true;
		}
		this.setState(({offset, characterList}) => ({ // деструктурируем объект, берем аргумент characterList, который изначально был в текущем state={characterList: []}, в начале это пустой массив и ни во что не разворачивается, потом 9 элементов, 18 элементов, 27 и т.д.
			characterList: [...characterList, ...newCharacterList], // данное состояние объекта будет формироваться из двух сущностей для подгрузки дополнительных персонажей по клику на кнопку, поэтому помещаем все в коллбэк функцию, для возвращения нового объекта из этой функции с новым состоянием, зависящем от предыдущего
			loading: false, // [...characterList, ...newCharacterList] разворачиваем старый массив и добавляем в него новые элементы, которые пришли от сервера в onRequest(offset) в .then(this.onCharacterListLoaded) уже с offset
			newCharactersOnClickLoading: false, // => отрабатывает после onRequest() и как только тут персонажи загрузились, newCharactersOnClickLoading переключаем в false
			offset: offset + 9, // состояние отступа offset будет прирастать по клику на кнопку: 210 + 9 = 219, 219 + 9 = 228 и т.д.
			characterListEnded: characterListEnded, // состояние переключается в true и помещается в setState()
		})) // [...characterList, ...newCharacterList] ???????? есть серьезная проблема, спред разворачивает дубль не 9, а 18 персонажей, удваивая их???? видимо это связано с REACT19 и изначально characterList: [] === newCharacterList [], видимо нужно перересовывать первые 9 персонажей на последующие
	}

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		})
	}

	renderItems (array) { // Этот метод создан для оптимизации, чтобы не помещать такую конструкцию в метод render
		const items = array.map((item) => { // метод перебора массива данных персонажей
			let imgStyle = { objectFit: 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
				imgStyle = {'objectFit' : 'unset'}; // меняем стиль картинки при возникновении картинки с указанием отсутствия изображения
			}		
			return ( // в приеме ПОДЪЕМА СОСТОЯНИЯ, из родительского компонента App, получаем /props/ метода /onCharacterSelected()/ по каждому элементу /item/ персонажа с персональным /ID/, т.е по клику получаем id
				<li
					className="char__item"
					key = {item.id} // данный ID получаем из компонента MarvelService из метода _transformCharacter() и применяем его как аттрибут key в <li>
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
		console.log('CharList rendered'); // тест этапа рендеринга
		const {characterList, loading, error, offset, newCharactersOnClickLoading, characterListEnded} = this.state;
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
					disabled={newCharactersOnClickLoading} // переводим кнопку в состояние деактивирована/недоступна, чтобы пользователь не натыкал на нее множествами кликов и не сломал приложение
					style={{'display' : characterListEnded ? 'none' : 'block'}} // по окончании списка персонажей создаем для кнопки условие, если достигнуто окончание списка - скрываем кнопку, иначе - продолжаем отображать
					onClick={() => this.onRequest(offset)}>
					<div className="inner">load more</div>
				</button>
			</div>
		) // onClick={() => this.onRequest(offset)} - использован стрелочный тип записи для передачи аргумента offset в onClick
	}
}

export default CharList;