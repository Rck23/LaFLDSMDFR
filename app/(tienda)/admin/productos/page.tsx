
import { TablaProductos } from "@/components/admin/productos/TablaProductos";
import { CrearCategoria } from "@/components/categorias/CrearCategoria";
import { CrearProducto } from "@/components/productos/CrearProducto";

export default function() {
    return(
        <div>
            <CrearProducto/>
            <CrearCategoria/>
            <TablaProductos/>

        </div>
    )
    
    
    
}