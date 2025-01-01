// Contiene funciones reutilizables para sumar/restar/eliminar productos.

export const preciosExtra = {
    tamaño: {
      chico: 0,
      mediano: 50,
      grande: 100,
    },
    decoracion: {
      ninguna: 0,
      frutas: 80,
      flores: 100,
      glaseado: 60,
    },
  };
  
  export function cambiarCantidad(index, operacion, carrito) {
    if (operacion === "mas") {
      carrito[index].cantidad++;
    } else if (operacion === "menos" && carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  export function eliminarProducto(index, carrito) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  