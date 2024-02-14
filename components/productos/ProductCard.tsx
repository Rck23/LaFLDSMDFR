import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {

  const [displayImage, setDisplayImage ] = useState( product.imagenes[0].url);
  return (
    <div className="rounded-md overflow-hidden fade-in bg-gray-100 ">
      
      <Link href={`/product/${product.id}`}>
        <Image
          className="w-full object-cover rounded"
          width={500}
          height={500}
          src={product.imagenes[0].url}
          alt={product.nombre}

          //     onMouseEnter={ () => setDisplayImage(product.imagenes[1].url)}
          // onMouseLeave={ () => setDisplayImage(product.imagenes[0].url)}
        />
      </Link>
      <div className="p-4 flex flex-col">
        {/* ... otros elementos ... */}
        {product.estatus === 'NoDisponible' && (
          <span className="text-red-500">No Disponible</span>
        )}
        
      </div>
      <div className="p-4 flex flex-col " >
        <Link className="hover:text-blue-700" href={`products/${product.id}`}>
          {product.nombre}
        </Link>

        <span className="font-bold mb-5">${product.precio}</span>
        <div className="mt-2 text-gray-800 max-w-prose overflow-wrap break-words">
          {product.descripcion}
        </div>
      </div>
      {/* <div className="p-4 flex flex-col">
        <h2 className="text-xl text-gray-800 font-semibold">
          {product.nombre}
        </h2>
        <div className="mt-2 text-gray-600 max-w-prose overflow-wrap break-words">
          {product.descripcion}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-gray-800 text-lg m-4">
            ${product.precio}
          </span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Ver detalles
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ProductCard;
