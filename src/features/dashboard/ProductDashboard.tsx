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
import Geolocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { reverseGeocode } from '@service/mapService'
import NoticeAnimation from './NoticeAnimation'
import Visuals from './Visuals'
import Icon from 'react-native-vector-icons/Ionicons'
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import AnimatedHeader from './AnimatedHeader'

const NOTICE_HEIGHT = (NoticeHeight + 12) 

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
      toValue: -NOTICE_HEIGHT,
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
    const updateUser = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const{latitude, longitude} = position.coords
          reverseGeocode(latitude, longitude, setUser)
        },
      err=>console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000
      }
      )

    }
// updateUser()
  }
  , [])
  return (
<NoticeAnimation noticePosition={noticePosition}>
  <>
<Visuals/>
  <SafeAreaView/>
  <Animated.View style= {[styles.backToTopButton, backTOTopStyle]}>
    <TouchableOpacity onPress ={()=>{scrollY.value = 0; expand()}}
      style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
      <Icon name='arrow-up-circle-outline' color='#fff' size={RFValue(12)}/>
      <CustomText variant='h8' style={{color: '#fff'}} fontFamily={Fonts.SemiBold}>Back to top</CustomText>
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

  </CollapsibleHeaderContainer>
  
  </CollapsibleContainer>
  </>
  </NoticeAnimation>
  )
}

export default withCollapsibleContext(ProductDashboard)

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
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999

  },



})