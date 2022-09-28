import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreenPokemon from "./LoadingScreenPokemon";

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [background, setBackground] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setPokemon(res.data);
      let pokemonTypeBackground = {
        bug: "#3c9950",
        dark: "#595978",
        dragon: "#62cad9",
        electric: "#e2e32b",
        fairy: "#e91368",
        fighting: "#ef6239",
        fire: "#fd4b5a",
        flying: "#94b3c7",
        ghost: "#906791",
        grass: "#27cb50",
        ground: "#6e491f",
        ice: "#d8f0fa",
        normal: "#ca98a6",
        poison: "#9b69da",
        psychic: "#f71d92",
        rock: "#8b3e22",
        steel: "#43bd94",
        water: "#85a8fb",
      };
      setBackground(pokemonTypeBackground[res.data.types?.[0].type?.name]);
      let pokemonTypeColor = {
        bug: "#1c4b27",
        dark: "#040606",
        dragon: "#448a95",
        electric: "#63631d",
        fairy: "#961945",
        fighting: "#994025",
        fire: "#ab1f24",
        flying: "#4a677d",
        ghost: "#33336b",
        grass: "#137b3d",
        ground: "#a8702d",
        ice: "#86d2f5",
        normal: "#75525c",
        poison: "#5e2d89",
        psychic: "#a52a6c",
        rock: "#48180a",
        steel: "#60756e",
        water: "#1552e1",
      };
      setColor(pokemonTypeColor[res.data.types?.[0].type?.name]);
      setTimeout(()=>{
        setIsLoading(false);
      }, 5500)
    });
  }, [name]);

  function firstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  function separateStringsType(array) {
    let types = array?.map((type) => (
      <p
        style={{
          boxShadow: `2px 2px 2px ${background}`,
          border: `2px solid ${color}`,
          color: 'white',
          background: color,
        }}
        className="pd-types-name"
      >{`${firstLetter(type.type?.name)}`}</p>
    ));
    return types;
  }

  function separateStringsAbility(array) {
    let abilities = array?.map((ability) => (
      <p
        style={{
          boxShadow: `2px 2px 2px ${background}`,
          color: 'white',
          background: color,
        }}
        className="pd-abilities-name"
      >{`${firstLetter(ability.ability?.name)}`}</p>
    ));
    return abilities;
  }

  function pokemonMovements(array) {
    let movements = array?.map((move) => (
      <p  style={{
        color: color,
      }}>{`${firstLetter(move.move?.name)}`}<div style={{
        background: color
      }}></div></p>
    ));
    return movements;
  }

  const comeBack = () => {
    navigate(-1);
  };

  console.log(pokemon);
  return isLoading ? (
    <LoadingScreenPokemon />
  ) : (
    <div
      style={{ background: background, color: color }}
      key={pokemon.id}
      className="pokemon-detail-container"
    >
      <button onClick={comeBack} className="back-button">
        <i class="fa-solid fa-caret-left"></i>
      </button>
      <div className="pd-container">
        <div className="pd-container-info">
          <div className="pokemon-img-name">
            <div
              className="pokemon-id"
              style={{ border: `2px solid ${color}`, color: color }}
            >
              <b>#</b> {pokemon.id}
            </div>
            <h1 className="pd-pokemon-name" style={{textShadow:`5px 5px 5px ${color}`}}>{firstLetter(pokemon.name)}</h1>
            <img src={pokemon.sprites?.other.home?.front_default} alt="" />
          </div>
          
            <div className="pokemon-detail-pokemon">
              <p className="data-container">
                <b>{pokemon.base_experience} </b><span className="data-pokemon" style={{textShadow:`1px 1px 1px ${color}`}}>Base Experience</span>
              </p>
              <div className="vertical-line" style={{boxShadow:`1px 1px 2px ${color}`}}></div>
              <p className="data-container">
                <b>{pokemon.weight} hectograms</b> <span className="data-pokemon" style={{textShadow:`1px 1px 1px ${color}`}}>Weight</span>
              </p>
              <div className="vertical-line" style={{boxShadow:`1px 1px 2px ${color}`}}></div>
              <p className="data-container">
                <b>{pokemon.height} decimeters</b> <span className="data-pokemon" style={{textShadow:`1px 1px 1px ${color}`}}>Height</span>
              </p>
            
          </div>
          <div className="pokemon-detail-types">
            <h1  style={{textShadow:`2px 2px 2px ${color}`}}>Type</h1>
            <div key={pokemon.id} className="pd-types">
              {separateStringsType(pokemon.types)}
            </div>
          </div>
          <div className="pokemon-detail-abilities">
            <h1 style={{textShadow:`2px 2px 2px ${color}`}}>Abilities</h1>
            <div key={pokemon.id} className="pd-abilities">
              {separateStringsAbility(pokemon.abilities)}
            </div>
          </div>
          <div className="pokemon-detail-stats-base">
            <h1 style={{textShadow:`2px 2px 2px ${color}`}}>Stats Base</h1>
            <div className="pd-hp pd-stats">
              <h3 style={{ color: 'white', textShadow:`1px 1px 1px ${color}`}}>HP:</h3>
              <div
                className="hp-score progress-bar-space"
                style={{background: color}}
              >
                <div 
                className="progress-bar-value"
                style={{ width: pokemon.stats?.[0].base_stat ? (pokemon.stats?.[0].base_stat*100)/255 +'%' : '100%', background: background }}
                data >
                </div>
              </div>
              <p className="score">{`${pokemon.stats?.[0].base_stat}/255`}</p>
            </div>
            <div className="pd-speed pd-stats">
              <h3 style={{ color: 'white', textShadow:`1px 1px 1px ${color}` }}>Speed:</h3>
              <div 
                className="speed-score progress-bar-space"
                style={{background: color}}
              >
                <div 
                className="progress-bar-value"
                style={{ width: pokemon.stats?.[5].base_stat ? (pokemon.stats?.[5].base_stat*100)/255 +'%' : '100%', background: background }}
                >
                </div>
              </div>
              <p className="score">{`${pokemon.stats?.[5].base_stat}/255`}</p>
            </div>
            <div className="pd-attack pd-stats">
              <h3 style={{ color:'white', textShadow:`1px 1px 1px ${color}` }}>Attack:</h3>
              <div
                className="attack-score progress-bar-space"
                style={{background: color}}
              >
                <div 
                className="progress-bar-value"
                style={{ width: pokemon.stats?.[1].base_stat ? (pokemon.stats?.[1].base_stat*100)/255 +'%' : '100%', background: background  }}
                >
                </div>
              </div>
              <p className="score">{`${pokemon.stats?.[1].base_stat}/255`}</p>
            </div>
            <div className="pd-defense pd-stats">
              <h3 style={{ color: 'white', textShadow:`1px 1px 1px ${color}` }}>Defense:</h3>
              <div
                className="defense-score progress-bar-space"
                style={{background: color}}
              >
                <div 
                  className="progress-bar-value"
                  style={{ width: pokemon.stats?.[2].base_stat ? (pokemon.stats?.[2].base_stat *100)/255 +'%' : '100%', background: background  }}
                >
                </div>
              </div>
                  <p className="score">{`${pokemon.stats?.[2].base_stat}/255`}</p>
            </div>
          </div>
        </div>

        <div key={pokemon.id} className="pokemon-detail-movements">
          <h1 style={{textShadow:`2px 2px 2px ${color}`}}>Movements</h1>
          <div className="movements-name">
            {pokemonMovements(pokemon.moves)}
          </div>
        </div>
      </div>

      <div className="pokeball-spinner"></div>
    </div>
  );
};

export default PokemonDetail;
