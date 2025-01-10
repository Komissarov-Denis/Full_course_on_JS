import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Button } from './App';
import styled from 'styled-components';

const BigButton = styled(Button)`
	margin: 0 auto;
	width: 240px;
	text-align: center;
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<App/>
		<BigButton as="a">Отправить отчёт</BigButton>
	</StrictMode>	
);
