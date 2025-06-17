//EMPRESA: SYSTEM BOSS
//APLICACIÓN: HEART SPORT
//VISUAL4: FUNCIONES DEL MENU DEL USUARIO

function amistades() {
    localStorage.setItem('destino', "veramistades");
    window.location.href = "cargando copy.html"
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;

    const timeImage = document.getElementById('alladoreloj');
    if (hours >= 6 && hours < 18) {
        timeImage.src = 'IMAGENES/visual5/sol.png'; // Imagen para el día
        timeImage.alt = 'Imagen del día';
    } else {
        timeImage.src = 'IMAGENES/visual5/luna.png'; // Imagen para la noche
        timeImage.alt = 'Imagen de la noche';
    }
}

function mostrarFecha() {
    const ahora = new Date();
    const opciones = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opciones);
    document.getElementById('fecha').textContent = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

// Inicializa los valores al cargar la página
window.onload = () => {
    updateClock();
    mostrarFecha();
    setInterval(updateClock, 1000); // Actualiza cada segundo
};





function alternarVisibilidadDiv() {
    let estado = localStorage.getItem('estadoDiv');
    if (estado === null) {
        estado = 'mostrar';
    }
    if (estado === 'mostrar') {
        document.getElementById('content').style.display = 'block';
        localStorage.setItem('estadoDiv', 'ocultar');
    } else {
        document.getElementById('content').style.display = 'none';
        localStorage.setItem('estadoDiv', 'mostrar');
    }
}
alternarVisibilidadDiv();




// Selección del contenedor y del botón "Mejor en otro momento"
const content = document.getElementById('content');
const closeButton = document.getElementById('close-button');

// Evento para mover y desaparecer el contenedor
closeButton.addEventListener('click', () => {
    content.classList.add('hidden');
    setTimeout(() => {
        content.style.display = 'none'; // Se oculta después de la animación
    }, 500); // Tiempo en milisegundos (0.5s)
});

const content2 = document.getElementById('content');




document.getElementById("clickableProfile").onclick = function () {
    localStorage.setItem('destino', "verperfil");
    window.location.href = "cargando copy.html"
};



async function uploadImage() {

    const userId = localStorage.getItem("user_id");
    const fileName = `profile-${userId}.jpg`;

    // Agregar cache buster
    const imageUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/${fileName}?${new Date().getTime()}`;

    // Mostrar la imagen en el HTML
    document.getElementById('fotodeperfil').src = imageUrl;
    console.log('URL de la imagen:', imageUrl);



}

uploadImage();