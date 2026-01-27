import { useState } from "react";
import { Box, Container, TextField, Button, Typography, Stack, Paper, Divider } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from "react-router-dom";
import { CrearEntrenador } from "../Services/EntrenadorServices";
import "./EntrenadoresPage.css";

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

export default function CrearEntrenadorPage() {
    // 1. Estado corregido con los campos de Entrenador
    const [entrenador, setEntrenador] = useState({ 
        nombre: "", 
        apellido: "", 
        edad: "", 
        nivel: "", 
        fecha_de_nacimiento: "", 
        descripciones: "", 
        imagen: "" 
    });
    const [nombreArchivo, setNombreArchivo] = useState("");
    const navigate = useNavigate();

    // 2. handleChange usa 'entrenador'
    const handleChange = (e) => {
        setEntrenador({ ...entrenador, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setNombreArchivo(file.name);
            const base64 = await fileToBase64(file);
            setEntrenador({ ...entrenador, imagen: base64 });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CrearEntrenador(entrenador);
            alert("¡Entrenador guardado con éxito!");
            navigate("/entrenadores"); // Redirige a la lista de entrenadores
        } catch (error) {
            console.error("Detalles del error:", error.response?.data);
            alert("Error de Django: " + JSON.stringify(error.response?.data));
        }
    };

    return (
        <Box className="form-container-wrapper" sx={{ py: 5 }}>
            <Container maxWidth="xs">
                <Paper elevation={10} className="form-paper" sx={{ p: 3, borderRadius: 4 }}>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
                        Nuevo Entrenador
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            {/* Campos ajustados al modelo Entrenador */}
                            <TextField fullWidth label="Nombre" name="nombre" value={entrenador.nombre} onChange={handleChange} required variant="filled" />
                            <TextField fullWidth label="Apellido" name="apellido" value={entrenador.apellido} onChange={handleChange} required variant="filled" />
                            <TextField fullWidth label="Edad" name="edad" type="number" value={entrenador.edad} onChange={handleChange} required variant="filled" />
                            <TextField fullWidth label="Nivel" name="nivel" type="number" value={entrenador.nivel} onChange={handleChange} required variant="filled" />
                            <TextField 
                                fullWidth label="Fecha de Nacimiento" name="fecha_de_nacimiento" 
                                type="date" value={entrenador.fecha_de_nacimiento} onChange={handleChange} 
                                required variant="filled" InputLabelProps={{ shrink: true }} 
                            />
                            <TextField fullWidth label="Descripción" name="descripciones" multiline rows={2} value={entrenador.descripciones} onChange={handleChange} variant="filled" />

                            <Divider sx={{ my: 1 }}>Imagen</Divider>

                            <TextField
                                fullWidth label="Pegar URL de Foto" name="imagen"
                                value={entrenador.imagen.startsWith('data:') ? "" : entrenador.imagen}
                                onChange={handleChange} variant="outlined" size="small"
                                InputProps={{ startAdornment: <LinkIcon sx={{ mr: 1 }} /> }}
                            />

                            <Button component="label" variant="outlined" color="primary" startIcon={<CloudUploadIcon />}>
                                {nombreArchivo ? `Foto: ${nombreArchivo.substring(0, 10)}...` : "Subir desde PC"}
                                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                            </Button>

                            {/* Vista previa de la imagen */}
                            {entrenador.imagen && (
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <img src={entrenador.imagen} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1976d2' }} />
                                </Box>
                            )}

                            <Button fullWidth variant="contained" type="submit" color="success" sx={{ mt: 2, fontWeight: 'bold' }}>
                                Guardar Entrenador
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}