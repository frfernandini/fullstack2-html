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
                <td colspan="4" class="text-center text-muted">
                    No hay usuarios registrados
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const fila = document.createElement('tr');
        // Formatear fecha si existe
        const fechaFormateada = usuario.fecha || usuario.fechaRegistro || 'No disponible';
        const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
        const correo = usuario.correo || usuario.email || 'No disponible';
        
        fila.innerHTML = `
            <td>${nombreCompleto}</td>
            <td>${correo}</td>
            <td>${fechaFormateada}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarUsuario(${index})" title="Eliminar usuario">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function verDetalleUsuario(index) {
    const usuarios = cargarUsuarios();
    const usuario = usuarios[index];
    
    if (!usuario) {
        alert('Usuario no encontrado');
        return;
    }
    
    const detalles = `
        Nombre: ${usuario.nombre || 'No disponible'} ${usuario.apellido || ''}
        Email: ${usuario.correo || usuario.email || 'No disponible'}
        País: ${usuario.pais || 'No disponible'}
        Género: ${usuario.genero || 'No disponible'}
        Fecha de registro: ${usuario.fecha || usuario.fechaRegistro || 'No disponible'}
    `;
    
    alert(detalles);
}

function editarUsuario(index) {
    alert('Funcionalidad de edición en desarrollo');
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