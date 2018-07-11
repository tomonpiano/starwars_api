import React from 'react';
import '../containers/App.css'

const Scroll = (props) => {
	return (
		<div className="fullHeight autoWidth" 
			style={{overflowY: 'auto'}}>
			{props.children}
		</div>
	)
}

export default Scroll;