import Header from './components/Header'
import './App.css'
import { Container, Grid } from "@mui/material"
import PokemonCard from './components/PokemonCard'
import {pokemons} from './data/pokemons'
import Pokemonlist from './components/Pokemonlist'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import PokemonForm from './components/PokemonForm'

function App() {
  return (
    <>
      <Header title="Pokedex" /> 
      <Container>
        
        <BrowserRouter>
          
          <Routes>
            
            <Route path="/" element={<Pokemonlist />} />
            <Route path="/add-pokemon" element={<PokemonForm />} />
          
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;


