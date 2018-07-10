import React from 'react';
import '../containers/App.css'

const Scroll = (props) => {
	return (
		<div 
			style={{overflowY: 'auto', height: '500px'}}>
			{props.children}
		</div>
	)
}

export default Scroll;