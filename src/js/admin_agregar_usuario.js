// src/js/admin_agregar_usuario.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-agregar-usuario');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        agregarUsuario();
    });
});

function agregarUsuario() {
    // Obtener valores del formulario
    const nombre = document.getElementById('floatingnombre').value.trim();
    const apellido = document.getElementById('floatingapellido').value.trim();
    const email = document.getElementById('floatingemail').value.trim();
    const password = document.getElementById('floatingpassword').value;
    const region = document.getElementById('floatingregion').value;
    const ciudad = document.getElementById('floatingciudad').value;
    
    // Validaciones básicas
    if (!nombre || !apellido || !email || !password || !region || !ciudad) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un email válido');
        return;
    }
    
    // Verificar si el email ya existe
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const emailExiste = usuarios.some(usuario => 
        (usuario.email || usuario.correo) === email
    );
    
    if (emailExiste) {
        alert('Ya existe un usuario con este email');
        return;
    }
    
    // Crear objeto usuario
    const nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        correo: email, // Para compatibilidad con el sistema existente
        password: password,
        region: region,
        ciudad: ciudad,
        fecha: new Date().toLocaleDateString('es-ES'),
        fechaRegistro: new Date().toISOString()
    };
    
    // Agregar usuario al array
    usuarios.push(nuevoUsuario);
    
    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Mostrar mensaje de éxito
    alert('Usuario agregado exitosamente');
    
    // Limpiar formulario
    document.getElementById('form-agregar-usuario').reset();
    
    // Opcional: Redirigir a la lista de usuarios después de agregar
    // window.location.href = 'admin_usuarios.html';
}

// Función para validar email en tiempo real
function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Agregar validación en tiempo real al campo email
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('floatingemail');
    
    emailInput.addEventListener('input', function() {
        const email = this.value;
        if (email && !validarEmail(email)) {
            this.setCustomValidity('Por favor ingrese un email válido');
        } else {
            this.setCustomValidity('');
        }
    });
});
