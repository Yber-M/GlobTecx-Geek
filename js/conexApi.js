async function listarProductos() {
    const conectar = await fetch('http://localhost:3001/productos');
    
    if (!conectar.ok) {
        throw new Error('Error al conectar con la API');
    }
    const convertirConexion = await conectar.json();
    
    console.log("Productos obtenidos:", convertirConexion);
    
    return convertirConexion;
}

export const conexApi = {
    listarProductos,
}

listarProductos();