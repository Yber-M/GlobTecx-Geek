import { conexApi } from "./conexApi.js";

//Botones crud
const agregarBtn = document.querySelector('#agregarBtn');
const vaciarBtn = document.querySelector('#vaciarBtn');

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

    if (!validarCampos()) {
        console.log("❌ Campos incompletos");
        return;
    }    

    try {
        const productos = await conexApi.listarProductos();

        const idDuplicado = productos.some(producto => String(producto.id) === String(idInput.value));

        if (idDuplicado) {
            alert(`❌ El ID '${idInput}' ya existe. Por favor, ingrese un ID único.`);
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

        // Registrar el producto
        await conexApi.registrarProducto(nuevoProducto);

        alert("✅ Producto agregado exitosamente.");
        vaciarFormulario();
        location.reload(); // Recargar la página
    } catch (error) {
        console.error("❌ Error al agregar producto:", error);
        alert("❌ Ocurrió un error al agregar el producto. Inténtelo nuevamente.");
    }
}

function vaciarFormulario() {
    // Vaciar todos los inputs del formulario
    formularioProducto.reset();

    // Restablecer la vista previa
    vistaPrevia.innerHTML = `
        <img src="../img/Vector.svg" id="vistaPrevia" alt="vistaPrevia"><br>
        <spam class="vistaPrevia__texto">Vista Previa</spam>
    `;
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