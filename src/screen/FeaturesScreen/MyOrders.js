import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { get_order_data_by_id } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function MyOrders() {
  const [status, setStatus] = useState('Pending');
  const OrderDetails = useSelector(state => state.feature.OrderDetails);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
console.log('====================================');
console.log(user);
console.log('====================================');
  useEffect(() => {
    get_order(status);
  }, [status]);

  const get_order = async (sts) => {
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

  console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>',OrderDetails);
  const TopRateRestaurant = ({ item }) => {
    const statusImage = item.status === 'Complete'
      ? require('../../assets/croping/Complete2x.png')
      : item.Status === 'Cancel'
        ? require('../../assets/croping/Close2x.png')
        : require('../../assets/croping/pending.png');

    const statusColor = item.status === 'Complete' ? '#00C366' : item.status === 'Cancel' ? '#F44336' : '#FFA500';
    const statusBackgroundColor = item.status === 'Complete'
      ? 'rgba(0, 195, 102, 0.2)'
      : item.status === 'Cancel'
        ? 'rgba(244, 67, 54, 0.2)'
        : 'rgba(255, 165, 0, 0.2)';

    const totalPrice = item.order_details.reduce((acc, curr) => acc + (curr.quantity * curr.price_per_unit), 0);

    return (
      <TouchableOpacity style={[styles.container, styles.shadow]}>
        <View style={{ flexDirection: 'row', alignItems: 'center',height:hp(10) }}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri:item.user_data?.useres_images}}
              style={{ height: '100%', width: '100%', borderRadius:100, borderColor: '#7756FC' }}
              resizeMode="cover"
            />
          </View>
          <View style={{ width: '88%', marginLeft: 10 ,justifyContent:'center'}}>
            <Text style={{fontSize:12,fontWeight:'500'}}>Order ID-{item.resord_id}</Text>
            <Text style={styles.nameText}>{item.user_data?.useres_full_name}</Text>
            <Text style={{fontSize:12,color:'#777777'}}>{item.user_data?.useres_email}</Text>
           
          </View>
        </View>
        <View style={{ marginTop: 20, backgroundColor: statusBackgroundColor, flexDirection: 'row', borderRadius: 5, height: 34, alignItems: 'center', paddingHorizontal: 10 }}>
          <Image source={statusImage} style={{ height: 20, width: 20 }} />
          <Text style={{ color: statusColor, marginLeft: 10, fontSize: 12, lineHeight: 10, fontWeight: '500' }}>{item.status == 'Complete'&&'Yeay, you have completed it!'}
          
          {item.status == 'Cancel'&&'You canceled this booking!'}
          {item.status == 'Pending'&&'Your booking is pending!'}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.detailsText}>Order Details:</Text>
          {item.order_details.map((dish, index) => (
            <View key={index} style={styles.detailsRow}>
              <Text style={{ ...styles.totalPriceText, ...{ fontSize: 14, color: '#000', fontWeight: '500' } }}>{dish.dish_name} x {dish.quantity}</Text>
              <View>
              <Text style={{ ...styles.totalPriceText, ...{ fontSize: 14, color: '#000', fontWeight: '500' } }}>Total:- ${(dish.quantity * dish.price_per_unit).toFixed(2)}</Text>
              <Text style={{ ...styles.totalPriceText, ...{ fontSize: 10, color: '#000', fontWeight: '500' } }}>(Price per unit :- ${(dish.price_per_unit).toFixed(2)})</Text>
            </View>
            </View>
          ))}
          <View style={styles.detailsRow}>
            <Text style={styles.totalPriceText}>Total:</Text>
            <Text>-</Text>
            <Text style={styles.totalPriceText,{color:'#000',fontWeight:'600'}}>${totalPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingHorizontal: 15, flex: 1, backgroundColor: '#FFFFFF' }}>
      {isLoading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 20, lineHeight: 30, color: '#000' }}>
            My Order
          </Text>
        </View>
        <View style={{ height: hp(10), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            disabled={status === 'Pending'}
            onPress={() => setStatus('Pending')}
            style={{ backgroundColor: status === 'Pending' ? '#7756FC' : '#FFF', borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: wp('28%'), height: 47 }}
          >
            <Text style={{ fontSize: 18, lineHeight: 27, fontWeight: '500', color: status === 'Pending' ? '#FFFFFF' : '#352C48' }}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={status === 'Complete'}
            onPress={() => setStatus('Complete')}
            style={{ backgroundColor: status === 'Complete' ? '#7756FC' : '#FFF', borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: wp('28%'), height: 47 }}
          >
            <Text style={{ fontSize: 18, lineHeight: 27, fontWeight: '500', color: status === 'Complete' ? '#FFFFFF' : '#352C48' }}>
              Complete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={status === 'Cancel'}
            onPress={() => setStatus('Cancel')}
            style={{ backgroundColor: status === 'Cancel' ? '#7756FC' : '#FFF', borderRadius: 30, alignItems: 'center', justifyContent: 'center', width: wp('28%'), height: 47 }}
          >
            <Text style={{ fontSize: 18, lineHeight: 27, fontWeight: '500', color: status === 'Cancel' ? '#FFFFFF' : '#352C48' }}>
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
  shadow:{
    padding:20,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  imageContainer: {
    height:60,
    width:60,

    alignItems:'flex-end'
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
