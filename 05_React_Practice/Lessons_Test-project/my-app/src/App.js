import React, { Component } from 'react';
import BootstrapTest2 from './BootstrapTest2';

import styled from 'styled-components';
import './App.css';

const EmpItem = styled.div`
	padding: 20px;
	margin-bottom: 15px;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
	a {
		display: block;
		margin: 10px 0 10px 0;
		color: ${props => props.active ? 'red' : 'blue'}; 
	}
	input {		
		display: block;
		margin-top: 10px;
	}	
`;

const Header = styled.h2`
	font-size: 22px;
`;

export const Button = styled.button`
	display: block;
	padding: 5px 15px;
	background-color: gold;
	border-radius: 5px;
	border: 1px solid rgba(0, 0, 0, .2);
	box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
`;

class WhoAmI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			years: 27, // теперь мы можем хранить состояние объекта в этом компоненте, свойств может быть несколько
			text: '+++',
			position: '', // первоначально, передаем пустую строку в обработчик события commitInputChanges
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
			// ПРИМЕР применения ФРАГМЕНТА!!! скрывает не нужный <DIV> ПУСТОЙ ТЕГ ЯВЛЯЕТСЯ СОКРАЩЕННОЙ ВЕРСИЙ ФРАГМЕНТА БЕЗ ИМПОРТА
			<EmpItem active>
				<Button onClick={this.nextYear}>{this.state.text}</Button>  
				<Header>
					My name is {name}, 
					surname - {surname}, 
					age - {years}, 
					position - {position}</Header>
				<a href={link}>My profile</a>
				<form>
					<span>Введите должность</span>
					<input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/> 
				</form>
			</EmpItem>
		);
	}
}

const Wrapper = styled.div`
	width: 600px;
	margin: 80px auto 0 auto;
`;

//--------------------------------------------------------------
const DynamicGreatings = (props) => { // пример props.children
	return (
		<div className={'mb-3 p-3 border border-' + props.color}>
			{
				React.Children.map(props.children, child => {
					return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
				}) // всем наследуемым потомкам передаем через props общие одинаковые свойства, это очень оптимизирует работу
			}
		</div>
	)
}

//-------------------------------------------------------------
const HalloGreatings = () => { // пример композиции !!!
	return (
		<div style={{'width': '600px', 'margin': '0 auto'}}>
			<DynamicGreatings color={'primary'}>
				<h2>Hallo WIDE world</h2>
			</DynamicGreatings>
		</div>
	)
}

//---------------------------------------------------------RENDER-PROPS - как props можно передать функцию
const Massage = (props) => {
	return (
		<h2>The counter is {props.counter}</h2>
	)
} // это может быть совершенно независимый компонент

class Counter extends Component { // это может быть совершенно независимый компонент
	state = {
		counter: 0,
	}
	changeCounter = () => {
		this.setState(({counter}) => ({
			counter: counter + 1,
		}))
	}
	render() {
		return (
			<>
				<button
					className={'btn btn-primary'}
					onClick={this.changeCounter}>
					Click me
				</button>
				{this.props.renderProps(this.state.counter)} 
				{this.props.renderProps(this.state.counter)} 
			</>
		) // props из компонента Massage с запуском коллбэк функции renderProps из компонента Counter меняет состояние state счетчика counter
	}
}
//---------------------------------------------------------

function App () {
	return (
		<Wrapper>

			<DynamicGreatings color={'primary'}>
				<h2>This wheel was hard</h2>
				<h2>Hallo world</h2>
			</DynamicGreatings>

			<HalloGreatings/> 

			<Counter renderProps={counter => ( // RENDER-PROPS - как props можно передать функцию renderProps с аргументом counter и возвращаем компонент <Massage/>
				<Massage counter={counter}/>
			)}/>	

			<BootstrapTest2
				left = {					
					<DynamicGreatings color={'primary'}>
						<h2>This wheel was hard</h2>
						<h2>Hallo world</h2>
					</DynamicGreatings>
				}
				right = {					
					<DynamicGreatings color={'primary'}>
						<h2>RIGHT!</h2>
					</DynamicGreatings>
				}
			/>

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
		</Wrapper>
	);
}
export default App;