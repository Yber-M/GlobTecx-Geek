const conexion = 'http://localhost:3001';

async function listarProductos() {
    const conectar = await fetch(conexion + `/productos`);
    
    if (!conectar.ok) {
        throw new Error('Error al conectar con la API');
    }
    const convertirConexion = await conectar.json();
        
    return convertirConexion;
}

// Obtener usuarios desde la API
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

export const conexApi = {
    listarProductos,
    obtenerUsuarios,
    registrarUsuario,
    buscarProductos
}

listarProductos();