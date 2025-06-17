
function cambiar() {
    var contenedor = document.getElementById('contenedor');
    var contenedor2 = document.getElementById('contenedor2');

    if (contenedor.innerHTML.includes('<img') && contenedor2.innerHTML.includes('')) {
        // Si ya es una imagen, lo convertimos de vuelta a un div
        contenedor.innerHTML = '';
    } else {
        // Si no es una imagen, lo cambiamos a una imagen
        contenedor.innerHTML = '<img src="imagenes/chulo.png" alt="Imagen">';
        contenedor2.innerHTML = '';
    }
}
function cambiar2() {
    var contenedor = document.getElementById('contenedor');
    var contenedor2 = document.getElementById('contenedor2');

    if (contenedor2.innerHTML.includes('<img') && contenedor.innerHTML.includes('')) {
        // Si ya es una imagen, lo convertimos de vuelta a un div
        contenedor2.innerHTML = '';
    } else {
        // Si no es una imagen, lo cambiamos a una imagen
        contenedor2.innerHTML = '<img src="imagenes/chulo.png" alt="Imagen">';
        contenedor.innerHTML = '';
    }
}



function cambiar3() {
    var contenedor3 = document.getElementById('contenedor3');
    var contenedor4 = document.getElementById('contenedor4');

    if (contenedor3.innerHTML.includes('<img') && contenedor4.innerHTML.includes('')) {
        // Si ya es una imagen, lo convertimos de vuelta a un div
        contenedor3.innerHTML = '';
    } else {
        // Si no es una imagen, lo cambiamos a una imagen
        contenedor3.innerHTML = '<img src="imagenes/chulo.png" alt="Imagen">';
        contenedor4.innerHTML = '';
    }
}
function cambiar4() {
    var contenedor3 = document.getElementById('contenedor3');
    var contenedor4 = document.getElementById('contenedor4');

    if (contenedor4.innerHTML.includes('<img') && contenedor3.innerHTML.includes('')) {
        // Si ya es una imagen, lo convertimos de vuelta a un div
        contenedor4.innerHTML = '';
    } else {
        // Si no es una imagen, lo cambiamos a una imagen
        contenedor4.innerHTML = '<img src="imagenes/chulo.png" alt="Imagen">';
        contenedor3.innerHTML = '';
    }
}





document.getElementById("cancelar").onclick = function () {
    window.location.href = "visual1.html";
}