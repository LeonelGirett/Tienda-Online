document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const contrasenia = document.getElementById("contrasenia").value;
    const repContra = document.getElementById("repContra").value;

    // Función de validación
    function validarCampo(campo, mensaje) {
        if (campo.length <= 4) {
            Swal.fire("Error", mensaje, "error");
            return false;
        }
        return true;
    }

    // Validaciones
    if (!validarCampo(nombre, "El nombre debe tener más de 4 caracteres.")) return;
    if (!validarCampo(apellido, "El apellido debe tener más de 4 caracteres.")) return;
    if (!validarCampo(contrasenia, "La contraseña debe tener más de 4 caracteres.")) return;

    // Validación de coincidencia de contraseñas
    if (contrasenia !== repContra) {
        Swal.fire("Error", "Las contraseñas no coinciden.", "error");
        return;
    }

    // Verificación de la contraseña (contiene al menos un número y una letra mayúscula)
    const regex = /^(?=.*[A-Z])(?=.*\d).{5,}$/; // Al menos una mayúscula, un número y mínimo 5 caracteres
    if (!regex.test(contrasenia)) {
        Swal.fire("Error", "La contraseña debe contener al menos un número y una letra en mayúscula.", "error");
        return;
    }

    // Si todas las validaciones pasan
    Swal.fire("Éxito", "Registro exitoso.", "success").then(() => {
        // Limpiar los campos del formulario
        document.getElementById("loginForm").reset();
    });
});
