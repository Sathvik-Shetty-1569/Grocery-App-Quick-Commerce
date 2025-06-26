import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialIcons'


const ReportItem:FC<{iconName: string, underline: boolean, title: string; price:number}> = ({iconName, underline, title, price}) => {
    return(
        <View style = {[styles.flexRowBetween,{marginBottom: 10}]}>
            <View style={styles.flexRow}>
            <Icon name={iconName} style={{opacity:0.7}} size={RFValue(12)}/>
            <CustomText
            style = {{textDecorationLine: underline ? 'underline' : 'none', textDecorationStyle: 'dashed'}}
                variant ='h8'>{title}</CustomText>
                <CustomText
                variant='h8'>{price}</CustomText>
            </View>
        </View>
    )
    
}
const BillDetails:FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
        <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
            BillDetails
        </CustomText>
        <View style={styles.billContainer}></View>

    </View>
  )
}

export default BillDetails

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 15
    },
    text:{
        marginHorizontal: 10,
        marginTop: 15
    },
    billContainer:{
        padding: 10,
        paddingBottom: 0,
        borderBottomColor: Colors.border,
        borderBottomWidth: 0.6
    },
    flexRowBetween:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }

})