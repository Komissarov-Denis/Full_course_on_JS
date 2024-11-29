import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component{

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			salary: '',
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

		const {name, salary} = this.state;

		return ( // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			<div className="app-add-form">
				<h3>Добавьте нового сотрудника</h3>
				<form
					className="add-form d-flex">
	
					<input type="text"
						className="form-control new-post-label"
						placeholder="Как его зовут?"
						name="name" // name совпадает с ключевым свойством в конструкторе this.state{name: ''}
						value={name} // запись указывает на управляемый элемент => если в value указан тот же ключ, что и в state, то в value записывается актуальное значение компонента/элемента, т.е. значение value формы input будет контролироваться React, а элемент называться управляемым
						onChange={this.onValueChangeName} // создаем событие с вызовом метода
					/>
	
					<input type="number"
						className="form-control new-post-label"
						placeholder="З/П в $?"
						salary="salary" // salary совпадает с ключевым свойством в конструкторе this.state{salary: 0}
						value={salary} // запись указывает на управляемый элемент => если в value указан тот же ключ, что и в state, то в value записывается актуальное значение компонента/элемента, т.е. значение value формы input будет контролироваться React, а элемент называться управляемым
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