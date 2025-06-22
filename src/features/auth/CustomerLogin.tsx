import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  CustomSafeAreaView  from '@components/global/CustomSafeAreaView'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ProductSlider from '@components/login/ProductSlider'

const CustomerLogin = () => {
  return (
   <GestureHandlerRootView style={styles.container}>
    <View style = {styles.container}>
    <CustomSafeAreaView>
<ProductSlider/>
    </CustomSafeAreaView>
    </View>
   </GestureHandlerRootView>
  )
}

export default CustomerLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})