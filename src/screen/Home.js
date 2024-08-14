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
  StyleSheet,
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
  get_order_data_by_Home,
  get_order_data_by_id,
} from '../redux/feature/featuresSlice';
import Loading from '../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../routes/screenName.enum';
import Geolocation from 'react-native-geolocation-service';
import Order_List from '../configs/OderList';
import { notificationListener } from './FeaturesScreen/NotificationComponent';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
export default function Home() {
  const user = useSelector(state => state.auth.userData);
  const OrderDetails = useSelector(state => state.feature.orderDataHome);
  const OrderStatus = useSelector(state => state.feature.OrderDetails);
  const isLoading = useSelector(state => state.feature.isLoading);
  const TotalList = useSelector(state => state.feature.TotalList);
  const navigation = useNavigation();
  const isFocuse = useIsFocused();
  const [OrderDetail, setOrderDetail] = useState('New Order');
  const getProfile = useSelector(state => state.feature.getProfile);
  const dispatch = useDispatch();
  const [prepTime, setPrepTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedIndex, setIsExpandedIndex] = useState(null);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    notificationListener();

  }, []);


  const get_order_status = async sts => {
    try {
      const params = {
        data: {
          restaurant_id: user.user_data?.restaurant_id,
          status: sts,
        },
        token: user?.token,
      };
      await dispatch(get_order_data_by_id(params));
    } catch (err) {
      console.error(err);
    }
  };
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
  const OderStatus = async (item, status) => {

    if (prepTime == 0 && status === 'Accepted') return errorToast("Please Enter Preparing Time")

    try {
      const params = {
        order_id: item.resord_id,
        status: status,
        token: user?.token,
        order_preapare_time: item?.order_preapare_time,

      };


      dispatch(change_order_status(params)).then(res => {
        get_order_status('Accepted');
      });
    } catch (err) {
      console.log('=================params===================', err);
    }
  };


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

    dispatch(get_order_data_by_Home(params));
  };

  const PickedOrder = OrderStatus?.filter(item => item.delivery_status === 'Pickuped' && item.status === 'Ready');
  const RedyOrder = OrderStatus?.filter(item => item.delivery_status !== 'Pickuped' && item.status === 'Ready');

  const RestaurantOder = ({ item }) => (
    <TouchableOpacity
      onPress={() => {

        if (item.subtitile == 'Revenue') {
          navigation.navigate(ScreenNameEnum.Revenue)
        }
        else {
          navigation.navigate(ScreenNameEnum.MyOrder, { type: item.name });
        }

      }}
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
          marginTop: 10,
          marginBottom: 5
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
        {item.id == '3' && TotalList?.complete_order}
        {item.id == '5' && TotalList?.total_revenue}
        {item.id == '4' && TotalList?.cancle_order}
        {item.id == '2' && TotalList?.accepted_order}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          lineHeight: 30,
          color: '#E79B3F',
        }}></Text>
    </TouchableOpacity>
  );
  const RestaurantOder2 = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        get_order_status(item.status)
        setOrderDetail(item.Name)
      }}
      style={[
        styles.shadow,

        {
          backgroundColor: OrderDetail == item.Name ? '#e9595a' : '#fff',
          height: 50,
          marginVertical: 10,
          width: wp(28),
          alignItems: 'center',

          justifyContent: 'center',
          borderRadius: 15,
          marginHorizontal: 5
        },
      ]}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 15,
          color: OrderDetail == item.Name ? "#fff" : '#000',
        }}>
        {item.Name}
      </Text>



    </TouchableOpacity>
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
  const makePhoneCall = (Number) => {

    RNImmediatePhoneCall.immediatePhoneCall(Number);
  }
  const TopRateRestaurant = ({ item, index }) => {

    const isExpand = isExpanded && isExpandedIndex === index
    const statusImage =
      item.status === 'Complete'
        ? require('../assets/croping/Complete2x.png')
        : item.status === 'Cancel'
          ? require('../assets/croping/Close2x.png')
          : require('../assets/croping/pending.png');

    const statusColor =
      item.status === 'Complete'
        ? '#00C366'
        : item.status === 'Cancel'
          ? '#F44336'
          : '#FFA500';

    const statusBackgroundColor =
      item.status === 'Complete'
        ? 'rgba(0, 195, 102, 0.2)'
        : item.status === 'Cancel'
          ? '#FFDADA'
          : 'rgba(255, 165, 0, 0.2)';

    const totalPrice = item.order_details.reduce(
      (acc, curr) => acc + curr.quantity * curr.price_per_unit,
      0,
    );
    const formatTime = (dateTimeString) => {

      console.log(dateTimeString);
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const date = new Date(dateTimeString);

      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }

      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = monthsOfYear[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();

      let hours = date.getHours();
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'

      return `${dayOfWeek} ${month} ${day}, ${year} `;
    };



    return (
      <TouchableOpacity
        // disabled={item.status === 'Pending'}
        style={[styles.container, styles.shadow]}
        onPress={() => {
          setIsExpanded(!isExpanded)
          setIsExpandedIndex(index)
        }}
      >

        {isLoading ? <Loading /> : null}
        <View style={{ width: '88%', justifyContent: 'center', }}>
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#777777' }}>
            Order ID- {item.resord_id}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '500', color: '#777777' }}>
            Order Time {formatTime(item.created_at)}
          </Text>
        </View>

        <Text style={styles.detailsText}>Order Details:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.user_data?.images }}
              style={{
                height: '90%',
                width: '90%',
                borderRadius: 100,
                borderColor: '#7756FC',
              }}
              resizeMode="cover"
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 14, color: "#000", fontWeight: '600' }}>{item.user_data?.full_name}</Text>
            <Text style={{ fontSize: 12, color: "#777777", fontWeight: '600' }}>Contact {item.user_data?.mobile_number}</Text>
          </View>
        </View>
        {!isExpand && <View style={{ marginTop: 20 }}>
          <View style={styles.detailsRow}>
            <Text style={styles.totalPriceText}>Total Bill:</Text>
            <Text style={{ width: '20%' }}>-</Text>
            <Text
              style={{

                ...{ color: '#000', fontWeight: '600', marginRight: 20, },
              }}
            >
              ${item.total_price.toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              backgroundColor: statusBackgroundColor,
              flexDirection: 'row',
              borderRadius: 5,
              height: 34,
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Image source={statusImage} style={{ height: 20, width: 20 }} />
            <Text
              style={{
                color: statusColor,
                marginLeft: 10,
                fontSize: 12,
                lineHeight: 15,
                fontWeight: '500',
                marginRight: item.status === 'Accepted' ? 5 : 0
              }}
            >
              {item.status === 'Complete' && 'Yeay, you have completed it!'}
              {item.status === 'Cancel' &&
                (item.user_order_status === 'Cancel By User'
                  ? 'This order was canceled by the User!'
                  : 'You canceled this booking!')}
              {item.status === 'Pending' && 'Your booking is pending!'}
              {item.status === 'Accepted' && item.delivery_status != 'Pickuped' && 'this order is under Preparing!'}
              {item.status === 'Ready' && item.delivery_status !== 'Pickuped' && 'Your order is Ready!'}
              {item.status === 'Ready' && item.delivery_status == 'Pickuped' && 'Your order is Pickuped by rider!'}


            </Text>

          </View>


        </View>
        }

        {isExpand && (<>
          <View style={{ marginTop: 5 }}>
            {item.order_details.map((dish, index) => (
              <View key={index} style={{ marginTop: 15 }}>

                <View style={{ marginTop: 5 }}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: "#000", fontWeight: '500' }}>
                      {dish.dish_name} x {dish.quantity}
                    </Text>
                    <View>
                      <Text style={{ fontSize: 14, color: "#000", fontWeight: '500' }}>
                        Total: {(dish.quantity * dish.price_per_unit).toFixed(2)}
                      </Text>

                      <Text style={{ fontSize: 10, color: "#000", fontWeight: '500' }}>
                        (Price per unit: ${dish.price_per_unit.toFixed(2)})
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}

            <View
              style={{
                marginTop: 20,
                backgroundColor: statusBackgroundColor,
                flexDirection: 'row',
                borderRadius: 5,
                height: 34,
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <Image source={statusImage} style={{ height: 20, width: 20 }} />
              <Text
                style={{
                  color: statusColor,
                  marginLeft: 10,
                  fontSize: 12,
                  lineHeight: 15,
                  fontWeight: '500',
                  marginRight: item.status === 'Accepted' ? 5 : 0
                }}
              >
                {item.status === 'Complete' && 'Yeay, you have completed it!'}
                {item.status === 'Cancel' &&
                  (item.user_order_status === 'Cancel By User'
                    ? 'You canceled this booking!'
                    : 'Your order was canceled by the restaurant!')}
                {item.status === 'Pending' && 'Your booking is pending!'}
                {item.status === 'Ready' && item.delivery_status !== 'Pickuped' && 'Your order is Ready!'}
                {item.status === 'Accepted' && item.delivery_status != 'Pickuped' && 'this order is under Preparing!'}

                {item.status === 'Ready' && item.delivery_status == 'Pickuped' && 'Your order is Pickuped by rider!'}


              </Text>

            </View>


            <View style={[styles.detailsRow, { borderBottomWidth: 0, marginTop: 10 }]}>
              <Text style={styles.totalPriceText}>Tax Amount :</Text>
              <Text style={{ width: '20%' }}>-</Text>

              <Text
                style={{

                  ...{ color: '#000', fontWeight: '600', marginRight: 20, },
                }}
              >
                ${item.tax_amount}.00
              </Text>
            </View>
            <View style={[styles.detailsRow, { borderBottomWidth: 0, marginTop: 0 }]}>
              <Text style={styles.totalPriceText}>Delivery charge :</Text>
              <Text style={{ width: '20%' }}>-</Text>
              <Text
                style={{

                  ...{ color: '#000', fontWeight: '600', marginRight: 20 },
                }}
              >
                ${item.delivery_charge}.00
              </Text>
            </View>
            <View style={[styles.detailsRow, { borderBottomWidth: 0, marginTop: 0 }]}>
              <Text style={styles.totalPriceText}>Sub Total :</Text>
              <Text style={{ width: '20%' }}>-</Text>
              <Text
                style={{

                  ...{ color: '#000', fontWeight: '600', marginRight: 20 },
                }}
              >
                ${item.sub_total}.00
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={[styles.totalPriceText, { fontSize: 14 }]}>Total Bill:</Text>
              <Text style={{ width: '20%' }}>-</Text>
              <Text
                style={{

                  ...{ color: '#000', fontWeight: '600', marginRight: 20, },
                }}
              >
                ${item.total_price.toFixed(2)}
              </Text>
            </View>


          </View>

        </>
        )}

        {item.delivery_status !== 'Pending' && item.delivery_status !== 'Deliverd' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 60, // adjust as per your requirements
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => makePhoneCall(item.driver_data.driver_mobile_number)}
            >
              <Image
                source={require('../assets/croping/Call3x.png')}
                style={{ height: 60, width: 60 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

                if (item.delivery_status == 'Pickuped') {

                  navigation.navigate(ScreenNameEnum.TrackResToUser, { OrderId: item.resord_id });

                }
                else {
                  navigation.navigate(ScreenNameEnum.TRACK_ORDER, { OrderId: item.resord_id });
                }
              }}
              style={{
                backgroundColor: '#352C48',
                alignItems: 'center',
                height: 40,
                borderRadius: 30,
                justifyContent: 'center',
                width: '80%',
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  lineHeight: 22,
                  color: '#FFFFFF',
                }}
              >
                Track
              </Text>
            </TouchableOpacity>
          </View>
        )}


        {OrderDetail === 'Preparing' && <TouchableOpacity

          onPress={() => {
            OderStatus(item, 'Ready')
          }}
          style={{
            backgroundColor: '#22aa00',
            alignItems: 'center', justifyContent: 'center',
            height: 45, width: '90%', borderRadius: 10, marginVertical: 15, alignSelf: 'center'
          }}>
          <Text style={{ fontSize: 18, color: '#fff', fontWeight: '700' }}>Ready</Text>
        </TouchableOpacity>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10 }}>

      {Platform.OS === 'ios' ? (
        <View style={{ height: 20 }} />
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
          {/* <View>
            <Text style={{ color: 'green', fontSize: 14, fontWeight: '700' }}>Outlet Online</Text>
          </View> */}

        </View>

        <View
          style={{
            justifyContent: 'center',
            paddingTop: 30,
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

        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <FlatList
            data={ORDERDATA}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={RestaurantOder2}
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
          {OrderDetail == 'New Order' &&
            <>
              {OrderDetails?.length > 0 ? <FlatList
                data={OrderDetails}
                renderItem={({ item }) => <Order_List item={item} />}
                keyExtractor={item => item.id}
                ListFooterComponent={<View style={{ height: hp(2) }} />}
                showsVerticalScrollIndicator={false}
              /> :
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
                  No Order Found
                </Text>}
            </>
          }
          {OrderDetail == 'Preparing' &&
            <>
              {OrderStatus?.length > 0 ? <FlatList
                data={OrderStatus}
                renderItem={TopRateRestaurant}

                ListFooterComponent={<View style={{ height: hp(2) }} />}
                showsVerticalScrollIndicator={false}
              /> :
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
                  No Order Found
                </Text>}
            </>
          }
          {OrderDetail == 'Ready' &&
            <>
              {RedyOrder?.length > 0 ? <FlatList
                data={RedyOrder}
                renderItem={TopRateRestaurant}

                ListFooterComponent={<View style={{ height: hp(2) }} />}
                showsVerticalScrollIndicator={false}
              /> :
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
                  No Order Found
                </Text>}
            </>
          }
          {OrderDetail == 'Picked up' &&
            <>
              {PickedOrder?.length > 0 ? <FlatList
                data={PickedOrder}
                renderItem={TopRateRestaurant}

                ListFooterComponent={<View style={{ height: hp(2) }} />}
                showsVerticalScrollIndicator={false}
              /> :
                <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
                  No Order Found
                </Text>}
            </>
          }
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
  // {
  //   id: '2',
  //   name: 'Accepted',
  //   subtitile: 'Orders',


  // },
  {
    id: '3',
    name: 'Complete',
    subtitile: 'Orders',


  },
  {
    id: '4',
    name: 'Cancel',
    subtitile: 'Orders',


  },
  {
    id: '5',
    name: 'Total ',
    subtitile: 'Revenue',


  },

];

const ORDERDATA = [
  {
    Name: 'New Order',
    status: 'Pending'
  },
  {
    Name: 'Preparing',
    status: 'Accepted'
  },
  {
    Name: 'Ready',
    status: 'Ready'
  },
  {
    Name: 'Picked up',
    status: 'Ready'
  },
]



