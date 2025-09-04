// src/registro.ts
interface Usuario {
    nombre: string;
    correo: string;
    fecha: string;
}

function guardarUsuario(usuario: Usuario) {
    const usuariosJSON = localStorage.getItem('usuarios');
    const usuarios: Usuario[] = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nombreInput = document.getElementById('floatingname') as HTMLInputElement;
    const correoInput = document.getElementById('floatingcorreo') as HTMLInputElement;

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();
        const fecha = new Date().toLocaleString();
        if (nombre && correo) {
            guardarUsuario({ nombre, correo, fecha });
            alert('Usuario registrado correctamente');
            form.reset();
        } else {
            alert('Por favor, completa nombre y correo');
        }
    });
});
