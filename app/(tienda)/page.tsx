import Carousel from "@/components/carousel/CarruselPrinc";
import { Header } from "@/components/header/Hearder";
import { CrearProducto } from "@/components/productos/CrearProducto";
import ProductGrid from "@/components/productos/ProductGrid";

export default function Home() {
  return (
    <main className="m-10">
      <Carousel />
      <ProductGrid/>

     
    </main>
  );
}
