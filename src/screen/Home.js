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
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../configs/Styles';
import {BottomTabView} from '@react-navigation/bottom-tabs';
import Arrow from '../assets/sgv/2arrow.svg';
export default function Home() {
  const navigation = useNavigation();
  const PopularDishes = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.DISH_INFORMATION);
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
        {item.count} Orders
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          lineHeight: 30,
          color: '#E79B3F',
        }}>
        {item.Price}
      </Text>
    </TouchableOpacity>
  );

  const Order_List = ({item}) => (
    <View
      style={[
        styles.shadow,
        {
       
          borderRadius: 10,
          marginTop: 20,
          backgroundColor: '#FFF',
          marginHorizontal: 5,
          padding:10,
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
            source={item.img}
            style={{height: 50, width: 50, borderRadius: 25}}
          />
        </View>
        <View style={{width: '65%'}}>
          <Text
            style={{
              color: '#9E9E9E',
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 18,
            }}>
            ID: {item.Orderid}
          </Text>
          <Text
            style={{
              color: '#352C48',
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 24,
            }}>
            {item.name}
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>1 x </Text>
          <Text
            style={{
              color: '#352C48',
              fontSize: 14,
              fontWeight: '700',
              lineHeight: 21,
            }}>
            {item.dish}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>2 x </Text>
          <Text
            style={{
              color: '#352C48',
              fontSize: 14,
              fontWeight: '700',
              lineHeight: 21,
            }}>
            {item.extraItem}
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
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 5,
            padding: 2,
            alignItems: 'center',
            backgroundColor: '#E7E8E5',
          }}>
          <Text
            style={{
              fontSize: 16,
              marginHorizontal: 5,
              fontWeight: '500',
              color: '#000',
            }}>
            +
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginHorizontal: 5,
              fontWeight: '500',
              color: '#000',
            }}>
            20 Mins
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginHorizontal: 5,
              fontWeight: '500',
              color: '#000',
            }}>
            -
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              color: '#7756FC',
              fontSize: 12,
              fontWeight: '700',

              lineHeight: 21,
            }}>
            This is Special Delivery
          </Text>
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
      </View>
      <View
        style={{
          height: 35,
          width: 35,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 17.5,
          backgroundColor: '#FFF',
          position: 'absolute',
          bottom: 20,
          left: '45.5%',
          alignSelf: 'center',
        }}>
        <Arrow />
      </View>
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10}}>
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
              Johan Smiths
            </Text>
          </View>

          <View>
            <Logo />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            paddingVertical: 30,
          }}>
          <FlatList
            data={PopularDish}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            renderItem={PopularDishes}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={{}}>
          <Text
            style={{
              fontSize:20,
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
          <FlatList
            data={OrderList}
            renderItem={Order_List}
            keyExtractor={item => item.id}
            ListFooterComponent={<View style={{height: hp(2)}} />}
            showsVerticalScrollIndicator={false} // Optional: hide horizontal scroll indicator
          />
        </View>
      </ScrollView>
    </View>
  );
}

const PopularDish = [
  {
    id: '1',
    name: 'Total',
    subtitile: 'Orders',

    count: '5245',
  },
  {
    id: '2',
    name: 'New',
    subtitile: 'Orders',

    count: '25',
  },
  {
    id: '3',
    name: 'Total ',
    subtitile: 'Revenue',

    count: '40',
  },
  {
    id: '4',
    name: 'Returning',
    subtitile: 'Customers',

    count: '10',
  },
];

const OrderList = [
  {
    Orderid: '546414 4002',
    name: 'Jaylon Lipshutz',
    subtitile: 'Orders',
    img: require('../assets/images/dp.jpeg'),

    price: '$149',
    dish: 'Butter Chicken',
    extraItem: 'Garlic Naan',
    count: '5245',
    time: '20',
  },
  {
    Orderid: '546414 4003',
    name: 'Jaylon Lipshutz',
    subtitile: 'Orders',
    img: require('../assets/images/dp.jpeg'),
    price: '$149',
    dish: 'Butter Chicken',
    extraItem: 'Garlic Naan',
    count: '5245',
    time: '20',
  },
];
