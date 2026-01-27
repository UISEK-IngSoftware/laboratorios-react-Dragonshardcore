import {Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import Login from './Login';

import PokemonPage from './Pokemonespage';
import CrearPokemonPage from './PokemonesFormpage';
import DetallePokemonPage from './DetallePokemonPage';
import EditarPokemonPage from './EditarPokemonPage';

import EntrenadorPage from './Entrenadorespage';
import CrearEntrenadorPage from './EntrenadoresFormpage';
import DetalleEntrenadorPage from './DetalleEntrenadorPage';
import EditarEntrenadorPage from './EditarEntrenadorpage';


function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        {/* El Box con flex: 1 asegura que el contenido ocupe el espacio disponible
            y el footer siempre se vaya al fondo */}
        <Box sx={{ flex: 1 }}>
          
          <Routes>
            
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<PokemonPage />} />
            <Route path="/crearp" element={<CrearPokemonPage />} />
            <Route path="/verp/:id" element={<DetallePokemonPage />} />
            <Route path="/editarp/:id" element={<EditarPokemonPage />} />
            
            <Route path="/entrenadores" element={<EntrenadorPage />} />
            <Route path="/creare" element={<CrearEntrenadorPage />} />
            <Route path="/vere/:id" element={<DetalleEntrenadorPage />} />
            <Route path="/editare/:id" element={<EditarEntrenadorPage />} />

          </Routes>
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}
export default App;