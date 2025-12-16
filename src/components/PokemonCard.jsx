import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";

export default function PokemonCard({ pokemon }) {
    console.log("IMAGEN:", pokemon.image);
  return (
    <Card>
      <CardMedia
        component="img"
        image ={pokemon.imagen}
        alt={pokemon.nombre}
        sx={{
             width: 220,
             height: 220,
             objectFit: "contain",
             mx: "auto"   
              }}
      />

      <CardContent>
        <Typography variant="h5" align="center" sx={{ mb: 1 }}>
          {pokemon.nombre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Tipo: {pokemon.tipo}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Ver detalles</Button>
      </CardActions>
    </Card>
  );
}
