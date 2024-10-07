import React, { useEffect, useState } from "react";
import "../index.css"; // Asegúrate de que la ruta del archivo CSS sea correcta

function PokemonList() {
  const [currentList, setCurrentList] = useState({});
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=4&offset=0"
  );
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [totalPokemon, setTotalPokemon] = useState(0); // Para guardar el total de Pokémon

  const handleSiguiente = () => {
    setUrl(next);
  };
  const handleAnterior = () => {
    previous && setUrl(previous);
  };

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCurrentList(data);
        setNext(data.next);
        setPrevious(data.previous);
        setTotalPokemon(data.count); // Guardar el número total de Pokémon
      });
  }, [url]);

  return (
    <div>
      {currentList.results && (
        <div>
          {/* Mostrar el total de Pokémon */}
          <p>Total Pokémons: {totalPokemon}</p>

          {/* Aplicar la clase pokemon-container aquí */}
          <div className="pokemon-container">
            {currentList.results.map((pokemon) => (
              <PokemonItem key={pokemon.name} url={pokemon.url} />
            ))}
          </div>
          <div className="botones">
            <button onClick={handleAnterior} disabled={!previous}>
              Previous
            </button>
            <button onClick={handleSiguiente} disabled={!next}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PokemonItem({ url }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => setPokemonData(data));
  }, [url]);

  return (
    <div className="pokemon-item">
      {pokemonData ? (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonList;
