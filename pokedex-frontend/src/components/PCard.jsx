import { useState, useEffect } from "react";
// Agregado 'Stack' a los imports de MUI
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Chip, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PCard({ p, onDelete }) {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLogged(!!user);
  }, []);

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)", 
      borderRadius: '20px',
      overflow: 'hidden',
      transition: "transform 0.2s",
      "&:hover": { transform: "scale(1.02)" }
    }}>
      <Box sx={{ bgcolor: '#f5f5f5', p: 2, textAlign: 'center' }}>
        <CardMedia
          component="img"
          height="160"
          image={p.imagen || p.image }
          alt={p.nombre}
          sx={{ objectFit: "contain" }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
          {p.nombre}
        </Typography>
        
        {/* Ahora 'Stack' ya está importado correctamente */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1 }}>
            <Chip 
                label={p.tipo || "Normal"} 
                size="small" 
                color="primary" 
                variant="outlined" 
            />
        </Stack>
        
        <Typography variant="body2" color="text.secondary">
          Altura: {p.altura}m | Peso: {p.peso}kg
        </Typography>
      </CardContent>
    </Card>
  );
}