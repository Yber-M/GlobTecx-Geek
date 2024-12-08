const loginForm = document.querySelector('.login__formulario');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Obtener usuarios desde la API
async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:3001/users');
        return response.json();
    } catch (error) {
        console.log('Error al obtener usuarios: ', error);
        alert('No se pudo conectar con la base de datos de usuarios')
    }
}

// Funcion iniciar sesio
async function iniciarSesion(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const users = await obtenerUsuarios();

    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        localStorage.setItem('firstName', JSON.stringify(user));
        alert(`Bienvenido, ${user.firstName}!`);
        window.location.href = '../index.html';
    } else {
        alert('Credenciales Inválidas. Intente nuevamente...');
    }
}

// Escuchar el evento submit
loginForm.addEventListener('submit', iniciarSesion);