import { conexApi } from "./conexApi.js";
import { crearCard } from "./mostrarProductos.js";

const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');
const productosContainer = document.querySelector('[data-productos]');

async function filtrarProductos() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert('Debe ingresar un producto a buscar.');
        return;
    }

    try {
        // Usamos la función buscarProductos de conexApi
        const productoFiltrado = await conexApi.buscarProductos(query);

        productosContainer.innerHTML = ''; // Limpiamos los productos anteriores

        if (productoFiltrado.length === 0) {
            productosContainer.innerHTML = `<span class="card__title">No se encontraron productos :(</span>`;
        } else {
            productoFiltrado.forEach(producto => {
                const card = crearCard(
                    producto.imagen,
                    producto.marca,
                    producto.titulo,
                    producto.precioActual,
                    producto.dsct,
                    producto.precioAnterior,
                    producto.linkProducto
                );
                productosContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error al buscar un producto: ', error);
        productosContainer.innerHTML = `<span class="card__title">Hubo un error al realizar la búsqueda. Por favor, inténtalo nuevamente.</span>`;
    }
}

searchButton.addEventListener('click', filtrarProductos);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filtrarProductos();
    }
});
