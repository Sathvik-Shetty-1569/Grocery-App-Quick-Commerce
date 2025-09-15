import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@state/authStore'
import { confirmOrder, getOrderById, sendLiveOrderUpdates } from '@service/orderService'
import { Colors, Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 
import CustomText from '@components/ui/CustomText'
import LiveHeader from '@features/map/LiveHeader'
import LiveMap from '@features/map/LiveMap'
import DeliveryDetails from '@features/map/DeliveryDetails'
import OrderSummary from '@features/map/OrderSummary'
import { useRoute } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import { hocStyles } from '@styles/GlobalStyle'
import CustomButton from '@components/ui/CustomButton'
import { tokenStorage } from '@state/storage'


const DeliveryMap = () => {

    const user = useAuthStore((state) => state.user)
    const [orderData, setOrderData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [myLocation, setMyLocation] = useState<any>(null)
    const route = useRoute();

    const orderDetails = route?.params as Record<string, any>
    const {setCurrentOrder} = useAuthStore()
    


    const fetchOrderDetails = async () => {
        const data = await getOrderById(orderDetails?._id as any)
        setOrderData(data);
        setLoading(false);
    }

    
    useEffect(() => {
        fetchOrderDetails()
    },[])

    useEffect(() => {
        const getInitialLocation = () => {
            Geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    console.log('Initial location found:', latitude, longitude);
                    setMyLocation({latitude, longitude});
                },
                (error) => {
                    console.log('Error getting initial location:', error);
                    // Fallback: Try again after 2 seconds
                    setTimeout(() => {
                        Geolocation.getCurrentPosition(
                            (position) => {
                                const {latitude, longitude} = position.coords;
                                console.log('Fallback location found:', latitude, longitude);
                                setMyLocation({latitude, longitude});
                            },
                            (fallbackError) => {
                                console.log('Fallback location error:', fallbackError);
                            },
                            {enableHighAccuracy: false, timeout: 10000, maximumAge: 60000}
                        );
                    }, 2000);
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 60000}
            );
        };
        
        // Get initial location
        getInitialLocation();
        
        // Set up continuous watching
        const watchId = Geolocation.watchPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                console.log('Location updated:', latitude, longitude);
                setMyLocation({latitude, longitude});
            },
            (err) => {
                console.log("Error watching location", err);
            },
            {enableHighAccuracy: true, distanceFilter: 100, interval: 5000}
        );
        
        return () => Geolocation.clearWatch(watchId);
    }, [])

    const acceptOrder = async () => {
        console.log('=== DEBUG INFO ===');
        console.log('Accept Order', orderData);
        console.log('Current Location:', myLocation);
        console.log('User:', user);
        console.log('Access Token exists:', !!tokenStorage.getString('accessToken'));
        console.log('==================');
        
        // If no location, try to get it immediately
        if (!myLocation) {
            console.log('No location available, trying to get current position...');
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    Geolocation.getCurrentPosition(
                        resolve,
                        reject,
                        {enableHighAccuracy: false, timeout: 5000, maximumAge: 60000}
                    );
                });
                
                const currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                
                console.log('Got location for order:', currentLocation);
                setMyLocation(currentLocation);
                
                // Proceed with this location
                const data = await confirmOrder(orderData?._id, currentLocation);
                if(data){
                    setCurrentOrder(data);
                    Alert.alert('Success', 'Order Accepted! Grab your package and start delivery.');
                } else {
                    Alert.alert('Error', 'Failed to accept order. Please check your internet connection and try again.');
                }
            } catch (locationError) {
                console.log('Failed to get location:', locationError);
                Alert.alert('Location Error', 'Unable to get your current location. Please enable GPS, check app permissions, and try again.');
                return;
            }
        } else {
            // Location is available, proceed normally
            if (!orderData?._id) {
                Alert.alert('Order Error', 'Invalid order data. Please try again.');
                return;
            }
            
            const data = await confirmOrder(orderData?._id, myLocation);
            if(data){
                setCurrentOrder(data);
                Alert.alert('Success', 'Order Accepted! Grab your package and start delivery.');
            } else {
                Alert.alert('Error', 'Failed to accept order. Please check your internet connection and try again.');
            }
        }
        
        fetchOrderDetails();
    }

    const orderPickedUp = async () => {
        const data = await sendLiveOrderUpdates(
            orderData?._id,
            myLocation,
            'arriving',
        );
        if(data){
            setCurrentOrder(data);
            Alert.alert("Let's deliver it as soon as possible");
        }
        else{
            Alert.alert("Something went wrong");
        }
        fetchOrderDetails();
    }
        const orderDelivered = async () => {
            const data = await sendLiveOrderUpdates(
                orderData?._id,
                myLocation,
                'delivered',
            );
            if(data){
                setCurrentOrder(null);
                Alert.alert("Woohoo! You made it 🥳");
            }else{
                Alert.alert("Something went wrong");
            }
            fetchOrderDetails();
        }



    let message = 'Start this order';
    if(
        orderData?.deliveryPartner?._id == user?._id && 
        orderData?.status === 'confirmed'
    ){
        message = 'Grab your order';
    }else if(
        orderData?.deliveryPartner?._id == user?._id && 
        orderData?.status === 'arriving'
    ){
        message = "Complete you order";
    }else if(
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status === 'delivered'){
            message = "Your milestone";
        }else if(
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status != 'available'){
            message = "You missed it!";
        }

        useEffect(() => {
            async function sendLiveUpdates(){
                if(
                    orderData?.deliveryPartner?._id == user?._id &&
                    orderData?.status != 'delivered' &&
                    orderData?.status != 'cancelled' 
                ){
                    await sendLiveOrderUpdates(
                        orderData?._id,
                        myLocation,
                        orderData?.status
                    )
                    fetchOrderDetails();
                }
            }
            sendLiveUpdates();
        },[myLocation]);
        
    if(loading){
        return <View style ={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
            <ActivityIndicator color="#000" size = "small"/>
        </View>
    }
  return (
    <View style = {styles.container}>
        <LiveHeader type = "Delivery" title = {message} secondTitle ="Delivery in 10 minutes"/>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        >
            {orderData?.deliveryLocation && orderData?.pickupLocation &&(
            <LiveMap
            deliveryPersonLocation = {orderData?.deliveryPersonLocation || myLocation}
            deliveryLocation ={orderData?.deliveryLocation || null}
            hasAccepted = {orderData?.deliveryPartner?._id == user?._id && orderData?.status == 'confirmed'}
            pickupLocation = {orderData?.pickupLocation || null}
            hasPickedUp = {orderData?.status === 'arriving'}
            />
            )}

            

            <DeliveryDetails details={orderData?.customer}/>
            <OrderSummary order={orderData}/>

            <View style = {styles.flexRow}>
                <View style = {styles.iconContainer}>
                    <Icon name = 'cards-heart-outline' color = {Colors.disabled} size = {RFValue(20)} />
                </View>

                <View style = {{width : '82%'}}>
                    <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
                        Do you like our app?
                        </CustomText>
                        <CustomText
                        variant='h9'
                        fontFamily={Fonts.Medium}
                        >
                            Give us 5 star rating
                        </CustomText>
                </View>
                
            </View>
<CustomText
fontFamily={Fonts.SemiBold}
variant='h6'
style = {{opacity: 0.6, marginTop: 20}}
>Sathvik Shetty x SS Grocery Delivery App</CustomText>

        </ScrollView>

{orderData?.status != 'delivered' && orderData?.status != 'cancelled'&& (
    <View style ={[hocStyles.cartContainer, styles.btnContainer]}>
        {orderData?.status == 'available' &&(
            <CustomButton
            disabled = {false}
            title = "Accept Order"
            onPress = {acceptOrder}
            loading = {false}
            />
        )}
        {orderData?.status == 'confirmed' && orderData?.deliveryPartner?._id == user?._id &&(
            <CustomButton
            disabled = {false}
            title = "Order Picked Up"
            onPress = {orderPickedUp}
            loading = {false}
            />
        )}

        {orderData?.status == 'arriving' && orderData?.deliveryPartner?._id == user?._id &&(
            <CustomButton
            disabled = {false}
            title = "Order Delivered"
            onPress = {orderDelivered}
            loading = {false}
            />
        )
        }

    </View>
)}

    </View>
  )
}

export default DeliveryMap

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: Colors.primary
    },
    scrollContent:{
        paddingBottom: 150,
        backgroundColor: Colors.backgroundSecondary,
        padding: 15
    },
    btnContainer:{
        padding: 10
    },
    flexRow:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderBottomWidth: 0.7,
        borderColor : Colors.border
    },
    iconContainer:{
        backgroundColor: Colors.backgroundSecondary,
        padding: 10,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"

    
    }
})