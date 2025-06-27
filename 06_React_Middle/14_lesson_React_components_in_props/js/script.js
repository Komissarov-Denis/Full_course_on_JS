//-------------------------------------------------------------
import {Container, Row, Col} from 'react-bootstrap';

const BootstrapTest2 = (props) => {
	return (
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