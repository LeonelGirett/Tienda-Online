const apiUrl = 'http://localhost:3010/usuario/';  // Dirección de la API

const photoInput = document.getElementById('photo');
const photoContainer = document.getElementById('photo-container');

photoInput.addEventListener('change', function () {
    const file = photoInput.files[0]; // Obtiene el archivo seleccionado
    if (file) {
        const reader = new FileReader(); // Crea un FileReader para leer el archivo

        reader.onload = function (e) {
            // Cuando se carga el archivo, establece el resultado como fondo del div
            photoContainer.style.backgroundImage = `url(${e.target.result})`;
        };

        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
});

// Función para obtener la lista de usuarios
function getUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#usersTable tbody');
            tableBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos datos
            pathFoto = "/uploads/";
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id_usuario}</td>
                    <td>${user.nombre}</td>
                    <td>${user.mail}</td>
                    <td>${user.descripcion}</td>
                    <td><img id="user-photo" src="${pathFoto}${user.imagen}" alt="Foto" width="30"></td>
                    <td>
                        <button onclick="editUser(${user.id_usuario})">Editar</button>
                        <button onclick="deleteUser(${user.id_usuario})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener usuarios:', error));
}

// Función para crear o actualizar un usuario
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const id = document.getElementById('userId').value;
    const username = document.getElementById('username_1').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const photo = document.getElementById('photo');

    console.log(id);
    console.log(username);
    console.log(email);
    console.log("Password: "+password);
    console.log(role);
    console.log(photo);

    // Obtener el div
    const photoContainer = document.getElementById('photo-container');

    // Obtener el valor del background-image
    const backgroundImage = window.getComputedStyle(photoContainer).getPropertyValue('background-image');

    // Mostrar el valor en consola - URL completa
    console.log('El valor de background-image es:', backgroundImage);

    // Si quieres almacenarlo en una variable -URL completa
    const imageUrl = backgroundImage; // Esto almacenará la URL de la imagen en la variable `imageUrl`
    console.log('La URL de la imagen es:', imageUrl);

    // Usar la función split() para dividir la URL por "/"
    const fileNameWithExtension = imageUrl.split('/').pop().replace('")', '').replace('"', '');

    // Mostrar el nombre del archivo y su extensión
    console.log(fileNameWithExtension); // Salida: "1731782459439.jpg"

    // Crear el FormData
    const formData = new FormData();

    // Agregar los campos de texto al FormData
    formData.append('nombre', username);
    formData.append('mail', email);
    formData.append('password', password);
    formData.append('id_rol', role);

    // Verificar si se seleccionó un archivo y agregarlo al FormData
    if (photo.files.length > 0) {
        formData.append('imagen', photo.files[0]); // El archivo seleccionado
    } else {
        formData.append('imagen', fileNameWithExtension); // El archivo seleccionado
        console.error('No se seleccionó ningún archivo.');
    }
    
    formData.forEach((value, key) => {
        console.log(key, value);  // Muestra la clave y el valor
    });

    if (id) {
        // Actualizar usuario
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(() => {
                getUsers(); /* carga nuevamente la lista de usuario */
                clearForm();
            })
            .catch(error => console.error('Error al actualizar el usuario:', error));
    } else {
        // Crear usuario
        fetch(apiUrl, {
            method: 'POST',
            body: formData
        })
            .then(() => {
                getUsers();  /* carga nuevamente la lista de usuario */
                clearForm();
            })
            .catch(error => console.error('Error al crear el usuario:', error));
    }
});

// Función para editar un usuario
function editUser(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(user => {
            console.log(user);

            document.getElementById('userId').value = user.id_usuario;
            document.getElementById('username_1').value = user.nombre;
            document.getElementById('email').value = user.mail;
            document.getElementById('password').value = user.password;
            document.getElementById('role').value = user.id_rol;
            document.getElementById('photo').value = "";

            const imageUrl = `/uploads/${user.imagen}`;
            document.getElementById('photo-container').style.backgroundImage = `url(${imageUrl})`;

            console.log(document.getElementById('username_1').value);
            console.log(document.getElementById('email').value);
            console.log(document.getElementById('password').value);
            console.log(document.getElementById('photo').value);
            console.log(document.getElementById('role').value);

            console.log(user);
        })
        .catch(error => console.error('Error al obtener el usuario:', error));
}

// Función para eliminar un usuario
function deleteUser(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getUsers())  /* carga nuevamente la lista de usuario */
        .catch(error => console.error('Error al eliminar el usuario:', error));
}

// Limpiar el formulario
function clearForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('photo-container').style.backgroundImage = "url('/public/upload/usuario_default.png')";
}

// Cargar la lista de usuarios al cargar la página
document.addEventListener('DOMContentLoaded', getUsers);
