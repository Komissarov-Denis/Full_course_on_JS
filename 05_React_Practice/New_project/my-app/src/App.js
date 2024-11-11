import React from 'react';
// import logo from './logo.svg';
import './App.css';

const Header = () => {
	return <h2>Hello World!</h2>
}
 
// const Field = () => {
// 	const holder = 'Enter text here';
// 	const styledField = {
// 		width: '300px'
// 	};
// 	return <input 
// 			placeholder={holder} 
// 			type='text' 
// 			style={styledField}
// 			/>
// }

class Field extends React.Component {
	render() {	
		const holder = 'Enter text here';
		const styledField = {
			width: '300px'
		};
		return <input 
				placeholder={holder} 
				type='text' 
				style={styledField}
				/>
	}	
};

function Btn () {
	const text = 'Log In';
	const logged = true;
	return <button>{logged ? 'Enter' : text}</button>
}

function App() {
	return (
		<div className="App">
			<Header/>
			<Field/>
			<Btn/>
		</div>
	);
}

export {Header};
export default App;