import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'

// This function returns a View component with a Text component inside it
const Markers = ({
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
}: any) => {
  return (
   <>
   {deliveryLocation && (
    <Marker
    image = {require('@assets/icons/my_pin.png')}
    coordinate={deliveryLocation}
    style={{width: 20, height: 20}}
    />
   )}
   {pickupLocation && 
   (<Marker
   image={require('@assets/icons/store.png')}
   coordinate={pickupLocation}
   style={{width: 20, height: 20}}
   />)
}

{deliveryPersonLocation && (
  <Marker
image={require('@assets/icons/delivery.png')}
coordinate={deliveryPersonLocation}
style={{
  position: 'absolute',
  zIndex: 99,
  width: 20, height: 20}}
/>)}
   </>
  )
}

export default Markers

const styles = StyleSheet.create({})