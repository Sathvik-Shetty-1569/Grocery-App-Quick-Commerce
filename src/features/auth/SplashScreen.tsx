import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, {FC, useEffect } from 'react'
import { Colors } from '@utils/Constants'
import Logo from '@assets/images/logo.jpeg'
import { screenHeight } from '@utils/Scaling'
import { resetAndNavigate} from '@utils/NavigationUtils'
import GeoLocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import {jwtDecode} from 'jwt-decode'
import { refetchUser, refresh_tokens } from '@service/authService'

GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
})

interface DecodedToken {
    exp: number;
}
const SplashScreen: FC = () => {
    const {user, setuser} = useAuthStore()
    const tokenCheck = async () => {
        const accessToken = await tokenStorage.getString("accessToken") as string
        const refreshToken = await tokenStorage.getString("refreshToken") as string

        if(accessToken){
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)
            const currentTime = Date.now()/1000;

            if(decodedRefreshToken?.exp< currentTime){
                resetAndNavigate("CustomerLogin")
                Alert.alert("Sessiion Expired", "Please login again")
                return false
        }

        if(decodedAccessToken?.exp < currentTime) {
        try {
            refresh_tokens()
            await refetchUser(setuser)
        } catch (error) {
            console.log("Error refreshing token", error)
            Alert.alert("There was an error refreshing token!")
            return false
        }
        }

        if(user?.role == "Customer" ){
            resetAndNavigate("ProductDashboard")
        }
            else{
                resetAndNavigate("DeliveryDashboard")
            }
            return true
        }

        resetAndNavigate("CustomerLogin")
        return false
    }

    useEffect(() => {
        const initialStartup = () => {
            try {
                GeoLocation.requestAuthorization()
                tokenCheck()
            } catch (error) {
Alert.alert("Sorry we need location service to give you better shopping experience") }
        }
        const timeoutId = setTimeout(initialStartup, 1000)
        return () => clearTimeout(timeoutId)
    })
  return (
    <View style={styles.container}>
        <Image source = {Logo} style={styles.logoImage}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.primary,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logoImage: {
        height: screenHeight * 0.3,
        width: screenHeight * 0.3,
        resizeMode: 'contain',
    }
})