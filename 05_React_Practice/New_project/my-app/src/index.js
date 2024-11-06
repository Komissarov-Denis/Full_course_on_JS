import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

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