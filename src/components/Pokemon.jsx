import React, { useEffect, useState } from "react";

function Pokemon() {
  const [pokemon, setPokemon] = useState();
  const [id, setId] = useState(1);

  const handleAnterior = () => {
    id > 1 && setId(id - 1);
  };

  const handleSiguiente = () => {
    setId(id + 1);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);

  return (
    <div>
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <p>ID: {pokemon.id}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <br />
          {
          id > 1 ? <button onClick={handleAnterior}>anterior</button> : <button disabled >Anterior</button> 
          }
          <button onClick={handleSiguiente}>siguiente</button>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
