

//Función para combinar productos estáticos con los agregados
function obtenerTodosLosProductos() {
    const productosAgregados = cargarProductosAgregados();
    return { ...productosEstaticos, ...productosAgregados };
}

// Función para crear una card de producto
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
document.addEventListener('DOMContentLoaded', mostrarProductos);


