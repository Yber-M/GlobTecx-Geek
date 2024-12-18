import { conexApi } from "./conexApi.js";

const listarProductos = document.querySelector('[data-productos]');

// Seleccionar los inputs del formulario
const idInput = document.querySelector('#id');
const tituloInput = document.querySelector('#titulo');
const marcaInput = document.querySelector('#marca');
const precioInput = document.querySelector('#precio');
const descuentoInput = document.querySelector('#descuento');
const precioFinalInput = document.querySelector('#precioFinal');
const urlProductoInput = document.querySelector('#urlProducto');
const urlImagenInput = document.querySelector('#urlImagen');

export function crearCard(id, imagen, linkProducto, marca, titulo, precioActual, dsct, precioAnterior) {
    const producto = document.createElement('div');
    producto.classList.add('producto-card');
    producto.innerHTML = `
    <a class="producto-card__imagen" href="${linkProducto}" target="_blank"> <img src="${imagen}" alt="${titulo}" class="producto-card__imagen"></a>
        <div class="producto-card__contenido">
            <span class="producto-card__marca">ID: ${id} | ${marca}</span>
            <h3 class="producto-card__titulo">${titulo}</h3>
            <div class="producto-card__precios">
                <span class="producto-card__precio-actual">S/${precioActual}</span>
                <span class="producto-card__precio-anterior">S/${precioAnterior}</span>
                <span class="producto-card__descuento">-${dsct}%</span>
            </div>
            <button class="producto-card__btn" data-gestionar>Gestionar producto</button>
        </div>`;

    // Evento para el boton Gestionar Productos
    const gestionarBtn = producto.querySelector('[data-gestionar]');
    gestionarBtn.addEventListener('click', () => {
        cargarFormulario({
            id,
            titulo,
            marca,
            precioActual,
            dsct,
            precioAnterior,
            imagen,
            linkProducto
        });

        // Inhabilitar inputId
        idInput.disabled = true;
    });

    return producto;
}

function cargarFormulario(producto) {
    // Eliminar comas del precio y convertirlo a número
    const precioAnteriorLimpio = parseFloat(producto.precioAnterior.replace(/,/g, ''));
    const precioFinalLimpio = parseFloat(producto.precioActual.replace(/,/g, ''));

    idInput.value = producto.id;
    tituloInput.value = producto.titulo;
    marcaInput.value = producto.marca;
    precioInput.value = precioAnteriorLimpio;
    descuentoInput.value = producto.dsct;
    precioFinalInput.value = precioFinalLimpio;
    urlProductoInput.value = producto.linkProducto;
    urlImagenInput.value = producto.imagen;
}

export async function listaProductos(callbackCrearCard) {
    try {
        const productos = await conexApi.listarProductos();

        const productoInvertido = productos.reverse();

        productoInvertido.forEach((producto) => {
            const card = callbackCrearCard(
                producto.id,
                producto.imagen,
                producto.linkProducto,
                producto.marca,
                producto.titulo,
                producto.precioActual,
                producto.dsct,
                producto.precioAnterior,
            );
            listarProductos.appendChild(card);
        });
    } catch (error) {
        console.error("❌ Error al mostrar la lista de productos:", error);
    }
}

listaProductos(crearCard);