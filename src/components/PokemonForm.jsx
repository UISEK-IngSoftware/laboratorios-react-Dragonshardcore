import {Box, Typography, Button, TextField} from '@mui/material';

export default function PokemonForm(){
    return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pokemon Form
      </Typography>
      <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <TextField label="Nombre" variant="outlined" />
        <TextField label="Tipo" variant="outlined" />
        <TextField label="Peso" variant="outlined" type="number" />
        <TextField label="Altura" variant="outlined" type="number" />
        <input type="file" name="imagen" accept="image/*" required />
        <Button type="submit" variant="contained" color="primary" > Guardar </Button> 
      </Box>
    </div>
  );
} 

  
    




