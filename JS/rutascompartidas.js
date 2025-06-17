

const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


async function subirdatosrutacompartida(){
    const userId = localStorage.getItem("user_id");
    const rutaId = localStorage.getItem("ruta_id");

  const { data, error } = await supabase
  .from('Rutas_compartidas')
  .insert([
    { idusuario: userId,
      ruta_id:rutaId
     }])
   .select();  
}
 async function mostrarRutasCompartidas() {
    const userId = localStorage.getItem("user_id");

    // 1. Obtener amigos aceptados
    const { data: amigos, error: errorAmigos } = await supabase
        .from("amigos")
        .select("amigo_id")
        .eq("usuario_id", userId)
        .eq("estado", "aceptado");

    if (errorAmigos) {
        console.error("Error al obtener amigos:", errorAmigos);
        return;
    }

    const idsAmigos = amigos.map(a => a.amigo_id);
    if (idsAmigos.length === 0) return;

    // 2. Obtener rutas con Visibilidad = "Con amistades" de esos amigos
    const { data: rutas, error: errorRutas } = await supabase
        .from("Rutas")
        .select("*")
        .in("idusuario", idsAmigos)
        .eq("visibilidad", "Con amistades");

    if (errorRutas) {
        console.error("Error al obtener rutas:", errorRutas);
        return;
    }

    const contenedor = document.getElementById("rutas-compartidas-container");
    rutas.forEach(ruta => {
        const div = document.createElement("div");
        div.className = "recuadro-ruta";
        div.style = "border:1px solid #ccc; padding:10px; margin:10px; border-radius:10px; display:flex; align-items:center; gap:10px";

        const userImage = document.createElement("img");
        userImage.src = `${supabaseUrl}/storage/v1/object/public/imagenes/profile-${ruta.idusuario}.jpg?${Date.now()}`;
        userImage.alt = "Foto de perfil";
        userImage.style = "width:50px; height:50px; border-radius:50%";

        
        const info = document.createElement("div");
        info.innerHTML = `<strong>${ruta.nombreruta}</strong><br><small>Por tu amigo</small>`;

        const boton = document.createElement("button");
        boton.style = `
background-color: #800040;
font-family: 'Josefin Sans', sans-serif;
width: 60px;
  color: white;
  border: none;
  padding:  5px;
  font-size: 10px;
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
`;
        boton.textContent = "Entrar";
        boton.onclick = () => {
            localStorage.setItem("ruta_id", ruta.idruta); // o lo que necesites
            alert(ruta.idruta)
            subirdatosrutacompartida();
            window.location.href = "mapacompartido.html"; // cambia la ruta si es necesario
        };

        div.appendChild(userImage);
        div.appendChild(info);
        div.appendChild(boton);
        contenedor.appendChild(div);
    });
}

mostrarRutasCompartidas();
