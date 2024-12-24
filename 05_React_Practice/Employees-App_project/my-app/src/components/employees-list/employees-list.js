import EmployeesListItem from "../employees-list-item/employees-list-item";

import './employees-list.css';

const EmployeesList = ({data, onDelete, onAdd, onToggleProp}) => { // прописываем пропсы в данный взаимосвязанный компонент, т.е. передаем глубже / заменил ({data, onDelete, onAdd, onToggleIncrease, onToggleRise}) на ({data, onDelete, onAdd, onToggleProp}) для оптимизации /

	const elements = data.map(item => { // прописываем коллбэк внутри метода перебора data массива map() - возвращает новый измененный массив данных после перебора текущего массива
		const {id, ...itemProps} = item; // принцип частичной деструктуризации, так как item - это все тот же объект, вытаскиваем одну переменную id, все остальные элементы объединяются в (...itemProps), далее в виде props передаем в <EmployeesListItem/>, при введении новых элементов в список, весь список не будет рендериться - это оптимизирует работу ПО
		return (
			// <EmployeesListItem name={item.name} salary={item.salary}/> далее через SPREAD оператор формируем тоже самое в {...itemProps}!!!
			//=>=>=>=>=>=>
			<EmployeesListItem // добавляем ключевые свойства {id} и {...itemProps} в item для корректной оптимизации при рендеринге, чтобы при изменении списка не перерисовывался весь полностью 
				key={id} // вытаскиваем одну переменную id
				{...itemProps} // все остальные элементы объединяются в (...itemProps)
				onDelete = {() => onDelete(id)} // действие, вызываемое пользователем при нажатие на корзинку
				onAdd = {() => onAdd(id)}
				// onToggleIncrease = {() => onToggleIncrease(id)} // передаем глубже пропсы в EmployeesListItem с запуском внутри коллбэка соответствующих методов по ID 
				// onToggleRise = {() => onToggleRise(id)} // передаем глубже пропсы в EmployeesListItem с запуском внутри коллбэка соответствующих методов по ID 
				//=>=>=>=>=>=>
				onToggleProp = {(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))} // заменил методы onToggleIncrease и onToggleRise на оптимизированный метод, чтобы оптимизация выполнилась - применим дата-аттрибуты 'date-toggle' на строках, на которых происходят события onClick()
			/> // применим (e) объект события по onClick() по текущему целевому объекту с конкретным аттрибутом ('date-toggle') из списка rise и increase
		)
	})

	return ( // передаем elements для корректного рендеринга изменяющегося массива данных data
		<ul className="app-list list-group">
			{elements}
		</ul>
	);
}
export default EmployeesList;