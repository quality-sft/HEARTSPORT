const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


const openCageKey = "7b6f3678cd66448880e37d09efd688de"; // ⬅️ Reemplaza esto con tu clave real

async function initMap() {
    var map = L.map('map').setView([3.4516, -76.532], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let origen = localStorage.getItem('origen');
    let destino = localStorage.getItem('destino');

    if (!origen || !destino) {
        alert('No se encontraron datos de origen y destino.');
        return;
    }

    try {
        let startCoords = await getCoordinates(origen);
        let endCoords = await getCoordinates(destino);

        let apiKey = "3e30a1f8-4b6b-448d-a7a3-21959539b7da";
        let routeUrl = `https://graphhopper.com/api/1/route?point=${startCoords[0]},${startCoords[1]}&point=${endCoords[0]},${endCoords[1]}&profile=foot&locale=es&instructions=true&points_encoded=false&key=${apiKey}`;

        let response = await fetch(routeUrl);
        let data = await response.json();

        if (!data.paths || data.paths.length === 0) {
            throw new Error("No se pudo encontrar una ruta válida.");
        }

        let route = data.paths[0];
        let routeCoords = route.points.coordinates.map(coord => [coord[1], coord[0]]);

        L.polyline(routeCoords, { color: 'blue' }).addTo(map);
        map.fitBounds(routeCoords);

        let totalDistance = route.distance;
        localStorage.setItem('distancia', totalDistance);
        let stepLength = 0.687;
        let steps = Math.round(totalDistance / stepLength);

        document.getElementById("steps-count").textContent = `Estás a aproximadamente ${steps} pasos de tu destino.`;
        localStorage.setItem("pasos", steps);

        let stepsList = document.getElementById("steps");
        stepsList.innerHTML = "";

        if (route.instructions && route.instructions.length > 0) {
            route.instructions.forEach((step, index) => {
                let li = document.createElement("li");
                li.textContent = `${index + 1}. ${step.text} (${step.distance.toFixed(1)} m)`;
                stepsList.appendChild(li);
            });
        } else {
            let li = document.createElement("li");
            li.textContent = "No hay instrucciones disponibles.";
            stepsList.appendChild(li);
        }
    } catch (error) {
        alert("Error al calcular la ruta: " + error.message);
    }

    subirdatos();
}

async function subirdatos() {
    const origen = localStorage.getItem('origen');
    const destino = localStorage.getItem('destino');
    const pasos = localStorage.getItem("pasos");
    const idusuario = localStorage.getItem("user_id");
    const tiporuta = localStorage.getItem("tiporuta");
    const nombre = localStorage.getItem('nombre');
    const distancia = localStorage.getItem('distancia');

    
    const { data, error } = await supabase
        .from('Rutas')
        .insert([
            {
                origen: origen,
                destino: destino,
                distancia: Math.round(parseFloat(distancia)),
                pasos: pasos,
                idusuario: idusuario,
                nombreruta: nombre,
                modalidad: "bicicleta",
                visibilidad: tiporuta
            }
        ])
        .select();

    console.log(error);
}

async function getCoordinates(place) {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place + ', Cali, Colombia')}&key=${openCageKey}`);
    const data = await response.json();

    if (data.results.length === 0) {
        throw new Error("No se encontró la dirección, intenta con otra.");
    }

    const { lat, lng } = data.results[0].geometry;
    return [lat, lng];
}

document.getElementById('route-info').addEventListener('click', function () {
    const div = this;
    if (div.style.maxHeight === "60px") {
        div.style.maxHeight = "400px"; // Se expande
    } else {
        div.style.maxHeight = "60px"; // Se colapsa
    }
});

initMap();