import { useEffect, useState } from "react";
import { ObtenerPokemones } from "../Services/PokemonServices";
import { Grid, Typography, Container } from "@mui/material";
import PokeCard from "./PokeCard"; // <-- Asegúrate de que la ruta sea correcta
import { EliminarPokemon } from "../Services/PokemonServices";
import { pokemonsdata } from "../data/pokemons";
import PokemonDataCard from "../components/PokemonDataCard";
export default function Listap() {
    const [p, setpokemones] = useState([]);

    useEffect(() => {
        async function cargarpokemones() {
            try {
                const res = await ObtenerPokemones();
                setpokemones(res.data);
            } catch (error) {
                console.error("Error al traer datos:", error);
            }
        }
        cargarpokemones();
    }, []);

    const handleBorrar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este Pokémon?")) {
            try {
                await EliminarPokemon(id);
                // Esto actualiza la lista en tiempo real en la pantalla
                setpokemones(p.filter(p => p.id !== id));
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
                Mi Pokedex
            </Typography>

            <Grid container spacing={4}>
                {p.map((pokemon) => (
                    <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                        {/* Pasamos cada 'pokemon' al componente de estilo */}
                        <PokeCard p={pokemon} onDelete={handleBorrar} />
                    </Grid>
                ))}
                {/* Ejemplo comentado: si quisiéramos usar datos locales en vez de la API */}
                {/*
        pokemonsdata.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
            <PokemonDataCard pokemon={pokemon} />
          </Grid>
        ))
         */}
            </Grid>
        </Container>
    );
}