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

  import DishListComponent from '../configs/DishListComponent';
  import ProfileHeader from './FeaturesScreen/ProfileHeader';
  
  export default function DishList() {
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
          <ProfileHeader name={'Dishes'} Dwidth={'25%'} />
        
          <View style={{marginTop: 20,height:hp(77),backgroundColor:'#FFF'}}>
          <DishListComponent />
         
           
  
          
           
          </View>
          </ScrollView>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
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
                 Go Home
              </Text>
            </TouchableOpacity>
     
      </View>
    );
  }
  