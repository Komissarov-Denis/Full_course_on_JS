// Пример работы Props в конструкторах классов (class):
// 1. у компонента может быть внутреннее состояние, которое динамически меняется;
// 2. оно может быть как у классовых, так и функциональных компонентов;
// 3. состояние State напрямую менять нельзя, только через метод setState();
// 4. setState() и вообще изменение State - это асинхронная операция, если нам нужна точность или последовательность данных, то мы должны передавать коллбэк функцию;
// 5. в методе setState() мы можем менять только те свойства объекта, состояние которых нам необходимы, остальные останутся без изменения.

//-------------------------------------------------------------------------------------------------------

import { Component } from 'react'; // импортируем Component из React
import './App.css';

class WhoAmI extends Component { // передаем Component в class компонент WhoAmI, когда классовый компонент вызывается, он создает свой экземпляр
	constructor(props) { // чтобы в экземпляры классов передать пропсы, нужно применить конструктор constructor(props), ошибка "no useless constructor" EsLint!!!
		super(props); // для того чтобы использовать пропсы (props), применим ключевое слово super(), в которое передает (props)
	} // т.е. возможность работать с (props), к нам приходит из React компонента, от которого наследует компонент WhoAmI, теперь внутри каждого потомка класса/экземпляра будет this.props c объектом, который будет содержать передаваемые данные
	render() {
		const {name, surname, link} = this.props; // объект, с передаваемыми данными
		return ( // но получаем уведомление "no useless constructor" EsLint !!!
			<div>
				<h1>My name is {name}, surname - {surname}</h1>
				<a href={link}>My profile</a>
			</div>
		);
	}
}

function App () {
	return ( // тут находятся классовые экземпляры (props)
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

//-------------------------------------------------------------------------------------------------------
// Но, запись также равнозначна, без супер конструктора, так как значения наследуются от компонента, при этом ошибка "no useless constructor" EsLint исчезнет

import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {

	render() {
		const {name, surname, link} = this.props;
		return (
			<div>
				<h1>My name is {name}, surname - {surname}</h1>
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

//-------------------------------------------------------------------------------------------------------
// Динамическая замена данных внутри компонентов.
// Props существуют только для чтения, мы не можем их менять!!! 
// State - это понятие состояния объекта, которое и можно менять динамически в компоненте!!!

import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = { // задаем состояние, в котором формируем объект для динамической замены
			years: 27 // теперь мы можем хранить состояние объекта в этом компоненте
		}
	}
	render() {
		const {name, surname, link} = this.props;
		return ( // в this.state.years передаем величину 27
			<div>
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

// Получил:
// My name is John, surname - Smith, age - 27
// My profile
// My name is Alex, surname - Shepard, age - 27
// My profile


//-------------------------------------------------------------------------------------------------------

import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27 // теперь мы можем хранить состояние объекта в этом компоненте
		}
	}

	nextYear = () => { // создаем метод nextYear, который мы передаем во внутрь класса WhoAmI, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
		console.log('+++');
		this.setState({  // команда или метод setState() позволяет корректно изменить состояние, так как в качестве аргумента принимает в себя объект с новым состоянием!!!
			years: this.state.years + 1 // только данная запись позволяет без ошибок в реакте выполнять изменения динамического состояния внутри компонента, префиксная/постфиксная записи "++this.state.years"/"this.state.years++" дает ошибку!!!
		}) // при запуске команды setState() выполняется перерисовка всего компонента, благодаря методу render(), с новым состоянием
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса WhoAmI, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		return ( // создаем событие onClick по клику на кнопку button через наименование метода {this.nextYear}, не сам метод /аналог addEventListener()/
			<div> 
				<button onClick={this.nextYear}>+++</button> 
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

//-------------------------------------------------------------------------------------------------------
// так как setState() работает асинхронно, может случиться так, что предыдущее состояние еще не обновилось, а мы его опять обновляем (например: может сбиться счетчик),
// потому, что реакт может переопределить приоритет выполнения другому процессу при сложном процессе в связи с оптимизацией работы...
// чтобы от этого избавиться: передаем в setState() коллбэк функцию, которая сообщит реакту, что только когда предыдущий State() будет готов, данная функция начнет свое выполнение!!!

import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27 // теперь мы можем хранить состояние объекта в этом компоненте
		}
	}

	nextYear = () => { // метод, который мы передаем во внутрь класса WhoAmI, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
		console.log('+++');
		this.setState(state => ({  // в setState передается аргумент state, текущее состояние объекта /this.state = {years: 27}/, при этом запись ({}) заменяет ключевое слово return()
			years: state.years + 1 // данная запись стрелочной коллбэк функции с аргументом state сообщает: верни пожалуйста измененный объект
		})) 
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса WhoAmI, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		return (
			<div> 
				<button onClick={this.nextYear}>+++</button>  
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

//-------------------------------------------------------------------------------------------------------
// this.state = {} может содержать несколько свойств

import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27, // теперь мы можем хранить состояние объекта в этом компоненте, свойств может быть несколько
			text: '+++' // передаем текст в <button onClick={this.nextYear}>{this.state.text}</button>
		}
	}

	nextYear = () => { // метод, который мы передаем во внутрь класса WhoAmI, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
		console.log('+++');
		this.setState(state => ({  
			years: state.years + 1 // данная запись стрелочной коллбэк функции с аргументом state сообщает: верни пожалуйста измененный объект
		})) 
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса WhoAmI, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
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

//-------------------------------------------------------------------------------------------------------