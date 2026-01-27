import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Antes de cada petición, axios ejecuta esta función
// Sirve para añadir automáticamente el token de autorización en los headers
axios.interceptors.request.use(

    (config) => {
        const token = localStorage.getItem("access_token"); // buscamos el token en localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // añadimos el token al header
        }
        return config; // devolvemos la configuración modificada
    },
    (error) => {
        return Promise.reject(error); // si hay error en la configuración, lo rechazamos
    }
);
export const ObtenerPokemones = () => {
    return axios.get(`${API_BASE_URL}/Pokemones/`);
};

export const ObtenerPokemonesbyid = (id) => {
    return axios.get(`${API_BASE_URL}/Pokemones/${id}/`);
};

export const CrearPokemon = (nuevoPokemon) => {
    return axios.post(`${API_BASE_URL}/Pokemones/`, nuevoPokemon); 
};

export const EliminarPokemon = (id) => {
    return axios.delete(`${API_BASE_URL}/Pokemones/${id}/`);
};

// En PokemonServices.js
export const ActualizarPokemon = (id, pokemonEditado) => {
    return axios.put(`${API_BASE_URL}/Pokemones/${id}/`, pokemonEditado);
};


