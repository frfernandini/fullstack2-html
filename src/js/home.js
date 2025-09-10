

// Función para combinar productos estáticos con los agregados
function obtenerTodosLosProductos() {
    const productosAgregados = cargarProductosAgregados();
    return { ...productosEstaticos, ...productosAgregados };
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
        <button class="btn-agregar" data-id="${id}" data-precio="${precioFinal}">Agregar al Carrito</button>
    `;

    card.addEventListener('click', function(event) {
        if(event.target.tagName !== 'BUTTON') {
            // Redirige a la pagina de detalles con el id del producto de la url
            window.location.href = `productos_detalles.html?id=${id}`;
        }
    });

    return card;
}


// Función para mostrar todos los productos
function mostrarProductos() {
    // Busca el contenedor principal
    const container = document.getElementById("productContainer");

    // Obtener todos los productos
    const todosLosProductos = obtenerTodosLosProductos();

    // Limpiar el contenedor
    container.innerHTML = '';

    // Crear una lista vacía para guardar los productos con oferta
    const productosConOferta = [];

    // Recorrer todos los productos
    for (let id in todosLosProductos) {
        const prod = todosLosProductos[id];

        // Verificar si el producto tiene oferta
        if (prod.oferta) {
            productosConOferta.push({ id: id, producto: prod });
        }

        // Limitar la lista a 4 productos
        if (productosConOferta.length === 4) {
            break; //forzar el cierre del loop habiendo 4 productos
        }
    }

    // Mostrar los productos con oferta
    for (let i = 0; i < productosConOferta.length; i++) {
        const item = productosConOferta[i];
        const card = crearCardProducto(item.producto, item.id);
        container.appendChild(card);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', mostrarProductos);

