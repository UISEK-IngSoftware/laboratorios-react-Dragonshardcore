import { Box, Button, TextField, Typography, Container, Paper, Stack, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/ServicioUsuario';
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // 🔹 Mostrar spinner

        // ⚡ Permitir que React renderice el spinner antes de la petición
        setTimeout(async () => {
            try {
                const response = await login(loginData.username, loginData.password);

                if (response.status === 200) {
                    localStorage.setItem("access_token", response.data.access_token);
                    localStorage.setItem("username", loginData.username);
                    window.location.href = "/";
                }
            } catch (error) {
                alert("Usuario o contraseña incorrectos");
            } finally {
                setLoading(false); // 🔹 Ocultar spinner al terminar
            }
        }, 50);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
            }}
        >
            {/* Formulario */}
            <Container maxWidth="xs">
                <Paper elevation={10} sx={{ p: 4, borderRadius: "20px", textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                        Bienvenido
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Inicia sesión para gestionar tu Pokedex
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Usuario"
                                name="username"
                                variant="outlined"
                                value={loginData.username}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                name="password"
                                type="password"
                                variant="outlined"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                startIcon={<LoginIcon />}
                                sx={{ py: 1.5, fontWeight: "bold", borderRadius: "10px", bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" } }}
                            >
                                Iniciar Sesión
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Container>

            {/* Spinner encima del formulario */}
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'rgba(255,255,255,0.6)',
                        zIndex: 10,
                    }}
                >
                    <CircularProgress size={60} />
                </Box>
            )}
        </Box>
    );
}
