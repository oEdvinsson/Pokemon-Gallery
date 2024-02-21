import React from 'react'

const Pokemon = ({ image, name, id, height, weight, type, imageBack }) => {

  return (
  <div className='card'>
    <div className='cardContent'>
      <div className='card-front'>
        <img src={image} alt={name} />
      </div>
      <div className='card-back'>
        <img src={imageBack} alt={name} />
      </div>
    </div>
    <div className='pokemon-details'>
      <ul className='list'>
        <li>
          <strong>Specimen:</strong> {name.charAt(0).toUpperCase() + name.slice(1)}
        </li>
        <li>
        <strong>Type:</strong> {type.charAt(0).toUpperCase() + type.slice(1)}
        </li>
        <li>
          <strong>Height:</strong> {height}
        </li>
        <li>
          <strong>Weight:</strong> {weight}
        </li>
        <li>
        <strong>ID:</strong> {id}
        </li>
      </ul>
    </div>
  </div>
)}

export default Pokemon