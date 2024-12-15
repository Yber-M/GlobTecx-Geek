import { conexApi } from "./conexApi.js";
import { crearCard } from "./mostrarProductosCrud.js";

const searchButton = document.querySelector('#buscarBtn');
const searchInput = document.querySelector('#buscarProducto');
const productosContainer = document.querySelector('[data-productos]');

async function filtrarProductos() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        alert('Debe ingresar un producto a buscar.')
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/productos?q=${query}`);

        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }

        const productosFiltrados = await response.json();

        productosContainer.innerHTML = '';

        if (productosFiltrados.length === 0) {
            productosContainer.innerHTML = `<span class="producto-card__titulo">No se encontraron productos :(</span>`;

        } else {
            productosFiltrados.forEach(producto => {
                const card = crearCard(
                    producto.imagen,
                    producto.marca,
                    producto.titulo,
                    producto.precioActual,
                    producto.dsct,
                    producto.precioAnterior
                );
                productosContainer.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error al buscar un producto:', error);
        productosContainer.innerHTML = `<span class="producto-card__titulo">Hubo un error al realizar la búsqueda. Inténtalo de nuevo.</span>`;
    }

}
// Detectar enter y clic
searchButton.addEventListener('click', filtrarProductos);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filtrarProductos();
    }
});