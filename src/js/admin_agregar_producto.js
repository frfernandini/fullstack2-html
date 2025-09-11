// src/admin_agregar_producto.js
function guardarProducto(producto, id) {
    const productosJSON = localStorage.getItem('productos');
    const productos = productosJSON ? JSON.parse(productosJSON) : {};
    productos[id] = producto;
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Función global para ver todos los productos (disponible en la consola)
window.verProductos = function() {
    const productos = JSON.parse(localStorage.getItem('productos') || '{}');
    console.table(productos);
    return productos;
};

// Función global para limpiar todos los productos (disponible en la consola)
window.limpiarProductos = function() {
    localStorage.removeItem('productos');
    console.log('Todos los productos han sido eliminados');
};


window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-agregar-producto');
    const tituloInput = document.getElementById('floatingtitulo');
    const categoriaInput = document.getElementById('floatingcategoria');
    const descripcionInput = document.getElementById('floatingdescripcion');
    const precioInput = document.getElementById('floatingprecio');
    const imagenInput = document.getElementById('floatingimagen');

    // ✅ NUEVOS CAMPOS
    const ofertaCheck = document.getElementById('floatingoferta');
    const descuentoInput = document.getElementById('floatingdescuento');
    const descuentoContainer = document.getElementById('descuento-container');

    // Mostrar/ocultar campo de descuento
    ofertaCheck.addEventListener('change', () => {
        descuentoContainer.style.display = ofertaCheck.checked ? 'block' : 'none';
        if (!ofertaCheck.checked) descuentoInput.value = '';
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titulo = tituloInput.value.trim();
        const categoria = categoriaInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const precio = parseInt(precioInput.value);
        const imagen = imagenInput.value.trim();
        const oferta = ofertaCheck.checked;
        const descuento = oferta ? parseInt(descuentoInput.value) || 0 : 0;
        
        // Validación básica
        if (titulo && categoria && descripcion && !isNaN(precio) && imagen) {
            const categorias = {
                'Juegos de Mesa': 'JM',
                'Accesorios': 'AC', 
                'Consolas': 'CO',
                'Computadores Gamers': 'CG',
                'Sillas Gamers': 'SG',
                'Mouse': 'MS',
                'Mousepad': 'MP',
                'Poleras Personalizadas': 'PP'
            };
            
            const prefijo = categorias[categoria] || 'PR';
            const timestamp = Date.now().toString().slice(-3);
            const id = prefijo + timestamp;
            
            const nuevoProducto = {
                Categoria: categoria,
                Titulo: titulo,
                Descripcion: descripcion,
                Precio: precio,
                imagen: imagen,
                oferta: oferta,
                descuento: descuento
            };
            
            guardarProducto(nuevoProducto, id);
            
            alert(`Producto agregado correctamente:\nTítulo: ${titulo}\nCategoría: ${categoria}\nPrecio: $${precio}${oferta?`\nOferta: ${descuento}% de descuento` : ''}`);
            form.reset();
            descuentoContainer.style.display = 'none'; // ocultar campo descuento
        } else {
            alert('Por favor, completa todos los campos obligatorios correctamente');
        }
    });
});