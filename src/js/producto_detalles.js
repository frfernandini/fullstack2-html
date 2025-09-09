// Obtener ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Obtener todos los productos
const todosLosProductos = { ...productosEstaticos, ...cargarProductosAgregados() };
const producto = todosLosProductos[productId];

const detalleDiv = document.getElementById('detalle-producto');

if (producto) {
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
                <p class="precio">$${producto.Precio.toLocaleString()}</p>
                <button class="btn-comprar">Comprar</button>
            </div>
        </div>
    `;
}

// Función para cambiar la imagen principal al hacer click en una miniatura
const mainImage = document.getElementById('mainImage');
const miniaturas = document.querySelectorAll('.miniatura');

miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', function() {
        const tempSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = tempSrc;
    });
});



