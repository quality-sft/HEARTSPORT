const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Función para cargar las rutas
async function cargarRutas() {
  const userId = localStorage.getItem("user_id");
  const selectElement = document.getElementById('barrios');

  if (!userId) {
    console.error('No se encontró userID en localStorage');
    return;
  }

  const { data, error } = await supabase
    .from('Rutas') // Nombre exacto de la tabla
    .select('nombreruta')
    .eq('idusuario', userId); // Asegúrate de que la columna se llama así

  if (error) {
    console.error('Error al cargar las rutas:', error.message);
    return;
  }

  data.forEach(ruta => {
    const option = document.createElement('option');
    option.value = ruta.nombreruta;
    option.textContent = ruta.nombreruta;
    selectElement.appendChild(option);
  });
}

async function siguiente() {
  const toma = document.getElementById("barrios").value;
  localStorage.setItem("nombrerutacalidad", toma)
  window.location.href = "mapa4.html"
}
// Llama la función al cargar la página
cargarRutas();