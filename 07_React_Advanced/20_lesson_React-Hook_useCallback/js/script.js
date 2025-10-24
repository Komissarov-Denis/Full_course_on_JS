// Hooks (Хуки) - следует вызывать только на верхнем уровне, не вызываем их внутри циклов, условий или вложенных функций!!!
// Hooks (Хуки) - следует вызывать только из функциональных компонентов React, не следует вызывать их из функций JavaScript!!!
// Hooks (Хуки) и Lifecycle Hooks (Хуки Жизненного Цикла) - это разные вещи, так как componentDidMount(), componentDidUpdate()
// и componentWillUnmount() относятся к Lifecycle Hooks, остальное просто Hooks - useState(), useEffect() и т.д.

//---------------------------------------------index.js---------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//---------------------------------------------App.js---------------------------------------------

import {useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';

import './App.css';

//-------------------------------------------------------------------------------------классовый компонент
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

//---------------HOOKs-useState-+-useEffect-+-useCallback---------------функциональный компонент

// Эффектами и побочными действиями называют операции по загрузке данных, использованию сторонних модулей, запуску таймаутов, логированию или изменению DOM-структуры.
// useEffect() можно создавать в одном компоненте неограниченное количество раз [slide], [autoplay] и т.д.
// Эффект timeout в классовом компоненте при применении setInterval() и, который останавливали вручную, подразумевает подписку, соответственно при удалении компонента со страницы, данный 
// timeout не удалялся и эта подписка приводила к утечке памяти. Сюда входят таймауты, обработчики событий /установленные через API браузера/, задание соединений между некоторыми сервисами,
// т.е. то, что может существовать длительное время и обмениваться информацией с компонентом. ВСЕ ПОДПИСКИ НЕОБХОДИМО УДАЛЯТЬ ПРИ УДАЛЕНИИ КОМПОНЕНТА!!! В классовом компоненте это выполняется
// с помощью Хука componentWillUnmount(), но в useEffect() есть такой подход и реализуется он возвращением коллбэк функции из него!!!



const Slider = (props) => { // компонент Slider с большой буквы прописываем и вводим состояние в функциональный компонент

	const [slide, setSlide] = useState(0); // создаем переменные slide - в которой хранится значение (строки, числа, объекты и т.д.), setSlide() - тут содержится функция, которая по клику будет
	//  менять значение slide в данном useState(), при этом ему устанавливаем начальное значение аргумента в нуль useState(0) 
	const [autoplay, setAutoplay] = useState(false); // также мы можем создавать множество переменных состояния, вместо целого объекта как в конструкторе, вынося в отдельные переменные с числом

	const getSomeImages = useCallback(() => { // создадим функцию getSomeImages() и обернем в Хук useCallback(), с добавлением пустого массива для отслеживания []
		console.log('fetching......');
		return [
			"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
			"https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
		]
	}, []);

	function logging() { // для проверки ОТПИСКИ в useEffect(), создадим функцию логирования для назначение обработчика событий, применим одну и ту же ссылку для удаления обработчика событий 
		console.log('log!');
	}

	useEffect(() => { // useEffect() можно вызвать как просто функцию, также помещаем в useEffect() анонимную стрелочную функцию / () => { document.title = `Slide: ${this.state.slide}`;} / и эта =>
		console.log('effect');
		document.title = `Slide: ${slide}`; // => функция запоминается и прикрепляется к этому конкретному компоненту, она будет вызвана после того как этот компонент отрендерится, =>
		// => т.е. по клику на кнопку изменяется state, это вызывает изменение DOM-структуры, перерисовывается заново компонент, что приводит к изменению значений в заголовке окна браузера =>
		
		window.addEventListener('click', logging); // при вызове эффекта запускаем функцию logging(), обратившись к window с назначением обработчика событий addEventListener() по клику 'click'
		return () => { // это работа с DOM-API, и, когда компонент Slider будет удален со страницы, необходимо удалить обработчик событий, так как он будет ссылаться на свой родительский компонент,
			window.removeEventListener('click', logging); // откуда он был назначен, т.е. на Slider, а соответственно из памяти Slider не будет удален. Потому, для выполнения аналогичного поведения
		} // Хука componentWillUnmount(), мы из нашего эффекта должны вернуть /return () => {window.removeEventListener('click', logging);}/ с удалением обработчика событий
	}, [slide]); // => заново строится дом дерево и, дальше, эта функция будет вызываться каждый раз, когда компонент обновляется / изменение State, Props либо Force Update /. В данной функции 
	// объединены 2 хука жизненного цикла: componentDidMount() и componentDidUpdate(). И, в момент перерендеринга компонента, вызываются все внутренности функции и переменные заново, и возвращается 
	// новая верстка, это связано с областью видимости и замыканием функции, чтобы не было багов в замыкании, функция / () => { document.title = `Slide: ${this.state.slide}`;} / запускается заново и 
	// получает актуальную переменную из состояния!!! У данного хука есть второй аргумент помимо безымянной функции - массив зависимостей /например: useEffect(() => {}, [slide]);/ , если ни одна из
	// зависимостей не изменилась, то effect будет пропущен, т.е. компонент следит за состоянием аргумента [slide], если он поменялся вовремя выполнения setSlide(), то безымянная функция
	// /() => { document.title = `Slide: ${this.state.slide}`;}/ будет вызвана /нажатием на +1 или -1/, а если он не поменялся /нажатие на autoplay/, то безымянная функция будет пропущена и не 
	// вызывается зря. Это крайне важно при оптимизации и работе с сервером!!! Если оставить второй аргумент пустым массивом /useEffect(() => {}, []);/, то effect выполнится, но при нажатии 
	// на +1 или -1, или autoplay, безымянная функция будет вызвана и выполнится только раз!!!

	useEffect(() => { // можно создать еще эффекты для отслеживания например состояние autoplay
		console.log('autoplay');
	}, [autoplay]);


	function changeSlide(i) { // берем текущее состояние, которое лежит в переменной slide и его изменяем, при этом функция выполняет другие действия внутри себя и там соблюдает принципы 
		setSlide(slide => slide + i); // иммутабельности, т.е. создает в будущем новую переменную const [slide, setSlide] = useState(0); и при setSlide(slide + i); меняет состояние в плюс
	} // слайд или минус слайд. Так как состояние зависит от предыдущего, применяем коллбэк функцию с сокращенной записью стрелочной функции (slide => slide + i)

	function toggleAutoplay() { // создаем новую функцию toggleAutoplay(), по клику на кнопку будем менять состояние autoplay с false на true, передавая обратное значение autoplay в функцию
		setAutoplay(autoplay => !autoplay); // setAutoplay(). Так как состояние зависит от предыдущего, применяем коллбэк функцию с сокращенной записью	стрелочной функции (autoplay => !autoplay).	
	} 
	
	// State - работает также как и в классовых компонентах, это означает, что когда вызываются функции setSlide() и setAutoplay(), которые мы прописываем вторыми аргументами, всегда вызывается
	// перерендеринг компонента как это происходит в классовых компонентах.

	return (
		<Container>
			<div className="slider w-50 m-auto">
				{/* {
					getSomeImages().map((url, i) => { // возьмем выше созданную функцию getSomeImages(), переберем элементы массива с помощью метода перебора map() с аргументами url - адрес изображения, 
						return( // i - номер порядковый и вернем кусочек верстки с изображением. ОБЯЗАТЕЛЬНО НЕОБХОДИМО УКАЗАТЬ АТТРИБУТ key={i} с номером по-порядку, чтобы исключить повторы и ошибки!!! 
							<img 
								key={i}
								className="d-block w-100"
								src={url}
								alt="slide"
							/>
						) // ПРИЕМ С useCallback ПОЛЕЗЕН ТОЛЬКО ДЛЯ ДОЧЕРНИХ КОМПОНЕНТОВ, КОТОРЫЕ НЕ ДОЛЖНЫ КАЖДЫЙ РАЗ МЕНЯТЬСЯ, и это связано с тем, что каждый вызов функции getSomeImages() заново						
					}) // рендерит компонент и с этим ничего нельзя сделать!!! Поэтому требуется закешировать getSomeImages().map((url, i) => {return()}), чтобы она вызывалась только раз и по надобности,
				} // взамен данного участка кода с функцией getSomeImages().map((url, i) => {return()}) далее создаем компонент <Slide getSomeImages={getSomeImages}/> с одним аттрибутом/Props/ 
				  // getSomeImages и в него приходит функция getSomeImages()
			  */} 
				<Slide getSomeImages={getSomeImages}/> 
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

//-----------------------ДОЧЕРНИЙ КОМПОНЕНТ для useCallback-------------------------------

const Slide = ({getSomeImages}) => { // создаем функцию Slide(), который как Props /один из аргументов/ получает функцию getSomeImages(). Внутри этого функционального компонента можно создать новое
	const [images, setImages] = useState([]); // состояние useState([]) c массивом данных [images, setImages], и состояние с пустым массивом потом заполнится изображениями? когда компонент будет создан
	useEffect(() => { // и если он, вдруг, начнет обновляться, то в таком случае будем менять количество изображений внутри слайдера. Применим Хук useEffect() и в него поместим коллбэк функцию, которая
		setImages(getSomeImages()) // запускается каждый раз либо при создании компонента, либо при его обновлении. Запустим функцию setImages(), которая устанавливает состояние в images, при этом
	}, [getSomeImages]) // как аргумент функцию getSomeImages() /запрос на сервер, на получение картинок или данных/ обернем в setImages(). Т.е. правильное поведение - это запрос данных внутри
	// useEffect(). Далее функция setImages() установит массив с картинками, но при этом необходимо прописать массив зависимостей от функции getSomeImages(), т.е. это означает, что когда эта функция
	// изменится, только в данном случае будет запускаться useEffect() повторно, а измениться она естественно может, когда мы передадим ее внутрь <Slider/>.
	return ( // далее возвращаем из этого компонента React фрагмент
		<>
			{images.map((url, i) => 
				<img 
					key={i}
					className="d-block w-100"
					src={url}
					alt="slide"
				/>
			)}
			
		</>
	)
}

//----------------------------------------------------------------------------------------

function App() { // это функциональный компонент

	const [slider, setSlider] = useState(true); // для удаления компонента Slider, создаем состояние со значением slider, передаем значение (true) в состояние setSlider при помощи метода useState(),
	// т.е. благодаря чему компонент Slider виден на странице. При этом мы возвращаем не просто слайдер как какой-то компонент, а еще и кнопку, которая будет удалять компонент Slider. Потому помещаем
	// фрагмент и кнопку со слайдером в нем объединяем. Функцией {() => setSlider(false)} по клику на кнопку "Dell Slider" меняем состояние setSlider на (false) чтобы удалить компонент при помощи 
	// условия {slider ? <Slider/> : null} - если состояние в true, показываем компонент <Slider/>, если в false - скрываем.

	return (
		<>
			<button onClick={() => setSlider(false)}>Dell Slider</button>
			{slider ? <Slider/> : null}			
		</>

				
	);
}

export default App;