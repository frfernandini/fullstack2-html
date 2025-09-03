"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const correoInput = document.getElementById("CorreoInput");
    const passwordInput = document.getElementById("contrasenaInput");
    form?.addEventListener("submit", (e) => {
        const correo = correoInput.value.trim();
        const contrasena = passwordInput.value.trim();
        const validacionCorreo = ((correo.endsWith("@duocuc.cl")) || (correo.endsWith("@gmail.com")) || (correo.endsWith("@profesor.duoc.cl "))) && (correo.length) <= 100;
        const validacionContrasena = (contrasena.length >= 4 && contrasena.length <= 10);
        if (validacionCorreo && validacionContrasena) {
            console.log("sesion iniciada");
        }
        else {
            console.log("informacion no valida");
        }
    });
});
//# sourceMappingURL=login.js.map