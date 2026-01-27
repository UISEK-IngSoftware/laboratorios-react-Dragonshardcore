import { Card, CardContent, Typography, CardMedia } from "@mui/material";


export default function PokemonDataCard({ pokemon }) {
  return (
    <Card>
      {/* Imagen del Pokémon: puede venir de archivo (image) o de URL (imagen) */}
      <CardMedia
        component="img"
        image={pokemon.image ? pokemon.image : pokemon.imagen}
        alt={pokemon.nombre}
        sx={{ width: 220, height: 220, objectFit: "contain", mx: "auto" }}
      />
     {/* Contenido de la tarjeta: nombre y tipo */}
      <CardContent>
        <Typography variant="h5" align="center" sx={{ mb: 1 }}>
          {pokemon.nombre}
        </Typography>
        <Typography variant="body2"  align="center" color="text.secondary">
          Pokemon de la data local
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {pokemon.tipo}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Id: {pokemon.id}
        </Typography>
        
      </CardContent>
      
    </Card>
  );
}
