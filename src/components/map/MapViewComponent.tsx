import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
    hasPickedUp
}: any ) => {

  console.log('deliveryLocation:', deliveryLocation);
console.log('pickupLocation:', pickupLocation);
console.log('deliveryPersonLocation:', deliveryPersonLocation);



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