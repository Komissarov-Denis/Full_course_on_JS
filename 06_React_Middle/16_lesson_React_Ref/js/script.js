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

import React, { Component } from "react";
import { Container } from "react-bootstrap";

import './App.css';

class Form extends Component {

	//----------------------------------------------------первый классовый функционал
    // constructor(props) {
    //     super(props);
	// 	this.myRef = React.createRef(); // можно заменить без контекста конструктора =>
    // }
	// =>
	// myRef = React.createRef(); // стандартный способ создания REF
	// mySecondRef = React.createRef();	
	// myThirdRef = React.createRef();

	// componentDidMount() {
	// 	this.myRef.current.focus(); // метод current - обязательный для данной структуры, НЕ ЗАБЫВАЕМ ПРО НЕГО!!!
	// }
	//---------------------------------------------------

	setInputRef = (elem) => { // второй способ создания REF, это коллбэк REF, это когда мы их создаем не при помощи createRef, а при помощи функции и записываем как экземпляр класса
		this.myRef = elem; // setInputRef - это метод, принимающий в себя аргумент elem, мы создаем реф this.myRef со ссылкой на elem
	} // по факту у нас функция setInputRef создает новое поле this.myRef и в него помещает ссылку на этот elem

	focusFistTextInput = () => {
		if (this.myRef) { // проверяем наличие или создание элемента input, только тогда запускаем focus()
			this.myRef.focus(); // в данном случае коллбэк рефа свойство current не требуется
		}
	}

    render () {
        return (
            <Container>
                <form className="w-50 border mt-5 mb-5 p-3 m-auto">
					<div class="mb-3">
						<label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
						<input	
							// ref={this.myRef} - первый способ создания REF
							ref={this.setInputRef} //- второй способ создания REF
							type="email" 
							className="form-control" 
							id="exampleFormControlInput1" 
							placeholder="name@example.com"
						/>
					</div>
					<div class="mb-3">
						<label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
						<textarea onClick={this.focusFistTextInput} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>
				</form>
            </Container>
        ) // вызываем функцию setInputRef() посредством ref={this.setInputRef}, когда создастся DOM структура <input/>, запустится ref={this.setInputRef} и она возьмет elem, на котором она была 
		// вызвана и запишет его в this.myRef = elem, т.е. в ссылку внутри экземпляра класса
    } // используем метод focusFistTextInput() на элементе <textarea/> по средством обработчика onClick, тогда при фокусе на второй input - идет перенаправление на первый input

}
export default Form;

//---------------------------------------------------index.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Form/>
		<App/>
		<BigButton as="a">Отправить отчёт</BigButton>
		<BootstrapTest/>
	</StrictMode>	
);