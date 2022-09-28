import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import { useNavigate } from "react-router-dom";
import pokedexLogo from '../assets/pokedexLogo.png';
import ReactPaginate from 'react-paginate';
import LoadingScreenPokemons from "./LoadingScreenPokemons";

const Pokemons = () => {
  const userName = useSelector((state) => state.userName);
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nameInput, setNameInput] = useState("");
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154`)
      .then((res) => {
        setPokemons(res.data.results);
        setTimeout(()=>{
            setIsLoading(false);
        }, 3000)
      });

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypesList(res.data.results));
  }, []);

  //console.log(pokemons);
  //console.log(typesList);

  const searchName = () => {
    navigate(`/pokedex/${nameInput}`);
  };

  const searchTypes = (typeUrl) => {
    if (typeUrl) {
      axios.get(typeUrl).then((res) => setPokemons(res.data?.pokemon));
    } else {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1154`)
        .then((res) => setPokemons(res.data.results));
    }
  };

  console.log(pokemons);

  function firstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
  }

  const comeBack = () =>{
    navigate(-1)
  }

  const [page, setPage] = useState(1);
  const pokemonPerPage = 12;
  const lastPokemonIndex = page * pokemonPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonPerPage;
  const pokemonPaginated = pokemons.slice(firstPokemonIndex, lastPokemonIndex);
  const totalPages = Math.ceil(pokemons.length / pokemonPerPage);
  // const pagesNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pagesNumbers.push(i);
  // }

  const changePage = ({selected})=>{
    setPage(selected+1)
  };

  return isLoading ? (
    <LoadingScreenPokemons />
  ) : (
    <div className="container">
      <div className="header-pokemons">
        <button onClick={comeBack} className="exit-btn">
            <i className="fa-solid fa-right-from-bracket"></i>
        </button>
        <img src={pokedexLogo} alt="" />
        <h1>
          Welcome <span>{firstLetter(userName)}</span>!{" "}
        </h1>
        <h2>Here you can find your favorite pokemon!</h2>
        <div className="search-select-container">
          <div className="search-select-3d">
            <div className="search-pokemon-container">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Search by name"
              />
              <button onClick={searchName}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="select-option">
              <select
                className="pokemon-type"
                id="pokemon-type"
                onChange={(e) => searchTypes(e.target.value)}
              >
                <option value="">All Pokemon</option>
                {typesList.map((type) => (
                  <option value={type.url} key={type.name}>
                    {firstLetter(type.name)}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-angle-down"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="pokemons-container">
        {pokemonPaginated.map((pokemon) => (
          <PokemonCard
            url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
            key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
          />
        ))}
      </div>
      {/* <div className="pages-btns">
        <button
          className="prev-next"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <div className="pages-container">
          {pagesNumbers.map((number, index) => (
            <button key={number} id={index + 1} className="page-number" onClick={() => setPage(number)}>
              {number}
            </button>
          ))}
        </div>

        <button
          className="prev-next"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div> */}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={totalPages}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default Pokemons;
