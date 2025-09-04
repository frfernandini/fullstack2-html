// src/registro.js
function guardarUsuario(usuario) {
    const usuariosJSON = localStorage.getItem('usuarios');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función global para ver todos los usuarios (disponible en la consola)
window.verUsuarios = function() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.table(usuarios);
    return usuarios;
};

// Función global para limpiar todos los usuarios (disponible en la consola)
window.limpiarUsuarios = function() {
    localStorage.removeItem('usuarios');
    console.log('Todos los usuarios han sido eliminados');
};

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nombreInput = document.getElementById('floatingname');
    const correoInput = document.getElementById('floatingcorreo');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();
        const fecha = new Date().toLocaleString();
        if (nombre && correo) {
            const nuevoUsuario = { nombre, correo, fecha };
            guardarUsuario(nuevoUsuario);
            
            // Mostrar información detallada del usuario registrado
            console.log('Usuario registrado:', nuevoUsuario);
            console.log('Total de usuarios:', JSON.parse(localStorage.getItem('usuarios') || '[]').length);
            
            alert(`Usuario registrado correctamente:\nNombre: ${nombre}\nCorreo: ${correo}\nFecha: ${fecha}`);
            form.reset();
        } else {
            alert('Por favor, completa nombre y correo');
        }
    });
});