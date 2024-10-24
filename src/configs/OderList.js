import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Arrow from '../assets/sgv/2arrow.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { change_order_status, get_order_data_by_id } from '../redux/feature/featuresSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { errorToast } from './customToast';
const Order_List = ({ item }) => {
  const initialPrepTime = parseInt(item.order_preapare_time?.substring(0, 2)) || 0;
  const [prepTime, setPrepTime] = useState(initialPrepTime);
  const [isExpanded, setIsExpanded] = useState(true);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch()

  const [Loading, setLoading] = useState(false)
  const [type, setType] = useState(false)
  const GetoderID = async timestamp => {
    // Extracting components from the timestamp
    const [date, time] = timestamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');

    // Creating the order ID
    const orderId = `${year}${month}${day}${hour}${minute}${second}`;
    return orderId;
  };
  const navigation = useNavigation()
  useEffect(() => {
    setPrepTime(initialPrepTime);
  }, [initialPrepTime]);

  const incrementPrepTime = () => {
    setPrepTime(prepTime + 5);
  };

  const decrementPrepTime = () => {
    if (prepTime > 0) {
      setPrepTime(prepTime - 5);
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

  const OderStatus = async (item, status) => {
    setType(status)
    if (prepTime == 0 && status == 'Accepted') {
      setLoading(false)
      return errorToast("Please Enter Preparing Time")
    }

    setLoading(true)
    try {
      const params = {
        order_id: item.resord_id,
        status: status,
        token: user?.token,
        order_preapare_time: prepTime,
        navigation: navigation
      };


      dispatch(change_order_status(params)).then(res => {
        get_order();
        setLoading(false)
      });
    } catch (err) {
      console.log('=================params===================', err);
      setLoading(false)
    }
  };

  const formatTime = (dateTimeString) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(dateTimeString);

    // Get day of the week, month, and year
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Convert hours to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${dayOfWeek} ${month} ${date.getDate()}, ${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <View
      style={[

        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          borderRadius: 10,
          marginTop: 20,
          backgroundColor: '#FFF',
          marginHorizontal: 5,
          padding: 10,
        },
      ]}


    >
      <Text style={{ fontSize: 12, fontWeight: '500', color: '#777777', alignSelf: 'flex-end' }}>
        {formatTime(item.created_at)}
      </Text>
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
            source={{ uri: item.user_data.images }}
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
            {item.user_data.full_name}
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
              borderColor: item.payment_status == 'paid' ? '#15BE77' : '#bf3d3d',
              borderRadius: 5,
              marginLeft: 5,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: item.payment_status == 'paid' ? '#15BE77' : '#bf3d3d',
                fontWeight: '600',
                fontSize: 14,
              }}>
              {item.payment_status}
            </Text>
          </View>
        </View>
      </View>
      {item.instruction && <View
        style={{
          paddingHorizontal: 15,
          height: hp(5),
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#777777', fontWeight: '600', fontSize: 14 }}>
            Instruction :- {item.instruction}
          </Text>

        </View>
      </View>}
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
            onPress={decrementPrepTime}
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
            onPress={incrementPrepTime}
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
            setLoading(true)
          }}
          style={{
            backgroundColor: '#15BE77',
            alignItems: 'center',
            height: 45,
            borderRadius: 30,
            justifyContent: 'center',
            width: '40%',
          }}>
          {Loading && type == 'Accepted' ? <ActivityIndicator size={20} color={'#e9595a'} /> : <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              lineHeight: 22,
              color: '#FFFFFF',
            }}>
            Accept
          </Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            OderStatus(item, 'Cancel');
            setLoading(true)
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
          {Loading && type == 'Cancel' ? <ActivityIndicator size={20} color={'#e9595a'} /> : <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              lineHeight: 22,
              color: '#FFFFFF',
            }}>
            Decline
          </Text>
          }
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
                <Text style={{ fontSize: 14, color: '#000', fontWeight: '600' }}>
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

export default Order_List;
