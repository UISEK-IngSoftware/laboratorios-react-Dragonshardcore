import { Box, Container, Typography, IconButton, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "#2b2b2b", 
        color: "white", 
        py: 4, 
        mt: "auto", // Empuja el footer al final si usas Flexbox en el contenedor padre
        borderTop: "3px solid #3a3a3a"
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems="center" 
          spacing={2}
        >
          {/* LADO IZQUIERDO: TEXTO */}
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffcb05" }}>
              Pokédex App
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} - Desarrollado por Charlie.Corps
            </Typography>
          </Box>

          

          {/* LADO DERECHO: INFO EXTRA */}
          <Typography variant="caption" sx={{ opacity: 0.5, textAlign: { xs: "center", sm: "right" } }}>
            Pokémon y los nombres de los personajes son <br />
            marcas registradas de Nintendo.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}