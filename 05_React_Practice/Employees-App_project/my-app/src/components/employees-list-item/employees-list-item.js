import { Component } from 'react'; // импортируем Component из React
import './employees-list-item.css';
// import { render } from '@testing-library/react';

class EmployeesListItem extends Component { //  = ({name, salary, increase}), class EmployeesListItem наследуем из Component React

	constructor(props) {
		super(props);
		this.state = { // создаем состояние объекта state
			increase: false, // передаем текущее значение false (не получает премию), это значение формирует предыдущее состояние, влияющее на будущее (если работник стал получать премию)
		}
	}

	onIncrease = () => { // формируем метод onIncrease, он зависит от предыдущего состояния (не получал премию), если стал получать, то необходимо применить коллбэк функцию
		this.setState(({increase}) => ({ // это снова принцип деструктуризации с коллбэком
			increase: !increase // данным способом просто меняем значение ключевого свойства объекта на обратное (false на true) при нажатии на печеньку/кнопку
		}))
	}

	render() {  
		const {name, salary} = this.props; // не зависят от предыдущего состояния класса EmployeesListItem
		const {increase} = this.state; // зависят от предыдущего состояния класса EmployeesListItem

		let classNames = "list-group-item d-flex justify-content-between";
		if (increase) { // условие сравнивает наличие значения increase: true => 1
			classNames += " increase"; // соответственно добавляет с пробелом класс "increase" в группу классов "list-group-item d-flex justify-content-between"
		};

		return ( // на кнопку button назначаем обработчик onClick={this.onIncrease} с вызовом метода {this.onIncrease}
			<li className={classNames}>
				<span className="list-group-item-label">{name}</span>

				<input
					type="text" 
					className="list-group-item-input"
					defaultValue={salary + '$'}
				/>

				<div className='d-flex justify-content-center align-items-center'>
					<button
						type="button"
						className="btn-cookie btn-sm "
						onClick={this.onIncrease}>
						<i className="fas fa-cookie"></i>
					</button>

					<button
						type="button"
						className="btn-trash btn-sm ">
						<i className="fas fa-trash"></i>
					</button>
					<i className="fas fa-star"></i>
				</div>
			</li>
		);
	}
}
export default EmployeesListItem;