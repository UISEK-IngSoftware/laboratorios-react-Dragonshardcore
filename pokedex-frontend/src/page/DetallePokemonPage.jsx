import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ObtenerPokemonesbyid } from "../Services/PokemonServices";
import { Box, Container, Typography, Paper, Button, Chip, Stack } from "@mui/material";


export default function DetallePokemonPage() {
    const { id } = useParams(); 
    const [pokemon, setPokemon] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarPokemon = async () => {
            try {
                const res = await ObtenerPokemonesbyid(id);
                setPokemon(res.data);
            } catch (error) {
                console.error("Error al cargar detalles", error);
            }
        };
        cargarPokemon();
    }, [id]);

    if (!pokemon) return <Typography align="center" sx={{ mt: 5 }}>Cargando datos del Pokémon...</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 5, pb: 5 }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: "20px", textAlign: "center" }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    {pokemon.nombre}
                </Typography>
                
                <Box 
                    component="img"
                    src={pokemon.imagen} 
                    alt={pokemon.nombre}
                    sx={{ width: "100%", maxHeight: "300px", objectFit: "contain", my: 3 }}
                />

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                    <Chip label={`Tipo: ${pokemon.tipo}`} color="primary" sx={{ fontSize: "1rem" }} />
                </Stack>

                <Box sx={{ bgcolor: "#f5f5f5", p: 3, borderRadius: "10px", textAlign: "left" }}>
                    <Typography variant="body1"><strong>Peso:</strong> {pokemon.peso} kg</Typography>
                    <Typography variant="body1"><strong>Altura:</strong> {pokemon.altura} cm</Typography>
                </Box>

                <Button 
                    fullWidth 
                    variant="outlined" 
                    sx={{ mt: 4 }} 
                    onClick={() => navigate("/")}
                >
                    Volver a la Pokedex
                </Button>
            </Paper>
        </Container>
    );
}