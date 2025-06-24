import { Animated, SafeAreaView, StyleSheet, Text, View , Image, Keyboard, Alert, Touchable, TouchableOpacity, Platform} from 'react-native'
import React, { useEffect, useRef } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import ProductSlider from '@components/login/ProductSlider'
import { Colors, Fonts, lightColors } from '@utils/Constants'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { PanGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture'
import { resetAndNavigate } from '@utils/NavigationUtils'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import LinearGradient from 'react-native-linear-gradient'
import CustomInput from '@components/ui/CustomInput'
import CustomButton from '@components/ui/CustomButton'
import { customerLogin } from '@service/authService'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
const bottomColors = [...lightColors].reverse()

const CustomerLogin = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const [gestureSequence, setGestureSequence] = React.useState<string[]>([])

    const keyboardOffsetHeight = useKeyboardOffsetHeight()

    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (keyboardOffsetHeight === 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(animatedValue, {
            toValue: -keyboardOffsetHeight*0.84,
            duration: 250,
                useNativeDriver: true
            }).start()
        }
    }), keyboardOffsetHeight
    const handleGesture = ({ nativeEvent }: any) => {
        console.log(nativeEvent)
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent;
            let direction = ''
            if (Math.abs(translationX) > Math.abs(translationY)) {
                direction = translationX > 0 ? 'right' : 'left'
            } else {
                direction = translationY > 0 ? 'down' : 'up'
            }
            const newSequence = [...gestureSequence, direction].slice(-5);
            setGestureSequence(newSequence)
            if (newSequence.join('') === 'upupdownleftright') {
                setGestureSequence([])
                resetAndNavigate('DeliveryLogin')
            } else {
                setGestureSequence(newSequence)
            }
        }
    }
const handleAuth = async() => {
    Keyboard.dismiss()
    setLoading(true)
    try {
        await customerLogin(phoneNumber)
        resetAndNavigate('ProductDashboard')
    } catch (error) {
        Alert.alert("Login Failed")
    }finally {
        setLoading(false)
    }
    
}


    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreaView>
                    <ProductSlider />

                    <PanGestureHandler onHandlerStateChange={handleGesture}>
                        <Animated.ScrollView
                        style={{transform: [{translateY: animatedValue}]}}
                            bounces={false}
                            keyboardDismissMode='on-drag'
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={styles.subContainer}>
                            <LinearGradient colors={bottomColors} style={styles.gradient} />
                       <View style = {styles.content}>
<Image source={require('@assets/images/logo.jpeg')} style={styles.logo} />
                       <CustomText variant='h5' fontFamily={Fonts.Bold}>
                        Grocery Delivery App
                        </CustomText>
                       <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                       Log in or sign up
                       </CustomText>

                       <CustomInput
                       onChangeText={(text)=>setPhoneNumber(text.slice(0,10))}
                       onClear={() => setPhoneNumber('')}
                       value={phoneNumber}
                       placeholder='Enter mobile number'
                       inputMode='numeric'
                       left={
                       <CustomText style={styles.phoneText}variant ='h6' fontFamily={Fonts.SemiBold}>
                        +91
                       </CustomText>
                       }
                       
                       />
                       <CustomButton
                       disabled={phoneNumber?.length != 10}
                        onPress={handleAuth}  // Fixed this line
                       loading={loading}
                       title='Continue'
                       />

                       </View>
                       
                        </Animated.ScrollView>
                    </PanGestureHandler>

                </CustomSafeAreaView>


                <View style={styles.footer}>
                    <SafeAreaView />
                    <CustomText fontSize={RFValue(6)}>
                        By Continuing, you agree to our Terms of Use and Privacy Policy.
                    </CustomText>
                    <SafeAreaView />
                </View>
                <TouchableOpacity style={styles.absoluteSwitch} onPress={() => resetAndNavigate('DeliveryLogin')}>
<Icon name='bike-fast' color="#000" size={RFValue(14)}/>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    )
}

export default CustomerLogin;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 2,
        marginBottom: 10,
        opacity: 0.8
    },
    phoneText: {
        marginLeft: 10
    },
    subContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    absoluteSwitch: {
        position: 'absolute',
        top:Platform.OS === 'ios' ? 40 :20,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        padding : 10,
        height: 55,
        width: 55,
        borderRadius: 50,
        
        elevation: 10,
        right: 10,
        zIndex: 99,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        borderTopWidth: 0.8,
        borderColor: Colors.border,
        paddingBottom: 10,
        zIndex: 22,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f8f9fc"

    },
    gradient: {
        paddingTop: 60,
        marginTop: 360,
        width: '100%',

    },
    content:{
        justifyContent:"center",
        alignItems: "center",
        width: '100%',
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10
    }
})


