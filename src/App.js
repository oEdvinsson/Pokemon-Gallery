import { useEffect, useState } from 'react';
import './App.css';
import Pokemongrid from './Pokemongrid';
import Search from './Search';
import Pikachu from './Images/pikachuGIF.gif';
import Loading from './Images/loading-gif.gif';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        if (query.trim() === '') {
          // Fetch data for the first 151 Pokémon (IDs 1 to 151)
          const pokemonIds = Array.from({ length: 151 }, (_, index) => index + 1);
          // Map over each Pokemon ID and fetch its data asynchronously
          const pokemonDataPromises = pokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            return {
              name: data.name,
              id: data.id,
              height: data.height,
              weight: data.weight,
              type: data.types[0].type.name,
              image: data.sprites.front_default,
              imageBack: data.sprites.back_default
            };
          });
          // Wait for all promises to resolve
          const pokemonData = await Promise.all(pokemonDataPromises);
          // Once all data is fetched, update state with the fetched Pokemon data
          setPokemonData(pokemonData);
        } else {
         // Fetch data based on the query
         const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
         if (response.ok) {
           const data = await response.json();
           const filteredPokemon = data.results.filter(pokemon => pokemon.name.startsWith(query.toLowerCase()));
           const pokemonDataPromises = filteredPokemon.map(async (pokemon) => {
             const response = await fetch(pokemon.url);
             const data = await response.json();
             return {
               name: data.name,
               id: data.id,
               height: data.height,
               weight: data.weight,
               type: data.types[0].type.name,
               image: data.sprites.front_default,
               imageBack: data.sprites.back_default
             };
           });
           const pokemonData = await Promise.all(pokemonDataPromises);
           setPokemonData(pokemonData);
         } else {
           // If the response is not okay, reset pokemonData
           setPokemonData([]);
         }
       }
     } catch (error) {
       console.error('Error fetching Pokemon data:', error);
     }  finally {
      setLoading(false); 
    }
   };
   fetchPokemonData();
 }, [query]);

  const filterGallery = (query) => {
    setQuery(query);
  }

  return (
    <div className="App">
      <div className='headerContainer'></div>
      <div className='contentContainer'>
        {!loading && <Search filterGallery={filterGallery} />}
        {loading ? (
          <img src={Loading} className='loading-image' alt="Loading..." />
        ) : pokemonData.length > 0 ? <Pokemongrid pokemonData={pokemonData} /> : <img src={Pikachu} className='pikachu' alt="Pikachu" />}
      </div>
      <span className="copyright">All rights reserved &copy; Oscar Edvinsson</span>
    </div>
  );
  
  }

export default App;
