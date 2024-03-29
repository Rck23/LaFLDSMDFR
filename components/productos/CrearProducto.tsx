"use client";

import React, { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

export const CrearProducto = () => {
  // Referencia para el formulario
  const formRef = useRef();

  // Estado para controlar la visibilidad de la alerta
  const [showAlert, setShowAlert] = useState(false);

  const [products, setProducts] = useState([]);


  // Estado para controlar si el modal está cerrándose
  const [isClosing, setIsClosing] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/Categorias/GetCategorias");

        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar las categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obteniendo los datos del formulario
    const formData = new FormData(formRef.current);

    try {
      // Enviando los datos al endpoint
       await api.post("/Producto/crear", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await api.get("/Producto/obtenerProductos");


      setProducts(response.data);

      // Marcar que el modal está cerrándose
      setIsClosing(true);
      // Cerrar el modal
      document.getElementById("crearProduct").close();
      // Limpiar el formulario
      formRef.current.reset();
      // Marcar que el modal se ha cerrado y mostrar la alerta
      setIsClosing(false);
      setShowAlert(true);
    } catch (error) {
      // Aquí puedes manejar los errores
      console.error("Error al crear el producto:", error);
    }
  };

  // Efecto secundario para mostrar la alerta después de que el modal se haya cerrado
  useEffect(() => {
    let timer;
    if (!isClosing && showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Esperar  3 segundos antes de ocultar la alerta
    }
    return () => clearTimeout(timer);
  }, [isClosing, showAlert]);

  const showModal = () => {
    document.getElementById("crearProduct").showModal();
  };

  const closeModal = () => {
    document.getElementById("crearProduct").close();
  };

  return (
    <>
      <button
        className="btn btn-outline btn-md sm:btn-sm md:btn-md lg:btn-lg bg-white text-black mt-10"
        onClick={showModal}
      >
        Crear producto
      </button>
      <dialog id="crearProduct" className="modal modal-middle sm:modal-middle">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="modal-box bg-white text-black p-8">
            <h3 className="font-bold text-lg mb-4">Crear Producto</h3>
            <p className="mb-4">
              Complete el formulario para crear un nuevo producto.
            </p>
            {/* Campos del formulario */}
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-black mb-1"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="input-bordered w-full rounded-md border border-black bg-white shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-black mb-1"
              >
                Descripción:
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="input-bordered w-full rounded-md border border-black bg-white shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="precio"
                className="block text-sm font-medium text-black mb-1"
              >
                Precio:
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                step="0.01"
                min="0"
                className="input-bordered w-full rounded-md border border-black bg-white shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-black mb-1"
              >
                Stock:
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                className="input-bordered w-full rounded-md border border-black bg-white shadow-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="categoriaId"
                className="block text-sm font-medium text-black mb-1"
              >
                Categoria:
              </label>
              <select className="input-bordered w-full rounded-md border border-black bg-white shadow-sm" id="categoriaId"
                name="categoriaId">
                <option value="" disabled selected>
                  Selecciones categoria
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="fotos"
                className="block text-sm font-medium text-black"
              >
                Fotos:
              </label>
              <input
                type="file"
                id="fotos"
                name="fotos"
                accept="image/*"
                multiple
                className="input-bordered w-full rounded-md border border-black bg-white shadow-sm"
                required
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn  w-1/2 btn-success text-white">
                Crear Producto
              </button>
              <button
                type="button"
                className="btn btn-error text-white w-1/2"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </dialog>

      {/* Alertas de DaisyUI */}
      {showAlert && (
        <div className="fixed inset-x-0 top-50 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white rounded shadow-lg p-4">
            <span className="inline-block align-middle mr-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0  0  24  24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9  12l2  2  4-4m6  2a9  9  0  11-18  0  9  9  0  0118  0z"
                />
              </svg>
            </span>
            <span className="inline-block align-middle">
              ¡Producto creado con éxito!
            </span>
          </div>
        </div>
      )}
    </>
  );
};
