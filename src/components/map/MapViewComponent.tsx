import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Polyline } from 'react-native-maps';
import { customMapStyle } from '@utils/CustomMap';


const MapViewComponent = ({
    mapRef,
    setMapRef,
    hasAccepted,
    camera,
    deliveryLocation,
    pickupLocation,
    deliveryPersonLocation,
    hasPickedUp
}: any ) => {


  return (
    <MapView
    ref={setMapRef}
    style={{flex: 1}}
    provider="google"
    camera={camera}
    customMapStyle={customMapStyle}
    showsUserLocation={true}
    userLocationCalloutEnabled={true}
    userLocationPriority='high'
    showsTraffic={true}
    pitchEnabled={true}
    followsUserLocation={true}
    showsCompass={true}
    showsBuildings={true}
    showsIndoors={true}
    showsScale={false}
    showsIndoorLevelPicker={false}
    >

        
    </MapView>
  )
}

export default MapViewComponent

const styles = StyleSheet.create({})