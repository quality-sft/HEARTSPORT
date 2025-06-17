const SUPABASE_URL = "https://snytahpifahyqbuosbes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function calificacionb() {
  const calificacion = "bien"
  const idusuario = localStorage.getItem("user_id");
  const nombreruta = localStorage.getItem('nombre');
  const { data, error } = await supabase
    .from('Rutas')
    .update({ calificacion: calificacion })
    .eq('idusuario', idusuario) // ← aquí corregido
    .eq('nombreruta', nombreruta)
    .select();

  if (error) {
    console.error("Error al actualizar:", error);
  } else {
    console.log("Calificación actualizada:", data);
  }
  window.location.href = "mapa3.html"
}

async function calificacionn() {
  const calificacion = "normal"
  const idusuario = localStorage.getItem("user_id");
  const nombreruta = localStorage.getItem('nombre');

  const { data, error } = await supabase
    .from('Rutas')
    .update({ calificacion: calificacion })
    .eq('idusuario', idusuario) // ← aquí corregido
    .eq('nombreruta', nombreruta)
    .select();

  if (error) {
    console.error("Error al actualizar:", error);
  } else {
    console.log("Calificación actualizada:", data);
  }
  window.location.href = "mapa3.html"
}

async function calificacionm() {
  const calificacion = "mal"
  const idusuario = localStorage.getItem("user_id");
  const nombreruta = localStorage.getItem('nombre');

  const { data, error } = await supabase
    .from('Rutas')
    .update({ calificacion: calificacion })
    .eq('idusuario', idusuario) // ← aquí corregido
    .eq('nombreruta', nombreruta)
    .select();

  if (error) {
    console.error("Error al actualizar:", error);
  } else {
    console.log("Calificación actualizada:", data);
  }
  window.location.href = "mapa3.html"
}

function pasoscaminados() {
  const pasoscaminados = localStorage.getItem("Distancia_Rutas")
  document.getElementById("indicapasos").innerHTML = pasoscaminados + "<br>Pasos Totales";
}
pasoscaminados();