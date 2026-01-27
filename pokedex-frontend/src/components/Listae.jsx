import { useEffect, useState } from "react";
import { ObtenerEntrenadores} from "../Services/EntrenadorServices";
import { Grid, Typography, Container } from "@mui/material";
import ECard from "./ECard"; 
import  {EliminarEntrenador}  from "../Services/EntrenadorServices";

export default function Listap() {
    const [en, setentrenadores] = useState([]);

    useEffect(() => {
        async function cargarentrenadores() {
            try {
                const res = await ObtenerEntrenadores();
                setentrenadores(res.data);
            } catch (error) {
                console.error("Error al traer datos:", error);
            }
        }
        cargarentrenadores();
    }, []);

    const handleBorrar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este Personaje?")) {
            try {
                await EliminarEntrenador(id);
                setentrenadores(en.filter(entrenador => entrenador.id !== id));
                alert("Eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar");
            }
        }
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 5, fontWeight: 'bold' }}>
                Entrenadores de la basa de datos 
            </Typography>

            <Grid container spacing={4}>
                {en.map((entrenadores) => (
                    <Grid item xs={12} sm={6} md={4} key={entrenadores.id}>
                        {/* Pasamos cada 'pokemon' al componente de estilo */}
                        <ECard en={entrenadores} onDelete={handleBorrar} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}