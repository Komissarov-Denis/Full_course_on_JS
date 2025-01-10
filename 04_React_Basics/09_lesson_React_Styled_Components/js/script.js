// npm install styled-components --save подключаем в проект /необязательный/ React-компонент стилизации элементов/компонентов
// import styled from 'styled-components'; импортируем компонент непосредственно в проект, а именно в App.js
// создаем div с перечислением свойств стилизации:
const Wrapper = styled.div` 
	width: 600px;
	margin: 80px auto 0 auto;
`;

const EmpItem = styled.div`
	padding: 20px;
	margin-bottom: 15px;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
	a {
		display: block;
		margin: 10px 0 10px 0;
		color: ${props=> props.active ? 'red' : 'blue'}; 
	}
	input {		
		display: block;
		margin-top: 10px;
	}	
`;

const Header = styled.h2`
	font-size: 22px;
`;

export const Button = styled.button` 
	display: block;
	padding: 5px 15px;
	background-color: gold;
	border-radius: 5px;
	border: 1px solid rgba(0, 0, 0, .2);
	box-shadow: 5px 5px 10px rgba(0, 0, 0, .2);
`; // можем экспортировать в другой файл данные стили кнопки, и переназначать её свойства //=>

render() {
	const {name, surname, link} = this.props; // создаем по клику button событие как метод внутри класса, сюда передаем название метода, который будет выполнять действия как аналог addEventListener()
	const {position, years} = this.state;
	console.log(this); // тут наглядно можно увидеть свойства ОПРЕДЕЛЕННОГО ЭКЗЕМПЛЯРА КЛАССА
	return ( // при запуске изменения setState() мы меняем только годы при нажатии на кнопку, поэтому в {this.state.text} ничего не поменяется !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// ПРИМЕР применения ФРАГМЕНТА!!! скрывает не нужный <DIV> ПУСТОЙ ТЕГ ЯВЛЯЕТСЯ СОКРАЩЕННОЙ ВЕРСИЙ ФРАГМЕНТА БЕЗ ИМПОРТА
		<EmpItem active>
			<Button onClick={this.nextYear}>{this.state.text}</Button>  
			<Header>
				My name is {name}, 
				surname - {surname}, 
				age - {years}, 
				position - {position}</Header>
			<a href={link}>My profile</a>
			<form>
				<span>Введите должность</span>
				<input type="text" onChange={(e) => this.commitInputChanges(e, 'some color')}/> 
			</form>
		</EmpItem>
	);
}


function App () {
	return (
		<Wrapper>
			<div className="App">
				<WhoAmI
					name = "John"
					surname = "Smith"
					link = "facebook.com"
				/>
				<WhoAmI
					name = "Alex"
					surname = "Shepard"
					link = "vk.com"
				/>
			</div>
		</Wrapper>
	);
}

//---------------------------------------------------------------------------------------------------------
//=>
import { Button } from './App';
import styled from 'styled-components';

const BigButton = styled(Button)`
	margin: 0 auto;
	width: 240px;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<App/>
		<BigButton as="a">Отправить отчёт</BigButton>
	</StrictMode>	
);