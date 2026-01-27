import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PokeCard({ p, onDelete }) {
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
        image={p.image || p.imagen }
        alt={p.nombre}
        sx={{ objectFit: "contain", p: 2, bgcolor: '#fdfdfd' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
          {p.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {p.tipo} | Peso: {p.peso}kg | Altura: {p.altura}cm
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', gap: 1, px: 2, pb: 2 }}>
        {/* Botón Ver: Visible para todos */}
        <Button 
          size="small" 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(`/verp/${p.id}`)}
          startIcon={<VisibilityIcon />}
        >
          Detalles
        </Button>

        {/* Botones Protegidos: Solo visibles si isLogged es true */}
        {isLogged && (
          <>
            <Button 
              size="small" 
              variant="contained" 
              color="yellow" 
              onClick={() => navigate(`/editarp/${p.id}`)}
              startIcon={<EditIcon />}
            >
              Editar
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              color="black" 
              onClick={() => onDelete(p.id)}
              
            >
              Eliminar
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}