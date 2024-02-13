import api from "@/lib/axios";

export const ObtenerProductos = async () => {
  try {
    const response = await api.get('/Producto/obtenerProductos');
    console.log(response.data);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
};


