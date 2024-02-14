"use client";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Usuario/GetUsuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchProducts();
  }, []);

  const [avatares, setAvatares] = useState([]);
  // Obtener categorías
  useEffect(() => {
   const fetchAvatares = async () => {
     try {
       const response = await api.get('/Avatar/getAvatars');
       setAvatares(response.data);
     } catch (error) {
       console.error('Error al obtener las categorías:', error);
     }
   };
   fetchAvatares();
 }, []);

   // Función para encontrar el nombre de la categoría por ID
   const getAvatarImagenById = (avatarId) => {
    const category = avatares.find(cat => cat.id === avatarId);
    return category ? category.avatarUrl : 'No definido';
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead className="text-gray-800">
          <tr>
            <th>
              <label>Usuarios</label>
            </th>
            <th>Correo electrónico</th>
            <th>Telefono</th>
            <th>Rol</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <Image
                        className="h-full w-full  object-cover object-center"
                        width={500}
                        height={500}
                        src={getAvatarImagenById(usuario.avatarId)}
                        alt={usuario.nombre}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{usuario.nombre}</div>
                    <div className="text-sm">{usuario.apellidos}</div>
                  </div>
                </div>
              </td>
              <td>
                {usuario.email}
                <br />
              </td>
              <td>{usuario.telefono}</td>
              <td>{usuario.roles}</td>
              <td>{usuario.estatus}</td>
              <th>
                <div className="flex  gap-4">
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-warning">Cambiar Estatus</button>
                  <button className="btn btn-error">Cambiar Rol</button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
