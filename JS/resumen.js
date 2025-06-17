const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Reemplaza esto con el ID del usuario actual
const userId = localStorage.getItem("user_id"); ;

function getWeek(dateStr) {
  const date = new Date(dateStr);
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1;
}

function agruparPorSemana(rutas) {
  const resumen = {};

  rutas.forEach(r => {
    const week = getWeek(r.created_at || r.fecha_entrada);
    if (!resumen[week]) {
      resumen[week] = { pasos: 0, distancia: 0, tiendas: 0 };
    }
    resumen[week].pasos += r.pasos || 0;
    resumen[week].distancia += r.distancia || 0;
    resumen[week].tiendas += r.tiendasvisitadas || 0;
  });

  return resumen;
}

function crearConfig(pasos, distancia, tiendas) {
  return {
    type: 'bar',
    data: {
      labels: ['Pasos Caminados', 'Distancia Recorrida (km)', 'Tiendas Visitadas'],
      datasets: [{
        label: 'Resumen de Actividad',
        data: [pasos, distancia, tiendas],
        backgroundColor: ['#740748cc', '#003366cc', '#800040cc'],
        borderColor: ['#740748', '#003366', '#800040'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
}

async function cargarResumenes() {
  const { data: rutas, error: errorRutas } = await supabase
    .from('Rutas')
    .select('*')
    .eq('idusuario', userId);

  const { data: compartidas, error: errorCompartidas } = await supabase
    .from('Rutas_compartidas')
    .select('fecha_entrada, ruta_id')
    .eq('idusuario', userId);

  const rutasCompartidasIds = compartidas.map(c => c.ruta_id);

  const { data: detallesCompartidas } = await supabase
    .from('Rutas')
    .select('*')
    .in('idruta', rutasCompartidasIds);

  // Asignar la fecha original de entrada a las rutas compartidas
  const rutasCompartidasConFecha = detallesCompartidas.map((r, i) => ({
    ...r,
    fecha_entrada: compartidas[i]?.fecha_entrada
  }));

  const todasLasRutas = [...rutas, ...rutasCompartidasConFecha];

  const resumenSemanal = agruparPorSemana(todasLasRutas);

  const contenedor = document.getElementById('contenedorResumenes');
  Object.entries(resumenSemanal).forEach(([semana, datos]) => {
    const div = document.createElement('div');
    div.className = 'semana';

    div.innerHTML = `
      <h2>Semana #${semana}</h2>
      <div class="contenido">
        <canvas id="graficaSemana${semana}"></canvas>
      </div>
    `;

    contenedor.appendChild(div);

    const ctx = document.getElementById(`graficaSemana${semana}`).getContext('2d');
    new Chart(ctx, crearConfig(datos.pasos, datos.distancia, datos.tiendas));
  });
}

cargarResumenes();