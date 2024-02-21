import React, { useState } from 'react'

const Search = ({ filterGallery }) => {
    const [text, setText] = useState('');

    const onChange = (text) => {
        setText(text);
        filterGallery(text);
    }

  return (
    <div className='search'>
        <input className='input' placeholder='Search for pokémons...' value={text} 
        onChange={(e) => onChange(e.target.value)}></input>
    </div>
  )
}

export default Search