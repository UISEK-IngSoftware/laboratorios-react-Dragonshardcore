import { useState } from "react";
import { Box, Container, TextField, Button, Typography, Stack, Paper, Divider } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from "react-router-dom";
import { CrearPokemon } from "../Services/PokemonServices";
import "./PokemonesFormpage.css";

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

export default function CrearPokemonPage() {
    const [pokemon, setPokemon] = useState({ nombre: "", tipo: "", peso: "", altura: "", imagen: "" });
    const [nombreArchivo, setNombreArchivo] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setPokemon({ ...pokemon, [e.target.name]: e.target.value });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setNombreArchivo(file.name);
            const base64 = await fileToBase64(file);
            setPokemon({ ...pokemon, imagen: base64 });
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CrearPokemon(pokemon);
            alert("¡Pokémon guardado!");
            navigate("/");
        } catch (error) {
            // ESTO TE DIRÁ EL ERROR REAL
            console.error("Detalles del error:", error.response?.data);
            alert("Error de Django: " + JSON.stringify(error.response?.data));
        }
    };

    return (
        <Box className="form-container-wrapper">
            <Container maxWidth="xs">
                <Paper elevation={10} className="form-paper">
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Nuevo Pokémon
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField fullWidth label="Nombre" name="nombre" value={pokemon.nombre} onChange={handleChange} required variant="filled" />
                            <TextField fullWidth label="Tipo" name="tipo" value={pokemon.tipo} onChange={handleChange} required variant="filled" />
                            <TextField fullWidth label="Peso" name="peso" type="number" value={pokemon.peso} onChange={handleChange} required variant="filled" />
                            <TextField fullWidth label="Altura" name="altura" type="number" value={pokemon.altura} onChange={handleChange} required variant="filled" />

                            <Divider>Imagen</Divider>

                            <TextField
                                fullWidth label="Pegar URL" name="imagen"
                                value={pokemon.imagen.startsWith('data:') ? "" : pokemon.imagen}
                                onChange={handleChange} variant="outlined"
                                InputProps={{ startAdornment: <LinkIcon sx={{ mr: 1 }} /> }}
                            />

                            <Button component="label" variant="contained" className="upload-btn" startIcon={<CloudUploadIcon />}>
                                {nombreArchivo ? `Cargado: ${nombreArchivo.substring(0, 10)}...` : "Subir desde PC"}
                                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                            </Button>

                            {pokemon.imagen && (
                                <Box className="preview-box">
                                    <img src={pokemon.imagen} alt="Preview" className="preview-img" />
                                </Box>
                            )}

                            <Button fullWidth variant="contained" type="submit" className="submit-btn">
                                Guardar Pokémon
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}