import L from 'leaflet';

const iconRed = new L.Icon({
  iconUrl: require('../img/alert-red.png'),
  iconSize: [50, 45], // tamaño del icono     
  shadowSize: [50, 64], // tamaño de la sombra     
  iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador     
  popupAnchor: [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup     
});

const iconYellow = new L.Icon({
  iconUrl: require('../img/alert-yellow.png'),
  iconSize: [50, 45], // tamaño del icono     
  shadowSize: [50, 64], // tamaño de la sombra     
  iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador     
  popupAnchor: [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup     
});

const iconOrange = new L.Icon({
  iconUrl: require('../img/alert-orange.png'),
  iconSize: [50, 45], // tamaño del icono     
  shadowSize: [50, 64], // tamaño de la sombra     
  iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador     
  popupAnchor: [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup     
});

export const iconBlue = new L.Icon({
  iconUrl: require('../img/alert-blue.png'),
  iconSize: [50, 45], // tamaño del icono     
  shadowSize: [50, 64], // tamaño de la sombra     
  iconAnchor: [20, 40], // punto del icono que corresponde a la posición del marcador     
  popupAnchor: [0, -40] // punto relativo al marcador desde donde se deberá abrir el popup     
});

export const iconPosition = new L.Icon({
  iconUrl: require("../img/position.png"),
  iconSize: [60, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28]
});

export const iconSearch = new L.Icon({
  iconUrl: require("../img/search.png"),
  iconSize: [60, 60],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28]
});

export const markersAlert = [
  { position: { lng: -73.9725934, lat: 4.7211232 }, text: 'Alta probabilidad de heladas', icon: iconRed }, //Calera
  { position: { lng: -74.215431, lat: 4.579392 }, text: 'Poca probabilidad de heladas', icon: iconYellow }, //Soacha
  { position: { lng: -74.344594, lat: 4.737205 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Bojaca
  { position: { lng: -74.2263107, lat: 4.7135683 }, text: 'Alta probabilidad de heladas', icon: iconRed }, //Mosquera
  { position: { lng: -74.2707267, lat: 4.7319853 }, text: 'Poca probabilidad de heladas', icon: iconYellow }, //Madrid
  { position: { lng: -73.9254307, lat: 4.5298233 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Choachi
  { position: { lng: -74.0684276, lat: 4.8648005 }, text: 'Poca probabilidad de heladas', icon: iconYellow }, //Chia
  { position: { lng: -74.0422063, lat: 4.9208138 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Cajica
  { position: { lng: -72.9546002, lat: 5.7238722 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Sogamoso
  { position: { lng: -73.0039159, lat: 5.7469077 }, text: 'Alta probabilidad de heladas', icon: iconRed }, //Tibasosa
  { position: { lng: -73.3912607, lat: 5.5393784 }, text: 'Poca probabilidad de heladas', icon: iconYellow }, //Tunja
  { position: { lng: -73.3725638, lat: 5.5775572 }, text: 'Alta probabilidad de heladas', icon: iconRed }, //Motavita
  { position: { lng: -73.0651453, lat: 5.8260758 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Duitama
  { position: { lng: -74.2376129, lat: 4.5790386 }, text: 'Alta probabilidad de heladas', icon: iconRed }, //Soacha-Reserva
  { position: { lng: -74.2336564, lat: 4.5882942 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Soacha-Veredita
  { position: { lng: -74.2336353, lat: 4.579395 }, text: 'Posible ocurrencia de heladas', icon: iconOrange }, //Soacha-ParqueCamp9
  { position: { lng: -74.2359171, lat: 4.5857101 }, text: 'Alta probabilidad de heladas', icon: iconRed } //Soacha-Humedal
];