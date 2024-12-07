// Variables globales
const precios = {
    pastel: { pequeño: 500, mediano: 700, grande: 1000 },
    galletas: { docena: 200, "media docena": 120 },
    panque: { chico: 150, grande: 250 }
};

const decoraciones = {
    frutas: 50,
    flores: 100,
    glaseado: 30
};

let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []; // Cargar desde localStorage

// Referencias al DOM
const tipoPostreSelect = document.getElementById('tipoPostre');
const tamañoSelect = document.getElementById('tamaño');
const decoracionSelect = document.getElementById('decoracion');
const pedidoForm = document.getElementById('pedidoForm');
const listaPedidos = document.getElementById('listaPedidos');

// Actualizar opciones de tamaño dinámicamente según el tipo de postre
tipoPostreSelect.addEventListener('change', () => {
    const tipoPostre = tipoPostreSelect.value;
    tamañoSelect.innerHTML = ''; // Limpiar opciones

    if (precios[tipoPostre]) {
        Object.keys(precios[tipoPostre]).forEach(tamaño => {
            const option = document.createElement('option');
            option.value = tamaño;
            option.textContent = tamaño;
            tamañoSelect.appendChild(option);
        });
    }
});

// Mostrar opciones iniciales de tamaño
tipoPostreSelect.dispatchEvent(new Event('change'));

// Función para agregar pedido
pedidoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const tipoPostre = tipoPostreSelect.value;
    const tamaño = tamañoSelect.value;
    const decoracion = decoracionSelect.value;

    const costoDecoracion = decoracion !== "ninguna" ? decoraciones[decoracion] : 0;
    const costoTotal = precios[tipoPostre][tamaño] + costoDecoracion;
    const costoTotalMXN = costoTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    const pedido = { tipoPostre, tamaño, decoracion, costoTotalMXN };
    pedidos.push(pedido);

    // Guardar en localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Mostrar el pedido en la lista
    mostrarPedidos();
});

// Función para mostrar los pedidos
function mostrarPedidos() {
    listaPedidos.innerHTML = ''; // Limpiar lista

    pedidos.forEach((pedido, index) => {
        const li = document.createElement('li');
        li.textContent = `Pedido ${index + 1}: ${pedido.tipoPostre}, ${pedido.tamaño}, ${pedido.decoracion}, Total: ${pedido.costoTotalMXN}`;
        listaPedidos.appendChild(li);
    });
}

// Mostrar los pedidos almacenados al cargar la página
mostrarPedidos();
