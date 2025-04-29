import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import MarvelService from './services/MarvelService';

import './style/style.scss';

const marvelService = new MarvelService(); // создаем в переменной marvelService новый экземпляр или нового потомка класса MarvelService()
marvelService.getAllCharacters().then(result => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);