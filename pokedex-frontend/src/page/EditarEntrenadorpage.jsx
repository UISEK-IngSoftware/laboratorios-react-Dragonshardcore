import { useState, useEffect } from "react";
import { Box, Container, TextField, Button, Typography, Stack, Paper, Divider } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate, useParams } from "react-router-dom";
import { ActualizarEntrenador, ObtenerEntrenadoresbyid } from "../Services/EntrenadorServices";


const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export default function EditarEntrenadorPage() {
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
    const { id } = useParams();

    
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const res = await ObtenerEntrenadoresbyid(id);
                setEntrenador(res.data);
            } catch (error) {
                console.error("Error al cargar datos del entrenador:", error);
            }
        };
        cargarDatos();
    }, [id]);

   
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
            
            await ActualizarEntrenador(id, entrenador);
            alert("¡Entrenador actualizado con éxito!");
            navigate("/entrenadores"); 
        } catch (error) {
            console.error("Error en la actualización:", error.response?.data);
            alert("No se pudo actualizar: " + JSON.stringify(error.response?.data));
        }
    };

    return (
        <Box sx={{ py: 5, minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            <Container maxWidth="xs">
                <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
                    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
                        Editar Perfil de Entrenador
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <TextField fullWidth label="Nombre" name="nombre" value={entrenador.nombre} onChange={handleChange} required variant="outlined" />
                            
                            <TextField fullWidth label="Apellido" name="apellido" value={entrenador.apellido} onChange={handleChange} required variant="outlined" />
                            
                            <TextField fullWidth label="Nivel" name="nivel" type="number" value={entrenador.nivel} onChange={handleChange} required variant="outlined" />

                            <TextField fullWidth label="Edad" name="edad" type="number" value={entrenador.edad} onChange={handleChange} required variant="outlined" />
                            
                            <TextField 
                                fullWidth label="Fecha de Nacimiento" name="fecha_de_nacimiento" 
                                type="date" value={entrenador.fecha_de_nacimiento} onChange={handleChange} 
                                required variant="outlined" InputLabelProps={{ shrink: true }} 
                            />
                            
                            <TextField fullWidth label="Descripción" name="descripciones" multiline rows={3} value={entrenador.descripciones} onChange={handleChange} variant="outlined" />

                            <Divider sx={{ my: 1 }}>Imagen de Perfil</Divider>

                            <TextField
                                fullWidth label="URL de la Foto" name="imagen"
                               
                                value={entrenador.imagen?.startsWith('data:') ? "Imagen cargada desde archivo" : entrenador.imagen}
                                onChange={handleChange} variant="outlined" size="small"
                                InputProps={{ startAdornment: <LinkIcon sx={{ mr: 1, color: 'gray' }} /> }}
                            />

                            <Button component="label" variant="outlined" color="info" startIcon={<CloudUploadIcon />} sx={{ textTransform: 'none' }}>
                                {nombreArchivo ? `Seleccionado: ${nombreArchivo.substring(0, 15)}...` : "Subir nueva foto"}
                                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                            </Button>

                            {/* VISTA PREVIA CIRCULAR */}
                            {entrenador.imagen && (
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <img 
                                        src={entrenador.imagen} 
                                        alt="Previsualización" 
                                        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #1976d2' }} 
                                    />
                                </Box>
                            )}

                            <Button fullWidth variant="contained" type="submit" color="primary" size="large" sx={{ fontWeight: 'bold', mt: 2 }}>
                                Guardar Cambios
                            </Button>

                            <Button fullWidth variant="text" color="inherit" onClick={() => navigate(-1)}>
                                Cancelar
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}