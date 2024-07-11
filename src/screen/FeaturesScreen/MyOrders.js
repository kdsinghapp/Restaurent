import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { get_order_data_by_id } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from './ProfileHeader';

export default function MyOrders() {
  const [status, setStatus] = useState('Accepted');
  const OrderDetails = useSelector(state => state.feature.OrderDetails);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedIndex, setIsExpandedIndex] = useState(null);

  useEffect(() => {
    get_order(status);
  }, [status]);

  const get_order = async sts => {
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


  const TopRateRestaurant = ({ item, index }) => {

    const isExpand = isExpanded && isExpandedIndex === index
    const statusImage =
      item.status === 'Complete'
        ? require('../../assets/croping/Complete2x.png')
        : item.status === 'Cancel'
          ? require('../../assets/croping/Close2x.png')
          : require('../../assets/croping/pending.png');

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
        <View style={{ width: '88%', justifyContent: 'center', }}>
          <Text style={{ fontSize: 12, fontWeight: '500' }}>
            Order ID- {item.resord_id}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '500' }}>
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
              {item.total_price.toFixed(2)}
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
              {item.status === 'Accepted' && 'this order is Accepted!'}

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
                        (Price per unit: {dish.price_per_unit.toFixed(2)})
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
                {item.status === 'Accepted' && 'this order is Accepted!'}


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
                {item.tax_amount}.00
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
                {item.delivery_charge}.00
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
                {item.sub_total}.00
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
                {item.total_price.toFixed(2)}
              </Text>
            </View>


          </View>
          {/* {item.status === 'Accepted' && isExpand && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 60, // adjust as per your requirements
                marginTop: 20,
              }}
            >
              <Image
                source={require('../../assets/croping/Call3x.png')}
                style={{ height: 60, width: 60 }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(ScreenNameEnum.TRACK_ORDER);
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
          )} */}
        </>
        )}

        {item.delivery_status !== 'Pending' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 60, // adjust as per your requirements
              marginTop: 20,
            }}
          >
            <Image
              source={require('../../assets/croping/Call3x.png')}
              style={{ height: 60, width: 60 }}
            />
            <TouchableOpacity
              onPress={() => {

                if(item.delivery_status == 'Pickuped'){

                  navigation.navigate(ScreenNameEnum.TrackResToUser, { OrderId:item.resord_id });
              
              }
              else{
                navigation.navigate(ScreenNameEnum.TRACK_ORDER, { OrderId:item.resord_id });
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingHorizontal: 15, flex: 1, backgroundColor: '#FFFFFF' }}>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
      <ProfileHeader name={'My Orders'} />
        <View
          style={{
            height: hp(10),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            disabled={status === 'Accepted'}
            onPress={() => setStatus('Accepted')}
            style={{
              backgroundColor: status === 'Accepted' ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('28%'),
              height: 47,
            }}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 27,
                fontWeight: '500',
                color: status === 'Accepted' ? '#FFFFFF' : '#352C48',
              }}>
              Accepted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={status === 'Complete'}
            onPress={() => setStatus('Complete')}
            style={{
              backgroundColor: status === 'Complete' ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('28%'),
              height: 47,
            }}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 27,
                fontWeight: '500',
                color: status === 'Complete' ? '#FFFFFF' : '#352C48',
              }}>
              Complete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={status === 'Cancel'}
            onPress={() => setStatus('Cancel')}
            style={{
              backgroundColor: status === 'Cancel' ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('28%'),
              height: 47,
            }}>
            <Text
              style={{
                fontSize: 18,
                lineHeight: 27,
                fontWeight: '500',
                color: status === 'Cancel' ? '#FFFFFF' : '#352C48',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          {OrderDetails?.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ fontSize: 18, color: '#888' }}>Order not found</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={OrderDetails}
              renderItem={TopRateRestaurant}
              keyExtractor={item => item.id}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    width: '95%',
    padding: 15,
  },
  shadow: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    height: 60,
    width: 60,

    alignItems: 'flex-end',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: '#000000',
  },
  locationText: {
    color: '#9DB2BF',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    marginTop: 10,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginTop: 20,
    paddingVertical: 2,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#FFF',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalPriceText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
});
