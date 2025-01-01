// Se encarga de cargar productos y renderizarlos.

import { actualizarCarrito } from './carrito.js';
import { preciosExtra } from './utils.js';

export let productos = [];
export let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productosContainer");

// Cargar productos desde JSON
fetch("./data/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    mostrarProductos();
  })
  .catch((error) => {
    console.error("Error al cargar productos:", error);
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  });

// Renderizar productos en el DOM
function mostrarProductos() {
  if (!contenedor) {
    console.error("No se encontró el contenedor de productos.");
    return;
  }

  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" width="250">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>${producto.precio.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</strong></p>

      <label for="tamaño-${producto.id}">Tamaño:</label>
      <select id="tamaño-${producto.id}">
        <option value="chico">Chico</option>
        <option value="mediano">Mediano (+$50)</option>
        <option value="grande">Grande (+$100)</option>
      </select>

      <label for="decoracion-${producto.id}">Decoración:</label>
      <select id="decoracion-${producto.id}">
        <option value="ninguna">Ninguna</option>
        <option value="frutas">Frutas (+$80)</option>
        <option value="flores">Flores (+$100)</option>
        <option value="glaseado">Glaseado (+$60)</option>
      </select>

      <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
    `;
    contenedor.appendChild(div);
  });

  // Delegación de eventos para agregar al carrito
  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarrito(id);
    }
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((prod) => prod.id === id);
  if (!producto) {
    Swal.fire("Error", "Producto no encontrado.", "error");
    return;
  }

  const tamaño = document.getElementById(`tamaño-${id}`).value;
  const decoracion = document.getElementById(`decoracion-${id}`).value;

  const precioTotal =
    producto.precio +
    preciosExtra.tamaño[tamaño] +
    preciosExtra.decoracion[decoracion];

  const productoEnCarrito = carrito.find(
    (item) =>
      item.id === id &&
      item.tamaño === tamaño &&
      item.decoracion === decoracion
  );

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
      tamaño: tamaño,
      decoracion: decoracion,
      precioFinal: precioTotal,
    });
  }

  // Actualizar carrito después de agregar un producto
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  Swal.fire(
    "Producto Agregado",
    `${producto.nombre} fue añadido al carrito`,
    "success"
  );
}
