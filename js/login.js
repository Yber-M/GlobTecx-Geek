import { conexApi } from "./conexApi.js";

const loginForm = document.querySelector('.login__formulario');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Funcion iniciar sesio
async function iniciarSesion(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const users = await conexApi.obtenerUsuarios();

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