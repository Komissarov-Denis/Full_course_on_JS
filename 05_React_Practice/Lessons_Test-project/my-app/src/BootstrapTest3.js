// Стандартно родительский компонент может взаимодействовать с дочерним через props, мы можем через них передавать и данные, и методы, и состояние state.
// Каждый раз, когда props изменяются, компонент перерисовывается, но возникает ситуация, когда нам не нужно перерисовывать компонент, поставить или снять фокус, 
// узнать какой текст выделил пользователь и т.д. В таких случаях необходим прием с REF...
// REF - это ссылка на элемент или компонент в DOM дереве и в уже отрисованном интерфейсе на странице браузера, поэтому можно использовать DOM API и например метод focus() !!!
// REF могут отличаться в зависимости от того, на что повешен этот аттрибут: если на обычный элемент как input, то получим ссылку на этот элемент в DOM дереве, если повешен на
// компонент, то свойство current будет получать экземпляр созданного компонента и это позволит вызывать методы самого этого компонента, на который повешен REF,
// т.е. если бы на компоненте <Container/> был метод doSmth(), то мы бы его вызывали командой this.myRef.current.doSmth().
// REF могут назначаться в ХУКАХ перед componentDidMount() и componentDidUpdate(), но когда компонент размонтируется, то в this.myRef = React.createRef() => в myRef = null,
// т.е не нужно выполнять отписку, как это обычно бывает с обычными обработчиками событий или интервалами во избежание утечки памяти. 
// REF нельзя назначать на функциональные компоненты так как они не являются классами и они не создают экземпляры, соответственно мы компонент преобразуем в классовый и тогда
// ошибки не будет!!!
// useRef - мощный ХУК для создания рефов

import { useRef } from "react";
import { Container } from "react-bootstrap";

import './App.css';

const Form = () => { // создаем переменную формы Form, в Form создаем переменную myRef, при помощи метода useRef() для использования ХУКА useRef() и помещаем начальное значение рефа (null),
	const myRef = useRef(null); // т.к. в переменной изначально ничего не будет, но как только приложение создаст верстку <Container>, вместо (null) будет помещена ссылка на элемент в DOM структуре
	// т.е. ХУК useRef() создает объект, у которого есть свойство current с первоначальным значением (null) и, при рендеринге верстки, вместо (null) в current записывается ссылка на DOM элемент input
	const focusFistTextInput = () => {
		myRef.current.focus(); // метод current - обязательный для данной структуры, НЕ ЗАБЫВАЕМ ПРО НЕГО!!!
	}

    
	return (
		<Container>
			<form className="w-50 border mt-5 mb-5 p-3 m-auto">
				<div class="mb-3">
					<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
					<input	
						ref={myRef}
						type="email" 
						className="form-control" 
						id="exampleFormControlInput1" 
						placeholder="name@example.com"
					/>
				</div>
				<div class="mb-3">
					<label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
					<textarea onClick={focusFistTextInput} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
				</div>
			</form>
		</Container>
	) // вызываем функцию setInputRef() посредством ref={this.setInputRef}, когда создастся DOM структура <input/>, запустится ref={this.setInputRef} и она возьмет elem, на котором она была 
	// вызвана и запишет его в this.myRef = elem, т.е. в ссылку внутри экземпляра класса
	// используем метод focusFistTextInput() на элементе <textarea/> по средством обработчика onClick, тогда при фокусе на второй input - идет перенаправление на первый input

}
export default Form;