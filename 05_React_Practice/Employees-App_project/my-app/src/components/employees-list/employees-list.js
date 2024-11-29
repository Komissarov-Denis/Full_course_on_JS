import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete}) => {

	const elements = data.map(item => { // прописываем коллбэк внутри метода перебора data массива map() - возвращает новые измененные данные после перебора массива
		const {id, ...itemProps} = item; // принцип частичной деструктуризации, так как item - это все тот же объект, вытаскиваем одну переменную id, все остальные элементы объединяются в (...itemProps), при введении новых элементов в список, весь список не будет рендериться - это оптимизирует работу ПО
		return (
			// <EmployeesListItem name={item.name} salary={item.salary}/> далее SPREAD оператор - это тоже самое!!!
			<EmployeesListItem 
				key={id} 
				{...itemProps}
				onDelete = {() => onDelete(id)} // действие, вызываемое пользователем при нажатие на корзинку
			/>
		)
	})

	return (
		<ul className="app-list list-group">
			{elements}
		</ul>
	);
}
export default EmployeesList;