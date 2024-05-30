import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import React from 'react';
import Loading from '../../configs/Loader';
import {styles} from '../../configs/Styles';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';

import Location from '../../assets/sgv/Location.svg';
import ProfileHeader from './ProfileHeader';
export default function RestaurantDetails() {
  const isLoading = false;
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#fff'}}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={{height: 68}} />
      ) : (
        <View style={{height:5}} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name={'Restaurant Details'} Dwidth={'45%'} />

        <View style={{marginTop: hp(5)}}>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              height: 66,
              borderRadius: 40,
              justifyContent: 'center',
            }}>
            <TextInput
              placeholder="Restaurant Name"
              placeholderTextColor={'#ADA4A5'}
              style={{fontSize: 14, fontWeight: '400', color: '#000'}}
            />
          </View>
          <View
            style={{
              backgroundColor: '#F7F8F8',
              paddingHorizontal: 15,
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 66,
              borderRadius: 40,
              alignItems: 'center',
            }}>
            <View>
              <TextInput
                placeholder="Restaurant Location"
                placeholderTextColor={'#ADA4A5'}
                style={{fontSize: 14, fontWeight: '400', color: '#000'}}
              />
            </View>
            <View>
              <Location />
            </View>
          </View>

          <TouchableOpacity style={{ backgroundColor: '#F7F8F8',height:hp(20),marginTop:20,borderRadius:15,alignItems:'center',justifyContent:'center'}}>
<Image   source={require('../../assets/croping/Upload3x.png')} style={{height:45,width:45}} />
         <View style={{marginTop:15}}> 
       <Text style={{color:'#949494',fontSize:16,lineHeight:18,fontWeight:'600'}}>Add Photos</Text>   
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#F7F8F8',height:hp(20),marginTop:20,borderRadius:15,alignItems:'center',justifyContent:'center'}}>
<Image   source={require('../../assets/croping/Upload3x.png')} style={{height:45,width:45}} />
         <View style={{marginTop:15}}> 
       <Text style={{color:'#949494',fontSize:16,lineHeight:18,fontWeight:'600'}}>Add Certificate</Text>   
          </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
             navigation.navigate(ScreenNameEnum.ADD_RESTAURANT_DETAILS)
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
