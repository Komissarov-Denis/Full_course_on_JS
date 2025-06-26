import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BootstrapTest from './BootstrapTest';

import { Button } from './App';

import './index.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

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
		<BootstrapTest/>
	</StrictMode>	
);
