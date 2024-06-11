import Logo from '../assets/sgv/logo.svg';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
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

  const GetoderID = async timestamp => {
    // Extracting components from the timestamp
    const [date, time] = timestamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');

    // Creating the order ID
    const orderId = `${year}${month}${day}${hour}${minute}${second}`;
    return orderId;
  };



  useEffect(() => {
    get_order();
    getTotalOrder();
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
  const OderStatus = async (item, status) => {

    try {
      const params = {
        order_id: item.resord_id,
        status: status,
        token: user?.token,
        order_preapare_time: prepTime,
        navigation:navigation
      };

      console.log('=================params===================', params);

      dispatch(change_order_status(params)).then(res => {
        get_order();
      });
    } catch (err) {
      console.log('=================params===================', err);
    }
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

  const Order_List = ({ item }) => {
    const initialPrepTime = parseInt(item.order_preapare_time?.substring(0, 2)) || 0;
    setPrepTime(initialPrepTime)
    return (
      <View
        style={[
          styles.shadow,
          {
            borderRadius: 10,
            marginTop: 20,
            backgroundColor: '#FFF',
            marginHorizontal: 5,
            padding: 10,
          },
        ]}>
        <View
          style={{
            paddingHorizontal: 15,
            height: hp(8),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Image
              source={{ uri: item.user_data.useres_images }}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
          </View>
          <View style={{ width: '65%' }}>
            <Text
              style={{
                color: '#9E9E9E',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
              }}>
              ID: {item.resord_id}
            </Text>
            <Text
              style={{
                color: '#352C48',
                fontSize: 16,
                fontWeight: '600',
                lineHeight: 24,
              }}>
              {item.user_data.useres_full_name}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: '#7756FC',
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 24,
              }}>
              {item.price}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            height: hp(5),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontWeight: '600', fontSize: 14 }}>
              Total Bill : ${item.total_price}{' '}
            </Text>
            <View
              style={{
                borderWidth: 2,
                borderColor:
                  item.payment_status == 'Paid' ? '#15BE77' : '#bf3d3d',
                borderRadius: 5,
                marginLeft: 5,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: item.payment_status == 'Paid' ? '#15BE77' : '#bf3d3d',
                  fontWeight: '600',
                  fontSize: 14,
                }}>
                {item.payment_status}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            height: hp(5),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 5,

              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#E7E8E5',
              borderWidth: 1,
              width: '100%',
            }}>
            <TouchableOpacity
            //  onPress={()=>{
            //    decrementPrepTime}}
              style={{
                borderRightWidth: 1,
                width: '20%',

                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 24, color: '#000', fontWeight: '500' }}>
                -
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 12,
                marginHorizontal: 5,
                fontWeight: '500',
                color: '#000',
                marginHorizontal: 10,
                paddingVertical: 5,
              }}>
              {prepTime} Min
            </Text>
            <TouchableOpacity
            // onPress={incrementPrepTime}
              style={{
                width: '20%',
                borderLeftWidth: 1,
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 24, color: '#000', fontWeight: '500' }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(8),
          }}>
          <TouchableOpacity
            onPress={() => {
              OderStatus(item, 'Accepted');
            }}
            style={{
              backgroundColor: '#15BE77',
              alignItems: 'center',
              height: 45,
              borderRadius: 30,
              justifyContent: 'center',
              width: '40%',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                lineHeight: 22,
                color: '#FFFFFF',
              }}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              OderStatus(item, 'Cancel');
            }}
            style={{
              backgroundColor: '#FF0000',
              alignItems: 'center',
              height: 45,
              borderRadius: 30,
              marginLeft: -35,
              justifyContent: 'center',
              width: '40%',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '500',
                lineHeight: 22,
                color: '#FFFFFF',
              }}>
              Decline
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 35,
              width: 35,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 17.5,
              backgroundColor: '#FFF',
              position: 'absolute',
              bottom: 15,
              left: '43.5%',
              alignSelf: 'center',
            }}>
            <Arrow />
          </View>
        </View>

        {isExpanded && (
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 10,
            }}>
            <Text
              style={{
                color: '#352C48',
                fontSize: 14,
                fontWeight: '700',
                lineHeight: 21,
              }}>
              Order Details:
            </Text>
            {item.order_details?.map(detail => (
              <View
                key={detail.id}
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 14, color: '#000', fontWeight: '600' }}>
                  {detail.dish_name} X {detail.quantity}
                </Text>

                <Text>-</Text>
                <View>
                  <Text
                    style={{ fontSize: 14, color: '#000', fontWeight: '600' }}>
                    Total : $ {detail.price_per_unit * detail.quantity}
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    (Price per unit: ${detail.price_per_unit})
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10 }}>
      {isLoading ? <Loading /> : null}

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

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.EDIT_PROFILE);
            }}>
            {getProfile?.useres_images ? (
              <Image
                source={{ uri: getProfile.useres_images }}
                style={{ height: 40, width: 40, borderRadius: 20 }}
                resizeMode="cover"
              />
            ) : (
              <Logo />
            )}
          </TouchableOpacity>
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
              renderItem={Order_List}
              keyExtractor={item => item.id}
              ListFooterComponent={<View style={{ height: hp(2) }} />}
              showsVerticalScrollIndicator={false} // Optional: hide horizontal scroll indicator
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
