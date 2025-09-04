"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const correoInput = document.getElementById("InputCorreo");
    const nombreInput = document.getElementById("InputNombre");
    const descripcionInput = document.getElementById("InputDescripcion");
    form?.addEventListener("submit", (e) => {
        const correo = correoInput.value.trim();
        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const validacionCorreo = ((correo.endsWith("@duocuc.cl")) || (correo.endsWith("@gmail.com")) || (correo.endsWith("@profesor.duoc.cl "))) && (correo.length) <= 100;
        const validacionNombre = (nombre.length > 0 && nombre.length <= 100);
        const validacionDescripcion = (descripcion.length <= 500);
        if (validacionCorreo && validacionNombre && validacionDescripcion) {
            console.log("mensaje enviado");
        }
        else {
            console.log("informacion no valida");
        }
    });
});
//# sourceMappingURL=contacto.js.map