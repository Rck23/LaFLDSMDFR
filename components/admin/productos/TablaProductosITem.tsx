"use client"

import api from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";


export const TablaProductosITem = () => {

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

  const [categories, setCategories] = useState([]);
  // Obtener categorías
  useEffect(() => {
   const fetchCategories = async () => {
     try {
       const response = await api.get('/Categorias/GetCategorias');
       setCategories(response.data);
     } catch (error) {
       console.error('Error al obtener las categorías:', error);
     }
   };
   fetchCategories();
 }, []);

   // Función para encontrar el nombre de la categoría por ID
   const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'No definido';
  };
  
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md mt-10">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Nombre
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Descripción
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Categoria
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Stock
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Estatus
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Acciones
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          
        {products.map((product) => (
          <tr className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <Image
                  className="h-full w-full  object-cover object-center"
                  width={500}
                  height={500}
                  src={product.imagenes[0].url}
                  alt={product.nombre}
                />
                
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">{product.nombre}</div>
                <div className="text-gray-400">{product.precio}</div>
              </div>
            </th>
           
         
            <td className="px-6 py-4  max-w-xs truncate"> {product.descripcion}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                {getCategoryNameById(product.categoriaId)}
                </span>
                
              </div>
            </td>
            <td className="px-6 py-4">
            <div className="text-sm">
                <div className="font-medium text-gray-700"> {product.stock}</div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                {product.estatus}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex  gap-4">
                <button className="btn btn-primary">Editar</button>
                <button className="btn btn-warning">Estatus</button>
                <button className="btn btn-error">Borrar</button>
              </div>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
