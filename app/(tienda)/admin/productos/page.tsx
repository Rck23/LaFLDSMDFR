
import TablaProductos from "@/components/admin/productos/TablaProductos";
import { TablaProductosITem } from "@/components/admin/productos/TablaProductosITem";
import { CrearProducto } from "@/components/productos/CrearProducto";

export default function() {
    return(
        <div>
            <CrearProducto/>
            <TablaProductosITem/>

        </div>
    )
    
    
    
}