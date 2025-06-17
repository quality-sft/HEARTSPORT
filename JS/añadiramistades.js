function regresar() {
  localStorage.setItem('destino', "veramistades");
  window.location.href = "cargando copy.html"
}


// 1. Crear cliente de Supabase (asegúrate de usar tu URL y anon key)
const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



// 2. Obtener ID del usuario actual desde localStorage
const usuarioActualID = localStorage.getItem('user_id');


// 3. Escuchar búsqueda
async function Buscar() {

  const nombre = document.getElementById("busqueda").value.trim();

  const { data, error } = await supabase
    .from('registro')
    .select('idusuario, nombre')
    .ilike('nombre', `%${nombre}%`);

  mostrarResultados(data);
}

// 4. Mostrar resultados en pantalla
function mostrarResultados(usuarios) {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';

  usuarios.forEach(usuario => {

    contenedor.innerHTML += `
      <div class="amigo">
        <img src="" alt="avatar" id="imgamigo-${usuario.idusuario}">
        <div class="info">
          <p class="nombre">${usuario.nombre}</p>
          <button class="botonagregar" onclick="agregarAmigo('${usuario.idusuario}', this)"><img src="IMAGENES/visual12/añadir.png" class="imagenañadir"></button>
        </div>
      </div>
    `;

    const imgAmigo = document.getElementById(`imgamigo-${usuario.idusuario}`);
    const fotoUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/profile-${usuario.idusuario}.jpg?${new Date().getTime()}`;
    imgAmigo.src = fotoUrl;
  });
}

// 5. Función para agregar amigo
async function agregarAmigo(amigoID, boton) {
  if (!amigoID || !usuarioActualID) {
    console.error("Faltan IDs:", { amigoID, usuarioActualID });
    return;
  }

  // Verificar si ya está agregado
  const { data: existente, error: errorExiste } = await supabase
    .from('amigos')
    .select('*')
    .eq('usuario_id', usuarioActualID)
    .eq('amigo_id', amigoID);


  if (existente.length > 0) {
    alert("Ya agregaste a esta persona.");
    return;
  }
  if (amigoID === usuarioActualID) {
    alert("¡Ese eres tú!");
    return;
  }
  const { error } = await supabase.from('amigos').insert([
    {
      usuario_id: usuarioActualID,
      amigo_id: amigoID,
      estado: "pendiente"
    }
  ]);

  if (error) {
    console.error('Error al agregar amigo:', error);
    alert('No se pudo agregar el amigo.');
  } else {
    alert('¡Amigo agregado con éxito! ');

  }
}
