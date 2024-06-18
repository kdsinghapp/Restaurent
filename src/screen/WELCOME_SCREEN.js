import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { navigation } from '../configs/constants';
import ScreenNameEnum from '../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function WELCOME_SCREEN() {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);
  const isLogOut = useSelector(state => state.auth.isLogOut);
  const isLogin = useSelector(state => state.auth.isLogin);

  const isFoucs = useIsFocused();
  console.log('================splash screen====================');
  const checkLogout = () => {
    if ((!isLogOut && !isLogin) || (isLogOut && !isLogin)) {
      console.log('================Login====================');
      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
    }
    if (!isLogOut && isLogin) {
      if(user?.restaurant_register){

        navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      }else{
        navigation.navigate(ScreenNameEnum.ADD_RESTAURANT_DETAILS);
      }
    }
  };
  useEffect(() => {
    checkLogout();
  }, [isFoucs, isLogOut]);

  return (
    <View style={{flex:1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}} >
      <Image   
      
    source={require('../assets/croping/appLogo.png')}
    style={{height:200,width:200}}

    resizeMode='contain'
      />

    </View>
  )
}