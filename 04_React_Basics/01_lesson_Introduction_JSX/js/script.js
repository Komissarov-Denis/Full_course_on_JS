//-------------------------------Для-начала-работы-(шпаргалка-команд)------------------------------------

// npx create-react-app my-app        - для установки нового проекта
// npx create-react-app@latest my-app - для установки нового проекта REACT19
// npm i --save-dev sass              - обновление пакета SASS

// Success! Created my-app at H:\progr\HTML+CSS+JS\HTML_CSS_JS\Full_course_on_JS\05_React_Practice\CRUD_project\my-app
// Inside that directory, you can run several commands:

//   npm start
//     Starts the development server.

//   npm run build
//     Bundles the app into static files for production.

//   npm test
//     Starts the test runner.

//   npm run eject
//     Removes this tool and copies build dependencies, configuration files
//     and scripts into the app directory. If you do this, you can’t go back!

// We suggest that you begin by typing:

//   cd my-app
//   npm start

// REACT в работе использует:
// 1. препроцессор JSX - это некая помесь html и javaScript, позволяет создавать разметку и логику в одном документе;
// 2. алгоритм, позволяющий отслеживать какие части приложения изменились и обновить только их, а не все приложение целиком - это Reconciliation Algorithm;
// 3. технологию Virtual DOM - это технология, находящаяся в DOM документе, весьма легкая структура, в которой мы сначала работаем, а потом переносим все изменения на основное DOM дерево;

//-------------------------------------------------------------------------------------------------------

// Для создания элемента на странице в REACT с препроцессором JSX (удобнее), прописываем:

const elem = <h2>Hello World!</h2>; // это реакт элемент интерфейса

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		elem,
); 

//-------------------------------------------------------------------------------------------------------

// Для создания элемента на странице в REACT без препроцессора JSX (вручную сложнее), прописываем:
//                               ТЕГ      если нет класса      содержимое
const elem = React.createElement('h2',         null,         'Hello World!');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		elem,
);

//-------------------------------------------------------------------------------------------------------

// Для создания элемента на странице в REACT без препроцессора JSX, прописываем:
//                               ТЕГ         имя класса            содержимое
const elem = React.createElement('h2', {className: 'greetings'}, 'Hello World!'); // так как React.createElement() - это метод, то вернется следующее //=>=>=>=>=>=>
//=>=>=>=>=>=>
const element = { // получаем объект
	type = 'h2',  // с типом 'h2'
	props: { // со свойствами:
		className: 'greetings', // класс greetings'
		children: 'Hello World!', // текстовая дочерняя нода 'Hello World!'
	} // формируется объект через VirtualDOM
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		elem,
);

//-------------------------------------------------------------------------------------------------------

// 1. многострочный реакт элемент интерфейса заключается в круглые скобки!!!
// 2. при многостраничном реакт элементе - должен быть только один родитель!!!
// 3. кнопки button могут оформляться в двух вариантах <button>Click</button> = <button/>, т.е. с контекстом или без!!!
// 4. не забываем закрывать самозакрывающиеся ТЕГи, такие как <input type='Text' /> или <button/>

const elem = (						
	<div>						
		<h2>Hello World!</h2>	
		<input type='Text' />
		<button>Click</button>
		<button/>
	</div>
);
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	elem,
);

//-------------------------------------------------------------------------------------------------------

// 1. можем применить переменную!!!

const text = 'Hello World!';

const elem = (                   
	<div> 						
		<h2>Текст: {text}</h2> 	 
		<input type='Text' />
		<button>Click</button>
		<button/>
	</div>
);
  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		elem,
);

// 2. ЗАПРЕЩЕНО В ПЕРЕМЕННУЮ ВСТАВЛЯТЬ ОБЪЕКТЫ, например {new Date()} - так как идет трансформация с строку и получается объект в объекте, это защита от взлома!!!

const elem = ( // {new Date()} - вернет ошибку, так как данное исключение предполагает систему защиты, которое не позволяет помещать объекты new Date() в объекты {}
	<div>
		<h2 className='text'>Текст: {new Date()}</h2>
		<input type='Text' />
		<button tabIndex='0' >Click</button>
		<button/>    
		<label htmlFor="label"></label>
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	elem,
);

//-------------------------------------------------------------------------------------------------------

// можно переменную вводить в виде массива, но при подобной записи {['135465', 'fbsfbs555']} происходит конкатенация => Текст: 135465fbsfbs555 !!!

const elem = (
	<div>
		<h2>Текст: {['135465', 'fbsfbs555']}</h2>
		<input type='Text' />
		<button>Click</button>
		<button/>    
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	elem,
);

//-------------------------------------------------------------------------------------------------------

// 1. атрибуты для каждого тега пишутся в формате camelCase, но слова пишутся вместе и каждое последующее слово с заглавной буквы!!!
// 2. есть атрибуты, которые не совпадают по написанию с теми, которые есть в html => className для class, htmlFor для for!!!

const text = 'Hello World!';

const elem = (
	<div>
		<h2 className='text'>Текст: {text}</h2>
		<input type='Text' />
		<button tabIndex='0' >Click</button>
		<button/>    
		<label htmlFor="label"></label>
	</div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	elem,
);

//-------------------------------------------------------------------------------------------------------