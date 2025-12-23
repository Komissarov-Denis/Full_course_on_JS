import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

//---------------------------TEST-------------------------------
// import DisneyService from './services/DisneyService'; // тестовые запросы
// const disneyService = new DisneyService();  // создаем экземпляр класса DisneyService для работы с классами, соответственно в disneyService хранится потомок класса
// disneyService.getAllChars(1).then(result => console.log(result)); // then ключевой оператор промиса++++
// disneyService.getAllChars(2).then(result => console.log(result)); // then ключевой оператор промиса++++
// disneyService.getAllChars(3).then(result => console.log(result)); // then ключевой оператор промиса++++
// disneyService.getAllChars().then(result => console.log(result.data[0])); // then ключевой оператор промиса++++
// disneyService.getAllChars().then(result => result.data.forEach(item => console.log(item.name))); // вариант обработки промиса с получением имени персонажа+++
// disneyService.getAllChars().then(result => result.data.forEach(item => console.log(item._id))); // вариант обработки промиса с получением идентификатора персонажей+++

// disneyService.getChar(308).then(result => console.log(result.data));
// disneyService.getChar(308).then(result => console.log(result.data._id)); // вариант обработки промиса с получением персонажа по идентификатору id+++
// disneyService.getChar(308).then(result => console.log(result.data.name));
// disneyService.getChar(308).then(result => console.log(result.data.imageUrl));
// disneyService.getChar(308).then(result => console.log(result.data.films));
// disneyService.getChar(308).then(result => console.log(result.data.films.length));	
// disneyService.getChar(308).then(result => console.log(result.data.shortFilms));
// disneyService.getChar(308).then(result => console.log(result.data.shortFilms.length));
// disneyService.getChar(308).then(result => console.log(result.data.tvShows));
// disneyService.getChar(308).then(result => console.log(result.data.tvShows.length));
// disneyService.getChar(308).then(result => console.log(result.data.videoGames));
// disneyService.getChar(308).then(result => console.log(result.data.videoGames.length));
// disneyService.getChar(308).then(result => console.log(result.data.parkAttractions));
// disneyService.getChar(308).then(result => console.log(result.data.parkAttractions.length));

// disneyService.getAllIds().then(result => console.log(result.length));
// disneyService.getAllIds().then(result => console.log(result));
//--------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // React.StrictMode вызывает двойной рендеринг для обнаружения сбойных событий, удваивает количество запросов к серверу, его нужно отключать при проверке
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
);