// lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7171/api', // Reemplaza con la URL base de tu API
  timeout:  5000, // Establece un tiempo límite para las solicitudes (en milisegundos)
  
});

export default api;
