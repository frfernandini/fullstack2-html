//Función para combinar productos estáticos con los agregados
function obtenerTodosLosProductos() {
    const productosAgregados = cargarProductosAgregados();
    return { ...productosEstaticos, ...productosAgregados };
}

// Funciones del carrito (reutilizadas)
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
    
    // Mostrar mensaje de confirmación más elegante
    mostrarNotificacion(`${producto.Titulo} agregado al carrito`);
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

function mostrarNotificacion(mensaje) {
    // Crear notificación toast
    const toast = document.createElement('div');
    toast.className = 'position-fixed top-0 end-0 p-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">Éxito</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${mensaje}
            </div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Función para crear una card de producto
function crearCardProducto(prod, id) {
    const card = document.createElement("div");
    card.classList.add("card-product");

    // Calcular precio final si tiene oferta y redondear al entero
    let precioFinal = prod.Precio;
    let precioHTML = `<p class="card-precio">$${prod.Precio.toLocaleString()}</p>`;

    if (prod.oferta && prod.descuento > 0) {
        precioFinal = Math.round(prod.Precio - (prod.Precio * prod.descuento / 100));
        precioHTML = `
            <p class="card-precio">
                <span class="text-muted text-decoration-line-through">$${prod.Precio.toLocaleString()}</span><br>
                <span class="fw-bold text-success">$${precioFinal.toLocaleString()}</span>
            </p>
            <span class="badge bg-danger">-${prod.descuento}% OFF</span>
        `;
    }

    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.Titulo}">
        <div class="card-content">
            <h3 class="card-titulo">${prod.Titulo}</h3>
            ${precioHTML}
            <p class="card-desc">${prod.Descripcion}</p>
        </div>
        <button class="btn-agregar" data-id="${id}">
            <i class="bi bi-cart-plus"></i> Agregar al Carrito
        </button>
    `;

    // Agregar event listener para el click en la card (excepto en el botón)
    card.addEventListener('click', function(event) {
        if(event.target.tagName !== 'BUTTON' && !event.target.classList.contains('bi')) {
            // Redirige a la pagina de detalles con el id del producto de la url
            window.location.href = `productos_detalles.html?id=${id}`;
        }
    });

    // Agregar event listener para el botón de agregar al carrito
    const btnAgregar = card.querySelector('.btn-agregar');
    btnAgregar.addEventListener('click', function(event) {
        event.stopPropagation(); // Evitar que se active el click de la card
        
        // Preparar objeto del producto para el carrito
        const productoCarrito = {
            id: id,
            Titulo: prod.Titulo,
            Precio: prod.Precio,
            imagen: prod.imagen,
            Categoria: prod.Categoria,
            oferta: prod.oferta || false,
            descuento: prod.descuento || 0
        };
        
        agregarAlCarrito(productoCarrito);
    });

    return card;
}

// Mostrar todos los productos
function mostrarProductos() {
    const container = document.getElementById("productContainer");
    const todosLosProductos = { ...productosEstaticos, ...cargarProductosAgregados() };
    
    container.innerHTML = ''; // Limpiar contenedor
    
    for (let id in todosLosProductos) {
        const prod = todosLosProductos[id];
        const card = crearCardProducto(prod, id);
        container.appendChild(card);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    mostrarProductos();
    actualizarContadorCarrito(); // Actualizar contador al cargar la página
});


