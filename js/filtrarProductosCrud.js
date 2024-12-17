import { conexApi } from "./conexApi.js";
import { crearCard, listaProductos } from "./mostrarProductosCrud.js";

const searchButton = document.querySelector('#buscarBtn');
const searchInput = document.querySelector('#buscarProducto');
const productosContainer = document.querySelector('[data-productos]');
const reloadButton = document.querySelector('#reloadBtn');

async function filtrarProductos() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert('Debe ingresar un producto a buscar.')
        return;
    }

    try {
        const productosFiltrados = await conexApi.buscarProductos(query);

        productosContainer.innerHTML = '';

        activarBtnReload();


        if (productosFiltrados.length === 0) {
            productosContainer.innerHTML = `<span class="producto-card__titulo">No se encontraron productos :(</span>`;

        } else {
            productosFiltrados.forEach(producto => {
                const card = crearCard(
                    producto.id,
                    producto.imagen,
                    producto.linkProducto,
                    producto.marca,
                    producto.titulo,
                    producto.precioActual,
                    producto.dsct,
                    producto.precioAnterior,
                );
                productosContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error al buscar un producto:', error);
        productosContainer.innerHTML = `<span class="producto-card__titulo">Hubo un error al realizar la búsqueda. Inténtalo de nuevo.</span>`;
    }

}

function activarBtnReload() {
    reloadButton.style.display = 'block';
}

function desactivarBtnReload() {
    reloadButton.style.display = 'none';
    searchInput.value = '';
    productosContainer.innerHTML = '';
}

reloadButton.addEventListener('click', () => {
    desactivarBtnReload();
    listaProductos(crearCard);
});

// Detectar enter y clic
searchButton.addEventListener('click', filtrarProductos);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filtrarProductos();
    }
});