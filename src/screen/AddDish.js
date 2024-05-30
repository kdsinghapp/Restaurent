import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  FlatList,
} from 'react-native';
import React from 'react';
import Loading from '../configs/Loader';
import {styles} from '../configs/Styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../routes/screenName.enum';
import ProfileHeader from './FeaturesScreen/ProfileHeader';

export default function AddDish() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#fff'}}>
      {false ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={{height: 68}} />
      ) : (
        <View style={{height:5}} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name={'Add Dish'} Dwidth={'25%'} />
        <TouchableOpacity
          style={{
            backgroundColor: '#F7F8F8',
            height: hp(20),
            marginTop: 20,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/croping/Upload3x.png')}
            style={{height: 45, width: 45}}
          />
          <View style={{marginTop: 15}}>
            <Text
              style={{
                color: '#949494',
                fontSize: 16,
                lineHeight: 18,
                fontWeight: '600',
              }}>
              Add Photos
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              height: 66,
              borderRadius: 40,

              justifyContent: 'center',
            }}>
            <TextInput
              placeholder="Dish Name"
              placeholderTextColor={'#ADA4A5'}
              style={{fontSize: 14, fontWeight: '400', color: '#000'}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              height: 66,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <TextInput
              placeholder="Dish Price"
              placeholderTextColor={'#ADA4A5'}
              style={{fontSize: 14, fontWeight: '400', color: '#000'}}
            />
            <Text
              style={{
                color: '#ADA4A5',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 18,
              }}>
              Optional
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              height: 66,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              flexDirection: 'row',
            }}>
            <TextInput
              placeholder="Dish Offer"
              placeholderTextColor={'#ADA4A5'}
              style={{fontSize: 14, fontWeight: '400', color: '#000'}}
            />
            <Text
              style={{
                color: '#ADA4A5',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 18,
              }}>
              Optional
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              height: 66,
              borderRadius: 40,
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <TextInput
              placeholder="Prepare Time"
              placeholderTextColor={'#ADA4A5'}
              style={{fontSize: 14, fontWeight: '400', color: '#000'}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              height: 66,
              borderRadius: 40,
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <TextInput
              placeholder="Add Description"
              placeholderTextColor={'#ADA4A5'}
              style={{fontSize: 14, fontWeight: '400', color: '#000'}}
            />
          </View>

   
         
        </View>
       

     
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.DISH_LIST);
            }}
            style={[styles.tabBtn,{position:'absolute',bottom:10}]}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 17,
                color: '#FFFFFF',
                lineHeight: 25.5,
                marginLeft: 10,
              }}>
              Next
            </Text>
          </TouchableOpacity>
    </View>
  );
}
