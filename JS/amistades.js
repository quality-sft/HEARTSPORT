

const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



  function Amigos() {
    document.getElementById("solicitudes").style.display = 'none';
    document.getElementById("tab-btns").style.backgroundColor = '#f2f2f2';
    document.getElementById("tab-btns").style.color = 'black';
    document.getElementById("tab-btn active").style.backgroundColor = '#800040';
    document.getElementById("tab-btn active").style.color = 'white';
    document.getElementById("amigos").style.display = 'block';
    contarAmigos();
  }
async function contarAmigos() {

  const contenedor = document.getElementById("contenedor"); //Acá lo hacemos para crear los divs que mostrarán los amigos
  contenedor.innerHTML = "";

  const usuarioActualID = localStorage.getItem("user_id"); //Detectar el id del usuario que ha iniciado sesión en el equipo
  let contador = 1; //Este y el de abajo lo hice para el while para crear los divs del html
  let contadordata = 0;

  const { data, error } = await supabase
  .from("amigos")
  .select("usuario_id, amigo_id")
  .eq("usuario_id", usuarioActualID)
  .eq("estado", "aceptado");

  document.getElementById("friendCounter").innerHTML =
    "Tienes:<br>" + data.length + " amigos"; //Acá como se creó un arreglo en const{data.. solamente vemos cuántos datos son y se lo decimos al usuario

  while (contador <= data.length) { //Acá el while que es el que va a ir a sacar el nombre de la tabla de registro
    const amigoId = data[contadordata].amigo_id;

    const { data: datosRegistro, error: errorRegistro } = await supabase
      .from("registro")
      .select("idusuario, nombre")
      .eq("idusuario", amigoId)
      .single(); // asumes un solo resultado


    contenedor.innerHTML += `
    <div class='amigo' onclick="hola('${amigoId}')" style="cursor: pointer;">
      <img src="" id="imgamigo-${datosRegistro.idusuario}">
      <div class='info'>
        <p class='nombre'>${datosRegistro.nombre}</p>
      </div>
    </div>`;

    const imgAmigo = document.getElementById(`imgamigo-${datosRegistro.idusuario}`);
    const fotoUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/profile-${datosRegistro.idusuario}.jpg?${new Date().getTime()}`;
    imgAmigo.src = fotoUrl;
    contador++;
    contadordata++;
  }
}
 function contarSolicitudes(){
    document.getElementById("solicitudes").style.display = 'block';
    document.getElementById("tab-btns").style.backgroundColor = '#800040';
    document.getElementById("tab-btns").style.color = 'white';
    document.getElementById("tab-btn active").style.backgroundColor = '#f2f2f2';
    document.getElementById("tab-btn active").style.color = 'black';
    document.getElementById("amigos").style.display = 'none';
    Solicitudes();
  }


async function Solicitudes() {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  const usuarioActualID = localStorage.getItem("user_id");

  const { data, error } = await supabase
    .from("amigos")
    .select("usuario_id, amigo_id")
    .eq("amigo_id", usuarioActualID) // solicitudes que otros me enviaron
    .eq("estado", "pendiente");

  if (error) {
    console.error("Error al cargar solicitudes:", error.message);
    return;
  }

  if (data && data.length > 0) {
    document.getElementById("friendCounters").innerHTML =
      "Tienes:<br>" + data.length + " solicitudes por aceptar";

    for (const solicitud of data) {
      const amigoId = solicitud.usuario_id;

      const { data: datosRegistro, error: errorRegistro } = await supabase
        .from("registro")
        .select("idusuario, nombre")
        .eq("idusuario", amigoId)
        .single();

      if (errorRegistro) {
        console.error("Error al obtener registro:", errorRegistro.message);
        continue;
      }

      contenedor.innerHTML += `
  <div id="tarjeta-${amigoId}" class="tarjeta-amigo">
    <img src="" id="imgamigo-${datosRegistro.idusuario}" class="foto-amigo">
    <div class="info-amigo">
      <p class="nombre-amigo">${datosRegistro.nombre}</p>
      <div class="botones-accion">
        <button class="btn-icon aceptar" onclick="aceptarSolicitud('${amigoId}')">✅</button>
        <button class="btn-icon cancelar" onclick="cancelarSolicitud('${amigoId}')">❌</button>
      </div>
    </div>
  </div>
`;


      const imgAmigo = document.getElementById(`imgamigo-${datosRegistro.idusuario}`);
      const fotoUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/profile-${datosRegistro.idusuario}.jpg?${new Date().getTime()}`;
      imgAmigo.src = fotoUrl;
    }
  } else {
    document.getElementById("friendCounters").innerHTML =
      "No tienes solicitudes por aceptar.";
  }
}




async function aceptarSolicitud(amigoId) {
  const usuarioActualID = localStorage.getItem("user_id");

  // 1. Aceptar la solicitud original
  const { error: updateError } = await supabase
    .from("amigos")
    .update({ estado: "aceptado" })
    .eq("usuario_id", amigoId)
    .eq("amigo_id", usuarioActualID);

  if (updateError) {
    console.error("Error al aceptar solicitud:", updateError.message);
    alert("Ocurrió un error al aceptar la solicitud.");
    return;
  }

  // 2. Crear la relación inversa si no existe
  const { data: existente, error: fetchError } = await supabase
    .from("amigos")
    .select("*")
    .eq("usuario_id", usuarioActualID)
    .eq("amigo_id", amigoId)
    .maybeSingle();

  if (fetchError) {
    console.error("Error comprobando relación inversa:", fetchError.message);
    return;
  }

  if (!existente) {
    const { error: insertError } = await supabase
      .from("amigos")
      .insert([{
        usuario_id: usuarioActualID,
        amigo_id: amigoId,
        estado: "aceptado"
      }]);

    if (insertError) {
      console.error("Error creando amistad mutua:", insertError.message);
      alert("Error al crear amistad mutua.");
      return;
    }
  }

  // 3. Quitar visualmente la tarjeta
  const tarjeta = document.getElementById(`tarjeta-${amigoId}`);
  if (tarjeta) tarjeta.style.display = "none";

  // 4. Opcional: actualizar recuento
  contarAmigos();
}





contarAmigos();
