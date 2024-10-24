import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    TextInput,
    FlatList,
    StatusBar,
    SafeAreaView,
  } from 'react-native';
  import React from 'react';


  import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import {useNavigation} from '@react-navigation/native';

import Loading from '../../configs/Loader';
import ProfileHeader from './ProfileHeader';
import { styles } from '../../configs/Styles';
import ScreenNameEnum from '../../routes/screenName.enum';
  
  export default function AddDishBottomTab() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
      <StatusBar   backgroundColor={'#fff'} />
      <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#fff'}}>
        {false ? <Loading /> : null}
       
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
              source={require('../../assets/croping/Upload3x.png')}
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
  
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.MY_DISHES);
              }}
              style={[styles.tabBtn,{marginTop:15}]}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 17,
                  color: '#FFFFFF',
                  lineHeight: 25.5,
                  marginLeft: 10,
                }}>
               Upload
              </Text>
            </TouchableOpacity>
          </View>
          <View  style={{height:hp(3)}} />
        </ScrollView>
      </View>
      </SafeAreaView>
    );
  }
  