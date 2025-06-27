import { Platform, StyleSheet, Text, View, Animated as RNAnimated, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext

} from '@r0b0t3d/react-native-collapsible'
import { useAuthStore } from '@state/authStore'
import NoticeAnimation from './NoticeAnimation'
import Visuals from './Visuals'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import AnimatedHeader from './AnimatedHeader'
import StickySearchBar from './StickySearchBar'
import Content from '@components/dashboard/Content'
import withCart from '@features/cart/WithCart'

const NOTICE_HEIGHT = -Math.round((NoticeHeight + 12) * 100) / 100;

const ProductDashboard = () => {
  const {user, setUser} = useAuthStore()
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current

  const {scrollY, expand} = useCollapsibleContext()
  const previousScroll = useRef<number>(0) 

  const backTOTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180

    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration : 300})
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300})
    previousScroll.current = scrollY.value
    return {
      opacity,
      transform: [{translateY}]
    }
  })

  const slideUp = () => {

    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false
    }).start()
  }

  const slideDown = () => {

    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false
    }).start()
  }


useEffect(() => {

  slideDown()
  const timeoutId = setTimeout(() => {

    slideUp()
  }, 2500);
  return () => clearTimeout(timeoutId);

}, [])
  return (
<NoticeAnimation noticePosition={noticePosition}>
  <>
<Visuals/>
  <SafeAreaView/>
  <Animated.View style= {[styles.backToTopButton, backTOTopStyle]}>
    <TouchableOpacity onPress ={()=>{scrollY.value = 0, expand()}}
      style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
      <Icon name='arrow-up-circle-outline' color='white' size={RFValue(12)}/>
      <CustomText variant='h9' style={{color: 'white'}} fontFamily={Fonts.SemiBold}>Back to top</CustomText>
    </TouchableOpacity>
  </Animated.View>
  <CollapsibleContainer style={styles.panelContainer}>
  <CollapsibleHeaderContainer containerStyle = {styles.transparent}>

  <AnimatedHeader
  showNotice={()=>{
    slideDown()
    const timeoutId = setTimeout(() => {
      slideUp()
    },3500);
    return () => clearTimeout(timeoutId);
  }}
  />
  <StickySearchBar></StickySearchBar>

  </CollapsibleHeaderContainer>

  <CollapsibleScrollView 
  nestedScrollEnabled
  style={styles.panelContainer}
  showsVerticalScrollIndicator={false}>
    <Content/>
    <View style ={{backgroundColor:"#f8f8f8",padding:20}}>
      <CustomText 
      fontSize={RFValue(32)}
      fontFamily={Fonts.Bold}
      style={{opacity: 0.2}}>
        Grocery Delivery App 🛒
      </CustomText>
      <CustomText
      fontFamily={Fonts.Bold}
      style={{marginTop: 10, paddingBottom: 100, opacity: 0.2}}>
Developed By Sathvik Shetty ♥︎
      </CustomText>
    </View>
  </CollapsibleScrollView>
  
  </CollapsibleContainer>
  </>
  </NoticeAnimation>
  )
}


const styles = StyleSheet.create({

  panelContainer: {
    flex: 1
  },

  transparent: {
    backgroundColor: 'transparent'
  },

  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999

  },



})

export default withCart(withCollapsibleContext(ProductDashboard));
