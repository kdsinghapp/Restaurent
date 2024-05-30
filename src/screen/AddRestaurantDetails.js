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
import ProfileHeader from './FeaturesScreen/ProfileHeader';


export default function AddRestaurantDetails() {
  const isLoading = false;
  const navigation = useNavigation();

  const RenderItems = ({item}) => (
    <View
      style={[
        styles.shadow,
        {
          width: '30%',
          marginHorizontal:6,
          marginVertical:10,
          height: 38,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius:30,
          paddingHorizontal:10,
          backgroundColor: '#F7F8F8',
        },
      ]}>
      <Text style={{fontSize:12,fontWeight:'500',lineHeight:18,color:'#000'}}>{item.name}</Text>
     
    </View>
  );
  const RenderItems2 = ({item}) => (
    <View
      style={[
        styles.shadow,
        {
          width: '30%',
          marginHorizontal:6,
          marginVertical:10,
          height:45,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius:30,
          paddingHorizontal:10,
          backgroundColor: '#F7F8F8',
        },
      ]}>
      <Text style={{fontSize:12,fontWeight:'500',lineHeight:18,color:'#000'}}>{item.name}</Text>
      <Text style={{fontSize:12,fontWeight:'800',lineHeight:18,color:'#000'}}>{item.time}</Text>
     
    </View>
  );

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

        <View style={{marginTop: hp(2)}}>
          <View>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
                color: '#000000',
              }}>
              Weekly Close
            </Text>
          </View>
          <View style={{marginTop:20,alignItems:'center'}}>
          <FlatList
            data={Data}
            
            numColumns={3}
            
            renderItem={RenderItems}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scroll indicator
          />
          </View>
         
          <View style={{marginTop:20}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
                color: '#000000',
              }}>
             Open Timings
            </Text>
          </View>
          <View style={{marginTop:20,alignItems:'center'}}>
          <FlatList
            data={Data}
            
            numColumns={3}
            
            renderItem={RenderItems2}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scroll indicator
          />
          </View>
          <View style={{marginTop:20}}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
                color: '#000000',
              }}>
             Close Timings
            </Text>
          </View>
          <View style={{marginTop:20,alignItems:'center'}}>
          <FlatList
            data={Data}
            
            numColumns={3}
            
            renderItem={RenderItems2}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false} // Optional: hide horizontal scroll indicator
          />
          </View>
        </View>
   
        <TouchableOpacity
          onPress={() => {
             navigation.navigate(ScreenNameEnum.Add_DISH)
          }}
          style={styles.tabBtn}>
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
        <View  style={{height:hp(2)}} />
      </ScrollView>
    </View>
  );
}

const Data = [
  {
    id: '1',
    name: 'Monday',
    time:'9:30 AM'
  },
  {
    id: '2',
    name: 'Tuesday',
    time:'9:30 AM'
  },
  {
    id: '3',
    name: 'Wednesday',
    time:'9:30 AM'
  },
  {
    id: '4',
    name: 'Thursday',
    time:'9:30 AM'
  },
  {
    id: '5',
    name: 'Friday',
    time:'9:30 AM'
  },
  {
    id: '6',
    name: 'Saturday',
    time:'9:30 AM'
  },
  {
    id: '7',
    name: 'Sunday',
    time:'9:30 AM'
  },
];
