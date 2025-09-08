//-------------------------------------------------------------

import {Container, Row, Col} from 'react-bootstrap';


//--------------------------------------------------------------данная конструкция называется ВСТАВКА!!!
const DynamicGreatings = (props) => { // пример props.children - передаем пустым дочерним элементам <h2/> родительского компонента <DynamicGreatings/> свойства, из уже существующих, для их динамической замены
	return ( // className={'mb-3 p-3 border border-' + props.color} - это общее свойство всего компонента <DynamicGreatings/>, а {className: 'shadow p-3 m-3 border rounded'} - это динамически меняемые свойства пустых дочерних элементов <h2/>
		<div className={'mb-3 p-3 border border-' + props.color}> 
			{
				React.Children.map(props.children, child => {
					return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
				}) // всем наследуемым потомкам передаем через props общие одинаковые свойства, это очень оптимизирует работу
			}
		</div>
	)
}
export default App;

//---------------------------------------------------второй вариант конструкции ВСТАВКА!!!
const BootstrapTest2 = (props) => { // в  {props.left} и {props.right} передаем значение из <BootstrapTest2/> left и right 
	return ( // через {props.left} и {props.right} в правую и левую колонки передаем соответствующий контент
		<Container className='mt-5 mb-5'>
			<Row>
				<Col>
                    {props.left} 
				</Col>
				<Col>
                    {props.right}
				</Col>
			</Row>
		</Container>
	)
}
export default BootstrapTest2;

//---------------------------------------------------------

import BootstrapTest2 from './BootstrapTest2';

function App () {
	return (
		<Wrapper>

			<BootstrapTest2
				left = {					
					<DynamicGreatings color={'primary'}>
						<h2>This wheel was hard</h2>
						<h2>Hallo world</h2>
					</DynamicGreatings>
				}
				right = {					
					<DynamicGreatings color={'primary'}>
						<h2>RIGHT!</h2>
					</DynamicGreatings>
				}
			/>
			
		</Wrapper>
	);
}
export default App;