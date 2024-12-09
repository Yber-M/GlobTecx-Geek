import { conexApi } from "./conexApi.js";
import { registrarUsuario } from "./conexApi.js";

// Selección de formularios
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

// Selección de inputs de login
const emailInput = document.querySelector('#email-login');
const passwordInput = document.querySelector('#password-login');

// Función para iniciar sesión
async function iniciarSesion(event) {
    event.preventDefault();
    console.log("Formulario de Login enviado, event.preventDefault() ejecutado");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const users = await conexApi.obtenerUsuarios();

    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        localStorage.setItem('firstName', JSON.stringify(user));
        window.location.href = '../index.html';
    } else {
        textErrorLogin('Credenciales Inválidas');
    }
}

async function manejarRegistro(event) {
    event.preventDefault();

    const firstName = document.querySelector('#firstName').value.trim();
    const lastName = document.querySelector('#lastName').value.trim();
    const email = document.querySelector('.register #email-register').value.trim();
    const password = document.querySelector('.register #password-register').value.trim();
    const confirmPassword = document.querySelector('.register #confirm-password').value.trim();

    // Validar campos
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        textErrorRegister('Completo todos los campos.');
        return;
    }

    if (password !== confirmPassword) {
        textErrorRegister('Contraseñas diferentes.');
        return;
    }

    try {
        const users = await conexApi.obtenerUsuarios();
        const emailExiste = users.some((user) => user.email === email);

        if (emailExiste) {
            textErrorRegister('Email ya registrado.');
            return;
        }

        // Mostrar el mensaje de registro exitoso
        usuarioRegistradoText('¡Registro exitoso!');

        // Esperar a que el mensaje termine antes de registrar al usuario (por ejemplo, 3 segundos)
        setTimeout(async () => {
            const nuevoUsuario = {
                firstName,
                lastName,
                email,
                password,
            };

            const usuarioRegistrar = await registrarUsuario(nuevoUsuario);

            if (usuarioRegistrar) {
                usuarioRegistradoText('Registro exitoso!');
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 2000);
            }
        }, 5200); // Tiempo para mostrar el mensaje inicial
    } catch (error) {
        console.log('Error al registrar usuario.', error);
        textErrorRegister('Error al registrarse.');
    }
}

// Función de mensajes
function textErrorLogin(cadena) {
    new Typed('#typed-login', {
        strings: [`${cadena}`, 'Inténtalo nuevamente...', 'GLOBTECx-'],
        typeSpeed: 50,
        backSpeed: 15,
        cursorChar: '',
        loop: false,
    });
}

function textErrorRegister(cadena) {
    new Typed('#typed-register', {
        strings: [`${cadena}`, 'Inténtalo nuevamente...', 'GLOBTECx-'],
        typeSpeed: 50,
        backSpeed: 15,
        cursorChar: '',
        loop: false,
    });
}

function usuarioRegistradoText(cadena) {
    new Typed('#typed-register', {
        strings: [`${cadena}`, 'Redireccionando al login...'],
        typeSpeed: 45,
        backSpeed: 25,
        cursorChar: '',
        loop: false,
    });
}

// Asociar eventos a formularios
if (loginForm) {
    loginForm.addEventListener('submit', iniciarSesion);
}

if (registerForm) {
    registerForm.addEventListener('submit', manejarRegistro);
}

// Lógica para alternar formularios
document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login__container.loguearse');
    const registerContainer = document.querySelector('.login__container.register');
    const toggleLinks = document.querySelectorAll('[data-toggle]');

    toggleLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const target = link.getAttribute("data-toggle");

            if (target === 'register') {
                loginContainer.classList.remove('active');
                registerContainer.classList.add('active');
            } else if (target === 'login') {
                loginContainer.classList.add('active');
                registerContainer.classList.remove('active');
            }
        });
    });
});
