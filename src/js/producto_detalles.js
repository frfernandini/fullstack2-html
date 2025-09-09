// Obtener ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Obtener todos los productos
const todosLosProductos = { ...productosEstaticos, ...cargarProductosAgregados() };

// Obtener el producto específico
const producto = todosLosProductos[productId];

const detalleDiv = document.getElementById('detalle-producto');
const barraRelacionados = document.getElementById('productos-relacionados');

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

//cambiar la imagen principal por las miniaturas
const mainImage = document.getElementById('mainImage');
const miniaturas = document.querySelectorAll('.miniatura');

miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', function() {
        const tempSrc = mainImage.src;
        mainImage.src = this.src;
        this.src = tempSrc;
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



