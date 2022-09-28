import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PokemonCard = ({url}) => {

    const [pokemon, setPokemon] = useState({})
    const [background, setBackground] = useState("")
    const [color, setColor] = useState("")
    const [fontSizeInfo, setFontSizeInfo] = useState('10px')
    const [fontSizeTitle, setFontSizeTitle] = useState('27px')
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get(url)
        .then(res=>{
            setPokemon(res.data)
            let pokemonTypeBackground = {
                bug: '#3c9950',
                dark: '#595978',
                dragon: '#62cad9',
                electric: '#e2e32b',
                fairy: '#e91368',
                fighting: '#ef6239',
                fire: '#fd4b5a',
                flying: '#94b3c7',
                ghost: '#906791',
                grass: '#27cb50',
                ground: '#6e491f',
                ice: '#d8f0fa',
                normal: '#ca98a6',
                poison: '#9b69da',
                psychic: '#f71d92',
                rock: '#8b3e22',
                steel: '#43bd94',
                water: '#85a8fb'
            }
            setBackground(pokemonTypeBackground[res.data.types?.[0].type?.name])
            let pokemonTypeColor = {
                bug: '#1c4b27',
                dark: '#040606',
                dragon: '#448a95',
                electric: '#63631d',
                fairy: '#961945',
                fighting: '#994025',
                fire: '#ab1f24',
                flying: '#4a677d',
                ghost: '#33336b',
                grass: '#137b3d',
                ground: '#a8702d',
                ice: '#86d2f5',
                normal: '#75525c',
                poison: '#5e2d89',
                psychic: '#a52a6c',
                rock: '#48180a',
                steel: '#60756e',
                water: '#1552e1'
            }
            setColor(pokemonTypeColor[res.data.types?.[0].type?.name])
            let newArray = res.data.types?.map((type)=> (type.type.name).length)
            if(newArray.join('')>12){
                setFontSizeInfo('9px')
            }
            if((res.data.name).length>11){
                setFontSizeTitle('22px')
            }
            if((res.data.name).length>13){
                setFontSizeTitle('20px')
            }
        })
    }, [])

    
    //console.log(pokemon);

    function firstLetter(string) {
        if (string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        } 
    }

    function separateTypes (array){
        let newArray = array?.map((type)=> firstLetter(type.type.name))
        let finalString = newArray?.join(' | ')
        return finalString;
    }
    

    return (
        <div  style={{ background: background }} className='pokemon-card' onClick={()=>navigate(`/pokedex/${pokemon.name}`)}>
           <div className="opacity">
                <div className="pokemon-container">
                    <img className='floating' src={pokemon.sprites?.other.home?.front_default} alt="" />
                    <div className='pokemon-shadow floating'></div>
                </div>

                <div className="info-container">
                    <h1 style={{ fontSize: fontSizeTitle }} className='pokemon-name'>{firstLetter(pokemon.name)}</h1>
                    <div className="pokemon-info">
                    <p className='pokemon-types pokemon-stats' style={{ color: color, fontSize: fontSizeInfo }}><b>Types: </b> {separateTypes(pokemon.types)}</p>
                    <p  style={{ color: color }}className='pokemon-stats'><b>Hp:</b> {pokemon.stats?.[0].base_stat}</p>
                    <p style={{ color: color }} className='pokemon-stats'><b>Attack:</b> {pokemon.stats?.[1].base_stat}</p>
                    <p style={{ color: color }} className='pokemon-stats'><b>Defense:</b> {pokemon.stats?.[2].base_stat}</p>
                    <p style={{ color: color }} className='pokemon-stats'><b>Speed:</b> {pokemon.stats?.[5].base_stat}</p>
                    </div>
                </div>
            </div>  

        </div>
    );
};

export default PokemonCard;