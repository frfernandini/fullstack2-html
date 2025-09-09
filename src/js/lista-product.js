
// Función para combinar productos estáticos con los agregados
function obtenerTodosLosProductos() {
    const productosAgregados = cargarProductosAgregados();
    return { ...productosEstaticos, ...productosAgregados };
}

// Función para crear una card de producto
function crearCardProducto(prod, id) {
    const card = document.createElement("div");
    card.classList.add("card-product");
    card.dataset.productId = id;

    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.Titulo}">
        <div class="card-content">
            <h3 class="card-titulo">${prod.Titulo}</h3>
            <p class="card-precio">$${prod.Precio.toLocaleString()}</p>
            <p class="card-desc">${prod.Descripcion}</p>
        </div>
        <button class="btn btn-primary">Agregar</button>
    `;

    // Clic en la card (excepto botón) -> redirigir a detalle
    card.addEventListener('click', function(event) {
        if(event.target.tagName !== 'BUTTON') {
            // Redirige a la página de detalles con el id del producto en la URL
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


//ELIMINAR ESTO SOLO SI EL CODIG O ANTERIOR FUNCIONA
/* Función para crear una card de producto
function crearCardProducto(prod, id) {
    const card = document.createElement("div");
    card.classList.add("card-product");
    card.dataset.productId = id;

    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.Titulo}">
        <div class="card-content">
            <h3 class="card-titulo">${prod.Titulo}</h3>
            <p class="card-precio">$${prod.Precio.toLocaleString()}</p>
            <p class="card-desc">${prod.Descripcion}</p>
        </div>
        <button class="btn btn-primary">Agregar</button>
    `;

    // Clic en la card (excepto botón) -> redirigir a detalle
    card.addEventListener('click', function(event) {
        if(event.target.tagName !== 'BUTTON') {
            window.location.href = `productos_detalles.html?id=${id}`;
        }
    });

    return card;
}

// Función para mostrar todos los productos
function mostrarProductos() {
    const container = document.getElementById("productContainer");
    const todosLosProductos = obtenerTodosLosProductos();
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Mostrar todos los productos
    for (let id in todosLosProductos) {
        const prod = todosLosProductos[id];
        const card = crearCardProducto(prod);
        container.appendChild(card);
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', mostrarProductos);*/
