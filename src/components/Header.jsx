import { AppBar, Toolbar, Container, Button } from "@mui/material";
import logo from '../assets/logo.jpg';
import './header.css';


export default function Header({ title }) {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", alignItems: "center" }}>
                <div className="imagen-container">
                    <img src={logo} alt="Logo de la Pokedex" className="pokedex-logo" />
                </div>
               
            </Toolbar>

            <Toolbar gutterBottom sx={{ backgroundColor: 'primary.dark' }}>
                <Container sx={{ display: 'flex', gap: 3 }}>
                    <Button  color="inherit" href="/"> Inicio </Button>

                    <Button color="inherit" href="/add-pokemon"> Agregar Pokemon </Button>
                </Container>
            </Toolbar>
            
        </AppBar>
    );
}
