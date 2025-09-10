
// Obtener ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Obtener todos los productos
const todosLosProductos = { ...productosEstaticos, ...cargarProductosAgregados() };

// Obtener el producto específico
const producto = todosLosProductos[productId];

const detalleDiv = document.getElementById('detalle-producto');

if (producto) {
    // Calcular precio final si hay oferta
    let precioFinal = producto.Precio;
    let precioHTML = `<p class="precio">$${producto.Precio.toLocaleString()}</p>`;

    if (producto.oferta && producto.descuento > 0) {
        precioFinal = Math.round(producto.Precio - (producto.Precio * producto.descuento / 100));
        precioHTML = `
            <p class="precio">
                <span class="text-muted text-decoration-line-through">$${producto.Precio.toLocaleString()}</span><br>
                <span class="fw-bold text-success">$${precioFinal.toLocaleString()}</span>
            </p>
            <span class="badge bg-danger">-${producto.descuento}% OFF</span>
        `;
    }

    detalleDiv.innerHTML = `
        <div class="producto-detalle">
            <div class="imagen-principal">
                <img id="mainImage" src="${producto.imagen}" alt="${producto.Titulo}" width="400">
                <div class="miniaturas-barra">
                    <img class="miniatura" src="${producto.imagen}" alt="miniatura">
                </div>
            </div>
            <div class="info-detalle">
                <h2>${producto.Titulo}</h2>
                <p class="descripcion">${producto.Descripcion}</p>
                ${precioHTML}
                <button class="btn-agregar" data-id="${producto.id}" data-precio="${precioFinal}">Agregar al Carrito</button>
            </div>
        </div>
    `;
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            agregarAlCarrito({
                id: productId,
                Titulo: producto.Titulo,
                Precio: producto.Precio,
                imagen: producto.imagen,
                Categoria: producto.Categoria,
                oferta: producto.oferta || false,
                descuento: producto.descuento || 0
            });
        }
    });
}

// Cambiar la imagen principal por las miniaturas
const mainImage = document.getElementById('mainImage');
const miniaturas = document.querySelectorAll('.miniatura');

miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', function() {
        const eve = mainImage.src;
        mainImage.src = this.src;
        this.src = eve;
    });
});

//Crear una lista vacia para almacenar productos relacionados
let relacionados = [];

// Recorrer todos los productos
for (let id in todosLosProductos) {
    let prod = todosLosProductos[id];

    //Se condicionala en base a la categoria asegurandose de que no es el producto actualmente visto
    if (prod.Categoria === producto.Categoria && id !== productId) {
        relacionados.push({ id, ...prod });
    }
}

// Tomar solo 6 productos relacionados
relacionados = relacionados.slice(0, 6);


// Mostrar los productos en la barra
relacionadosBarra.innerHTML = "";
if (relacionados.length === 0) {

    let mensajeR = document.createElement("h3");
    mensajeR.classList.add("no-relacionado");
    mensajeR.textContent = "No existen productos relacionados";
    relacionadosBarra.appendChild(mensajeR);

}else{
    for (let rel of relacionados) {
        // Se crea un elemento de tipo div
        let div = document.createElement("div");
        //se implementan una clase llamado relacionado al div
        div.classList.add("relacionado");
        div.dataset.id = rel.id;

        div.innerHTML = `
            <img src="${rel.imagen}" alt="${rel.Titulo}">
            <p>${rel.Titulo}</p>
        `;

        //Interactuabilidad: Al hacer clic en un producto relacionado, redirige a su página de detalles
        div.addEventListener("click", () => {
            window.location.href = `productos_detalles.html?id=${rel.id}`;
        });

        relacionadosBarra.appendChild(div);
    }
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




