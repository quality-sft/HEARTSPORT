
function añadirmetas() {
  localStorage.setItem('destino', "añadirmetas");
  window.location.href = "cargando copy.html";
}

const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



async function contarmetas() {

  const usuarioActualID = localStorage.getItem("user_id"); //Detectar el id del usuario que ha iniciado sesión en el equipo

  const { data, error } = await supabase //Acá para solamente sacar los id, es decir el númerito, de los amigos de la variable usuarioActualID
    .from("Metas")
    .select("idusuario")
    .eq("idusuario", usuarioActualID);



  document.getElementById("textoactual").innerHTML =
    "Tienes:<br>" + data.length + " metas"; //Acá como se creó un arreglo en const{data.. solamente vemos cuántos datos son y se lo decimos al usuario


  console.log("ID de usuario actual:", usuarioActualID);

}





async function mostrarmetas() {
  const usuarioActualID = localStorage.getItem("user_id");
  const contenedor = document.getElementById("goal-container");

  let contador = 0;

  const { data, error } = await supabase
    .from("Metas")
    .select("*")
    .eq("idusuario", usuarioActualID);


  while (contador < data.length) {
    const meta = data[contador];

    contenedor.innerHTML += `
          <div class="meta-container" onclick="hola('${meta.nombredemeta}')">
            <div class='meta-label'>${meta.nombredemeta}</div>
            <div class='dates'>  
              Inicio: ${meta.fechadeinicio}<br>
              Final: ${meta.fechadeterminación}
            </div>
            <div class='status'>Estado: ${meta.estado}</div>
            <img class='goal-img'>
            <div class='eye-icon'>👁️</div>
          </div>
        `;

    contador++;
  }
}

mostrarmetas();
contarmetas(); // si existe y está bien definida
