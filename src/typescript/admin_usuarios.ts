// src/admin_usuarios.ts
interface Usuario {
    nombre: string;
    correo: string;
    fecha: string;
}

function cargarUsuarios(): Usuario[] {
    const usuariosJSON = localStorage.getItem('usuarios');
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
}

function mostrarUsuarios() {
    const usuarios = cargarUsuarios();
    const tabla = document.getElementById('tabla-usuarios') as HTMLTableElement;
    const tbody = tabla.querySelector('tbody')!;
    tbody.innerHTML = '';
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.fecha}</td>
        `;
        tbody.appendChild(fila);
    });
}

window.addEventListener('DOMContentLoaded', mostrarUsuarios);
