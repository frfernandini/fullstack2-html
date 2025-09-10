// header.js

// Actualiza el contador del carrito
function actualizarContador() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contador.textContent = carrito.length;
}

// Agrega un producto al carrito
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
}

// Inicializar contador al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContador);
