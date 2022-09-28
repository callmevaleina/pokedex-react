import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import UserInput from './components/UserInput'
import Pokemons from './components/Pokemons'
import PokemonDetail from './components/PokemonDetail'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserInput/>}/>

          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokemons/>}/>
            <Route path='/pokedex/:name' element={<PokemonDetail/>}/>
          </Route>
        </Routes>
      </div>
     </HashRouter>
  )
}

export default App
