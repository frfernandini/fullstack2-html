// Funciones del carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

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
    
    guardarCarrito(carrito);
    
    // Mostrar mensaje de confirmación
    alert(`${producto.Titulo} agregado al carrito`);
}

function eliminarDelCarrito(productoId) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function actualizarCantidad(productoId, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === productoId);
    
    if (producto) {
        if (nuevaCantidad <= 0) {
            eliminarDelCarrito(productoId);
        } else {
            producto.cantidad = parseInt(nuevaCantidad);
            guardarCarrito(carrito);
            mostrarCarrito();
        }
    }
}

function calcularPrecioConDescuento(precio, oferta, descuento) {
    if (oferta && descuento > 0) {
        return precio - (precio * descuento / 100);
    }
    return precio;
}

function mostrarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (!cartItems || !totalPrice) return;

    let carrito = obtenerCarrito();
    cartItems.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center p-4">
                <i class="bi bi-cart-x" style="font-size: 3rem; color: #6c757d;"></i>
                <h5 class="mt-3 text-muted">Tu carrito está vacío</h5>
                <p class="text-muted">¡Agrega algunos productos increíbles!</p>
                <a href="listaProductos.html" class="btn btn-primary">Ver Productos</a>
            </div>
        `;
    } else {
        carrito.forEach(prod => {
            const precioFinal = calcularPrecioConDescuento(prod.Precio, prod.oferta, prod.descuento);
            const subtotal = precioFinal * prod.cantidad;
            total += subtotal;

            const div = document.createElement("div");
            div.classList.add("card", "mb-3");
            div.innerHTML = `
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${prod.imagen}" alt="${prod.Titulo}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-4">
                            <h6 class="card-title">${prod.Titulo}</h6>
                            <p class="card-text text-muted">${prod.Categoria}</p>
                            ${prod.oferta ? `<span class="badge bg-success">-${prod.descuento}% OFF</span>` : ''}
                        </div>
                        <div class="col-md-2">
                            <p class="mb-0">
                                ${prod.oferta ? `
                                    <span class="text-decoration-line-through text-muted">$${prod.Precio.toLocaleString()}</span><br>
                                    <strong>$${precioFinal.toLocaleString()}</strong>
                                ` : `<strong>$${precioFinal.toLocaleString()}</strong>`}
                            </p>
                        </div>
                        <div class="col-md-2">
                            <div class="input-group">
                                <button class="btn btn-outline-secondary btn-sm" onclick="actualizarCantidad('${prod.id}', ${prod.cantidad - 1})">-</button>
                                <input type="number" class="form-control form-control-sm text-center" value="${prod.cantidad}" 
                                       onchange="actualizarCantidad('${prod.id}', this.value)" min="1">
                                <button class="btn btn-outline-secondary btn-sm" onclick="actualizarCantidad('${prod.id}', ${prod.cantidad + 1})">+</button>
                            </div>
                        </div>
                        <div class="col-md-2 text-end">
                            <p class="mb-0"><strong>$${subtotal.toLocaleString()}</strong></p>
                            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${prod.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            cartItems.appendChild(div);
        });
    }

    totalPrice.textContent = "$" + total.toLocaleString();
}

function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    const contador = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    
    // Actualizar contador en el header
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = contador;
        cartCount.style.display = contador > 0 ? "inline" : "none";
    }
}

function vaciarCarrito() {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        actualizarContadorCarrito();
        mostrarCarrito();
    }
}

// Inicializar cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
    mostrarCarrito();
    actualizarContadorCarrito();
});

