// src/admin_listado_productos.js
function cargarProductos() {
    const productosJSON = localStorage.getItem('productos');
    return productosJSON ? JSON.parse(productosJSON) : {};
}

function mostrarProductos() {
    const productos = cargarProductos();
    const tabla = document.getElementById('tabla-productos');
    const tbody = tabla.querySelector('tbody');
    
    if (Object.keys(productos).length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted">
                    No hay productos registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    Object.keys(productos).forEach((id) => {
        const producto = productos[id];
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${id}</strong></td>
            <td>${producto.Titulo}</td>
            <td><span class="badge bg-secondary">${producto.Categoria}</span></td>
            <td><strong>$${producto.Precio.toLocaleString()}</strong></td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        const productos = cargarProductos();
        delete productos[id];
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos();
        alert('Producto eliminado correctamente');
    }
}

// Función para actualizar la tabla (útil para refrescar)
window.actualizarProductos = mostrarProductos;

// Función para limpiar todos los productos
window.limpiarTodosProductos = function() {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los productos?')) {
        localStorage.removeItem('productos');
        mostrarProductos();
        alert('Todos los productos han sido eliminados');
    }
};

// Función para ver productos en consola
window.verProductosAdmin = function() {
    const productos = cargarProductos();
    console.table(productos);
    return productos;
};

window.addEventListener('DOMContentLoaded', mostrarProductos);
