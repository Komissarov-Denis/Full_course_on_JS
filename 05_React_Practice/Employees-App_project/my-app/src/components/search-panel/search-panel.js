import { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: '', // передаем состояние term выше по иерархии через объект состояния state в компонент App
        }
    }
 
    onUpdateSearch = (e) => { // метод служит для корректной работы и управляемости компонента SearchPanel и синхронизации поля поиска input с локальным this.state = {term: ''}, т.е. передача идет не только наверх в App, но и содержится внутри компонента SearchPanel
        const term = e.target.value; // создаем переменную, зависящую от события (е), получаем в term значение, которое вводит пользователь в строку поиска input
        this.setState({term}); // устанавливает локальное состояние this.state = {term: ''}, которое можем сразу передать в render() в поле input через value={this.setState.term}
        this.props.onUpdateSearch(term); // передаем в App значение value={this.setState.term}
    }

    render () {
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="Найти сотрудника: "
                value={this.setState.term}
                onChange={this.onUpdateSearch} // отслеживаем событие изменения в строке input
            />
        );
    }

} 
export default SearchPanel;