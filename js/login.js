document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("contasenia").value.trim();

    // Expresión regular para validar el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de campos vacíos y del formato del email
    if (email === "" && password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campos Vacíos',
            text: 'El email y la contraseña no pueden estar vacíos.',
        });
    } else if (email === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campo Vacío',
            text: 'El email no puede estar vacío.',
        });
    } else if (!emailPattern.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email Inválido',
            text: 'Por favor, introduce un email válido.',
        });
    } else if (password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campo Vacío',
            text: 'La contraseña no puede estar vacía.',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Inicio de sesión correcto.',
        });
        
        // Limpiar los campos después del éxito
        document.getElementById("email").value = "";
        document.getElementById("contasenia").value = "";
        
    }
});
