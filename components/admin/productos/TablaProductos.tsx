"use client"
import api from '@/lib/axios';
import React, { useState, useEffect } from 'react';
import { TablaProductosITem } from './TablaProductosITem';
// Asegúrate de importar tu API cliente o la función que realiza la petición HTTP

const TablaProductos = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/Producto/obtenerProductos');
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);



  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap">
      {products.map((product) => (
        <TablaProductosITem key={product.id} product={product} />
      ))}
        </table>
    </div>
  );
};

export default TablaProductos;
