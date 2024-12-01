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

btnLeft.addEventListener('click', ()=> {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    moverSlider(currentIndex);
});
btnRight.addEventListener('click', ()=> {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    moverSlider(currentIndex);
});