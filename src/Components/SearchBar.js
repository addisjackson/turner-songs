import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input 
    type="text" value={value} 
    onChange={onChange} 
    placeholder="Search songs"    
    />
  );
};

export default SearchBar;
