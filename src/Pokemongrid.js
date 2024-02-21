import React from 'react';
import Pokemon from './Pokemon';

const Pokemongrid = ({ pokemonData }) => {
  return (
    <div className='pokemonGrid'>
      {pokemonData.map((pokemon, index) => (
        <div key={index} className='pokemonCard'>
          <Pokemon image={pokemon.image} 
           name={pokemon.name} id={pokemon.id} height={pokemon.height}
           weight={pokemon.weight} type={pokemon.type} imageBack={pokemon.imageBack} />
        </div>
      ))}
    </div>
  );
};

export default Pokemongrid;
