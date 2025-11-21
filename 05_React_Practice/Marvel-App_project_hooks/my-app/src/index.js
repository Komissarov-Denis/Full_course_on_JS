import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

//---------------------------TEST-------------------------------
// import MarvelService from './services/MarvelService'; // тестовые запросы
// const marvelService = new MarvelService();  // вариант обработки промиса
// marvelService.getAllChars().then(result => console.log(result)); // вариант обработки промиса
// marvelService.getAllChars().then(result => result.data.results.forEach(item => console.log(item.name)));  // вариант обработки промиса
// marvelService.getChar(1011052).then(result => console.log(result));  // вариант обработки промиса
//--------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);