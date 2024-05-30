import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styles} from './Styles';
import Star from '../assets/sgv/star.svg';
import Plus from '../assets/sgv/Plus.svg';
import Clock from '../assets/sgv/Clock.svg';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';

export default function DishListComponent({...props}) {
  const navigation = useNavigation();
  const PopularDishes = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenNameEnum.DISH_INFORMATION);
      }}
      style={[
        styles.shadow,
        {
          padding: 10,
          borderRadius: 10,

          backgroundColor: '#FFFFFF',
          marginHorizontal: 10,
      
          marginVertical: 10,
          flexDirection: 'row',
        },
      ]}>
      <View>
        <Image
          source={item.img}
          style={{
            height: hp(15),
            width: hp(15),
            borderRadius: 15,

            borderColor: '#7756FC',
          }}
        />
      </View>

      <View style={{marginTop: 10, marginLeft: 15, width: '65%'}}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 30,
              color: '#000000',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              lineHeight: 30,
              color: '#E79B3F',
            }}>
            {item.Price}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#00C366',
           padding:5,
            marginTop: 5,
            width: '35%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              lineHeight: 18,
              fontWeight: '500',
            }}>
            {item.time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <FlatList
        data={PopularDish}
        renderItem={PopularDishes}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false} // Optional: hide horizontal scroll indicator
      />
    </View>
  );
}

const PopularDish = [
  {
    id: '1',
    name: 'Cheese Pizza',
    img: require('../assets/images/Image-25.png'),
    Price: '$20.00',
    time: '20 Minutes',
  },
  {
    id: '2',
    name: 'Veg Burger',
    img: require('../assets/images/Image-26.png'),
    Price: '$20.00',
    time: '20 Minutes',
  },
  {
    id: '3',
    name: 'Noddle`s',
    time: '20 Minutes',
    Price: '$20.00',
    img: require('../assets/images/Image-34.png'),
  },
  {
    id: '1',
    name: 'Cheese Pizza',
    img: require('../assets/images/Image-25.png'),
    Price: '$20.00',
    time: '20 Minutes',
  },
  {
    id: '2',
    name: 'Veg Burger',
    img: require('../assets/images/Image-26.png'),
    Price: '$20.00',
    time: '20 Minutes',
  },
  {
    id: '3',
    name: 'Noddle`s',
    time: '20 Minutes',
    Price: '$20.00',
    img: require('../assets/images/Image-34.png'),
  },
];
