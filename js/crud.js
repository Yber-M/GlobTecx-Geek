import { conexApi } from "./conexApi.js";

const agregarBtn = document.querySelector('#agregarBtn');
const formularioProducto = document.querySelector('#formularioProducto');
const vistaPrevia = document.querySelector('.gestionar__vista');

// Seleccionar campos
const idInput = document.querySelector('#id');
const tituloInput = document.querySelector('#titulo');
const marcaInput = document.querySelector('#marca');
const precioInput = document.querySelector('#precio');
const descuentoInput = document.querySelector('#descuento');
const precioFinalInput = document.querySelector('#precioFinal');
const urlProductoInput = document.querySelector('#urlProducto');
const urlImagenInput = document.querySelector('#urlImagen');

async function agregarProductos() {

    console.log('Inciando funcionalidad agregar');
    if (!validarCampos()) {
        console.log("❌ Campos incompletos");
        return;
    }    

    try {
        console.log("📡 Obteniendo productos existentes...");
        const productos = await conexApi.listarProductos();

        const idDuplicado = productos.some(producto => String(producto.id) === String(idInput.value));

        if (idDuplicado) {
            alert("❌ El ID ingresado ya existe. Por favor, ingrese un ID único.");
            console.log("❌ ID duplicado encontrado:", idInput.value);
            return;
        }


        // Constructor para el nuevo objeto
        const nuevoProducto = {
            id: idInput.value,
            imagen: urlImagenInput.value,
            titulo: tituloInput.value,
            marca: marcaInput.value,
            precioAnterior: precioInput.value,
            dsct: descuentoInput.value,
            precioActual: precioFinalInput.value,
            linkProducto: urlProductoInput.value,
        };

        console.log("📦 Enviando producto a la API:", nuevoProducto);


        // Registrar el producto
        await conexApi.registrarProducto(nuevoProducto);

        console.log("✅ Producto agregado exitosamente");
        alert("✅ Producto agregado exitosamente.");
        formularioProducto.reset();
        vistaPrevia.innerHTML = `
            <img src="../img/Vector.svg" id="vistaPrevia" alt="vistaPrevia"><br>
            <spam class="vistaPrevia__texto">Vista Previa</spam>`;

        location.reload(); // Recargar la página
    } catch (error) {
        console.error("❌ Error al agregar producto:", error);
        alert("❌ Ocurrió un error al agregar el producto. Inténtelo nuevamente.");
    }
}

function validarCampos() {
    if (
        !idInput.value ||
        !tituloInput.value ||
        !marcaInput.value ||
        !precioInput.value ||
        !descuentoInput.value ||
        !precioFinalInput.value ||
        !urlProductoInput.value ||
        !urlImagenInput.value
    ) {
        alert("❌Por favor, complete todos los campos antes de agregar el producto.");
        return false;
    } else {
        return true;
    }
}

// Evento para el boton agregar
agregarBtn.addEventListener('click', agregarProductos);