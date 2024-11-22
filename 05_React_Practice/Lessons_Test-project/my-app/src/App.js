// import React from 'react';
// import logo from './logo.svg';
import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27, // теперь мы можем хранить состояние объекта в этом компоненте, свойств может быть несколько
			text: '+++',
			position: '', // первоначально, передаем пустую строку в обработчик события commitInputChanges
		}
	}

	nextYear() { // метод, который мы передаем во внутрь класса, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
		console.log('+++');
		this.setState(state => ({  
			years: state.years + 1 // данная запись стрелочной коллбэк функции с аргументом state сообщает: верни пожалуйста измененный объект
		})) 
	}

	commitInputChanges = (e) => {
		console.log(e.target.value); // передаваемые значения в обработчик события commitInputChanges через объект события (e.target.value) передается в консоль, эти значения можно сразу использовать в State
		this.setState({ // нас не волнует, что было в State до этого, поэтому мы можем не применять коллбэк функцию, а напрямую можно передавать сюда объект
			position: e.target.value // КОГДА МЫ ПЕРЕДАЕМ МЕТОД В ОБРАБОТЧИК СОБЫТИЯ, МЫ ВСЕГДА ПРОПИСЫВАЕМ КОНТЕКСТ ВЫЗОВА THIS ДЛЯ УКАЗАНИЯ ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА, ТОЖЕ САМОЕ ПРИМЕНЯЕТСЯ И ДЛЯ PROPS И STATE
		})
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		const {position, years} = this.state;
		console.log(this); // тут наглядно можно увидеть свойства ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА
		return ( // при запуске изменения setState() мы меняем только годы при нажатии на кнопку, поэтому в {this.state.text} ничего не поменяется
			<div> 
				<button onClick={() => this.nextYear()}>{this.state.text}</button>  
				<h1>My name is {name}, surname - {surname}, age - {years}, position - {position}</h1>
				<a href={link}>My profile</a>
				<form>
					<span>Введите должность</span>
					<input type="text" onChange={this.commitInputChanges}/>
				</form>
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