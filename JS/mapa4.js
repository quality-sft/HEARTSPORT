//EMPRESA: SYSTEM BOSS
//APLICACIÓN: HEART SPORT
//VISUAL8: FUNCIONES DE LA CALIFICACIÓN POR 
const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const stars = document.querySelectorAll('.star');
let rating = 0;

// Agregar funcionalidad de calificación
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    rating = index + 1;
    updateStars(rating);

    if (rating > 0) {
      document.getElementById("divTerminar").style.display="block"
    }
  });
});

async function ponerprivaada(nombreruta){
  const { data, error } = await supabase
    .from('Rutas')
    .update({ visibilidad: 'privada' })
    .eq('nombreruta', nombreruta);
}

function updateStars(rating) {
  stars.forEach((star, index) => {
    // Resaltar las estrellas que están dentro de la calificación seleccionada
    if (index < rating) {
      star.style.color = '#f7d106'; // Amarillo
    } else {
      star.style.color = '#ddd'; // Gris claro
    }
  });

}
async function calidadruta() {
  var calidad = 0;
  if (rating === 1) {
    console.log("El usuario dio 1 estrella");
    calidad = 1;
  } else if (rating === 2) {
    console.log("El usuario dio 2 estrellas");
    calidad = 2;
  } else if (rating === 3) {
    console.log("El usuario dio 3 estrellas");
    calidad = 3;
  } else if (rating === 4) {
    console.log("El usuario dio 4 estrellas");
    calidad = 4;
  } else if (rating === 5) {
    console.log("El usuario dio 5 estrellas");
    calidad = 5;
  }

  const idusuario = localStorage.getItem("user_id");

  const nombreruta = localStorage.getItem("nombrerutacalidad");


  const { data, error } = await supabase
    .from('Rutas')
    .update({ calidadruta: calidad })
    .eq('idusuario', idusuario)
    .eq('nombreruta', nombreruta)
    .select();

    await ponerprivaada(nombreruta);
  window.location.href = "menu.html"
}

const img = localStorage.getItem("modalidad")
alert(img)
if (img === "bicicleta"){
  document.getElementById("imga").src = "https://www.quironsalud.com/idcsalud-client/cm/images?locale=es_ES&idMmedia=647913"
} else if (img === "running"){
  document.getElementById("imga").src= "https://cuidateplus.marca.com/sites/default/files/styles/ratio_1_1/public/cms/2022-12/running-consejos-principiantes.jpg.webp?itok=0TWe3frA"
} else{
  document.getElementById("imga").src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUHUS2MUtiYNAGcAcqV9kRPK7544WqUlPK3A&s"
}