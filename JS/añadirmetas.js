const SUPABASE_URL = "https://snytahpifahyqbuosbes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function Añadir() {
  const nombre = document.getElementById("nombreMeta").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const fechaInicio = document.getElementById("fechaInicio").value;
  const fechaFin = document.getElementById("fechaFin").value;
  var estado = "";
  const idusuario = localStorage.getItem("user_id"); // usuario actual

  const hoy = new Date().toISOString().split('T')[0];// Fecha actual

  const fechacomparaciónIniciohoy = new Date(fechaInicio).toISOString().split('T')[0];
  const fechacomparaciónFinalhoy = new Date(fechaFin).toISOString().split('T')[0];



  if (fechacomparaciónIniciohoy < hoy) {
    alert("La fecha de Inicio no puede ser anterior a hoy.");
    return;
  } else if (fechacomparaciónFinalhoy < hoy) {
    alert("La fecha de Final no puede ser anterior a hoy.");
        return;
  } else if (fechacomparaciónIniciohoy === fechacomparaciónFinalhoy) {
    alert("La dos fechas no pueden ser iguales");
        return;
  } else if (fechacomparaciónIniciohoy > fechacomparaciónFinalhoy) {
    alert("La fecha de inicio debe de ser antes de la fecha final");
        return;

  } else if (fechacomparaciónIniciohoy > hoy) {
    estado = "Pendiente";
    let { data, error } = await supabase.from('Metas').insert([
      {
        nombredemeta: nombre,
        descripción: descripcion,
        idusuario: idusuario,
        estado: estado,
        fechadeinicio: fechaInicio,
        fechadeterminación: fechaFin
      }
    ]).select();
  } else if (fechacomparaciónIniciohoy === hoy) {
    estado = "En Progreso";
    let { data, error } = await supabase.from('Metas').insert([
      {
        nombredemeta: nombre,
        descripción: descripcion,
        idusuario: idusuario,
        estado: estado,
        fechadeinicio: fechaInicio,
        fechadeterminación: fechaFin
      }
    ]).select();
  }

  window.location.href = "metas.html";
}