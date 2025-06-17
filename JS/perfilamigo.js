

const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const mostraramigoID = localStorage.getItem("perfilamigo")

async function mostrar() {


   const { data, error } = await supabase
      .from("registro") // tu tabla de usuarios
      .select("nombre,  peso, altura")
      .eq("idusuario", mostraramigoID)
      .single(); // para traer solo un resultado

   document.getElementById("nombreAmigo").textContent = `${data.nombre}`;

   document.getElementById("pesoAmigo").textContent = `${data.peso}` + "kg";
   document.getElementById("estaturaAmigo").textContent = `${data.altura}` + "cm";



   const fileName = `profile-${mostraramigoID}.jpg`;

   // Agregar cache buster
   const imageUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/${fileName}?${new Date().getTime()}`;

   // Mostrar la imagen en el HTML
   document.getElementById('fotoAmigo').src = imageUrl;
   console.log('URL de la imagen:', imageUrl);


}

async function eliminar(){
const mostraramigoID = localStorage.getItem("perfilamigo");
const usuario = localStorage.getItem("user_id");
const { data, error } = await supabase
  .from("amigos")
  .select("id")
  .eq("amigo_id", mostraramigoID)
  .eq("usuario_id", usuario)
  .single();

if (error) {
  console.error("Error al obtener la relación de amistad:", error.message);
} else if (!data) {
  console.log("No existe esa relación.");
} else {
  console.log("ID de la fila en la tabla 'amigos':", data.id);
  const { error } = await supabase
  .from("amigos")
  .delete()
  .eq("id", data.id);
   window.location.href = "amistades.html"

}
}