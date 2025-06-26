// ErrorBoundary - рукотворный прием отлавливания ошибок - это компонент "ПРЕДОХРАНИТЕЛЬ" и является классовым компонентом, который оборачивает в себя другие системно-важные компоненты и отлавливает ошибки в них и дочерних компонентах, при этом всё приложение не "падает", а только текущий компонент
// ОГРАНИЧЕНИЯ: предохранители ловят не все ошибки так как это физически не возможно, они ловят ошибки только метода render(), в методах жизненного цикла и в конструкторах дочерних компонентов
//              не ловят ошибки внутри обработчиков событий, так как они могут возникать вне метода render() и мы не знаем когда обработчик сработает
//              не ловят ошибки внутри в асинхронном коде и сетевых запросах, так как мы не знаем когда код сработает
//              не ловят ошибки внутри самого предохранителя, ловит только в дочерних компонентах, которыми он обёрнут

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
import { Component } from "react";
import { ErrorMessageImg } from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {

	state = { // это основной и единственный state, у которого изначально нет ошибки error в false
		error: false,
	}  
    
    ErrorMessageImg = () => {
	return (
		// <img src={process.env.PUBLIC_URL + '/my-app/public/error.gif'} /> - конструкция работы с файлами из папки public
		<img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt='Error!'/>
	)
}

	// static getDerivedStateFromError(error) { // данный метод возвращает объект error в состоянии true, т.е. это такой setState, который работает только с ошибкой, он обновляет только состояние
	// 	return {error: true}; // что использовать по ситуации - нужно решать самому, или getDerivedStateFromError(error), или componentDidCatch(error, errorInfo) - работают одинаково, если не нарушать правило применения
	// }

	componentDidCatch(error, errorInfo) { // ХУК отлова ошибок с двумя аргументами error - сама ошибка, errorInfo - информация о том компоненте, в котором произошла ошибка
		console.log(error, errorInfo); // СЕЙЧАС ПРИМЕНЯЮТСЯ ERROR BOUNDARIES!!!
		this.setState({
			error: true
		})
	}

	render () { // предохранитель является оборачивающим компонентом, в который оборачивается в случае поломки текущий компонент
		if (this.state.error) { // если состояние объекта error в true, то отрендерим запасной UI - User Interface, если компонент полностью отвалился =>
			return <ErrorMessageImg/>
		}

		return this.props.children; // 
	}    

}

export default ErrorBoundary; // =>

// =>
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

	state = { // !!!для CharList и CharInfo применим прием ПОДЪЕМА СОСТОЯНИЯ, так как оба компонента находятся в одном родительском компоненте App и обмен данными пойдет через него!!!
		selectedCharacter: null, // так как пока мы не выбрали ни одного персонажа, то выставим его состояние в "нуль"
	}

	onCharacterSelected = (id) => { // данный метод будет изменять состояние выбранного персонажа в приеме ПОДЪЕМА СОСТОЯНИЯ
		this.setState({ // передаем идентификатор выбранному персонажу и заполняем поле selectedCharacter в объекте state,
			selectedCharacter: id, // т.е. формируем ШАБЛОН: создаем в state новое свойство selectedCharacter, для установления его значения - формируем метод onCharacterSelected() и передаем значение через аргумент id
		})
	} // и данный метод /onCharacterSelected()/ передадим в метод /render()/ в компонент /CharList/ как props = onCharacterSelected и его одноименную функцию {this.onCharacterSelected} =>

    render () { // в приеме ПОДЪЕМА СОСТОЯНИЯ, в компонент /CharInfo/ будем передавать ID персонажа по characterId={this.state.selectedCharacter} => т.е. из /CharList/ приходит /ID/, значения устанавливаются в state в поле selectedCharacter и передается /CharInfo/
	    return (
			<div className="app">
				<AppHeader/>
				<main>
					<ErrorBoundary>
						<RandomChar/>
					</ErrorBoundary>					
					<div className="char__content">
						<ErrorBoundary>
							<CharList onCharacterSelected={this.onCharacterSelected}/>
						</ErrorBoundary>						
						<ErrorBoundary>
							<CharInfo characterId={this.state.selectedCharacter}/>							
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision"/>
				</main>
			</div>
		)
	}

}

export default App;
