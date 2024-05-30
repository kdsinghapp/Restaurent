import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styles} from '../../configs/Styles';
import Star from '../../assets/sgv/star.svg';
import DarkStar from '../../assets/sgv/darkStar.svg';
import BlackPin from '../../assets/sgv/BlackPin.svg';
import PopularDishList from '../../configs/PopularDishList';
import RestaurantItemList from '../../configs/RestaurantItemList';
import ReviewList from '../../configs/ReviewList';
import { useNavigation } from '@react-navigation/native';

export default function DishInformation() {

    const navigation =useNavigation()
  const [showData, setShowData] = useState('Products');
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setShowData(item.name);
      }}
      style={[
        item.name === showData ? styles.shadow : '',
        {
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          backgroundColor: item.name === showData ? '#7756FC' : '#FFF',

          marginHorizontal: 10,

          height: 40,
          paddingHorizontal: 25,
          borderRadius: 30,
        },
      ]}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',

          lineHeight: 27,
          color: item.name === showData ? '#fff' : '#000',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const RenderContactDetails = ({item}) => (
    <View
      style={{
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        alignItems: 'center',
        marginVertical: 10,
        height: 60,
        flexDirection: 'row',
      }}>
      <View>
        <Image source={item.logo} style={{height: 60, width: 60}} />
      </View>
      <View style={{marginLeft: 10}}>
        <Text
          style={{
            color: '#7756FC',
            fontSize: 16,
            fontWeight: '700',
            lineHeight: 24,
          }}>
          {item.titile}
        </Text>
        <Text
          style={{
            color: '#666666',
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 18,
          }}>
          {item.Details}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/images/dish.jpeg')}
          style={{height: hp(30)}}>
          <View
            style={{
              height: hp(15),
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../../assets/croping/Back-Navs2x.png')}
                style={{height: 32, width: 32}}
              />
            </TouchableOpacity>
          </View>

          <View style={{height: hp(10), paddingHorizontal: 20}}>
            <Text
              style={{
                fontWeight: '700',
                lineHeight: 30,
                fontSize: 20,
                color: '#FFF',
              }}>
              Cheese Pizza
            </Text>

            <View
              style={{
                justifyContent: 'center',
                height: hp(5),
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  marginLeft: 10,
                  lineHeight: 18,
                  fontSize: 12,
                  color: '#FFF',
                }}>
                15 min 1.5km Free Delivery
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Star height={15} width={15} marginLeft={5} />
            <Star height={15} width={15} marginLeft={5} />
            <Star height={15} width={15} marginLeft={5} />
            <Star height={15} width={15} marginLeft={5} />
            <Star height={15} width={15} marginLeft={5} />

            <Text
              style={{
                fontSize: 12,
                lineHeight: 18,
                marginLeft: 10,
                fontWeight: '700',
                color: '#FFF',
              }}>
              5.0
            </Text>
          </View>
        </ImageBackground>

        <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 15}}>
          <View
            style={{
              height: hp(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 32,
                  lineHeight: 48,
                  fontWeight: '700',
                  color: '#E79B3F',
                }}>
                $20.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '25%',

                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/croping/IconMinus2x.png')}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
              <View>
                <Text style={{color:'#181818',fontSize:16,fontWeight:'500',lineHeight:18}}>1</Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/croping/IconPlus2x.png')}
                  style={{height: 28, width: 28}}
                />
              </TouchableOpacity>
            </View>
          </View>
        
       
            
              <View
                style={{
                  marginTop: 10,
                
                 
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#101010',
                    lineHeight: 27,
                  }}>
                 About
                </Text>
<Text style={{fontSize:12,lineHeight:18,fontWeight:'400',color:'#6A6A6A'}}>Lorem ipsum dolor sit amet consectetur. Ultricies nulla a montes facilisis diam eget. Odio nunc cras vestibulum lacinia auctor semper hendrerit. Egestas faucibus nisl integer varius eros cursus. Enim tortor a vitae pulvinar convallis ornare. Cursus pellentesque ut vel quam. Imperdiet.</Text>
             
              </View>
              <View
                style={{
                  marginTop: 10,
               
                
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#101010',
                    lineHeight: 27,
                  }}>
                  Popular Dishes
                </Text>

               
              </View>
              <View style={{height: hp(30)}}>
                <PopularDishList   showPlusIcon={false} />
              </View>
           
              <TouchableOpacity

onPress={()=>{
  navigation.navigate(ScreenNameEnum.LOCATION_SCREEN)
}}
  style={[styles.tabBtn,{marginTop:hp(11)}]}>
  <Text
    style={{
      fontWeight: '600',
      fontSize: 17,
      color: '#FFFFFF',
      lineHeight: 25.5,
      marginLeft: 10,
    }}>
  Add To Cart
  </Text>
</TouchableOpacity>
          <View style={{height: hp(20)}} />
        </View>
      </ScrollView>
    </View>
  );
}

const data = [
  {id: '1', name: 'Products', selected: true},
  {id: '2', name: 'Review'},
  {id: '3', name: 'Information'},
];

const ContactDetails = [
  {
    id: '1',
    titile: 'Location',
    Details: 'Alice Springs NT 0870, Australia',
    logo: require('../../assets/croping/Location_ContactDetails.png'),
  },
  {
    id: '2',
    titile: 'Contact',
    Details: '865478596321',
    logo: require('../../assets/croping/Contact2x.png'),
  },
  {
    id: '3',
    titile: 'Email',
    Details: 'hashim@gmail.com',
    logo: require('../../assets/croping/Mail2x.png'),
  },
];
