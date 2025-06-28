import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants';
import { screenHeight } from '@utils/Scaling';
import { useMapRefStore } from '@state/mapStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { handleFitToPath } from '@components/map/mapUtils';
import MapViewComponent from '@components/map/MapViewComponent';

interface LiveMapProps {
    deliveryPersonLocation: any;
    pickupLocation: any;
    deliveryLocation: any;
    hasPickedUp: any;
    hasAccepted: any;
}


const LiveMap:FC<LiveMapProps> = ({
    deliveryPersonLocation,
    pickupLocation,
    deliveryLocation,
    hasPickedUp,
    hasAccepted
}) => {

    const {mapRef, setMapRef} = useMapRefStore();
  return (

    <View style = {styles.container}>
        <MapViewComponent
        mapRef = {mapRef}
        setMapRef = {setMapRef}
        hasAccepted = {hasAccepted}
        deliveryLocation = {deliveryLocation}
        pickupLocation = {pickupLocation}
        deliveryPersonLocation = {deliveryPersonLocation}
        hasPickedUp = {hasPickedUp}
        />
<TouchableOpacity
style = {styles.fitButton}
onPress = {() => {
    handleFitToPath(mapRef, deliveryLocation, pickupLocation, hasPickedUp, hasAccepted, deliveryPersonLocation);
}}
>
    <Icon name = 'target' size = {RFValue(14)} color = {Colors.text}/>
</TouchableOpacity>
    </View>
  )
}

export default LiveMap

const styles = StyleSheet.create({
    fitButton:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 5,
        backgroundColor: '#fff',
        borderWidth: 0.8,
        borderColor: Colors.border,
        shadowOffset:{
            width: 1,
            height: 1
        },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 35,
    },
    container:{
        height: screenHeight* 0.35,
        width: "100%",
        borderRadius: 15,
        backgroundColor:"#fff",
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.border,
        position: 'relative'
    },

})