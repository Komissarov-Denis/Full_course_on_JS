// Главный принцип создания приложения/сайта - это разбиение его на блоки пользовательского интерфейса или так называемые компоненты, которые могут иметь собственное поведение, 
// могут переиспользоваться не только в других частях сайта, но и в файлах иных страниц сайта как обычная модульная структура webpack!!!
// Элементы - это структурные не изменяемые напрямую частички компонентов, так как они могут быть пересозданы в реакте и заново помещены на страницу!!!
// Наименование компонентов/элементов осуществляется в формате: Kebab case – это когда в именах переменных слова соединяются дефисами (например, employees-list). 

//-------------------------------------------------------------------------------------------------------

// Реакт компоненты прописываются с заглавной буквы <App/> и импортируются из другого файла, элементы только строчные <app/>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App/>,
);

//-------------------------------------------------------------------------------------------------------

// Из файла App.js мы импортируем компонент (import App from './App';) в index.js, который представляет собой функцию
function App() {
	return ( // данная функция возвращает внутри себя JSX набор элементов (img, p, a)
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				></a>
			</header>
		</div>
	);
}

export default App;

//-------------------------------------------------------------------------------------------------------

// Мы можем создавать компоненты с внутренним текстом и переменной {Text}, тогда прописываем закрывающие теги: <Header>Text</Header>
// Если компонент не содержит внутри себя текста или переменной, то просто ставим закрывающий ТЕГ
const Header = () => {
	return <h2>Hello World!</h2>
}
 
function App() {
	return (
		<div className="App">
			<Header>{Text}</Header>
			<Header/>
		</div>
	);
}

export default App;

//-------------------------------------------------------------------------------------------------------

const Header = () => {
	return <h2>Hello World!</h2>
}
 
const Field = () => {
	return <input placeholder='Type here' type='text'/>
}

function Btn () { // в элементы можно помещать и функции
	// const text = 'Log In';
	const res = () => {
		return 'Log In';
	}
	// const p = <p>Log In</p> так же можем помещать и другие элементы и выводить командой return
	return <button>{res()}</button> // можем помещать и функции
}

function App() { // тут формируется структура компонента, который потом может быть переиспользован
	return (
		<div className="App">
			<Header/>
			<Field/>
			<Btn/>
		</div>
	);
}

export default App;

//-------------------------------------------------------------------------------------------------------

const Header = () => {
	return <h2>Hello World!</h2>
}
 
const Field = () => {
	const holder = 'Enter text here';
	const styledField = {
		width: '300px'
	};
	return <input // в функциях всегда возвращаются данные из выражения через команду return, тут могут быть элементы, комбинации элементов и компонентов
		placeholder={holder} 
		type='text' 
		style={styledField}/>// так же мы можем манипулировать аттрибутами элементов/компонентов, а так же их стилями
}

function Btn () {
	const text = 'Log In';
	const logged = true;

	// if (...) { также можно прописать условие для команды return, используя переменную!!!
	// }

	return <button>{logged ? 'Enter' : text}</button> // также можно применить тернарный оператор с условием: если logged = true => надпись в кнопке - Enter, наоборот - Log In
}

function App() {
	return (
		<div className="App">
			<Header/>
			<Field/>
			<Btn/>
		</div>
	);
}
export {Header}; //  так же как и в webpack, мы можем экспортировать и импортировать import { Header } from './App'; компоненты в другие файлы для переиспользования
export default App;

//-------------------------------------------------------------------------------------------------------

import React from 'react'; // применяя наследование классов в библиотеке Реакт, мы можем создавать новые сущности

class Field extends React.Component {
	render() {	// в классах обязателен метод render(), выполняющий действия внутри себя, далее возвращаются данные из выражения через команду return
		const holder = 'Enter text here';
		const styledField = {
			width: '300px'
		};
		return <input 
				placeholder={holder} 
				type='text' 
				style={styledField}
				/>
	}	
};

//-------------------------------------------------------------------------------------------------------

import {Component} from 'react'; // применяя наследование классов в библиотеке Реакт, мы можем создавать новые сущности, это тот же самый вариант с принципом деструктуризации

class Field extends Component {
	render() {	// в классах обязателен метод render(), выполняющий действия внутри себя, далее возвращаются данные из выражения через команду return
		const holder = 'Enter text here';
		const styledField = {
			width: '300px'
		};
		return <input 
				placeholder={holder} 
				type='text' 
				style={styledField}
				/>
	}	
};

//-------------------------------------------------------------------------------------------------------