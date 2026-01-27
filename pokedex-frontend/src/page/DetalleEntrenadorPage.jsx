import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ObtenerEntrenadoresbyid } from "../Services/EntrenadorServices";
import { ObtenerMispokemones } from "../Services/MispokemonesServices"; // Importamos el servicio de Pokemones
import { Box, Container, Typography, Paper, Button, Chip, Stack, Grid, Divider } from "@mui/material";
import PCard from "../components/PCard"; // Reutilizamos tu tarjeta de Pokemon

export default function DetalleEntrenadorPage() {
    const { id } = useParams();
    const [entrenador, setEntrenador] = useState(null);
    const [susPokemones, setSusPokemones] = useState([]); // Estado para la lista filtrada
    const navigate = useNavigate();

    useEffect(() => {
        const cargarTodo = async () => {
            
                const resEntrenador = await ObtenerEntrenadoresbyid(id);
                setEntrenador(resEntrenador.data);
                const resPokes = await ObtenerMispokemones();
                
                if (resPokes.data) {
                    const filtrados = resPokes.data.filter(p => Number(p.entrenador) === Number(id));
                    setSusPokemones(filtrados);
                }

        

            } 
    
        cargarTodo();
    }, [id]);

    if (!entrenador) return <Typography align="center" sx={{ mt: 5 }}>Cargando...</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
            {/* SECCIÓN DEL ENTRENADOR */}
            <Paper elevation={2} sx={{ p: 4, borderRadius: "10px", mb: 1 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Box component="img" src={entrenador.imagen} alt={entrenador.nombre}
                            sx={{ width: "80%", borderRadius: "50%", aspectRatio: "1/1", objectFit: "cover", border: "4px solid #1976d2" }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" fontWeight="bold">{entrenador.nombre} {entrenador.apellido}</Typography>
                        <Chip label={`Nivel: ${entrenador.nivel}`} color="primary" sx={{ mb: 2 }} />
                        <Typography variant="body1" sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: "10px" }}>
                            {entrenador.descripciones || "Sin biografía."}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Divider sx={{ mb: 4 }}><Chip label="SU EQUIPO POKÉMON" /></Divider>

            {/* SECCIÓN DE SUS POKEMONES */}
            <Grid container spacing={2}>
                {susPokemones.length > 0 ? (
                    susPokemones.map(p => (
                        <Grid item xs={12} sm={6} md={4} key={p.id}>
                            <PCard p={p} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography align="center" color="textSecondary">Este entrenador aún no tiene pokémones.</Typography>
                    </Grid>
                )}
            </Grid>

            <Button fullWidth variant="outlined" sx={{ mt: 5 }} onClick={() => navigate("/entrenadores")}>
                Volver a la lista
            </Button>
        </Container>
    );
}