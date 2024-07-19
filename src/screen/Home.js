import Logo from '../assets/sgv/logo.svg';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { styles } from '../configs/Styles';
import { BottomTabView } from '@react-navigation/bottom-tabs';
import Arrow from '../assets/sgv/2arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  change_order_status,
  dashboard_data,
  get_Profile,
  get_order_data_by_id,
} from '../redux/feature/featuresSlice';
import Loading from '../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../routes/screenName.enum';
import Geolocation from 'react-native-geolocation-service';
import Order_List from '../configs/OderList';
export default function Home() {
  const user = useSelector(state => state.auth.userData);
  const OrderDetails = useSelector(state => state.feature.OrderDetails);
  const isLoading = useSelector(state => state.feature.isLoading);
  const TotalList = useSelector(state => state.feature.TotalList);
  const navigation = useNavigation();
  const isFocuse = useIsFocused();
  const [isExpanded, setisExpanded] = useState(true);
  const getProfile = useSelector(state => state.feature.getProfile);
  const dispatch = useDispatch();
  const [prepTime, setPrepTime] = useState(0);

  const isFocused = useIsFocused();


  useEffect(() => {
    let interval;

    if (isFocused) {
      interval = setInterval(() => {
        get_order();
      }, 4000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isFocused]);


  useEffect(() => {
    get_order();
    checkApplicationPermission();
    getTotalOrder();
    requestLocationPermission()
    const params = {
      token: user.token,
    };
    dispatch(get_Profile(params));
  }, [user, isFocuse]);

  const getTotalOrder = async () => {
    const params = {
      restaurant_id: user.user_data?.restaurant_id,

      token: user?.token,
    };
    dispatch(dashboard_data(params));
  };

  const get_order = async () => {
    const params = {
      data: {
        restaurant_id: user.user_data?.restaurant_id,
        status: 'Pending',
      },
      token: user?.token,
    };

    dispatch(get_order_data_by_id(params));
  };
  const RestaurantOder = ({ item }) => (
    <View
      // onPress={() => {
      //   navigation.navigate(ScreenNameEnum.DISH_INFORMATION);
      // }}
      style={[
        styles.shadow,

        {
          marginHorizontal: 9,
          borderRadius: 10,
          height: hp(12),
          width: hp(12),
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 25,
          marginVertical: 10,
        },
      ]}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '700',
          lineHeight: 15,
          color: '#7756FC',
        }}>
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '700',
          lineHeight: 15,
          color: '#7756FC',
        }}>
        {item.subtitile}
      </Text>
      <Text
        style={{
          fontSize: 10,
          fontWeight: '700',
          lineHeight: 15,
          color: '#9E9E9E',
        }}>
        {item.id == '1' && TotalList?.total_order}
        {item.id == '2' && TotalList?.complete_order}
        {item.id == '3' && TotalList?.total_revenue}
        {item.id == '4' && TotalList?.cancle_order}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          lineHeight: 30,
          color: '#E79B3F',
        }}></Text>
    </View>
  );
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        try {
            // Request location permission on iOS
            Geolocation.requestAuthorization('whenInUse'); // or 'always'
        } catch (error) {
            console.warn('Authorization request error:', error);
        }
    } else {
        try {
            // Request location permission on Android
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to show you directions.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (error) {
            console.warn('Permission request error:', error);
        }
    }
};
const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {
    }
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10 }}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={{ height:20 }} />
      ) : (
        <View style={{ height: 0 }} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#7756FC',
                lineHeight: 25,
              }}>
              Welcome,
            </Text>
            <Text
              style={{
                color: '#666666',
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 21,
              }}>
              {' '}
              {getProfile?.useres_full_name}
            </Text>
          </View>

          <View>
                <TouchableOpacity
                  onPress={() => {
                   // navigation.navigate(ScreenNameEnum.MsgNotification)
                    // requestUserPermission()
                  }}
                >
                  <Image
                    source={require('../assets/croping/Notification3x.png')}
                    resizeMode="contain"
                    style={{ height: 45, width: 45 }}
                  />
                </TouchableOpacity>
              </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            paddingVertical: 30,
          }}>
          <FlatList
            data={restaurantOrders}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={RestaurantOder}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              lineHeight: 30,
              color: '#000',
            }}>
            Orders
          </Text>
        </View>

        <View
          style={{
            flex: 1,
          }}>
          {OrderDetails?.length > 0 ? (
              <FlatList
              data={OrderDetails}
              renderItem={({ item }) => <Order_List item={item} />}
              keyExtractor={item => item.id}
              ListFooterComponent={<View style={{ height: hp(2) }} />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
              No Order Found
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const restaurantOrders = [
  {
    id: '1',
    name: 'Total',
    subtitile: 'Orders',


  },
  {
    id: '2',
    name: 'Complete',
    subtitile: 'Orders',


  },
  {
    id: '3',
    name: 'Total ',
    subtitile: 'Revenue',


  },
  {
    id: '4',
    name: 'Returning',
    subtitile: 'Customers',


  },
];
