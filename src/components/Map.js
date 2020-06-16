
import React from 'react'
import { GoogleMap, withGoogleMap, Marker, withScriptjs } from 'react-google-maps';

const Map = (props)  => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        />
    );
};

export default withScriptjs(
    withGoogleMap(
        Map
    )
)