import { Component } from "react";
import { ErrorMessageImg } from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {

	state = { // это основной и единственный state, у которого изначально нет ошибки error в false
		error: false,
	}    

	// static getDerivedStateFromError(error) { // данный метод возвращает объект error в состоянии true, т.е. это такой setState, который работает только с ошибкой, он обновляет только состояние
	// 	return {error: true}; // что использовать по ситуации - нужно решать самому, или getDerivedStateFromError(error), или componentDidCatch(error, errorInfo) - работают одинаково, если не нарушать правило применения
	// }

	componentDidCatch(error, errorInfo) { // ХУК отлова ошибок с двумя аргументами error - сама ошибка, errorInfo - информация о том компоненте, в котором произошла ошибка
		console.log(error, errorInfo); // СЕЙЧАС ПРИМЕНЯЮТСЯ ERROR BOUNDARIES!!!
		this.setState({
			error: true
		})
	}

	render () { // предохранитель является оборачивающим компонентом, в который оборачивается в случае поломки текущий компонент
		if (this.state.error) { // если состояние объекта error в true, то отрендерим запасной UI - User Interface, если компонент полностью отвалился =>
			return <ErrorMessageImg/>
		}

		return this.props.children; // 
	}    

}

export default ErrorBoundary;