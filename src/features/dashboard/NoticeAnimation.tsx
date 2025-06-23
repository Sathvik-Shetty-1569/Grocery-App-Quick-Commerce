import { StyleSheet, Text,View,  Animated } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/Scaling'
import Notice from './Notice'


const NOTICE_HEIGHT = (NoticeHeight + 12) 

const NoticeAnimation:FC<{noticePosition:any; children:React.ReactElement}>
 = ({noticePosition, children}) => 
         {return (
    <View style={styles.container}>
<Animated.View style={[styles.noticeContainer, {transform:[{translateY: noticePosition}]}]}>
        <Notice />
        </Animated.View>
        <Animated.View style={[styles.contentContainer,{
            paddingTop: noticePosition.interpolate({
                inputRange: [0, NOTICE_HEIGHT],
outputRange: [NOTICE_HEIGHT + 20, 0],
            })
        }]}>
            {children}
        </Animated.View>

    </View>
  )
}

export default NoticeAnimation

const styles = StyleSheet.create({
    noticeContainer: {
        width: '100%',
        zIndex: 999,
        position: 'absolute',
    },
    contentContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor:"#fff"
    }
})