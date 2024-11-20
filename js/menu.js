document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // window.location.href = '/login.html';
        window.location.href = '/pages/usuario.html';
    } else {
        // Extrae el token (sin el prefijo "Bearer ey")
        const authToken = token.replace('Bearer ', '');
        
        console.log(authToken);

        
        
        fetch('/menu', {
            // headers: { 'Authorization': `Bearer ey ${authToken}` }
            headers: { 'Authorization': authToken}
        })
        .then(res => res.json())
        .then(data => {
            if (data.menu) {
                const menuContainer = document.getElementById('menu');
                menuContainer.innerHTML = data.menu.map(option => `<a href="${option.toLowerCase()}.html">${option}</a>`).join('');
                
                document.getElementById('username').textContent = data.nombre;
                document.getElementById('user-photo').src = data.imagen || 'default.png';
            }
        })
        .catch(() => {
            alert('Authentication failed');
            localStorage.removeItem('token');
            // window.location.href = '/login.html';
            window.location.href = '/home.html';
        });
    }
});

function logout() {
    localStorage.removeItem('token');
    // window.location.href = '/login.html';
    window.location.href = '/home.html';
}