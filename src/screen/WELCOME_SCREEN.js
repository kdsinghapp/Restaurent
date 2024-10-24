import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { navigation } from '../configs/constants';
import ScreenNameEnum from '../routes/screenName.enum';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_Profile } from '../redux/feature/featuresSlice';

export default function WELCOME_SCREEN() {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);
  const getProfile = useSelector(state => state.feature.getProfile);
  const isLogOut = useSelector(state => state.auth.isLogOut);
  const isLogin = useSelector(state => state.auth.isLogin);
const dispatch = useDispatch()
  const isFoucs = useIsFocused();
  console.log('================splash screen====================',getProfile?.restaurant_register);
  const checkLogout = () => {
    if ((!isLogOut && !isLogin) || (isLogOut && !isLogin)) {
      console.log('================Login====================');
      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
    }
    if (!isLogOut && isLogin) {
      if(getProfile?.restaurant_register){

        navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      }else{
        navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
      }
    }
  };
  useEffect(() => {
    const params = {
      token: user.token,
    };
    dispatch(get_Profile(params));
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