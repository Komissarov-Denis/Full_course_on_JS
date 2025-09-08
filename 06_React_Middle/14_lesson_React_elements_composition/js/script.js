//-------------------------------------------------------------
const HalloGreatings = () => { // пример композиции !!!
	return (
		<div style={{'width': '600px', 'margin': '0 auto'}}>
			<DynamicGreatings color={'primary'}>
				<h2>Hallo WIDE world</h2>
			</DynamicGreatings>
		</div>
	)
}

//---------------------------------------------------------

function App () {
	return (
		<Wrapper>	
			<HalloGreatings/> 			
		</Wrapper>
	);
}
// КОМПОЗИЦИЯ - это когда мы совмещаем компоненты и даем им новые свойства: {'width': '600px', 'margin': '0 auto'} на базе существующих, это также может называться СПЕЦИАЛИЗАЦИЕЙ!!!