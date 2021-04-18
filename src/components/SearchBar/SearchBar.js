import React, {useState} from 'react';
import './SearchBar.scss';

const SearchBar = () => {
  const [input, setInput] = useState('')
  return (
    <form className='SearchBar'>
      <input 
      type='text'
      placeholder='Search the store...'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
