

var map = L.map('map').setView([3.4516, -76.532], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


function getCoordinates(place) {
    return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}, Cali, Colombia`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) throw new Error("No se encontró la ubicación");
            return [data[0].lat, data[0].lon];
        });
}
