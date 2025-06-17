
const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

function retrocedereditarperfil() {
  localStorage.setItem('destino', "retrocedereditarperfil");
  window.location.href = "cargando copy.html";
}

async function mostrardatos() {
  const usuarioactual = localStorage.getItem("user_id");


  const { data, error } = await supabase
    .from("registro")
    .select("*")
    .eq("idusuario", usuarioactual)

  document.getElementById("nombre").value = data[0].nombre;
  document.getElementById("correo").value = data[0].correo;
  document.getElementById("password").value = data[0].contrasena;
  document.getElementById("telefono").value = data[0].telefono;
  document.getElementById("estatura").value = data[0].altura;
  document.getElementById("peso").value = data[0].peso;
  document.getElementById("dirección").value = data[0].direccion;
  document.getElementById("fechanacimiento").value = data[0].fechanacimiento;
}



async function editarNombre() {
  const userID = localStorage.getItem("user_id");

  const nombrenuevo = document.getElementById('nombre').value;
  const correonuevo = document.getElementById('correo').value;
  const passwordnueva = document.getElementById('password').value;
  const telefononuevo = document.getElementById('telefono').value;
  const pesonuevo = document.getElementById('peso').value;
  const estnuevo = document.getElementById('estatura').value;
  const direnuevo = document.getElementById('dirección').value;
  const fechanacimiento = document.getElementById('fechanacimiento').value;

  const { data, error } = await supabase
    .from("registro")
    .update({
      nombre: nombrenuevo,
      correo: correonuevo,
      contrasena: passwordnueva,
      telefono: telefononuevo,
      altura: estnuevo,
      peso: pesonuevo,
      direccion: direnuevo,
      fechanacimiento: fechanacimiento

    }) // nuevo valor
    .eq("idusuario", userID);     // condición (qué valor tenía antes)

  await uploadImage();
  if (error) {
    console.error("Error al actualizar:", error);
  } else {
    console.log("Actualización exitosa:", data);
  }
  window.location.href = "perfilusuario.html";
}

async function uploadImage() {
  const fileInput = document.getElementById('cambiarfoto');
  const file = fileInput.files[0];
  const userId = localStorage.getItem("user_id");
  const fileName = `profile-${userId}.jpg`;

  let imageToUpload = file;

  if (!file) {
    // Si no se seleccionó imagen, usar la predeterminada (como en el registro)
    const defaultImageUrl = '/IMAGENES/visual3/perfilfoto.png';
    const response = await fetch(defaultImageUrl);
    const blob = await response.blob();

    imageToUpload = new File([blob], fileName, { type: blob.type });
  }

  const { data, error } = await supabase.storage
    .from('imagenes')
    .upload(fileName, imageToUpload, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error("Error subiendo imagen:", error.message);
  } else {
    console.log("Imagen subida con éxito!");
  }
}

async function mostrarfoto() {
  const userId = localStorage.getItem("user_id");
  const fileName = `profile-${userId}.jpg`;

  // Agregar cache buster
  const imageUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/${fileName}?${new Date().getTime()}`;

  // Mostrar la imagen en el HTML
  document.getElementById('fotodeperfil').src = imageUrl;
  console.log('URL de la imagen:', imageUrl);


}
mostrardatos();
mostrarfoto();
