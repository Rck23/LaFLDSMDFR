"use client";
import React, { useEffect, useRef, useState } from "react";
import api from "@/lib/axios";

export const CrearCategoria = () => {
  // Referencia para el formulario
  const formRef = useRef();

  // Estado para controlar la visibilidad de la alerta
  const [showAlert, setShowAlert] = useState(false);

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
      await api.post("/Categorias/crearCategoria", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Marcar que el modal está cerrándose
      setIsClosing(true);
      // Cerrar el modal
      document.getElementById("crearCategoria").close();
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
    document.getElementById("crearCategoria").showModal();
  };

  const closeModal = () => {
    document.getElementById("crearCategoria").close();
  };

  const showModalCategorias = () => {
    document.getElementById("mostrarCategoria").showModal();
  };

  const closeModalCategorias = () => {
    document.getElementById("mostrarCategoria").close();
  };

  return (
    <>
      <button
        className="btn btn-outline btn-success btn-md sm:btn-sm md:btn-md lg:btn-lg bg-white text-black mt-10 ml-10"
        onClick={showModal}
      >
        Crear categoria
      </button>

      <dialog
        id="crearCategoria"
        className="modal modal-middle sm:modal-middle"
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="modal-box bg-white text-black p-8">
            <h3 className="font-bold text-lg mb-4">Nueva categoria</h3>
            <p className="mb-4">Introduce el nombre de la nueva categoria.</p>
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

            <div className="modal-action">
              <button
                type="submit"
                className="btn w-1/2 btn-success text-white"
              >
                Crear Categoria
              </button>

              <button
                type="button"
                className="btn btn-error text-white w-1/2"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
            <button
              type="button"
              className="btn mt-4 w-full btn-info text-white"
              onClick={showModalCategorias}
            >
              Ver categorias creadas
            </button>
          </div>
        </form>
      </dialog>

      <dialog id="mostrarCategoria" className="modal ">
        <div className="modal-box bg-gray-100">
          <h3 className="font-bold text-lg">Categorias creadas</h3>
          <p className="py-4">
            {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    - {category.nombre}
                  </option>
                ))}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-secondary  " onClick={closeModalCategorias}>
                Cerrar
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
