import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ECard({ en, onDelete }) {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  // Verificamos si hay sesión activa al cargar la tarjeta
  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLogged(!!user);
  }, []);

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: '15px' }}>
      <CardMedia
        component="img"
        height="180"
        image={en.image || en.imagen }
        alt={en.nombre}
        sx={{ objectFit: "contain", p: 2, bgcolor: '#fdfdfd' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
          {en.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Ajustado para datos de entrenadores */}
          apellido: {en.apellido } | edad: {en.edad }
        </Typography> 
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', gap: 1, px: 2, pb: 2 }}>
        {/* Botón Ver: Visible para todos */}
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(`/vere/${en.id}`)}
        >
          Detalles
        </Button>

        {/* Botones Protegidos: Solo visibles si isLogged es true */}
        {isLogged && (
          <>
            <Button 
              size="small" 
              variant="contained" 
              color="warning" 
              onClick={() => navigate(`/editare/${en.id}`)}
            >
              Editar
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              sx={{ color: 'black', borderColor: 'black' }} 
              onClick={() => onDelete(en.id)}
            >
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}