import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import LocateControl from './LocateControl';
import { iconPosition, iconSearch } from './ConstMap';

class MapAppUser extends React.Component {

  state = {
    markers: []
  }

  position = [4.649937, -74.106715];

  addMarker = (e) => {
    const { markers } = this.state
    markers.pop()
    markers.push(e.latlng)
    this.setState({ markers })
    this.props.markerUser(this.state.markers);
  }

  locateOptions = {
    position: 'topleft',
    //maxZoom: 30,
    //enableHighAccuracy: true,
    strings: {
      title: 'Encuentra tu ubicación aproximada!',
      popup: '¡Tu está aquí!'
    },
    onActivate: () => { } // callback before engine starts retrieving locations
  }

  componentDidMount() {

    if (localStorage.getItem('usuario') !== null) {
      const longitudUser = JSON.parse(localStorage.getItem('usuario')).longitud;
      const latitudUser = JSON.parse(localStorage.getItem('usuario')).latitud;
      const { markers } = this.state
      markers.push({
        "lat": latitudUser,
        "lng": longitudUser,
      })
      this.setState({ markers })
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

        {this.state.markers.map((position, idx) =>
          <Marker key={`marker-${idx}`} position={position} icon={iconPosition}>
            <Popup>
              <span>Aqui estas!</span>
            </Popup>
          </Marker>
        )}

        <ReactLeafletSearch position="topleft" markerIcon={iconSearch} />;
        <LocateControl options={this.locateOptions} />
      </Map>
    );
  }
}
export default MapAppUser;