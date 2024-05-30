import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Switch,
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
  import BlackEdit from '../../assets/sgv/BlackEdit.svg';
  import {useNavigation} from '@react-navigation/native';
  import ScreenNameEnum from '../../routes/screenName.enum';
  import ProfileHeader from './ProfileHeader';
  
export default function Notification() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    const renderItem = ({item}) => (
        <View
          style={[
           
            {
              marginVertical: 10,
              marginHorizontal: 5,
            
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: hp(12),
    borderBottomWidth:1,
    borderColor:'#E3E3E3',
              borderRadius: 15,
            },
          ]}>
       
          <View style={{width: '70%'}}>
            <Text
              style={{
                fontSize:16,
                fontWeight: '600',
                marginLeft: 10,
                lineHeight: 24,
                color: '#000000',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                marginLeft: 10,
                lineHeight: 18,
                color: '#777777',
              }}>
              {item.Details}
            </Text>
          </View>
    
          <View>
          <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
          </View>
        </View>
      );
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 15}}>
      <ProfileHeader name={'Notification'} Dwidth={'28%'} />

      <View style={{flex: 1, 
        marginTop:20,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false} // Optional: hide horizontal scroll indicator
        />
      </View>
    </View>
  )
}

const data = [
    {id: '1', name: 'Booking updates', Details: 'Receive important messages and updates from your tour operator',},
    {
      id: '2',
      name: 'Reviews',
      Details: 'Receive important messages and updates from your tour operator',
    },
    {
      id: '3',
      name: 'Activities & Attractions',
      Details: 'Receive important messages and updates from your tour operator',
    },
  ];