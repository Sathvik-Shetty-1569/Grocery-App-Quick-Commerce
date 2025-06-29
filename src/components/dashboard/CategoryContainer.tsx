import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { navigate } from '@utils/NavigationUtils'
import ScalePress from '@components/ui/ScalePress'
import { Fonts } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'

const CategoryContainer:FC<{data: any}>=({data})  => {
  const renderItem = (items: any[]) => {
    return(
      <>
      {items?.map((item,index)=>{

        return(
          <ScalePress key={index} style={styles.item} onPress={()=>navigate("ProductCategories")}>
            <View style={styles.imageContainer}>
              <Image source={item?.image} style={styles.image}/>
            </View>
            <CustomText style={styles.text} variant='h8' fontFamily={Fonts.Medium}>{item?.name}</CustomText>
          </ScalePress>
        )
      })}
      </>
    )
  }
  return (
    <View style={styles.container}>
<View style={styles.row}>
  {renderItem(data?.slice(0,4))}
</View>
<View style={styles.row}>
    {renderItem(data?.slice(4))}

</View>
    </View>
  )
}

export default CategoryContainer

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    text:{
        textAlign: 'center',
    },
    item:{
      width: '22%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer:{
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#E5F3F3',
        marginBottom: 8,

    },
    image:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
    
})