import React, {useEffect, useState} from 'react';
import {View, Text, Switch, FlatList, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import ProfileHeader from '../../configs/ProfileHeader';

interface User {
  id: string;
}

interface RootState {
  auth: {
    userData: User;
    Update_user: {
      booking_updates: 'ON' | 'OFF';
      tours_activities_attra: 'ON' | 'OFF';
      reviews: 'ON' | 'OFF';
    };
  };
}

interface NotificationItem {
  id: string;
  name: string;
  Details: string;
  key: keyof RootState['auth']['Update_user'];
}

const data: NotificationItem[] = [
  {
    id: '1',
    name: 'Booking updates',
    Details: 'Receive important messages and updates from your tour operator',
    key: 'booking_updates',
  },
  {
    id: '2',
    name: 'Reviews',
    Details: 'Receive important messages and updates from your tour operator',
    key: 'reviews',
  },
  {
    id: '3',
    name: 'Activities & Attractions',
    Details: 'Receive important messages and updates from your tour operator',
    key: 'tours_activities_attra',
  },
];

const Notification: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userData);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const getProfile = useSelector(state => state.feature.getProfile);


  const dispatch = useDispatch();

  useEffect(() => {
    get_userprofile();
  }, [user]);

  const get_userprofile = () => {
    const params = {
      user_id: user.id,
    };
    //dispatch(get_profile(params));
  };

  const [switchStates, setSwitchStates] = useState<{[key: string]: boolean}>(
    {},
  );

  useEffect(() => {
    setSwitchStates({
      booking_updates: getProfile?.booking_updates === '0',
      tours_activities_attra: getProfile?.tours_activities_attra === '0',
      reviews: getProfile?.reviews === '0',
    });
  }, [getProfile]);

  const toggleSwitch = (key: keyof RootState['auth']['Update_user']) => {
    setSwitchStates(prevStates => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));

    // Call the API to update notification settings
    updateNotificationSettings(key, !switchStates[key]);
  };
  const updateNotificationSettings = async (
    key: keyof RootState['auth']['Update_user'],
    newValue: boolean,
  ) => {
    const params = {
      user_id: user.id,
      [key]: newValue ? '0' : '1',
    };

   // dispatch((params));
  };
  const renderItem = ({item}: {item: NotificationItem}) => (
    <View style={styles.itemContainer}>
      {isLoading ? null : (
        <>
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>{item.Details}</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={switchStates[item.key] ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch(item.key)}
            value={!!switchStates[item.key]}
          />
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
     
      <ProfileHeader
      Dwidth={'35%'}
      name={'Notification'}/>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(12),
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 15,
    padding: 10,
  },
  itemTextContainer: {
    width: '70%',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    lineHeight: 24,
    color: '#000000',
    fontFamily: 'Federo-Regular',
  },
  itemDetails: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
    lineHeight: 18,
    color: '#777777',
    fontFamily: 'Federo-Regular',
  },
});

export default Notification;
