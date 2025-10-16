import {Component, useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';

import './App.css';

// Hooks (Хуки) - следует вызывать только на верхнем уровне, не вызываем их внутри циклов, условий или вложенных функций!!!
// Hooks (Хуки) - следует вызывать только из функциональных компонентов React, не следует вызывать их из функций JavaScript!!!

// class Slider extends Component {

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			autoplay: false,
// 			slide: 0
// 		}
// 	}

// 	componentDidMount() {
// 		document.title = `Slide: ${this.state.slide}`;
// 	}

// 	componentDidUpdate() {
// 		document.title = `Slide: ${this.state.slide}`;
// 	}

// 	changeSlide = (i) => {
// 		this.setState(({slide}) => ({
// 			slide: slide + i
// 		}))
// 	}

// 	toggleAutoplay = () => {
// 		this.setState(({autoplay}) => ({
// 			autoplay: !autoplay
// 		}))
// 	}

// 	render() {
// 		return (
// 			<Container>
// 				<div className="slider w-50 m-auto">
// 					<img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
// 					<div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
// 					<div className="buttons mt-3">
// 						<button 
// 							className="btn btn-primary me-2"
// 							onClick={() => this.changeSlide(-1)}>-1
// 						</button>
// 						<button 
// 							className="btn btn-primary me-2"
// 							onClick={this.toggleAutoplay}>toggle autoplay
// 						</button>
// 						<button 
// 							className="btn btn-primary me-2"
// 							onClick={() => this.changeSlide(1)}>+1
// 						</button>
// 					</div>
// 				</div>
// 			</Container>
// 		)
// 	}
// }

//--------------------------------------HOOKs-useState-+-useEffect--------------------------------------

const Slider = (props) => { // компонент Slider с большой буквы прописываем и вводим состояние в функциональный компонент

	const [slide, setSlide] = useState(0); // создаем переменные slide - в которой хранится значение (строки, числа, объекты и т.д.), setSlide - тут содержится функция, которая по клику будет
	//  менять значение slide в данном useState, при этом ему устанавливаем начальное значение аргумента в нуль useState(0) 
	const [autoplay, setAutoplay] = useState(false); // также мы можем создавать множество переменных состояния, вместо целого объекта как в конструкторе, вынося в отдельные переменные с числом

	function logging() {
		console.log('log!');
	}

	useEffect(() => { // useEffect() можно вызвать как просто функцию, также помещаем в useEffect() анонимную стрелочную функцию / () => { document.title = `Slide: ${this.state.slide}`;} / и эта
		console.log('effect');
		document.title = `Slide: ${slide}`; // функция запоминается и прикрепляется к этому конкретному компоненту, она будет вызвана после того как этот компонент отрендерится, т.е.
		
		window.addEventListener('click', logging);
		return () => {
			window.removeEventListener('click', logging);
		}

	}, [slide]); // построится дом дерево, и дальше эта функция будет вызываться каждый раз, когда компонент обновляется / изменение State, Props либо Force Update /. В данной функции объединены 2 хука
	// жизненного цикла: componentDidMount() и  componentDidUpdate(). И, в момент перерендеринга компонента, вызываются все внутренности функции и переменные заново, и возвращается новая верстка, 
	// это связано с областью видимости и замыканием функции, чтобы не было багов в замыкании, функция / () => { document.title = `Slide: ${this.state.slide}`;} / запускается заново и получает 
	// актуальную переменную из состояния!!! У данного хука есть второй аргумент помимо безымянной функции - массив зависимостей / например [slide] /, если ни одна из зависимостей не изменилась, то
	// effect будет пропущен, т.е. компонент следит за состоянием аргумента slide, если он поменялся вовремя выполнения setSlide(), то безымянная функция / () => { document.title = `Slide: ${this.state.slide}`;} /
	// будет вызвана /нажатие на +1 или -1/, а если он не поменялся /нажатие на autoplay/, то безымянная функция будет пропущена и не вызывается зря. Это крайне важно при оптимизации и работе с сервером!!!
	// Если оставить второй аргумент пустым массивом, то effect выполнится, но при нажатие на +1 или -1, или autoplay - то безымянная функция будет пропущена и не вызывается зря, т.е. функция будет вызвана только раз.

	useEffect(() => {
		console.log('autoplay');
	}, [autoplay]);


	function changeSlide(i) {
		setSlide(slide => slide + i); // берем текущее состояние, которое лежит в переменной slide и его изменяем, при этом функция выполняет другие действия внутри себя и там соблюдает принципы 		
	} // иммутабельности, т.е. создает в будущем новую переменную const [slide, setSlide] = useState(0); и при setSlide(slide + i); меняет состояние в плюс слайд или минус слайд. Так как состояние 
	// зависит от предыдущего, применяем коллбэк функцию с сокращенной записью стрелочной функции

	function toggleAutoplay() { // создаем новую функцию toggleAutoplay(), по клику на кнопку будем менять состояние autoplay с false на true,
		setAutoplay(autoplay => !autoplay); // передавая обратное значение autoplay в функцию setAutoplay(). Так как состояние зависит от предыдущего, применяем коллбэк функцию с сокращенной записью		
	} // стрелочной функции
	
	// State - работает также как и в классовых компонентах, это означает, что когда вызываются функции setSlide() и setAutoplay(), которые мы прописываем вторыми аргументами, всегда вызывается
	// перерендеринг компонента как это происходит в классовых компонентах.

	return (
		<Container>
			<div className="slider w-50 m-auto">
				<img
					className="d-block w-100"
					src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
					alt="slide" />
				<div
					className="text-center mt-5"
					>Active slide {slide} 
					<br/> 
					{autoplay ? 'auto' : null}
				</div>
				<div className="buttons mt-3">
					<button 
						className="btn btn-primary me-2"
						onClick={() => changeSlide(-1)}>-1
					</button>
					<button 
						className="btn btn-primary me-2"
						onClick={toggleAutoplay}>toggle autoplay
					</button>
					<button 
						className="btn btn-primary me-2"
						onClick={() => changeSlide(1)}>+1
					</button>
				</div>
			</div>
		</Container>
	)
}

//----------------------------------------------------------------------------------------

function App() {

	const [slider, setSlider] = useState(true);

	return (
		<>
			<button onClick={() => setSlider(false)}>Click</button>
			{slider ? <Slider/> : null}			
		</>

				
	);
}

export default App;