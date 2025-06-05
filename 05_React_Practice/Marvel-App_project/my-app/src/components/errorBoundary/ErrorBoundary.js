import { Component } from "react";

class ErrorBoundary extends Component {

	state = {
		error: false,
	}    

	componentDidCatch(error, errorInfo) { // ХУК отлова ошибок с двумя аргументами error - сама ошибка, errorInfo - информация о том компоненте, в котором произошла ошибка
		console.log(error, errorInfo); // СЕЙЧАС ПРИМЕНЯЮТСЯ ERROR BOUNDARIES!!!
		this.setState({
			error: true
		})
	}

	render () { // предохранитель является оборачивающим компонентом, в который оборачивается в случае поломки текущий компонент
		if (this.state.error) { // если состояние объекта error в true, то отрендерим запасной UI - User Interface, если компонент полностью отвалился =>
			return <h2>Something went wrong!</h2>
		}

		return this.props.children; // 
	}    

}

export default ErrorBoundary;