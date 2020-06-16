import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import L from 'leaflet';
import LocateControl from './LocateControl';
import { markersAlert, iconSearch, iconBlue } from './ConstMap';

class MapAppForecast extends React.Component {

  state = {
    markers: []
  }

  markersAlert = markersAlert;

  position = [4.649937, -74.106715];

  locateOptions = {
    position: 'topleft',
    maxZoom: 30,
    enableHighAccuracy: true,
    strings: {
      title: 'Encuentra tu ubicación aproximada!',
      popup: '¡Tu está aquí!'
    },
    onActivate: () => { } // callback before engine starts retrieving locations
  }

  componentDidMount() {

    if (localStorage.getItem('usuario') !== null) {

      this.markersAlert = [{
        position: {
          lng: JSON.parse(localStorage.getItem('usuario')).longitud,
          lat: JSON.parse(localStorage.getItem('usuario')).latitud
        },
        text: 'Esta es tu ubicación registrada',
        icon: iconBlue
      }];
    } else {
      this.markersAlert = markersAlert;
    }
  }

  render() {
    return (
      <Map
        center={this.position}
        zoom={10}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        {this.markersAlert.map((marke, idx) =>
          <Marker key={`marker-${idx}`} position={marke.position} icon={marke.icon} >
            <Popup>
              <span>{marke.text}</span>
            </Popup>
          </Marker>
        )}

        <ReactLeafletSearch position="topleft" markerIcon={iconSearch} />;
        <LocateControl options={this.locateOptions}/>
      </Map>
    );
  }
}
export default MapAppForecast;