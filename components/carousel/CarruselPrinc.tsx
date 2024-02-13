"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import Image from "next/image";

export const Carousel = () => {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000); // Cambia de imagen cada   5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [products]);

  return (
    <div className="carousel w-full mb-20 mt-10">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
    // <div className="carousel w-full">
    //   {products.map((product, index) => (
    //     <div
    //       key={product.id}
    //       id={`slide-${index}`}
    //       className={`carousel-item relative w-full ${
    //         index === activeIndex ? "" : "opacity-0 invisible"
    //       }`}
    //     >
    //       <Link href={`/product/${product.id}`}>
    //         <img
    //           src={product.imagenes[0].url} // Asegúrate de que la propiedad 'url' existe en el objeto de imagen
    //           className="w-full"
    //           alt={product.nombre}
    //         />
    //       </Link>
    //       <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
    //         <a
    //           href={`#slide-${index === 0 ? products.length - 1 : index - 1}`}
    //           className="btn btn-circle"
    //         >
    //           ❮
    //         </a>
    //         <a
    //           href={`#slide-${index === products.length - 1 ? 0 : index + 1}`}
    //           className="btn btn-circle"
    //         >
    //           ❯
    //         </a>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Carousel;
