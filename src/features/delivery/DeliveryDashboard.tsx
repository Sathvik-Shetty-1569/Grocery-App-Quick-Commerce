import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import TabBar from '@components/delivery/TabBar';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '@service/mapService';
import { fetchOrders } from '@service/orderService';
import DeliveryOrderItem from '@components/delivery/DeliveryOrderItem';
import CustomText from '@components/ui/CustomText';

const DeliveryDashboard = () => {
  const {user, setUser} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const updateUser = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude, setUser);
      },
      err=> console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000,
      }
    )
  }

  useEffect(() => {
    updateUser();
    
  }, []);

  const fetchData = async() => {
    setData([]);
    setRefreshing(true);
    setLoading(true);
    console.log(user)
    console.log(selectedTab, user?._id, user?.branch);
    const data = await fetchOrders(selectedTab, user?._id, user?.branch);
    console.log(data);
    setData(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  const renderOrderItem=({item, index}: any) => {
    return (
    <DeliveryOrderItem index={index} item  = {item}/>
    )
  }
  return (
    <View style = {styles.container}>
      <SafeAreaView>
        <DeliveryHeader name = {user?.name} email={user?.email}/>
      </SafeAreaView>

      <View style = {styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab}/>

        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={async () =>await fetchData()}
            />
          }
          ListEmptyComponent={() => {
            if(loading){
              return(
                <View style = {styles.center}>
                  <ActivityIndicator color = {Colors.secondary} size = "small"/>
                </View>
              )
            }
            return(
              <View style = {styles.center}>
                <CustomText>No orders found yet!</CustomText>
              </View>
            );
          }
            }
            renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  )
}

export default DeliveryDashboard

const styles = StyleSheet.create({

  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6
  },
  flatListContainer: {
    padding: 2
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
})