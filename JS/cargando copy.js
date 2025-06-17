//EMPRESA: SYSTEM BOSS
//APLICACIÓN: HEART SPORT
//CARGANDO: ESPERA DE LOS 3 SEGUNDOS PARA PASAR A LA OTRA PÁGINA
window.onload = function () {
  dirige();
};

function dirige() {
  var dir = localStorage.getItem("destino")



  if (dir == "menu") {
    setTimeout(() => {
      window.location.href = "menu.html"
    }, 3000);

  } else if (dir == "añadirmetas") {
    setTimeout(() => {
      window.location.href = "añadirmetas.html"
    }, 3000);
  } else if (dir == "veramistades") {
    setTimeout(() => {
      window.location.href = "amistades.html"
    }, 3000);
  } else if (dir == "añadiramistades") {
    setTimeout(() => {
      window.location.href = "añadiramistades.html"
    }, 1000);
  } else if (dir == "verperfil") {
    setTimeout(() => {
      window.location.href = "perfilusuario.html"
    }, 1000);
  } else if (dir == "retrocedereditarperfil") {
    setTimeout(() => {
      window.location.href = "perfilusuario.html"
    }, 1000);
  }
}