//EMPRESA: SYSTEM BOSS
//APLICACIÓN: HEART SPORT
//VISUAL5: FUNCIONES DEL IMC

// Seleccionar elementos
const thumbnail = document.getElementById('thumbnail');
const fullscreenContainer = document.getElementById('fullscreen-container');
const closeButton = document.getElementById('close-button');

// Mostrar imagen en pantalla completa
thumbnail.addEventListener('click', () => {
  fullscreenContainer.style.display = 'flex'; // Mostrar contenedor
});

// Cerrar pantalla completa al hacer clic en la X
closeButton.addEventListener('click', () => {
  fullscreenContainer.style.display = 'none'; // Ocultar contenedor
});

// Cerrar pantalla completa al hacer clic en la imagen grande
fullscreenContainer.addEventListener('click', (e) => {
  // Verificar si se hace clic fuera de la imagen o X
  if (e.target === fullscreenContainer) {
    fullscreenContainer.style.display = 'none';
  }

}
);

function Calcular() {
  // Obtener los valores de los inputs y convertirlos a números
  var peso = parseFloat(document.getElementById("peso").value);
  var estatura = parseFloat(document.getElementById("estatura").value);



  // Calcular el IMC
  var resultado = peso / (estatura * estatura);

  document.getElementById("resultado").value = "Tu IMC es: " + resultado.toFixed(2);

  if (resultado < 18.5) {
    document.getElementById("resultado2").value = "Es Bajo";
  } else if (resultado >= 18.5 && resultado <= 24.9) {
    document.getElementById("resultado2").value = "Es Normal";
  } else if (resultado >= 25 && resultado <= 29.9) {
    document.getElementById("resultado2").value = "Es Sobrepeso";
  } else if (resultado >= 30) {
    document.getElementById("resultado2").value = "Es Obeso";
  }
}
