// Gestiona la actualización y eventos del carrito.

import { carrito } from "./main.js";
import { cambiarCantidad, eliminarProducto } from "./utils.js";

// Delegación de eventos para botones del carrito
document.getElementById("listaPedidos").addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("boton-mas")) {
    cambiarCantidad(index, "mas", carrito);
    actualizarCarrito();
  }
  if (e.target.classList.contains("boton-menos")) {
    cambiarCantidad(index, "menos", carrito);
    actualizarCarrito();
  }
  if (e.target.classList.contains("eliminar")) {
    eliminarProducto(index, carrito);
    actualizarCarrito();
  }
});

// **Agregar Event Listeners para Vaciar y Finalizar Compra**
const vaciarBtn = document.getElementById("vaciarCarrito");
const finalizarBtn = document.getElementById("finalizarCompra");

if (vaciarBtn) {
  vaciarBtn.addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito();
    localStorage.removeItem("carrito");
    Swal.fire("Carrito Vaciado", "Tu carrito ha sido vaciado.", "info");
  });
}

if (finalizarBtn) {
  finalizarBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire(
        "Carrito vacío",
        "Añade productos antes de finalizar.",
        "warning"
      );
      return;
    }
    Swal.fire("Compra Realizada", "Gracias por tu pedido", "success");
    carrito.length = 0;
    actualizarCarrito();
    localStorage.removeItem("carrito");
  });
}

// **Actualización del Carrito (Exportable)**
export function actualizarCarrito() {
  const lista = document.getElementById("listaPedidos");
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="detalles">
        ${producto.nombre} - Tamaño: ${producto.tamaño}, Decoración: ${
      producto.decoracion
    }
        <div class="cantidad">
          <button class="boton-menos" data-index="${index}">-</button>
          <span class="cantidad-num">${producto.cantidad}</span>
          <button class="boton-mas" data-index="${index}">+</button>
        </div>
      </div>
      <div class="precio">
        ${(producto.precioFinal * producto.cantidad).toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
      </div>
      <button class="eliminar" data-index="${index}">X</button>
    `;
    lista.appendChild(li);
    total += producto.precioFinal * producto.cantidad;
  });

  document.getElementById(
    "totalCarrito"
  ).textContent = `Total: ${total.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  })}`;
}
