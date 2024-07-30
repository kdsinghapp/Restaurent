import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loading from '../configs/Loader';
import ProfileHeader from './FeaturesScreen/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { get_terms_conditions } from '../redux/feature/featuresSlice';
import { WebView } from 'react-native-webview';
export default function TermConditions() {
  const termsConditions = useSelector(state => state.feature?.TermsCondition);
  const isLoading = useSelector(state => state.feature.isLoading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocuss = useIsFocused();
  const user = useSelector(state => state.auth.userData);
  const params ={
    token:user.token
  }
    console.log(user.token);
  useEffect(() => {
    dispatch(get_terms_conditions(params));
  }, [isFocuss]);


  const generateHtmlContent = content => `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet">
    <style>
      body {

        font-size:36px;
        color: #000;
      }
    </style>
  </head>
  <body>
    ${content}
  </body>
  </html>
`;
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 15}}>
      {isLoading ? <Loading /> : null}
      <ProfileHeader name={'Terms and Conditions'} Dwidth={'55%'} />
     
        <View
          style={{
            height: hp(30),
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/croping/TermsAndConditions3x.png')}
            style={{height: '80%', width: '80%'}}
            resizeMode="contain"
          />
        </View>
        
        <View style={{flex:1}}>
    {termsConditions &&  <WebView 
          source={{ html: generateHtmlContent(termsConditions[0].tac_text)}} 
        />
    }
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    height: 60,
    marginHorizontal: '9%',
    position: 'absolute',
    width: '91%',
    alignSelf: 'center',
    bottom: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1D0B38',
  },
  txtInput: {
    flexDirection: 'row',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
