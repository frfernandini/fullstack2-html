// header.js

// Función para obtener el carrito desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Actualiza el contador del carrito con cantidades
function actualizarContadorCarrito() {
    const contador = document.getElementById("cart-count");
    if (!contador) return;

    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((total, producto) => total + (producto.cantidad || 1), 0);
    
    contador.textContent = totalItems;
    contador.style.display = totalItems > 0 ? "inline" : "none";
}

// Función legacy para compatibilidad (mantener por si acaso)
function actualizarContador() {
    actualizarContadorCarrito();
}

// Agrega un producto al carrito (función legacy - ahora se usa la de carrito.js)
function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Inicializar contador al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    // Esperar un poco para asegurar que el DOM esté completamente cargado
    setTimeout(actualizarContadorCarrito, 100);
});

// También actualizar cuando se enfoque la ventana (por si el usuario cambió de pestaña)
window.addEventListener('focus', actualizarContadorCarrito);
