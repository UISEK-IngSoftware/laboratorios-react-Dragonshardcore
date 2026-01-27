import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ObtenerPokemonesbyid, ActualizarPokemon } from "../Services/PokemonServices";
import { Box, Container, TextField, Button, Typography, Stack, Paper } from "@mui/material";

export default function EditarPokemonPage() {
    const { id } = useParams(); // Sacamos el ID de la URL
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState({ nombre: "", tipo: "", peso: "", altura: "", imagen: "" });

    // 1. Cargar los datos actuales al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const res = await ObtenerPokemonesbyid(id);
                setPokemon(res.data);
            } catch (error) {
                console.error("Error al cargar datos", error);
            }
        };
        cargarDatos();
    }, [id]);

    const handleChange = (e) => setPokemon({ ...pokemon, [e.target.name]: e.target.value });

    // 2. Función para guardar los cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ActualizarPokemon(id, pokemon);
            alert("¡Actualizado con éxito!");
            navigate("/");
        } catch (error) {
            alert("Error al actualizar");
        }
    };

    return (
        <Box sx={{ pt: 10, minHeight: "100vh", bgcolor: "#f0f0f0" }}>
            <Container maxWidth="xs">
                <Paper sx={{ p: 4, borderRadius: "20px" }}>
                    <Typography variant="h5" align="center" sx={{ mb: 3 }}>Editar Pokémon</Typography>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField fullWidth label="Nombre" name="nombre" value={pokemon.nombre} onChange={handleChange} variant="filled" />
                            <TextField fullWidth label="Tipo" name="tipo" value={pokemon.tipo} onChange={handleChange} variant="filled" />
                            <TextField fullWidth label="Peso" name="peso" type="number" value={pokemon.peso} onChange={handleChange} variant="filled" />
                            <TextField fullWidth label="Altura" name="altura" type="number" value={pokemon.altura} onChange={handleChange} variant="filled" />

                            <Stack spacing={1} sx={{ my: 2 }}>
                                {/* Miniatura de la imagen actual o nueva */}
                                {pokemon.imagen && (
                                    <Box sx={{ textAlign: 'center' }}>
                                        <img src={pokemon.imagen} alt="Prev" style={{ width: 70, height: 70, borderRadius: 8, border: '1px solid #ccc' }} />
                                    </Box>
                                )}

                                {/* Campo para pegar URL directamente */}
                                <TextField
                                    fullWidth size="small" label="URL de imagen" name="imagen"
                                    value={pokemon.imagen}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />

                                {/* Botón para subir archivo local */}
                                <Button variant="outlined" component="label" fullWidth size="small" sx={{ fontSize: '0.7rem' }}>
                                    Subir Archivo
                                    <input type="file" hidden accept="image/*" onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => setPokemon({ ...pokemon, imagen: reader.result });
                                            reader.readAsDataURL(file);
                                        }
                                    }} />
                                </Button>
                            </Stack>
                            <Button fullWidth variant="contained" type="submit" color="success">
                                Guardar Cambios
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}