import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';

import './style/style.scss';

const marvelService = new MarvelService(); // создаем в переменной marvelService новый экземпляр или нового потомка класса MarvelService()
marvelService.getAllCharacters().then(result => result.data.results.forEach(item => console.log(item.name))); // получаем массив данных персонажей, которые будут храниться в data.results, чтобы перебрать элементы массива по именам - применим метод forEach()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);