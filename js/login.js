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

// Logica para alternar los formularios
document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login__container.loguearse');
    const registerContinaer = document.querySelector('.login__container.register');
    const toggleLinks = document.querySelectorAll('[data-toggle]');

    toggleLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const target = link.getAttribute("data-toggle");

            if (target === 'register') {
                loginContainer.classList.remove('active');
                registerContinaer.classList.add('active');
            } else if (target === 'login') {
                loginContainer.classList.add('active');
                registerContinaer.classList.remove('active');
            }
        });
    });
});