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
import Star from '../../assets/sgv/star.svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {styles} from '../../configs/Styles';
import BlackPin from '../../assets/sgv/BlackPin2.svg';
import Edit from '../../assets/sgv/Edit.svg';
import {useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from './ProfileHeader';
import TextInputField from '../../configs/TextInputField';

export default function EditProfile() {
  const handleEmailText = () => {};
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 15}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <ProfileHeader name={'Edit Profile'} Dwidth={'33%'} />
      <View
        style={[
          styles.shadow,
          {
            alignSelf: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            height: 110,
            width: 110,
            borderRadius: 55,
            backgroundColor: '#FFF',
            justifyContent: 'center',
          },
        ]}>
        <Image
          source={require('../../assets/images/dp.jpeg')}
          style={{height: 90, width: 90, borderRadius: 45}}
        />

        <View style={{position: 'absolute', bottom: 5, right: 5}}>
          <Edit />
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#F7F8F8',
          paddingHorizontal: 15,
          height: 66,
          borderRadius: 40,
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <TextInput
          placeholder="Al Maaruf"
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
          placeholder="Mumbai - Nashik Expy, Latifwadi, ..."
          placeholderTextColor={'#ADA4A5'}
          style={{fontSize: 14, fontWeight: '400', color: '#000'}}
        />
        <BlackPin />
      </View>

      <View
        style={{
          backgroundColor: '#F7F8F8',
          paddingHorizontal: 15,
          height: hp(15),
          borderRadius: 10,

          marginTop: 30,
        }}>
        <TextInput
          multiline={true}
          placeholder="Al Maaruf"
          placeholderTextColor={'#ADA4A5'}
          style={{fontSize: 14, fontWeight: '400', color: '#000'}}
        />
      </View>
      <View
        style={{
          backgroundColor: '#F7F8F8',
          paddingHorizontal: 15,
          height: hp(15),
          borderRadius: 10,

          marginTop: 30,
        }}>
        <TextInput
          multiline={true}
          placeholder="Al Maaruf"
          placeholderTextColor={'#ADA4A5'}
          style={{fontSize: 14, fontWeight: '400', color: '#000'}}
        />
      </View>

      <TouchableOpacity style={styles.tabBtn}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 17,
            color: '#CBC3E3',
            lineHeight: 25.5,
            marginLeft: 10,
          }}>
          Save
        </Text>
      </TouchableOpacity>
<View style={{height:hp(5)}} />
      </ScrollView>
    </View>
  );
}
