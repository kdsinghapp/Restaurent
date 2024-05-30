import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { navigation } from '../configs/constants';
import ScreenNameEnum from '../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

export default function WELCOME_SCREEN() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    }, 3000);
  }, []);
  return (
    <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}} >
      <Image   
      
    source={require('../assets/croping/Logo3x.png')}
    style={{height:200,width:200}}

    resizeMode='contain'
      />

    </View>
  )
}