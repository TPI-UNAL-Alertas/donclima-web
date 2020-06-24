import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import LocateControl from './LocateControl';
import { iconSearch, iconBlue, iconYellow, iconOrange, iconRed, iconPosition } from './ConstMap';

class MapAppForecast extends React.Component {

  state = {
    markers: []
  }

  position = [4.649937, -74.106715];

  addMarker = (e) => {
    if (localStorage.getItem('usuario') === null) {

      const { markers } = this.state
      markers.pop()
      markers.push({
        position: e.latlng,
        text: 'Esta es tu ubicación actual!',
        icon: iconPosition
      })
      this.setState({ markers })
      //this.props.markerUser(this.state.markers);
      localStorage.setItem('latitudLogitud', JSON.stringify(e.latlng));

    }
  }

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

    this.state.markers = [];// markersAlert;

    const alertarAll = JSON.parse(localStorage.getItem('alertarAll'));
    if (alertarAll !== null) {
      alertarAll.map(alerta => {

        var iconMarket;
        switch (alerta.nivel) {
          case "Alerta Amarilla": iconMarket = iconYellow; break;
          case "Alerta Naranja": iconMarket = iconOrange; break;
          case "Alerta Roja": iconMarket = iconRed; break;
          default: iconMarket = iconBlue
        };

        this.state.markers.push({
          position: {
            lng: alerta.longitud,
            lat: alerta.latitud
          },
          text: alerta.nivel,
          icon: iconMarket
        });
      });
    }

    if (localStorage.getItem('usuario') !== null) {

      const alertaUser = JSON.parse(localStorage.getItem('alertaUser'));

      this.state.markers.push({
        position: {
          lng: JSON.parse(localStorage.getItem('usuario')).longitud,
          lat: JSON.parse(localStorage.getItem('usuario')).latitud
        },
        text: 'Esta es tu ubicación registrada',
        icon: iconPosition
      });
    } else {

      if (localStorage.getItem('latitudLogitud') !== null) {
        this.state.markers.push({
          position: {
            lng: JSON.parse(localStorage.getItem('latitudLogitud')).lng,
            lat: JSON.parse(localStorage.getItem('latitudLogitud')).lat
          },
          text: 'Esta es tu ubicación actual',
          icon: iconPosition
        });
      }

    }

  }

  render() {

    return (
      <Map
        center={this.position}
        onClick={this.addMarker}
        zoom={10}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />

        {this.state.markers.map((marker, idx) =>
          <Marker key={`marker-${idx}`} position={marker.position} icon={marker.icon}>
            <Popup>
              <span>{marker.text}</span>
            </Popup>
          </Marker>
        )}

        <ReactLeafletSearch position="topleft" markerIcon={iconSearch} />;
        <LocateControl options={this.locateOptions} />
      </Map>
    );
  }
}
export default MapAppForecast;