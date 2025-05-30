import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {

	state = { // !!!для CharList и CharInfo применим прием ПОДЪЕМА СОСТОЯНИЯ, так как оба компонента находятся в одном родительском компоненте App и обмен данными пойдет через него!!!
		selectedCharacter: null, // так как пока мы не выбрали ни одного персонажа, то выставим его состояние в "нуль"
	}

	onCharacterSelected = (id) => { // данный метод будет изменять состояние выбранного персонажа в приеме ПОДЪЕМА СОСТОЯНИЯ
		this.setState({
			selectedCharacter: id, // передаем идентификатор выбранному персонажу
		})
	} // и данный метод /onCharacterSelected()/ передадим в метод /render()/ в компонент /CharList/ как одноименную функцию по onCharacterSelected={this.onCharacterSelected} =>

    render () { // в приеме ПОДЪЕМА СОСТОЯНИЯ, в компонент /CharInfo/ будем передавать ID персонажа по characterId={this.state.selectedCharacter} => т.е. из /CharList/ приходит /ID/, устанавливается в state и передается /CharInfo/
	    return (
			<div className="app">
				<AppHeader/>
				<main>
					<RandomChar/>
					<div className="char__content">
						<CharList onCharacterSelected={this.onCharacterSelected}/> 
						<CharInfo characterId={this.state.selectedCharacter}/>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision"/>
				</main>
			</div>
		)
	}

}

export default App;