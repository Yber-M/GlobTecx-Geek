async function conexApi() {
    const conectar = await fetch('http://localhost:3001/productos');


    const convertirConexion = conectar.json();


    return console.log(convertirConexion);

}

conexApi();