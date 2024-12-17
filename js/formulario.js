// Variables para calcular dsct.
const precioInput = document.querySelector('#precio');
const descuentoInput = document.querySelector('#descuento');
const calcularBtn = document.querySelector('#calcularDescuento');
const precioFinInput = document.querySelector('#precioFinal');

// Variables para Cargar la Vista Previa
const urlProductInput = document.querySelector('#urlProducto');
const urlImagenInput = document.querySelector('#urlImagen');
const cargarVistaBtn = document.querySelector('#vistaPreviaBtn');
const containerPreview = document.querySelector('.gestionar__vista');

function calcularDsct() {
    const precio = parseFloat(precioInput.value);
    const descuento = parseFloat(descuentoInput.value);

    if (isNaN(precio) || isNaN(descuento)) {
        alert('Debe ingresar un número válido en Precio y Descuento')
        return;
    }
    if (descuento < 1 || descuento > 90) {
        alert('El descuento debe estar entre 1 y 90');
        return;
    }

    const precioFinal = precio - (precio * (descuento / 100));
    precioFinInput.value = precioFinal.toFixed(2);
}

function cargarVistaPrevia() {
    const linkProducto = urlProductInput.value.trim();
    const imagenProducto = urlImagenInput.value.trim();

    if (!linkProducto || !imagenProducto) {
        alert('Por favor, complete ambos campos de URL.');
        return;
    }

    if (!esUrlValida(linkProducto) || !esUrlValida(imagenProducto)) {
        alert('Ingrese URLs válidas en ambos campos.');
        return;
    }

    containerPreview.innerHTML = `
        <a href="${linkProducto}" target="_blank">
            <img src="${imagenProducto}" alt="Vista Previa" style="max-width: 100%; border-radius: 8px;">
        </a>
    `;
}

// Evento del boton Calcualr dsct.
calcularBtn.addEventListener('click', () => {
    if (precioInput.value.trim() === '' || descuentoInput.value.trim() === '') {
        alert('Por favor, complete los campos de Precio y Descuento');
        return;
    }
    calcularDsct();
});

// Evento del boton Cargar Vista Previa
cargarVistaBtn.addEventListener('click', cargarVistaPrevia);

function esUrlValida(url) {
    const regex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    return regex.test(url);
}
