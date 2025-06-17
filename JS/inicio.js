function crearBalon() {
    const balon = document.createElement("div");
    balon.classList.add("balon");

    // Detectar si es móvil o PC
    let esMovil = window.innerWidth < 768;

    // Tamaño de los balones más reducido
    let tamano = esMovil ? (3 + Math.random() * 4) : (5 + Math.random() * 6); // En vw
    balon.style.width = `${tamano}vw`;
    balon.style.height = `${tamano}vw`;

    // Posición inicial aleatoria en el eje Y
    let startY = Math.random() * 100; // En porcentaje para adaptabilidad
    balon.style.top = `${startY}vh`;
    balon.style.left = `-10vw`; // Empieza más dentro para evitar expansión

    document.body.appendChild(balon);

    // Velocidad reducida para movimiento más sutil
    let velocidad = esMovil ? (0.2 + Math.random() * 0.8) : (0.1 + Math.random() * 1.2);

    function moverBalon() {
        let posX = parseFloat(balon.style.left);
        if (posX > 98) { // Desaparece justo antes del borde derecho
            balon.remove();
        } else {
            balon.style.left = `${posX + velocidad}vw`;
            requestAnimationFrame(moverBalon);
        }
    }

    moverBalon();
}

// Crear balones con menor frecuencia en móviles
setInterval(crearBalon, window.innerWidth < 768 ? 3500 : 6500); // 3.5s en móvil, 2.5s en PC
