import React, { Component } from 'react';
//--------------------------------------------------------------данная конструкция называется ВСТАВКА!!!
const DynamicGreatings = (props) => { // пример props.children - передаем пустым дочерним элементам <h2/> родительского компонента <DynamicGreatings/> свойства, из уже существующих, для их динамической замены
	return ( // className={'mb-3 p-3 border border-' + props.color} - это общее свойство всего компонента <DynamicGreatings/>, а {className: 'shadow p-3 m-3 border rounded'} - это динамически меняемые свойства пустых дочерних элементов <h2/>
		<div className={'mb-3 p-3 border border-' + props.color}> 
			{
				React.Children.map(props.children, child => { // child - аргумент, ему применяем свойства бутстрапа и назначаем их на каждый клонированный элемент <DynamicGreatings/> через props.children
					return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'}) // React.cloneElement может принимать аргументы: (element, [config], [...children])
				}) // всем наследуемым потомкам передаем через props общие одинаковые свойства, это очень оптимизирует работу
			} 
		</div>
	)
}

// В props.children мы можем передавать все, что внутри <DynamicGreatings/>, все что добавляем туда передается!!!
// cloneElement - позволяет избежать мутирования, так как мы клонируем элементы

function App () {
	return (
		<Wrapper>
			<DynamicGreatings color={'primary'}>
				<h2>This wheel was hard</h2>
				<h2>Hallo world</h2>
			</DynamicGreatings>
		</Wrapper>
	);
}
//--------------------------------------------------------------
