const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";

let map = L.map("map").setView([0, 0], 7);
firstTime = false;

const ATTRIBUTION =
  ' &copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(TILE_URL, { ATTRIBUTION, maxZoom: 10 });
tiles.addTo(map);
const issIcon = L.icon({
  iconUrl: "./assets/image/iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    const { latitude, longitude } = data;
    console.log(latitude, longitude);
    document.querySelector(".data__latitude").textContent = latitude.toFixed(2);
    document.querySelector(".data__longitude").textContent =
      longitude.toFixed(2);
    let popup = marker.bindPopup(`lat: ${latitude}, lon: ${longitude}`);
    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude]);
    return latitude, longitude;
  } catch (error) {
    console.log(error);
  }
};
const marker = L.marker([0, 0], {
  icon: issIcon,
}).addTo(map);
fetchData();

setInterval(fetchData, 1000);
