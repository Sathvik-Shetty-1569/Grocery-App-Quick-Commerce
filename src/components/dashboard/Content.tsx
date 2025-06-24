import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { adData, categories } from '@utils/dummyData'
import AdCarousal from './AdCarousal'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from './CategoryContainer'
import Carousel from './Carousal'

const Content: FC = () => {
  return (
    <View style={styles.container}>
      {/* <AdCarousal adData={adData} />   */}
       <View style={styles.carouselContainer}>
        <Carousel adData={adData}/>
      </View>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Grocery & Kitchen</CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Bestsellers</CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Snacks & Drinks</CustomText>
      <CategoryContainer data={categories}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Home & LifeStyle</CustomText>
      <CategoryContainer data={categories}/>
        </View>
  )
}

export default Content

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
   carouselContainer: {
   marginLeft: -40,
    marginRight: -20,
    paddingLeft: 20,
    paddingRight: 20,
  }
})