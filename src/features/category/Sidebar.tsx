import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Colors } from '@utils/Constants';

interface SidebarProps {
    selectedCategory: any;
    categories: any;
    onCategoryPress: (category:any) => void;
}
const Sidebar:FC<SidebarProps> = ({selectedCategory, categories, onCategoryPress}) => {

    const scrollViewRef = useRef<ScrollView>(null);
    const indicatorPosition = useSharedValue(0);
    const animatedValues = categories?.map(() => useSharedValue(0));

    useEffect(() => {
        let targetIndex = -1;
        categories?.forEach((category:any, index:number) =>{
            const isSelected = selectedCategory?._id === category?._id
            animatedValues[index].value = withTiming(isSelected ? 2: -15, {duration:500});
            if(isSelected){
                targetIndex = index;
            }
        })
        if(targetIndex !== -1){
            indicatorPosition.value = withTiming(targetIndex * 100, {duration:500});
            runOnJS(()=>{
                scrollViewRef.current?.scrollTo({
                    y: targetIndex * 100,
                    animated: true,
                })
            })
        }
    },[selectedCategory]);
    const indicatorStyle = useAnimatedStyle(()=>({
        transform : [{translateY: indicatorPosition.value}]
    }))
  return (
    <View style={styles.sideBar}>
<ScrollView ref={scrollViewRef}
contentContainerStyle={{paddingBottom: 50}}
showsVerticalScrollIndicator={false}
>
    <Animated.View style={[styles.indicator, indicatorStyle]}/> 
</ScrollView>
    </View>
  )
}

export default Sidebar

const styles = StyleSheet.create({
    sideBar:{
        width:'24%',
        backgroundColor:'white',
        borderRightWidth: 0.8,
        borderRightColor: '#eee',
        position:'relative',
    },
    indicator:{
        position:'absolute',
        right : 0,
        width: 4,
        height: 80,
        top: 10,
        alignSelf:'center',
        backgroundColor:Colors.secondary,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    }
})