import "./Pokemonpage.css"; 
import Listap from "../components/Listap";
import { Container, Box } from "@mui/material";

export default function PokemonPage() {
  return (
    <Box className="page-background">
      <Container maxWidth="lg" className="white-card-container">
        <Listap />
      </Container>
    </Box>
  );
}