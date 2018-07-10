import React from 'react';

const SearchBox = ({searchField, searchChange}) => {
	return (
		<input 
			type='search' 
			placeholder='enter search text'
			onChange={searchChange}
		/>		
	);
}

export default SearchBox;