import { View, Text, Image, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, Alert, Linking, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'



import { useNavigation } from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

import { useDispatch, useSelector } from 'react-redux';
import { requestUserPermission } from './FeaturesScreen/NotificationComponent';
import Loading from '../../configs/Loader';
import ScreenNameEnum from '../../routes/screenName.enum';
import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { update_profile } from '../../redux/feature/featuresSlice';

export default function AskLocation() {
  const user = useSelector(state => state.auth.userData);
  const isLoading = false
  const navigation = useNavigation()
  const dispatch = useDispatch();




  const requestLocationPermission = async () => {




    if (Platform.OS === 'ios') {
      const authStatus = await Geolocation.requestAuthorization('whenInUse');
      if (authStatus === 'granted' || authStatus === 'whenInUse') {
        console.log('You can use the location', user?.restaurant_register);

        if (user?.restaurant_register) {
          navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
        } else {
          navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
        }

      } else {
        console.log('Location permission denied');
        // showSettingsAlert();
        if (user?.restaurant_register) {
          navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
        } else {
          navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
        }
      }
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show you directions.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          console.log('Location permission denied');

          if (user?.restaurant_register) {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          } else {
            navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
          }
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('Location permission denied with "Never Ask Again"');
          // showSettingsAlert();
          if (user?.restaurant_register) {
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
          } else {
            navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
          }
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };



  useEffect(() => {
    getToken()
  }, [user])

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM token=>>>>>>>>>>>>>>:', token);
      send_token(token)
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  const send_token = async (token) => {

    try {
      const formData = new FormData();
     // formData.append('user_id', user?.user_data.useres_id,);
     formData.append('user_id', user?.user_data?.useres_id);
      formData.append('device_token', token);


      const params = {

        data: formData,
        token: user?.token,
        msg: false,
        Notification: true
      };



      await dispatch(update_profile(params))
    }
    catch (err) {
      console.log('token ', err);
    }
  }



  return (

    <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#fff' }}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? <View style={{ height: 68 }} /> :
        <View style={{ height: 20 }} />}



      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={{
          fontWeight: '700',
          fontSize: 24,
          lineHeight: 36,
          color: '#000'
        }}>What is Your Location?</Text>
        <Text style={{
          fontWeight: '400',
          fontSize: 16,
          lineHeight: 24,
          color: '#9DB2BF'
        }}>
          "Love Eats Driver" uses your location data to provide personalized restaurant recommendations and special promotions, even when the app is closed. This helps us deliver tailored offers and show nearby restaurants that match your preferences

        </Text>

      </View>
      <View style={{ height: hp(56), alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../assets/croping/Location3x.png')}
          resizeMode='contain'
          style={{ height: '80%', width: '80%' }} />
      </View>
      <TouchableOpacity

        onPress={() => {
          requestLocationPermission()

        }}
        style={[styles.tabBtn, { position: 'absolute', bottom: 30 }]}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 17,
            color: '#FFFFFF',
            lineHeight: 25.5,
            marginLeft: 10,
          }}>
          Continue
        </Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  tabBtn: {
    height: 60,

    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 60,
    marginTop: 25,

    width: '100%',

    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 1,
    backgroundColor: '#352C48',
  },
})