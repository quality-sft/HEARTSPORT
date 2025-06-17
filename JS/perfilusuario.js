document.getElementById("miImagen").onclick = function () {
    localStorage.setItem("user_id", 'a');
    window.location.href = "inicio.html";
};


const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function cargarNombreUsuario() {
    const userID = localStorage.getItem("user_id");

    const { data, error } = await supabase
        .from("registro") // tu tabla de usuarios
        .select("nombre, fechanacimiento, peso, altura")
        .eq("idusuario", userID)
        .single(); // para traer solo un resultado

    document.getElementById("nombre").textContent = `${data.nombre}`;
    document.getElementById("fechanacimiento").textContent = `${data.fechanacimiento}`;
    document.getElementById("peso").textContent = `${data.peso} kg`;
    document.getElementById("estatura").textContent = `${data.altura} cm`;
}


async function uploadImage() {

    const userId = localStorage.getItem("user_id");
    const fileName = `profile-${userId}.jpg`;

    // Agregar cache buster
    const imageUrl = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/${fileName}?${new Date().getTime()}`;

    // Mostrar la imagen en el HTML
    document.getElementById('fotodeperfil').src = imageUrl;
    console.log('URL de la imagen:', imageUrl);


}


uploadImage();
