/*document.getElementById("loginForm").addEventListener("submit", function(event) {
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
});*/

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('nombre').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('contrasenia').value;
    const imagen = document.getElementById('photo').value;
    const rol = document.getElementById('idRol').value;

    try {
        const response = await fetch('/usuario/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username,mail, password, imagen,rol })
        });
        const data = await response.json();

        if (response.ok) {
            document.getElementById('register-message').textContent = 'Registro exitoso. Ahora puedes iniciar sesión.';
        } else {
            document.getElementById('register-message').textContent = data.message || 'Error en el registro';
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        document.getElementById('register-message').textContent = 'Ocurrió un error. Intenta nuevamente.';
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const userListContainer = document.getElementById("userListContainer");

    // Función para obtener y mostrar usuarios
    function fetchUsers() {
        // Mostrar un mensaje de carga mientras se obtienen los datos
       // userListContainer.innerHTML = "<p class='loading'>Cargando usuarios...</p>";

        fetch("http://localhost:3010/usuario")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }
                return response.json();
            })
            .then(users => {
                console.log("Datos recibidos de la API:", users); // Log para depuración

                userListContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar usuarios

                if (users.length === 0) {
                    userListContainer.innerHTML = "<p>No hay usuarios disponibles.</p>";
                    return;
                }

                // Ruta base para las imágenes
                const pathFoto = "/uploads/";

                // Generar tarjetas de usuarios
                users.forEach(user => {
                    const userDiv = document.createElement("div");
                    userDiv.classList.add("user-card");

                    // Manejo de valores predeterminados en caso de que falten datos
                    const userPhoto = user.imagen || "default.jpg"; // Foto por defecto
                    const userId = user.id_usuario || "No disponible";
                    const userName = user.nombre || "No disponible";
                    const userRole = user.descripcion || "No disponible";

                    userDiv.innerHTML = `
                        <img src="${pathFoto}${userPhoto}" alt="Foto de ${userName}" width="50" height="50">
                        <p><strong>ID:</strong> ${userId}</p>
                        <p><strong>Username:</strong> ${userName}</p>
                        <p><strong>Role:</strong> ${userRole}</p>
                    `;

                    userListContainer.appendChild(userDiv);
                });
            })
            .catch(error => {
               // console.error("Error al obtener los usuarios:", error);
                //userListContainer.innerHTML = "<p class='error'>Ocurrió un error al cargar los usuarios.</p>";
            });
    }

    // Cargar los usuarios cuando la página cargue
    fetchUsers();
});

