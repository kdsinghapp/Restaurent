
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../configs/Styles';
import {BottomTabView} from '@react-navigation/bottom-tabs';
import Arrow from '../../assets/sgv/2arrow.svg';
import ProfileHeader from './ProfileHeader';
import ScreenNameEnum from '../../routes/screenName.enum';
export default function OrdersDetails() {

  const navigation = useNavigation()
  const Order_List = ({item}) => (
    <View
      style={[
        styles.shadow,
        {
          height: hp(27),
          borderRadius: 10,
          marginTop: 20,
          backgroundColor: '#FFF',
          marginHorizontal: 5,
          padding: 5,
          marginBottom:hp(1)
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
          justifyContent: 'space-between',
          height: hp(8),
        }}>
       <View style={{}}>
    <Image  source={require('../../assets/croping/Call3x.png')} style={{height:80,width:80}}/>
  </View>
        <TouchableOpacity

        onPress={()=>{
          navigation.navigate(ScreenNameEnum.TRACK_ORDER)
        }}
          style={{
            backgroundColor: '#352C48',
            alignItems: 'center',
            height: 45,
            borderRadius: 30,
            marginLeft: -35,
            justifyContent: 'center',
            width: '80%',
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              lineHeight: 22,
              color: '#FFFFFF',
            }}>
          Track
          </Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
  return (

    <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
    <StatusBar   backgroundColor={'#fff'} />
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10}}>
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <ProfileHeader name={'Orders Details'} Dwidth={'35%'} />
      </View>
      <View
        style={{
          marginTop: hp(3),
          flex: 1,
        }}>
        <FlatList
          data={OrderList}
          renderItem={Order_List}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false} // Optional: hide horizontal scroll indicator
        />
      
      </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}

const OrderList = [
  {
    Orderid: '546414 4002',
    name: 'Jaylon Lipshutz',
    subtitile: 'Orders',
    img: require('../../assets/images/dp.jpeg'),

    price: '$149',
    dish: 'Butter Chicken',
    extraItem: 'Garlic Naan',
    count: '5245',
    time: '20',
  },
  
 
];