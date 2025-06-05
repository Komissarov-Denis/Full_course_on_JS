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