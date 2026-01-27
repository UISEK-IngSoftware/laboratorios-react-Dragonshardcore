import { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom"; 
import logoPokedex from "../assets/logoPokedex.avif";
import Spinner from "../components/Spinner"; // Tu componente Spinner.jsx

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false); // Estado local para spinner
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLogged(!!user); 
  }, []);

  const handleLogout = async () => {
    setLoading(true); // Mostrar spinner
    await new Promise(res => setTimeout(res, 500)); // simula acción
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    setIsLogged(false);
    navigate("/login");
    setLoading(false); // Ocultar spinner
  };

  const handleNavigate = async (path) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 300)); // simula delay
    navigate(path);
    setLoading(false);
  };

  return (
    <Box component="header" sx={{ backgroundColor: "#2b2b2b", textAlign: "center", pt: 2, position: "relative" }}>
      {/* LOGO */}
      <Box sx={{ position: "relative", zIndex: 1, mb: "-40px" }}>
        <img src={logoPokedex} alt="Logo" style={{ height: "135px" }} />
      </Box>

      {/* NAVBAR */}
      <Box component="nav" sx={{ py: "20px", position: "relative", zIndex: 10 }}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#3a3a3a", p: "10px 24px", borderRadius: "14px", position: "relative" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" onClick={() => handleNavigate(-1)}>Volver</Button>
              <Button onClick={() => handleNavigate("/")} sx={{ color: "white" }}>Inicio</Button>
              <Button onClick={() => handleNavigate("/entrenadores")} sx={{ color: "white" }}>Entrenadores</Button>
              
              {isLogged && (
                <>
                  <Button onClick={() => handleNavigate("/mis-pokemones")} sx={{ color: "white" }}>Mis Pokemones</Button>
                  <Button onClick={() => handleNavigate("/crearp")} sx={{ color: "white" }}>Agregar pokemones</Button>
                  <Button onClick={() => handleNavigate("/creare")} sx={{ color: "white" }}>Agregar entrenador</Button>
                </>
              )}
            </Box>

            {isLogged ? (
              <Button 
                variant="contained" 
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ bgcolor: "#d32f2f", borderRadius: "10px", "&:hover": { bgcolor: "#b71c1c" } }}
              >
                Cerrar Sesión
              </Button>
            ) : (
              <Button 
                variant="contained" 
                component={Link} 
                to="/login"
                startIcon={<LoginIcon />}
                sx={{ bgcolor: "#2e7d32", borderRadius: "10px", "&:hover": { bgcolor: "#1b5e20" } }}
              >
                Iniciar Sesión
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Spinner centrado en toda la pantalla */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.6)",
            zIndex: 9999,
          }}
        >
          <Spinner />
        </Box>
      )}
    </Box>
  );
}
