import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_order_data_by_id } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function MyOrders() {
  const [status, setStatus] = useState('Completed'); // 'Completed', 'Canceled', or 'Pending'
  const [chooseData, setChooseData] = useState([]);
  const OrderDetails = useSelector(state=>state.feature.OrderDetails)
  const user = useSelector(state=>state.auth.userData)
  const isLoading = useSelector(state=>state.feature.isLoading)
const dispatch = useDispatch()
  useEffect(() => {
    filterData();
    Get_order()
  }, [status]);

console.log('OrderDetails=>>>>>>',OrderDetails);


const Get_order =async()=>{
  const res = await AsyncStorage.getItem('Restaurant');
  const id = JSON.parse(res)

  const params ={
    restaurant_id:id.res_id,
    token:user?.token
    //status:status == 'Completed'?'Complete':status == 'Canceled'?'Cancel':'Pending'
  }
  dispatch(get_order_data_by_id(params))
}


  const filterData = () => {
    const filteredData = TopRestaurant.filter(item => item.Status === status);
    setChooseData(filteredData);
  };

  const TopRateRestaurant = ({ item }) => {
    const statusImage = item.Status === 'Completed'
      ? require('../../assets/croping/Completed2x.png')
      : item.Status === 'Canceled'
        ? require('../../assets/croping/Close2x.png')
        : require('../../assets/croping/pending.png');
  
    const statusColor = item.Status === 'Completed' ? '#00C366' : item.Status === 'Canceled' ? '#F44336' : '#FFA500';
    const statusBackgroundColor = item.Status === 'Completed'
      ? 'rgba(0, 195, 102, 0.2)'
      : item.Status === 'Canceled'
        ? 'rgba(244, 67, 54, 0.2)'
        : 'rgba(255, 165, 0, 0.2)';
  
    // Calculate total price
    const totalPrice = item.order_details.reduce((acc, curr) => acc + (curr.quantity * curr.price_per_unit), 0);
    return (
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
          }}
          style={[styles.container, styles.shadow]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.imageContainer}>
              <Image
                source={item.img}
                style={{ height: '100%', width: '100%', borderRadius: 15, borderColor: '#7756FC' }}
                resizeMode="contain"
              />
            </View>
  
            <View style={{ width: '58%', marginLeft: 10 }}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.locationText}>{item.location}</Text>
              <View style={[styles.statusContainer,{ backgroundColor: statusColor,}]}>
                <Text style={styles.statusText}>{item.Status}</Text>
              </View>
            </View>
          </View>
  
          <View style={{ marginTop: 20, backgroundColor: statusBackgroundColor, flexDirection: 'row', borderRadius: 5, height: 34, alignItems: 'center', paddingHorizontal: 10 }}>
            <Image source={statusImage} style={{ height: 20, width: 20 }} />
            <Text style={{ color: statusColor, marginLeft: 10, fontSize: 10, lineHeight: 10, fontWeight: '500' }}>{item.txt}</Text>
          </View>
  
          {/* Order Details */}
          <View style={{ marginTop: 10 }}>
            <Text style={styles.detailsText}>Order Details:</Text>
            {item.order_details.map((dish, index) => (
              <View key={index} style={styles.detailsRow}>
                <Text style={{ ...styles.totalPriceText, ...{ fontSize: 14, color: '#000', fontWeight: '500' } }}>{dish.dish_name} x {dish.quantity}</Text>
                <Text style={{ ...styles.totalPriceText, ...{ fontSize: 14, color: '#000', fontWeight: '500' } }}>${(dish.quantity * dish.price_per_unit).toFixed(2)}</Text>
              </View>
            ))}
            <View style={styles.detailsRow}>
              <Text style={styles.totalPriceText}>Total:</Text>
              <Text style={styles.totalPriceText}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
  

  return (
    <View style={{ paddingHorizontal: 15, flex: 1, backgroundColor: '#FFFFFF' }}>
      {isLoading?<Loading />:null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: '700', fontSize: 20, lineHeight: 30, color: '#000' }}>
            My Order
          </Text>
        </View>
        <View
          style={{
            height: hp(10),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
             <TouchableOpacity
            disabled={status === 'Pending'}
            onPress={() => setStatus('Pending')}
            style={{
              backgroundColor: status === 'Pending' ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('28%'),
              height: 47,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 27, fontWeight: '500', color: status === 'Pending' ? '#FFFFFF' : '#352C48' }}>
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={status === 'Completed'}
            onPress={() => setStatus('Completed')}
            style={{
              backgroundColor: status === 'Completed' ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('28%'),
              height: 47,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 27, fontWeight: '500', color: status === 'Completed' ? '#FFFFFF' : '#352C48' }}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={status === 'Canceled'}
            onPress={() => setStatus('Canceled')}
            style={{
              backgroundColor: status === 'Canceled' ? '#7756FC' : '#FFF',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('28%'),
              height: 47,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 27, fontWeight: '500', color: status === 'Canceled' ? '#FFFFFF' : '#352C48' }}>
              Canceled
            </Text>
          </TouchableOpacity>
         
        </View>

        <View style={{ marginTop: 20 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chooseData}
            renderItem={TopRateRestaurant}
            keyExtractor={item => item.id}
          />
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
    imageContainer: {
      height: 120,
      marginTop: 5,
      width: 120,
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
     // backgroundColor: statusColor,
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

const TopRestaurant = [
  {
    id: '1',
    name: 'Pizza',
    location: 'Indore',
    Status: 'Completed',
    txt: 'Yeay, you have completed it!',
    img: require('../../assets/images/Image-12.png'),
    order_details: [
        {
          "dish_name": "Chicken Biryani",
          "quantity": 2,
          "price_per_unit": 12.99
        },
        {
          "dish_name": "Mango Lassi",
          "quantity": 1,
          "price_per_unit": 3.50
        }
      ],
  },
  {
    id: '2',
    name: 'Hot Dog',
    location: 'Indore',
    Status: 'Canceled',
    txt: 'You canceled this hotel booking',
    img: require('../../assets/images/Image-16.png'),
    order_details: [
        {
          "dish_name": "Chicken Biryani",
          "quantity": 2,
          "price_per_unit": 12.99
        },
        {
          "dish_name": "Mango Lassi",
          "quantity": 1,
          "price_per_unit": 3.50
        }
      ],
  },
  {
    id: '3',
    name: 'Chicken Roosted',
    location: 'Indore',
    Status: 'Completed',
    txt: 'Yeay, you have completed it!',
    img: require('../../assets/images/Image-20.png'),
    order_details: [
        {
          "dish_name": "Chicken Biryani",
          "quantity": 2,
          "price_per_unit": 12.99
        },
        {
          "dish_name": "Mango Lassi",
          "quantity": 1,
          "price_per_unit": 3.50
        }
      ],
  },
  {
    id: '4',
    name: 'Burger',
    location: 'Indore',
    Status: 'Pending',
    txt: 'Your booking is pending',
    img: require('../../assets/images/Image-14.png'),
    order_details: [
        {
          "dish_name": "Chicken Biryani",
          "quantity": 2,
          "price_per_unit": 12.99
        },
        {
          "dish_name": "Mango Lassi",
          "quantity": 1,
          "price_per_unit": 3.50
        }
      ],
  },
  {
    id: '5',
    name: 'Pasta',
    location: 'Indore',
    Status: 'Pending',
    txt: 'Your booking is pending',
    img: require('../../assets/images/Image-18.png'),
    order_details: [
        {
          "dish_name": "Chicken Biryani",
          "quantity": 2,
          "price_per_unit": 12.99
        },
        {
          "dish_name": "Mango Lassi",
          "quantity": 1,
          "price_per_unit": 3.50
        }
      ],
  },
  {
    id: '6',
    name: 'Sandwich',
    location: 'Indore',
    Status: 'Canceled',
    txt: 'You canceled this hotel booking',
    img: require('../../assets/images/Image-22.png'),
    order_details: [
        {
          "dish_name": "Chicken Biryani",
          "quantity": 2,
          "price_per_unit": 12.99
        },
        {
          "dish_name": "Mango Lassi",
          "quantity": 1,
          "price_per_unit": 3.50
        }
      ],
  },
];
