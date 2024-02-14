"use client";
import api from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoBrushOutline, IoTrashOutline } from "react-icons/io5";

export const TablaProductos = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Producto/obtenerProductos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/Categorias/GetCategorias");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Función para encontrar el nombre de la categoría por ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.nombre : "No definido";
  };

  const handleStatusChange = async (productId) => {
    try {
      await api.put(`/Producto/estatus/${productId}`);

      const response = await api.get("/Producto/obtenerProductos");

      setProducts(response.data);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const handleDeleteClick = (productId) => {
    setProductToDelete(productId);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/Producto/eliminar/${productToDelete}`);
      // Actualizar la lista de productos después de eliminar
      const response = await api.get("/Producto/obtenerProductos");
      setProducts(response.data);
      setShowAlert(false);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead className="text-gray-800">
          <tr>
            <th>
              <label>Productos</label>
            </th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-14 h-14">
                      <Image
                        className="h-full w-full  object-cover object-center"
                        width={500}
                        height={500}
                        src={product.imagenes[0].url}
                        alt={product.nombre}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{product.nombre}</div>
                  </div>
                </div>
              </td>
              <td>
                $ {product.precio}
                {/* {product.descripcion} */}
                <br />
              </td>
              <td className="">{getCategoryNameById(product.categoriaId)}</td>
              <td>{product.stock}</td>
              <td>{product.estatus}</td>
              <th>
                <div className="flex  gap-4">
                  <button
                    
                    className="btn btn-primary"
                  >
                    <IoBrushOutline />
                  </button>
                  <button
                    onClick={() => handleStatusChange(product.id)}
                    className="btn btn-warning"
                  >
                    Cambiar Estatus
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="btn btn-error"
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="alert alert-error bg-gray-200 relative group  p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="alert-content">
              <h2 className="alert-title text-red-500 font-semibold mb-1">
                Advertencia
              </h2>
              <p>
                ¿Estás seguro de que quieres eliminar este producto? Esta acción
                no se puede deshacer.
              </p>
            </div>
            <div className="alert-actions flex-shrink-0">
              <button
                className="btn btn-error text-white m-2"
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
              <button className="m-2 btn btn-ghost" onClick={closeAlert}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  {
    /*       
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
                <button className="btn btn-warning">Cambiar Estatus</button>
                <button className="btn btn-error">Borrar</button>
              </div>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
    </div> */
  }
};
