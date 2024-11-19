// Props / свойство - это аргумент функции, представляющий базовые данные и по сути это объект свойств, которые мы в него передаем
// Props / свойство - это статический объект, для изменения его, нужно полностью его перерисовать; так как props мы используем в компоненте - то никогда не перезаписываем ничего внутри него!!! 
// т.е. <h1>My name is {props.name}, surname - {props.surname}</h1> - в компоненте h1 находятся элементы {props.name}, {props.surname} => h1 нужно целиком перерисовать для изменения,
// для этого компонент делят на кусочки для простоты перерисовки
// в props можно передавать все, что угодно!!!
// Props следует называть так, чтобы они имели смысл с точки зрения самого компонента, в котором они находятся, а затем - компонентов , которые его рендерят

//-------------------------------------------------------------------------------------------------------

import './App.css';

function WhoAmI (props) { // классический способ передачи аргументов в props
	return (
		<div>
			<h1>My name is {props.name}, surname - {props.surname}</h1>
			<a href={props.link}>My profile</a>
		</div>
	);
}

function App () {
	return (
		<div className="App">
			<WhoAmI
				name = "John" // это и есть props / свойства
				surname = "Smith" // это и есть props / свойства
				link = "facebook.com" // это и есть props / свойства
			/>
			<WhoAmI
				name = "Alex" // это и есть props / свойства
				surname = "Shepard" // это и есть props / свойства
				link = "vk.com" // это и есть props / свойства
			/>
		</div>
	);
}
export default App;

//-------------------------------------------------------------------------------------------------------

import './App.css';

function WhoAmI ({name, surname, link}) { // более удобный и современный способ с помощью деструктуризации объекта на отдельные переменные
	return (
		<div>
			<h1>My name is {name}, surname - {surname}</h1>
			<a href={link}>My profile</a>
		</div>
	);
}

function App () {
	return (
		<div className="App">
			<WhoAmI
				name = "John" // это и есть props / свойства
				surname = "Smith" // это и есть props / свойства
				link = "facebook.com" // это и есть props / свойства
			/>
			<WhoAmI
				name = "Alex" // это и есть props / свойства
				surname = "Shepard" // это и есть props / свойства
				link = "vk.com" // это и есть props / свойства
			/>
		</div>
	);
}
export default App;

//-------------------------------------------------------------------------------------------------------

import './App.css';

function WhoAmI ({name, surname, link}) {
	return ( // {name.firstName} только данная запись корректна при передаче объекта в пропс
		<div>
			<h1>My name is {name.firstName}, surname - {surname}</h1>
			<a href={link}>My profile</a>
		</div>
	);
}

function App () {
	return (
		<div className="App">
			<WhoAmI
				name = {{firstName: "John"}} // мы можем передавить объекты в пропсы
				surname = "Smith"
				link = "facebook.com"
			/>
			<WhoAmI
				name = {{firstName: "Alex"}}
				surname = "Shepard"
				link = "vk.com"
			/>
		</div>
	);
}
export default App;

//-------------------------------------------------------------------------------------------------------

import './App.css';

function WhoAmI ({name, surname, link}) {
	return ( // {name()} - таким образом вызываем функцию
 		<div>
			<h1>My name is {name()}, surname - {surname}</h1>
			<a href={link}>My profile</a>
		</div>
	);
}

function App () {
	return (
		<div className="App">
			<WhoAmI
				name = {() => { // также можем передавать функцию в пропс
					return "John"
				}}
				surname = "Smith"
				link = "facebook.com"
			/>
			<WhoAmI
				name = {() => {
					return "Alex"
				}}
				surname = "Shepard"
				link = "vk.com"
			/>
		</div>
	);
}
export default App;

//-------------------------------------------------------------------------------------------------------