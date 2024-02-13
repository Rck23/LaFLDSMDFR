
// Importa el componente 'Menu' que se utiliza para mostrar el menú desplegable.
import Menu from './Menu';

// Define el componente 'Header' que se renderizará como la cabecera de la aplicación.
export const Header = () => {
  // Retorna el JSX que representa la estructura de la cabecera.
  return (
    <header>
      {/* Elemento 'nav' que contiene la navegación principal de la aplicación. */}
      <nav>  
        {/* Div que actúa como contenedor para la barra de navegación. */}
        <div className='navbar flex justify-between items-center'>
         
          {/* Componente 'Menu' que se renderiza para mostrar el menú desplegable. */}
          <Menu/>
        </div>
      </nav>
    </header>
  );
}