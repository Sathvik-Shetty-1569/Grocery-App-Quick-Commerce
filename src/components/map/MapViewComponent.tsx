import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Polyline } from 'react-native-maps';
import { customMapStyle } from '@utils/CustomMap';
import Markers from './Markers';
import { getPoints } from '@utils/getPoints';
import { Colors } from '@utils/Constants';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@service/config';


const MapViewComponent = ({
    mapRef,
    setMapRef,
    hasAccepted,
    camera,
    deliveryLocation,
    pickupLocation,
    deliveryPersonLocation,
    hasPickedUp,
      onMapReady

}: any ) => {

  console.log('deliveryLocation:', deliveryLocation);
console.log('pickupLocation:', pickupLocation);
console.log('deliveryPersonLocation:', deliveryPersonLocation);
const internalRef = useRef<MapView>(null);

  useEffect(() => {
    if (internalRef.current) {
      setMapRef(internalRef.current); // ✅ this ensures you store the real map ref
    }
  }, []);


  return (
    <MapView
    ref={internalRef}
    style={{flex: 1}}
    provider="google"
    camera={camera}
    customMapStyle={customMapStyle}
    showsUserLocation={true}
    userLocationCalloutEnabled={true}
    userLocationPriority='high'
    showsTraffic={false}
    pitchEnabled={false}
    followsUserLocation={true}
    showsCompass={true}
    showsBuildings={false}
    showsIndoors={false}
    showsScale={false}
    showsIndoorLevelPicker={false}
     onMapReady={onMapReady}
    >
 {deliveryLocation && (hasPickedUp || hasAccepted) && (
  <MapViewDirections
  origin={deliveryPersonLocation}
  destination={hasAccepted ? pickupLocation : deliveryLocation}
  precision='high'
  apikey={GOOGLE_MAPS_API_KEY}
  strokeColor='#2871F2'
  strokeWidth={5}
  onError={err =>{
    console.log(err)
  }

}


  />
)}

       <Markers
             deliveryPersonLocation={deliveryPersonLocation}
      deliveryLocation={deliveryLocation}
      pickupLocation={pickupLocation}
      />

         {!hasPickedUp && deliveryLocation && pickupLocation && (
          <Polyline
            coordinates={getPoints([pickupLocation, deliveryLocation])}
            strokeColor={Colors.text}
            strokeWidth={2}
            geodesic={true}
            lineDashPattern={[12,10]}
          
          />
        )}   
    </MapView>
  )
}

export default MapViewComponent

const styles = StyleSheet.create({})