// src/admin_usuarios.js
function cargarUsuarios() {
    const usuariosJSON = localStorage.getItem('usuarios');
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

function mostrarUsuarios() {
    const usuarios = cargarUsuarios();
    const tabla = document.getElementById('tabla-usuarios');
    const tbody = tabla.querySelector('tbody');
    
    if (usuarios.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center text-muted">
                    No hay usuarios registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.fecha}</td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        const usuarios = cargarUsuarios();
        usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarUsuarios();
        alert('Usuario eliminado correctamente');
    }
}

// Función para actualizar la tabla (útil para refrescar)
window.actualizarUsuarios = mostrarUsuarios;

// Función para limpiar todos los usuarios
window.limpiarTodosUsuarios = function() {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los usuarios?')) {
        localStorage.removeItem('usuarios');
        mostrarUsuarios();
        alert('Todos los usuarios han sido eliminados');
    }
};

window.addEventListener('DOMContentLoaded', mostrarUsuarios);