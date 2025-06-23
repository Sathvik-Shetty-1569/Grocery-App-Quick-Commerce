import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAuthStore } from '@state/authStore'
import Geolocation from '@react-native-community/geolocation'
import { reverseGeocode } from '@service/mapService'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
    const { setUser, user } = useAuthStore()

    const updateUserLocation = () => {
        Geolocation.requestAuthorization()
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords
                reverseGeocode(latitude, longitude, setUser)
            },
            error => console.log(error),
            {
                enableHighAccuracy: false,
                timeout: 10000,
            }
        )
    }
    //     useEffect(() => {
    // updateUserLocation()
    //     }, [])
    return (
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText fontFamily={Fonts.Bold} variant='h8' style={styles.text}>Delivery in</CustomText>
                <View style={styles.flexRowGap}>
                    <CustomText fontFamily={Fonts.SemiBold} variant='h2' style={styles.text2}>15 minutes</CustomText>
                    <TouchableOpacity onPress={showNotice} style={styles.noticeBtn}>
                        <CustomText fontFamily={Fonts.SemiBold} fontSize={RFValue(5)} style={{ color: "#3b4886" }} >🌧️Rain</CustomText>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    },
    text2: {
        color: '#fff',
        width: '90%',
        textAlign: 'center',
    },
    flexRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 2,
        width: '70%'
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? 10 : 5,
        justifyContent: 'space-between',
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    noticeBtn: {
        backgroundColor: '#E8EAF5',
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        bottom: -2
    }

})