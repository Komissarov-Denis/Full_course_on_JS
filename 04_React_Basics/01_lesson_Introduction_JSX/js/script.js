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
const elem = React.createElement('h2', {className: 'greetings'}, 'Hello World!');

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
// 2. ЗАПРЕЩЕНО В ПЕРЕМЕННУЮ ВСТАВЛЯТЬ ОБЪЕКТЫ, например {new Date()} - так как идет трансформация с строку и получается объект в объекте, это защита от взлома!!!

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