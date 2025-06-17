const supabaseUrl = "https://snytahpifahyqbuosbes.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


const openCageKey = "7b6f3678cd66448880e37d09efd688de"; // ⬅️ Reemplaza esto con tu clave real

async function initMap() {
    var map = L.map('map').setView([3.4516, -76.532], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const idruta = localStorage.getItem('ruta_id');
     const { data, error } = await supabase //Acá para solamente sacar los id, es decir el númerito, de los amigos de la variable usuarioActualID
    .from("Rutas")
    .select("*")
    .eq("idruta", idruta);

    localStorage.setItem('origen', data[0].origen);
    localStorage.setItem('destino', data[0].destino);

    // Si quieres verlos:
    console.log("Origen:", data[0].origen);
    console.log("Destino:", data[0].destino);

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
        await mostrarUsuariosEnRutaCompartida(idruta, map, startCoords);


        let totalDistance = route.distance;
        let stepLength = 0.687;
        let steps = Math.round(totalDistance / stepLength);

        document.getElementById("steps-count").textContent = `Estás a aproximadamente ${steps} pasos de tu destino.`;
        localStorage.setItem("Distancia_Rutas", steps);

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

async function mostrarUsuariosEnRutaCompartida(idruta, map, posicionBase) {
    const { data, error } = await supabase
        .from("Rutas_compartidas")
        .select("idusuario, registro (nombre)")
        .eq("ruta_id", idruta);

    if (error) {
        console.error("Error al obtener usuarios en ruta compartida:", error);
        return;
    }

    data.forEach(usuario => {
        const nombre = usuario.registro?.nombre || "Usuario";

        // Obtener foto del localStorage (o puedes reemplazar con una URL de Supabase si usas Storage)
        const fotoPerfil = `https://snytahpifahyqbuosbes.supabase.co/storage/v1/object/public/imagenes/profile-${usuario.idusuario}.jpg`;


        const icono = L.divIcon({
            html: `
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="${fotoPerfil}" style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 2px solid white;
                        box-shadow: 0 0 5px rgba(0,0,0,0.4);
                    ">
                    <div style="font-size: 18px;">🚶‍♂️</div>
                </div>
            `,
            className: '',
            iconSize: [40, 50],
            iconAnchor: [20, 50],
        });

        L.marker(posicionBase, { icon: icono }).addTo(map).bindPopup(nombre);
    });
}

initMap();