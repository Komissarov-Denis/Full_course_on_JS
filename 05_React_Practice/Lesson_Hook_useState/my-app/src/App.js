import {Component, useState} from 'react';
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

//--------------------------------------HOOKS-STATE--------------------------------------

const Slider = (props) => { // компонент Slider с большой буквы прописываем и вводим состояние в функциональный компонент

	const [slide, setSlide] = useState(0); // создаем переменные slide - в которой хранится значение (строки, числа, объекты и т.д.), setSlide - тут содержится функция, которая по клику будет
	//  менять значение slide в данном useState, при этом ему устанавливаем начальное значение аргумента в нуль useState(0) 
	const [autoplay, setAutoplay] = useState(false); // также мы можем создавать множество переменных состояния, вместо целого объекта как в конструкторе, вынося в отдельные переменные с числом

	function changeSlide(i) {
		setSlide(slide => slide + i); // берем текущее состояние, которое лежит в переменной slide и его изменяем, при этом функция выполняет другие действия внутри себя и там соблюдает принципы 		
	} // иммутабельности, т.е. создает в будущем новую переменную const [slide, setSlide] = useState(0); и при setSlide(slide + i); меняет состояние в плюс слайд или минус слайд. Так как состояние 
	// зависит от предыдущего, применяем коллбэк функцию с сокращенной записью стрелочной функции

	function toggleAutoplay() { // создаем новую функцию toggleAutoplay(), по клику на кнопку будем менять состояние autoplay с false на true,
		setAutoplay(autoplay => !autoplay); // передавая обратное значение autoplay в функцию setAutoplay(). Так как состояние зависит от предыдущего, применяем коллбэк функцию с сокращенной записью		
	} // стрелочной функции
	
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

function App() {
	return (
		<Slider/>		
	);
}

export default App;