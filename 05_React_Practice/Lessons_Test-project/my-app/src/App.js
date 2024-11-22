// import React from 'react';
// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27, // теперь мы можем хранить состояние объекта в этом компоненте, свойств может быть несколько
			text: '+++'
		}
	}

	nextYear = () => { // метод, который мы передаем во внутрь класса, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
		console.log('+++');
		this.setState(state => ({  
			years: state.years + 1 // данная запись стрелочной коллбэк функции с аргументом state сообщает: верни пожалуйста измененный объект
		})) 
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		return ( // при запуске изменения setState() мы меняем только годы при нажатии на кнопку, поэтому в {this.state.text} ничего не поменяется
			<div> 
				<button onClick={this.nextYear}>{this.state.text}</button>  
				<h1>My name is {name}, surname - {surname}, age - {this.state.years}</h1>
				<a href={link}>My profile</a>
			</div>
		);
	}
}

function App () {
	return (
		<div className="App">
			<WhoAmI
				name = "John"
				surname = "Smith"
				link = "facebook.com"
			/>
			<WhoAmI
				name = "Alex"
				surname = "Shepard"
				link = "vk.com"
			/>
		</div>
	);
}
export default App;