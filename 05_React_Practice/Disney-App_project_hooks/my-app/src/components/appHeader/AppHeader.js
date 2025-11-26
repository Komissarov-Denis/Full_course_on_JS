import './appHeader.scss';

import logo from '../../resources/img/disney_logo_main.gif';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Disney</span> information portal
                </a>
            </h1>
            <img src={logo} alt="disney-logo" className="app__decoration"/>
            <nav className="app__menu">
                <ul>
                    <li><a href="#">Characters</a></li>
                    <span>/</span>
                    <li><a href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;