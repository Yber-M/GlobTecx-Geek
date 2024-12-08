async function listarProductos() {
    const conectar = await fetch('http://localhost:3001/productos');
    
    if (!conectar.ok) {
        throw new Error('Error al conectar con la API');
    }
    const convertirConexion = await conectar.json();
        
    return convertirConexion;
}

// Obtener usuarios desde la API
export async function obtenerUsuarios() {
    try {
        const response = await fetch('http://localhost:3001/users');
        return response.json();
    } catch (error) {
        console.log('Error al obtener usuarios: ', error);
        alert('No se pudo conectar con la base de datos de usuarios')
        return[];
    }
}

export async function registrarUsuario(nuevoUsuario) {
    try {
        const response = await fetch('http://localhost:3001/users', {
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

export const conexApi = {
    listarProductos,
    obtenerUsuarios
}

listarProductos();