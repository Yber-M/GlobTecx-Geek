import { conexApi } from "./conexApi.js";

const list = document.querySelector('[data-productos]');
console.log("Contenedor encontrado>", list);

export function crearCard(imagen, marca, titulo, precioActual, dsct, precioAnterior, linkProducto) {
    const producto = document.createElement('div');
    producto.classList.add("card");
    producto.innerHTML = `
        <img src="${imagen}"
            alt="${titulo}">
        <div class="card__content">
            <span class="card__marca">${marca}</span>
            <span class="card__title">${titulo}</span>
            <span class="card__price">S/${precioActual}</span>
            <div class="card__details">
                <span class="card__price--old">S/${precioAnterior}</span>
                <span class="card__dsct">-${dsct}%</span>
            </div>
            <button class="card__button"><a href="${linkProducto}" target="_blank">Agregar al Carrito</a></button>
        </div>`;

    return producto;
}

async function listarProductos() {
    try {
        const producApi = await conexApi.listarProductos();
        console.log("Datos obtenidos de la API:", producApi);

        producApi.forEach((producto) => {
            const card = crearCard(
                producto.imagen,
                producto.marca,
                producto.titulo,
                producto.precioActual,
                producto.dsct,
                producto.precioAnterior,
                producto.linkProducto
            );
            console.log("Tarjeta creada:", card);
            list.appendChild(card);
        });
    } catch (error) {
        console.error("Error al mostrar la lista de productos:", error); // Mejora el mensaje de error
    }
}

listarProductos();