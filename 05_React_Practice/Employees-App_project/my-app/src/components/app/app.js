import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {

	constructor(props) {
		super(props); 
		this.state = {
			data: [
				{
					name: 'John C.', 
					salary: 800,
					increase: false,
					id: 1,
				},
				{
					name: 'Alex M.', 
					salary: 3000,
					increase: false,
					id: 2,
				},
				{
					name: 'Carl W.', 
					salary: 5000,
					increase: false,
					id: 3,
				}
			]
		}
        this.maxId = 4;
	}

	deleteItem = (id) => { // таким образом через изменение состояния setState по иерархии можно передавать функцию по удалению
		this.setState(({data}) => { // вытаскиваем значение data из массива с объектами по уникальному идентификатору

			//----первый способ---------------------
			// const index = data.findIndex(elem => elem.id === id); // находим индекс объекта c помощью метода findIndex(), который в себя принимает коллбэк функцию, которая при возврате true, передает в метод номер элемента, на котором сработал этот коллбэк
			// console.log(index) // затем берем ID и по нему находим нужный для удаления объект внутри массива, далее будем изменять State для формирования нового состояния
						
			// const before = data.slice(0, index); // slice() - метод, копирующий часть массива и создающий новый с 0 индекса до найденного индекса, не включительно найденного индекса
			// const after = data.slice(index + 1);  // slice() - метод, копирующий часть массива и создающий новый с найденного индекса до индекса + 1, не включительно найденного индекса
			// const newArr = [...before, ...after];
			// return{
			// 	data: newArr
			// }
			//--------------------------------------	
			
			//----второй способ---------------------
			return{
				data: data.filter(item => item.id !== id) // берем данные из data, запускаем метод filter()/создает новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции/, 
			} // т.е. подходит для сохранения ИММУТАБЕЛЬНОСТИ ранее созданного объекта => data.filter() отфильтрует данные, в результате останутся только те элементы, ID которых не совпадают с ID удаляемого элемента  
			//--------------------------------------	
			
		}) // как итог: вернется новый массив
	}
	
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

	render() {
		
		return (
			<div className="app">
				<AppInfo/>

				<div className="search-panel">
					<SearchPanel/>
					<AppFilter/>
				</div>

				<EmployeesList 
					data={this.state.data}
					onDelete = {this.deleteItem} // проверяем действие по удалению конкретного ID при нажатии на корзинку
					onAdd = {id => console.log(id)}
				/>

				<EmployeesAddForm
					onAdd = {() => console.log('Addited')}
				/>
			</div>
		);

	}

}
export default App;