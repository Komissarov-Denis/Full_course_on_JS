import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

//---------------------------TEST-------------------------------
// import DisneyService from './services/DisneyService'; // тестовые запросы
// const disneyService = new DisneyService();  // вариант обработки промиса
// disneyService.getAllChars().then(result => console.log(result)); // вариант обработки промиса
// disneyService.getAllChars().then(result => result.data.results.forEach(item => console.log(item.name)));  // вариант обработки промиса
// disneyService.getChar(1011052).then(result => console.log(result));  // вариант обработки промиса
//--------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);