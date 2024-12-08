const sliderContainer = document.querySelector('.slider__container');
const sliderItems = document.querySelectorAll('.slider__item');
const btnLeft = document.querySelector('.slider__button--left');
const btnRight = document.querySelector('.slider__button--right');

let currentIndex = 0;
const totalItems = sliderItems.length;


function moverSlider(index) {
    const offset = -index * sliderItems[0].clientWidth;
    sliderContainer.style.transform = `translateX(${offset}px)`;
}

btnLeft.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    moverSlider(currentIndex);
});
btnRight.addEventListener('click', () => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    moverSlider(currentIndex);
});

// Logica de logueo
document.addEventListener('DOMContentLoaded', () => {
    const userButton = document.querySelector('.header__options__user')
    const userElmA = document.querySelector('.header__options__action');
    const logoutButton = document.querySelector('.header__options__login');
    const spanText = userButton.querySelector('span');

    const user = JSON.parse(localStorage.getItem('firstName'));

    if (user) {
        // Actualizamos la interfaz para un usuario logueado
        spanText.textContent = `Bienvenido, ${user.firstName}!`;
        userElmA.removeAttribute('href');
        logoutButton.style.display = 'inline-block';

        userElmA.addEventListener('click', () => {
            window.location.href = 'pages/agregar.html';
        });
    }

    // Logica para cerrar sesion
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('firstName');
        window.location.reload();
    });
});