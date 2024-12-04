// import { Component } from 'react'; // импортируем Component из React => // данный компонент уже не нужен, так как ранее предполагалось отслеживать их выполнение на локальном уровне, но теперь есть глобальные onToggleRise и onToggleIncrease

import './employees-list-item.css';
// import { render } from '@testing-library/react';

// class EmployeesListItem extends Component { //  = ({name, salary, increase, rise}), class EmployeesListItem наследуем из Component React => 
// данный компонент уже не нужен, так как ранее предполагалось отслеживать их выполнение на локальном уровне, но теперь есть глобальные onToggleRise и onToggleIncrease, меняем компонент на стрелочную функцию с пропсами
	// constructor(props) {
	// 	super(props);
	// 	this.state = { // создаем состояние объекта state
	// 		increase: false, // передаем текущее значение false (не получает премию), это значение формирует предыдущее состояние, влияющее на будущее (если работник стал получать премию)
	// 		rise: false,
	// 	}
	// } // данный конструктор уже не нужен, так как ранее предполагалось отслеживать их выполнение на локальном уровне, но теперь есть глобальные onToggleRise и onToggleIncrease

	// onIncrease = () => { // формируем метод onIncrease, он зависит от предыдущего состояния (не получал премию), если стал получать, то необходимо применить коллбэк функцию
	// 	this.setState(({increase}) => ({ // это снова принцип деструктуризации с коллбэком
	// 		increase: !increase // данным способом просто меняем значение ключевого свойства объекта на обратное (false на true) при нажатии на печеньку/кнопку
	// 	}))
	// } // два этих метода уже не нужны, так как ранее предполагалось отслеживать их выполнение на локальном уровне, но теперь есть глобальные onToggleIncrease

	// onRise = () => {
	// 	this.setState(({rise}) => ({
	// 		rise: !rise
	// 	}))
	// } // два этих метода уже не нужны, так как ранее предполагалось отслеживать их выполнение на локальном уровне, но теперь есть глобальные onToggleRise

	// render() {  
	// 	const {name, salary, onDelete, onToggleIncrease, onToggleRise} = this.props; // не зависят от предыдущего состояния класса EmployeesListItem, onDelete - функции, переданные по иерархии из list в List-item
	// 	const {increase, rise} = this.state; // зависят от предыдущего состояния класса EmployeesListItem

	// 	let classNames = "list-group-item d-flex justify-content-between";

	// 	if (increase) { // условие сравнивает наличие значения increase: true => 1
	// 		classNames += " increase"; // соответственно добавляет с пробелом класс " increase" в группу классов "list-group-item d-flex justify-content-between"
	// 	};

	// 	if (rise) {
	// 		classNames += " like";
	// 	};

	// 	return ( // на кнопку button/btn-cookie btn-sm/ назначаем обработчик onClick={this.onIncrease} с вызовом метода {this.onIncrease}, на /btn-trash btn-sm / назначаем onClick={onDelete}
	// 		<li className={classNames}>
	// 			<span 
	// 				className="list-group-item-label"
	// 				// onClick={this.onRise} // так как мы вытащили из пропсов новые методы, то меняем текущие на onToggleRise соответственно
	// 				onClick={onToggleRise}
	// 				>{name}
	// 			</span>

	// 			<input
	// 				type="text" 
	// 				className="list-group-item-input"
	// 				defaultValue={salary + '$'}
	// 			/>

	// 			<div className='d-flex justify-content-center align-items-center'>
	// 				<button
	// 					type="button"
	// 					className="btn-cookie btn-sm "
	// 					// onClick={this.onIncrease} // так как мы вытащили из пропсов новые методы, то меняем текущие на onToggleIncrease соответственно
	// 					onClick={onToggleIncrease}
	// 					><i className="fas fa-cookie"></i>
	// 				</button>

	// 				<button
	// 					type="button"
	// 					className="btn-trash btn-sm "
	// 					onClick={onDelete}
	// 					><i className="fas fa-trash"></i>
	// 				</button>
	// 				<i className="fas fa-star"></i>
	// 			</div>
	// 		</li>
	// 	);
	// }// данный render() уже не нужен, так как ранее предполагалось отслеживать их выполнение на локальном уровне, но теперь есть глобальные onToggleRise и onToggleIncrease, меняем компонент

const EmployeesListItem = (props) => {  
	const {name, salary, onDelete, onToggleIncrease, onToggleRise, increase, rise} = props; // не зависят от предыдущего состояния класса EmployeesListItem, onDelete - функции, переданные по иерархии из list в List-item
	
	let classNames = "list-group-item d-flex justify-content-between";

	if (increase) { // условие сравнивает наличие значения increase: true => 1
		classNames += " increase"; // соответственно добавляет с пробелом класс " increase" в группу классов "list-group-item d-flex justify-content-between"
	};

	if (rise) {
		classNames += " like";
	};

	return ( // на кнопку button/btn-cookie btn-sm/ назначаем обработчик onClick={this.onIncrease} с вызовом метода {this.onIncrease}, на /btn-trash btn-sm / назначаем onClick={onDelete}
		<li className={classNames}>
			<span 
				className="list-group-item-label"
				// onClick={this.onRise} // так как мы вытащили из пропсов новые методы, то меняем текущие на onToggleRise соответственно
				onClick={onToggleRise}
				>{name}
			</span>

			<input
				type="text" 
				className="list-group-item-input"
				defaultValue={salary + '$'}
			/>

			<div className='d-flex justify-content-center align-items-center'>
				<button
					type="button"
					className="btn-cookie btn-sm "
					// onClick={this.onIncrease} // так как мы вытащили из пропсов новые методы, то меняем текущие на onToggleIncrease соответственно
					onClick={onToggleIncrease}
					><i className="fas fa-cookie"></i>
				</button>

				<button
					type="button"
					className="btn-trash btn-sm "
					onClick={onDelete}
					><i className="fas fa-trash"></i>
				</button>
				<i className="fas fa-star"></i>
			</div>
		</li>
	);
}
export default EmployeesListItem;