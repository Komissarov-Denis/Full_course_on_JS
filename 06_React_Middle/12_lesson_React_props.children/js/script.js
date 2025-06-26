const DynamicGreatings = (props) => {
	return (
		<div className={'mb-3 p-3 border border-' + props.color}>
			{
				React.Children.map(props.children, child => {
					return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
				})
			}
		</div>
	)
}

function App () {
	return (
		<Wrapper>
			<DynamicGreatings color={'primary'}>
				<h2>This wheel was hard</h2>
				<h2>Hallo world</h2>
			</DynamicGreatings>
			<div className="App">
				<WhoAmI
					name = "John"
					surname = "Smith"
					link = "facebook.com"
				/>
				<WhoAmI
					name = "Alex"
					surname = "Shepard"
					link = "vk.com"
				/>
			</div>
		</Wrapper>
	);
}
export default App;