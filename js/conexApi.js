const conexion = 'https://apiglobtecxgeek.onrender.com';

async function listarProductos() {
    const conectar = await fetch(conexion + `/productos`);
    
    if (!conectar.ok) {
        throw new Error('Error al conectar con la API');
    }
    const convertirConexion = await conectar.json();
        
    return convertirConexion;
}

async function obtenerUsuarios() {
    try {
        const response = await fetch(conexion + '/users');
        return response.json();
    } catch (error) {
        console.log('Error al obtener usuarios: ', error);
        alert('No se pudo conectar con la base de datos de usuarios')
        return[];
    }
}

async function registrarUsuario(nuevoUsuario) {
    try {
        const response = await fetch(conexion +'/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
        });

        if (!response.ok) {
            throw new error('No se pudo registrar el usuario. Verifique la conexión.')
        }
    } catch (error) {
        console.log('Error al registrar nuevo usuario', error);
        alert('Error al registrar el usuario. Intentelo nuevamente.');
    }
}

async function registrarProducto(producto) {
    try {
        const response = await fetch(conexion + '/productos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(producto),
        });

        if (!response.ok) {
            throw new Error('No se pudo registrar el producto');
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error al registrar producto', error);
        throw error;
    }
}

async function actualizarProducto(producto) {
    try {
        const response = await fetch(`${conexion}/productos/${producto.id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(producto),
        });

        if (!response.ok) {
            throw new Error('No se puede actualizar el producto');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
}

async function buscarProductos(palabraClave) {
    try {
        const conex = await fetch(`${conexion}/productos?q=${palabraClave}`);
        if (!conex.ok) {
            throw new Error('Error al conectar con la API');
        }
        
        const conexionConvert = conex.json();
        return conexionConvert;
        
    } catch (error) {
        console.error('Error en buscarProductos: ', error);
        throw error;
    }
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${conexion}/productos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('No se puede eliminar el producto');
        }

        return true;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
}

export const conexApi = {
    listarProductos,
    obtenerUsuarios,
    registrarUsuario,
    buscarProductos,
    registrarProducto,
    actualizarProducto,
    eliminarProducto
}

listarProductos();