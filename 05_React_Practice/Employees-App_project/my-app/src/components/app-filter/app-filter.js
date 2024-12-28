import './app-filter.css';

const AppFilter = (props) => {

	// return (
	// 	<div className="btn-group">
	// 		<button
	// 			className="btn btn-light"
	// 			type="button">
	// 				Все сотрудники
	// 		</button>
	// 		<button
	// 			className="btn btn-outline-light"
	// 			type="button">
	// 				На повышение
	// 		</button>
	// 		<button
	// 			className="btn btn-outline-light"
	// 			type="button">
	// 				З/П превышающая 1000$
	// 		</button>
	// 	</div>
	// );
	//--------------------------------------------------------------------------------------------------------------------------------------------	
	//-заменим-на-оптимизированный-вариант-но-более-сложный =>=>=>=>=>=>
	//--------------------------------------------------------------------------------------------------------------------------------------------

	//=>=>=>=>=>=>

	const buttonsData = [ // создаем массив данных buttonsData для кнопок
		{
			name: 'all', // название фильтра совпадает с AppFilter filter={filter}
			label: 'Все сотрудники',
		},
		{
			name: 'rise',
			label: 'На повышение',
		},
		{
			name: 'increase',
			label: 'Премию получат',
		},
		{
			name: 'moreThen1000',
			label: 'З/П превышающая 1000$',
		}
	];

	const buttons = buttonsData.map(({name, label}) => { // на базе buttonsData формируем массив элементов, перебирая методом map() каждый отдельный элемент/объект из buttonsData, из которого будем вытаскивать нужные нам данные name и label
		const active = props.filter === name; // active - данная переменная определяет активный элемент или нет, при переборе методом map() в переменную возвращается true / false
		const clazz = active ? 'btn-light' : 'btn-outline-light'; // clazz - переменная содержащая строчку с классом /пришел вариант из JAVA/, тернарным оператором производит сравнение /если active = true, то передаем 'btn-light', если active = false, то передаем 'btn-outline-light'/
		return (
			<button
				className={`btn ${clazz}`} // передаем класс активности кнопке при ее активации
				type="button"
				onClick={() => props.onFilterSelect(name)} // делаем через стрелочную функцию, так как передаем аргумент name /в key={name} - передаем уникальный ключ сравнения/
				key={name}
			>
					{label}
			</button>
		)
	});

	return ( // так как в className разные классы и меняются динамически, поэтому мы можем работать с фильтром из компонента App в this.state в filter: '' прописываем filter: 'all', чтобы подсвечивалась первая кнопка и все были отфильтрованы
		<div className="btn-group">
			{buttons}			
		</div>
	);
};
export default AppFilter;