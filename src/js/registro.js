// src/registro.js
function guardarUsuario(usuario) {
    const usuariosJSON = localStorage.getItem('usuarios');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}


window.verUsuarios = function() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.table(usuarios);
    return usuarios;
};


window.limpiarUsuarios = function() {
    localStorage.removeItem('usuarios');
    console.log('Todos los usuarios han sido eliminados');
};

console.log("Archivo registro.js cargado correctamente");
"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombreInput = document.getElementById("floatingname");
    const correoInput = document.getElementById("floatingcorreo");
    const contrasenaInput = document.getElementById("floatingcontrasena");
    const confirmContrasenaInput = document.getElementById("floatingconfirmcontrasena");
    
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim();
        const contrasena = contrasenaInput.value.trim();
        const confirmContrasena = confirmContrasenaInput.value.trim();
        const fecha = new Date().toLocaleString();
        
        // Validaciones simples
        const validacionNombre = nombre.length >= 2;
        const validacionCorreo = correo.includes("@") && correo.includes(".") && correo.length >= 5;
        const validacionContrasena = contrasena.length >= 4 && contrasena.length <= 20;
        const validacionConfirm = contrasena === confirmContrasena;
        
        if (validacionNombre && validacionCorreo && validacionContrasena && validacionConfirm) {
            const nuevoUsuario = { nombre, correo, contrasena, fecha };
            guardarUsuario(nuevoUsuario);
            
            console.log("Usuario registrado:", nuevoUsuario);
            console.log("Total de usuarios:", JSON.parse(localStorage.getItem('usuarios') || '[]').length);
            
            alert("¡Registro exitoso! Redirigiendo al inicio de sesión...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        } else {
            console.log("Información no válida");
            if (!validacionNombre) {
                alert("El nombre debe tener al menos 2 caracteres");
            } else if (!validacionCorreo) {
                alert("Ingresa un correo válido");
            } else if (!validacionContrasena) {
                alert("La contraseña debe tener entre 4 y 20 caracteres");
            } else if (!validacionConfirm) {
                alert("Las contraseñas no coinciden");
            }
        }
    });
});