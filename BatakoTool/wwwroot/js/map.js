var map;
var markerGroup;

function initMap() {
    if (map) {
        map.remove(); // 古い地図オブジェクトを削除
        map = null;
    }
    map = L.map('map'); // 新しく作り直し
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    markerGroup = L.featureGroup().addTo(map);
}

function addMarker(lat, lng, popupHtml, destinationName, color = "red", isBlinking = false) {
    const baseClass = isBlinking ? "blinking-icon" : "";
    const iconUrl = `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`;

    const customIcon = L.icon({
        iconUrl: iconUrl,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        className: baseClass // 点滅クラスを適用
    });

    const encodedDestination = encodeURIComponent(destinationName);
    const routeLink = `<a href="https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}" target="_blank">📍 現在地からルート</a>`;
    const fullPopup = `${popupHtml}<br>${routeLink}`;

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(markerGroup);
    marker.bindPopup(fullPopup);
}

function zoomToMarkers() {
    if (markerGroup && markerGroup.getLayers().length > 0) {
        map.fitBounds(markerGroup.getBounds(), { padding: [20, 20] });
    }
}
