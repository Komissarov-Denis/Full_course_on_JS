// Стандартно родительский компонент может взаимодействовать с дочерним через props, мы можем через них передавать и данные, и методы, и состояние state.
// Каждый раз, когда props изменяются, компонент перерисовывается, но возникает ситуация, когда нам не нужно перерисовывать компонент, поставить или снять фокус, 
// узнать какой текст выделил пользователь и т.д. В таких случаях необходим прием с REF...
// REF - это ссылка на элемент или компонент в DOM дереве в уже отрисованном интерфейсе на странице браузера, поэтому можно использовать DOM API и например метод focus() !!!
// Могут назначаться как в ХУКАХ как componentDidMount(), так и перед componentDidMount() и componentDidUpdate(), но нельзя назначать на функциональные компоненты
// 06:06

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

	setInputRef = (elem) => { // второй способ создания REF, это коллбэк функция, принимающая в себя аргумент elem
		this.myRef = elem;
	}

	ficusFistTI = () => {
		if (this.myRef) { // проверяем наличие или создание элемента input, только тогда запускаем фокус
			this.myRef.focus();
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
							placeholder="name@example.com"/>
					</div>
					<div class="mb-3">
						<label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
						<textarea onClick={this.ficusFistTI} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>
				</form>
            </Container>
        )
    }

}
export default Form;