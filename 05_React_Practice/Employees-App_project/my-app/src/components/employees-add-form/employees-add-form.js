import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component{

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			salary: 0,
		}
	}

	onValueChangeName = (e) => { // создаем метод onValueChange с передачей ему в качестве аргумента события (е) изменения состояний name
		this.setState({ // так как предыдущее состояние не влияет на текущее, применим обычный объект в setState()!!! (но можно и коллбэк применить)
			name: e.target.value // e.target.value - это значение input, которое было передано в данное поле при вводе, передается в this.state{name: ''}
		})
	}

	onValueChangeSalary = (e) => { // создаем метод onValueChange с передачей ему в качестве аргумента события (е) изменения состояний salary
		this.setState({ // так как предыдущее состояние не влияет на текущее, применим обычный объект в setState()!!! (но можно и коллбэк применить)
			salary: e.target.value // e.target.value - это значение input, которое было передано в данное поле при вводе, передается в this.state{salary: 0}
		})
	}

	render () {
		return (
			<div className="app-add-form">
				<h3>Добавьте нового сотрудника</h3>
				<form
					className="add-form d-flex">
	
					<input type="text"
						className="form-control new-post-label"
						placeholder="Как его зовут?"
						name="name" // ключевое свойство name совпадает с this.state{name: ''} в конструкторе
						onChange={this.onValueChangeName} // создаем событие с вызовом метода
					/>
	
					<input type="number"
						className="form-control new-post-label"
						placeholder="З/П в $?"
						salary="salary" // ключевое свойство salary совпадает с this.state{salary: 0} в конструкторе
						onChange={this.onValueChangeSalary} // создаем событие с вызовом метода
					/>
	
					<button type="submit"
						className="btn btn-outline-light">
							Добавить
					</button>
				</form>
			</div>
	
		);
	}
}
export default EmployeesAddForm;