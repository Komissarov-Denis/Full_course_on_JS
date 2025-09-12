// Portals - позволяют отрендерить любые элементы вне своего родительского компонента и именно в DOM структуре страницы, 
// т.е. <div>Hallo<div/> мы можем отрендерить в другом месте, но сам <div>Hallo<div/> останется в родительском компоненте,
// таким образом мы можем обойти стили текущие и показать новое уведомление.
// Событие, которое сгенерировано изнутри портала будет распространяться и к своему родителю непосредственно в контексте реакта,
// так как Massage() внутри формы form находится и, независимо от того, что в DOM-дереве элемент находится за границей формы, 
// события будут срабатывать на нашем родительском компоненте, например onClick() .

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Container } from "react-bootstrap";

import './App.css';

class SecondForm extends Component {

	state = {
		advertisementOpen: false, // состояние открытого объявления выставляем в false
	}

	componentDidMount() { // в компоненте form после монтажа будет рендериться элемент и через 3 секунды он появляется,
		setTimeout(this.handleClick, 3000) //  кликая по form или элементу <Massage/> - объявление появляется и исчезает
	};

	handleClick = () => { // создаем обработчик события для наглядности поведения порталов 
		console.log('click'); // обработчик срабатывает как на form, так и на компоненте портала, хотя они разведены в разные области DOM-дерева
		this.setState(({advertisementOpen}) => ({ // меняем деструктуризацией состояние advertisementOpen с false на true
			advertisementOpen: !advertisementOpen, // и будем рендерить портал <Portal/> с сообщением <Massage/>, когда значение открытого объявления advertisementOpen в true
		}))
	}

    render () {
        return (
            <Container>
                <form 
					className="w-50 border mt-5 mb-5 p-3 m-auto" 
					onClick={this.handleClick}
					style={{'overflow': 'hidden',
							'position': 'relative',
						}}>
					<div class="mb-3">
						<label htmlFor="exampleFormControlInput1" className="form-label"> Portal-Email address</label>
						<input
							type="email" 
							className="form-control" 
							id="exampleFormControlInput1" 
							placeholder="name@example.com"
						/>
					</div>
					<div class="mb-3">
						<label htmlFor="exampleFormControlTextarea1" className="form-label">Portal-Example textarea</label>
						<textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
					</div>
					{
						this.state.advertisementOpen ?					
						<Portal>
							<Massage/>
						</Portal> : null
					}
				</form>
            </Container>
        ) // созданный портал помещаем в верстку и в него наш компонент с сообщением, выводится он в самом конце DOM-дерева в отдельном блоке <div/>
		// добавляем условия для значения открытого объявления advertisementOpen
    } 

}

const Portal = (props) => { // создаем компонент Portal командой ReactDOM.createPortal(), этот метод принимает два аргумента: child - дочерний элемент/компонент, container - в котором будет этот элемент/компонент
	const node = document.createElement('div'); // создаем отдельные элементы-контейнеры, которые будут помещаться на странице
	document.body.appendChild(node); // помещаем сюда ноду, и когда будет запускаться портал, то тут мы будем взаимодействовать со страницей в обход виртуального DOM-дерева
	return ReactDOM.createPortal(props.children, node); // стандартная команда для создания порталов!!!
}

const Massage = () => { // сделали отдельным компонентом для формирования портала
	return ( // возвращаем участок верстки 
		<div
			style={{'width': '500px',
					'height': '150px',
					'backgroundColor': 'red',
					'position': 'absolute',
					'right': '0%',
					'bottom': '0%',
			}}>Hallo
		</div>
	)
}

export default SecondForm;

//---------------------------------------------------index.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Form/>
		<SecondForm/>
		<App/>
		<BigButton as="a">Отправить отчёт</BigButton>
		<BootstrapTest/>
	</StrictMode>	
);