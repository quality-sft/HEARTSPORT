const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function mostrarmeta(){
  var nombremeta= localStorage.getItem("vermeta")
  var usuarioActualID= localStorage.getItem("user_id"); 

   const { data, error } = await supabase //Acá para solamente sacar los id, es decir el númerito, de los amigos de la variable usuarioActualID
    .from("Metas")
    .select("*")
    .eq("idusuario", usuarioActualID)
    .eq("nombredemeta", nombremeta);

  
    document.getElementById("nombreMeta").textContent= nombremeta;
    document.getElementById("descripcionMeta").textContent= data[0].descripción;
    document.getElementById("fechaInicioMeta").textContent= data[0].fechadeinicio;
    document.getElementById("fechaFinMeta").textContent= data[0].fechadeterminación;
    document.getElementById("estadoMeta").textContent= "Estado: "+ data[0].estado;
}
async function eliminar(){
    var nombremeta= localStorage.getItem("vermeta")
    var usuarioActualID= localStorage.getItem("user_id"); 

   const { data, error } = await supabase //Acá para solamente sacar los id, es decir el númerito, de los amigos de la variable usuarioActualID
    .from("Metas")
    .select("idmetas")
    .eq("idusuario", usuarioActualID)
    .eq("nombredemeta", nombremeta)
    .single();

    if (error) {
  console.error("Error", error.message);
} else if (!data) {
  console.log("No existe eso.");
} else {
  console.log("ID de la fila en la tabla 'metas':", data.idmetas);
  const { error } = await supabase
  .from("Metas")
  .delete()
  .eq("idmetas", data.idmetas);
   window.location.href = "metas.html"
}
}
mostrarmeta();