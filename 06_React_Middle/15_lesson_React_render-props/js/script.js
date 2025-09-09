import React, { Component } from 'react';

//---------------------------------------------------------RENDER-PROPS - в свойства компонента мы передаем значения, которые будут рендерить определенную структуру внутри компонента, а именно функцию.
const Massage = (props) => { // в качестве props в данный компонент можем передать функцию, которая будет запускаться внутри этого компонента и что-то делать (изменять счетчик) и рендерить структуру внутри верстки
	return (
		<h2>The counter is {props.counter}</h2>
	)
} // это может быть совершенно независимый компонент

class Counter extends Component { // это может быть совершенно независимый компонент
	state = { // добавим состояние с нулевым значением счетчика
		counter: 0,
	}
	changeCounter = () => { // метод увеличения счетчика
		this.setState(({counter}) => ({
			counter: counter + 1,
		}))
	}
	render() { // возвращаем структуру через реакт фрагмент, так как нет родительского компонента
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
		) // в компонент <Counter/>, при его вызове, передали в качестве props запуск коллбэк функции renderProps={counter => (<Massage counter={counter}/>)},
	} //  эта функция принимает в себя аргумент counter и возвращает другой компонент, т.е. тут мы четко указываем на <Massage counter={counter}/> с измененным
} // состоянием state счетчика counter. Можем и скопировать, и вместо <Massage/> передать <HalloGreatings/> и т.д. Далее заходим во внутрь компонента <Counter/> 
// и в нужном нам месте вызываем эту функцию через {this.props.renderProps(this.state.counter)}. Для того чтобы связать наше состояние state из <Counter/> с <App/>
// предаем аргумент (this.state.counter) с текущим состоянием, который затем передается в <Massage counter={counter}/> и используется для вывода сообщения
// <h2>The counter is {props.counter}</h2> на страницу.

//---------------------------------------------------------

function App () {
	return (
		<Wrapper>
			<Counter renderProps={counter => ( // RENDER-PROPS - как props можно передать функцию renderProps() с аргументом counter и возвращаем компонент <Massage/> с аргументом counter
				<Massage counter={counter}/>
			)}/>
		</Wrapper>
	);
}
export default App;