import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Star from '../../assets/sgv/star.svg';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import {styles} from '../../configs/Styles';
  import Pin from '../../assets/sgv/Pin.svg';
  import Edit from '../../assets/sgv/Edit.svg';
  import { useNavigation } from '@react-navigation/native';
  import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from './ProfileHeader';
import TextInputField from '../../configs/TextInputField';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
  
export default function ChangePassword() {

    const handleEmailText =()=>{

    }
  return (
    <View style={{flex:1,backgroundColor:'#FFF',paddingHorizontal:15}}>

    <ProfileHeader  name={'Change Password'} Dwidth={'40%'} />
      <View style={{marginTop:20}}>
      <TextInputField 
         hide={true}
        onChangeText={handleEmailText}
    isFocus={true}  name={'Current Password'} placeholder={'Current Password'} firstLogo={false} showEye={true} txtColor={'#7756FC'}/> 
      </View>
      <View style={{marginTop:10}}>
      <TextInputField 
         hide={true}
        onChangeText={handleEmailText}
    isFocus={true}  name={'New Password'} placeholder={'Current Password'} firstLogo={false} showEye={true} txtColor={'#7756FC'}/> 
      </View>
      <View style={{marginTop:10}}>
      <TextInputField 
        hide={true}
        onChangeText={handleEmailText}
    isFocus={true}  name={'Confirme Password'} placeholder={'Confirme Password'} firstLogo={false} showEye={true} txtColor={'#7756FC'}/> 
      </View>
     
      <TouchableOpacity

    
        style={[styles.tabBtn,{position:'absolute',bottom:10}]}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 17,
            color: '#FFF',
            lineHeight: 25.5,
            marginLeft: 10,
          }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  )
}