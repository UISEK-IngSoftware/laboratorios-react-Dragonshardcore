import "./EntrenadoresPage.css"; // Importas tu estilo
import Listae from "../components/Listae.jsx";
import { Container, Box } from "@mui/material";

export default function EntrenadorPage() {
  return (
    <Box className="page-background">
      <Container maxWidth="lg" className="white-card-container">
        <Listae />
      </Container>
    </Box>
  );
}