# Simulador de Pedidos Personalizados 🍰

Este es un simulador interactivo que permite a los usuarios armar pedidos personalizados de postres, galletas y tartas. Los usuarios pueden seleccionar productos, elegir el tamaño y tipo de decoración, agregar al carrito y finalizar la compra.  

---

## 🚀 Funcionalidades:
- **Agregar productos al carrito** cargados dinámicamente desde `productos.json`.  
- **Modificar cantidades** directamente en el resumen del carrito.  
- **Eliminar productos** o vaciar el carrito por completo.  
- **Persistencia del carrito** utilizando `localStorage`.  
- **Simulación de compra** con notificaciones visuales usando `SweetAlert2`.  

---

## 🛠️ Tecnologías Utilizadas:
- **HTML5, CSS3, JavaScript (ES6).**  
- **SweetAlert2** – Notificaciones y alertas interactivas.  
- **Fetch API** – Para cargar productos de un archivo JSON.  
- **LocalStorage** – Guarda el estado del carrito para mantenerlo entre sesiones.  

---

## 📂 Estructura del Proyecto:
```bash
/proyecto-pedidos/
│
├── index.html          # Estructura principal de la web
├── style.css           # Estilos de la aplicación
├── main.js             # Lógica del carrito y eventos de usuario
├── productos.json      # Base de datos de productos (simulada)
├── README.md           # Documentación del proyecto
└── assets/             # Recursos gráficos y multimedia
    ├── images/         # Imágenes de productos
    └── icons/          # Íconos personalizados

⚙️ Instalación y Ejecución:

Clona este repositorio:
git clone <URL_DEL_REPOSITORIO>
Accede a la carpeta del proyecto:
cd proyecto-pedidos
Instala las dependencias necesarias:
npm install
Inicia el servidor de desarrollo:
npm start

🧁 ¿Cómo Usarlo?

Navega por los productos disponibles y selecciona tamaño y decoración.
Añade productos al carrito usando el botón "Agregar al Carrito".
Modifica cantidades o elimina productos desde el resumen de pedidos.
Finaliza tu compra presionando el botón "Finalizar Compra".
Disfruta de una experiencia interactiva y personalizada.

📧 Contacto:

Si tienes preguntas o sugerencias, no dudes en contactarme. 😊