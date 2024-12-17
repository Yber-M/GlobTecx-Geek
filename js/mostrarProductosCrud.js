import { conexApi } from "./conexApi.js";

const listarProductos = document.querySelector('[data-productos]');

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
    return producto;
}

export async function listaProductos(callbackCrearCard) {
    try {
        const productos = await conexApi.listarProductos();

        productos.forEach((producto) => {
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