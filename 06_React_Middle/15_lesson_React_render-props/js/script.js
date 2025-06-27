import React, { Component } from 'react';
//---------------------------------------------------------RENDER-PROPS - как props можно передать функцию
const Massage = (props) => {
	return (
		<h2>The counter is {props.counter}</h2>
	)
}  // это может быть совершенно независимый компонент
//---------------------------------------------------------------

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
			<Counter renderProps={counter => ( // RENDER-PROPS - как props можно передать функцию renderProps с аргументом counter и возвращаем компонент <Massage/>
				<Massage counter={counter}/>
			)}/>
		</Wrapper>
	);
}
export default App;