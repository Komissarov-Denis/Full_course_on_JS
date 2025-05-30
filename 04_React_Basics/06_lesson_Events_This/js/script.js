// Для того, чтобы назначить обработчик события в React, его нужно прописать в формате CamelCase /onClick/ !!!
// В React не применяется addEventListener(), так как React всё это сам делает, мы просто компоненту или элементу назначаем событие!!!
// Для отмены стандартного поведения браузера применяем только event.prevent.default(), другие методы работать не будут!!!
// С обработчиками события в React сложнее, когда событие срабатывает, контекст вызова теряется, так как функция вызывается внутри другого метода/функции - потому this становится  undefined!!!

// Три способа преодолеть данную проблему с контекстом вызова:
//-------------------------------------------------------------------------------------------------------
// 1. способ: классически вариант - через конструкцию bind() в конструкторе => this.nextYear = this.nextYear.bind(this);
// this.nextYear - обычное свойства экземпляра класса WhoAmI, который уже был создан
// this.nextYear = this.nextYear.bind(this) - мы обращается к методу в классе WhoAmI (this.nextYear) и мы его привязываем (bind) к конкретному экземпляру класса WhoAmI
// НЕУДОБСТВО В ТОМ, ЧТО КАЖДЫЙ ДОПОЛНИТЕЛЬНЫЙ МЕТОД ПРИДЁТСЯ БАЙНДИТЬ/ПРИВЯЗЫВАТЬ В КОНСТРУКТОРЕ!!!

import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27, // теперь мы можем хранить состояние объекта в этом компоненте, свойств может быть несколько
			text: '+++',
			position: '', // первоначально, передаем пустую строку в обработчик события commitInputChanges, position - должность
		}
		this.nextYear = this.nextYear.bind(this); // конструкция bind()!!!
	}

	nextYear() { // метод, который мы передаем во внутрь класса WhoAmI, в данном случае работает не стрелочная функция в связи с (bind)!!!
		console.log('+++');
		this.setState(state => ({  
			years: state.years + 1 // данная запись стрелочной коллбэк функции с аргументом state сообщает: верни пожалуйста измененный объект
		})) 
	}

	commitInputChanges = (e) => { // этот метод формируем внутри класса WhoAmI
		console.log(e.target.value); // передаваемые значения в обработчик события commitInputChanges через объект события (e.target.value) передается в консоль, эти значения можно сразу использовать в State
		this.setState({ // в данном случае нас не волнует, что было в State до этого, поэтому мы можем не применять коллбэк функцию, а напрямую можно передавать сюда объект
			position: e.target.value // КОГДА МЫ ПЕРЕДАЕМ МЕТОД В ОБРАБОТЧИК СОБЫТИЯ, МЫ ВСЕГДА ПРОПИСЫВАЕМ КОНТЕКСТ ВЫЗОВА THIS ДЛЯ УКАЗАНИЯ ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА, ТОЖЕ САМОЕ ПРИМЕНЯЕТСЯ И ДЛЯ PROPS И STATE
		})
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса WhoAmI, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		const {position, years} = this.state; // для оптимизации, выводит из объекта state обе динамически меняемые переменные position и years
		console.log(this); // тут наглядно можно увидеть свойства ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА
		return ( // при запуске изменения setState() мы меняем только годы при нажатии на кнопку, поэтому в {this.state.text} ничего не поменяется
			<div> 
				<button onClick={this.nextYear}>{this.state.text}</button>  
				<h1>My name is {name}, surname - {surname}, age - {years}, position - {position}</h1>
				<a href={link}>My profile</a>
				<form>
					<span>Введите должность</span>
					<input type="text" onChange={this.commitInputChanges}/> 
				</form>
			</div>
		); // создаем форму с событием onInput/onChange, работают одинаково, но onChange чаще используется в React, передаем наименование метода {this.commitInputChanges} в поле input 
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
// 2. способ: (экспериментальный способ) применение синтаксиса полей классов и стрелочных функций - самый удобный!!! 


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

	nextYear = () => { // метод, который мы передаем во внутрь класса WhoAmI, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
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
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса WhoAmI, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		const {position, years} = this.state;
		console.log(this); // тут наглядно можно увидеть свойства ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА
		return ( // при запуске изменения setState() мы меняем только годы при нажатии на кнопку, поэтому в {this.state.text} ничего не поменяется
			<div> 
				<button onClick={this.nextYear}>{this.state.text}</button>  
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

//-------------------------------------------------------------------------------------------------------
// 3. способ: вызвать событие через анонимную стрелочную функцию, например в конструкции: <button onClick={() => this.nextYear()}>{this.state.text}</button>  
// по onClick запустится анонимная стрелочная функция: () => this.nextYear(), внутри будет запущен метод this.nextYear(), затем this укажет новый экземпляр класса WhoAmI
// ПРОБЛЕМА - когда будет создаваться компонент WhoAmI, то также будет создаваться новый коллбэк: () => this.nextYear()


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

	render() { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

//-------------------------------------------------------------------------------------------------------
// <input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/> - данная конструкция по третьему способу позволит передавать дополнительный аргумент через анонимную стрелочную функцию


import { Component } from 'react';
import './App.css';

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27, // теперь мы можем хранить состояние объекта в этом компоненте, свойств может быть несколько
			text: '+++',
			position: '', // position (должность), передаем пустую строку в обработчик события commitInputChanges
		}
	}

	nextYear = () => { // метод, который мы передаем во внутрь класса, в данном случае работает только стрелочная функция в связи с контекстом вызова внутри реакт компонента
		console.log('+++');
		this.setState(state => ({  
			years: state.years + 1 // данная запись стрелочной коллбэк функции с аргументом state сообщает: верни пожалуйста измененный объект
		})) 
	}

	commitInputChanges = (e, color) => {
		console.log(color); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		console.log(e.target.value); // передаваемые значения в обработчик события commitInputChanges через объект события (e.target.value) передается в консоль, эти значения можно сразу использовать в State
		this.setState({ // нас не волнует, что было в State до этого, поэтому мы можем не применять коллбэк функцию, а напрямую можно передавать сюда объект
			position: e.target.value // КОГДА МЫ ПЕРЕДАЕМ МЕТОД В ОБРАБОТЧИК СОБЫТИЯ, МЫ ВСЕГДА ПРОПИСЫВАЕМ КОНТЕКСТ ВЫЗОВА THIS ДЛЯ УКАЗАНИЯ ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА, ТОЖЕ САМОЕ ПРИМЕНЯЕТСЯ И ДЛЯ PROPS И STATE
		})
	}

	render() {
		const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
		const {position, years} = this.state;
		console.log(this); // тут наглядно можно увидеть свойства ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА
		return ( // при запуске изменения setState() мы меняем только годы при нажатии на кнопку, поэтому в {this.state.text} ничего не поменяется !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			<div> 
				<button onClick={this.nextYear}>{this.state.text}</button>  
				<h1>My name is {name}, surname - {surname}, age - {years}, position - {position}</h1>
				<a href={link}>My profile</a>
				<form>
					<span>Введите должность</span>
					<input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/>
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

//-------------------------------------------------------------------------------------------------------