import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { update_restaurant_details } from '../../redux/feature/featuresSlice';
import ProfileHeader from './ProfileHeader';
import Loading from '../../configs/Loader';

export default function UpdateAddRestaurantDetails() {
  const route = useRoute();
  const { item , restaurantDetails} = route.params;
  const isLoading = useSelector(state => state.feature.isLoading);
  const user = useSelector(state => state.auth.userData);
  const navigation = useNavigation();
  const dispatch = useDispatch();

 

  const [selectedDays, setSelectedDays] = useState([]);
  const [openTimes, setOpenTimes] = useState({});
  const [closeTimes, setCloseTimes] = useState({});
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDayForTime, setSelectedDayForTime] = useState('');
  const [isSettingOpenTime, setIsSettingOpenTime] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [isEdit, setisEdit] = useState(true);

  useEffect(() => {
    if (restaurantDetails) {
      setSelectedDays(
        restaurantDetails.res_weekly_closed ? restaurantDetails.res_weekly_closed.split(',') : []
      );
      setOpenTimes({
        Monday: restaurantDetails.res_monday_open || '',
        Tuesday: restaurantDetails.res_tuesday_open || '',
        Wednesday: restaurantDetails.res_wednesday_open || '',
        Thursday: restaurantDetails.res_thursday_open || '',
        Friday: restaurantDetails.res_friday_open || '',
        Saturday: restaurantDetails.res_saturday_open || '',
        Sunday: restaurantDetails.res_sunday_open || ''
      });
      setCloseTimes({
        Monday: restaurantDetails.res_monday_close || '',
        Tuesday: restaurantDetails.res_tuesday_close || '',
        Wednesday: restaurantDetails.res_wednesday_close || '',
        Thursday: restaurantDetails.res_thursday_close || '',
        Friday: restaurantDetails.res_friday_close || '',
        Saturday: restaurantDetails.res_saturday_close || '',
        Sunday: restaurantDetails.res_sunday_close || ''
      });
    }
  }, [restaurantDetails]);

  const handleDayPress = day => {
    setSelectedDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day]
    );
  };

  const handleTimeConfirm = date => {
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Ensure the time is in 24-hour format
    });
    if (isSettingOpenTime) {
      setOpenTimes({ ...openTimes, [selectedDayForTime]: formattedTime });
    } else {
      setCloseTimes({ ...closeTimes, [selectedDayForTime]: formattedTime });
    }
    setDatePickerVisible(false);
  };

  const renderDayItem = ({ item }) => (
    <TouchableOpacity
disabled={isEdit}
      style={[
        styles.dayItem,
        selectedDays.includes(item.name) && styles.selectedDayItem,
      ]}
      onPress={() => handleDayPress(item.name)}>
      <Text style={styles.dayItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderTimeItem = ({ item }) => (
    <TouchableOpacity
    disabled={isEdit}
      style={[
        styles.timeItem,
        validationErrors[item.name + '_open'] && styles.errorBorder,
      ]}
      onPress={() => {
        setSelectedDayForTime(item.name);
        setIsSettingOpenTime(true);
        setDatePickerVisible(true);
      }}>
      <Text style={styles.timeItemText}>{item.name}</Text>
      <Text style={styles.timeItemTime}>
        {openTimes[item.name] || 'Set Time'}
      </Text>
    </TouchableOpacity>
  );

  const renderCloseTimeItem = ({ item }) => (
    <TouchableOpacity
    disabled={isEdit}
      style={[
        styles.timeItem,
        validationErrors[item.name + '_close'] && styles.errorBorder,
      ]}
      onPress={() => {
        setSelectedDayForTime(item.name);
        setIsSettingOpenTime(false);
        setDatePickerVisible(true);
      }}>
      <Text style={styles.timeItemText}>{item.name}</Text>
      <Text style={styles.timeItemTime}>
        {closeTimes[item.name] || 'Set Time'}
      </Text>
    </TouchableOpacity>
  );

  const handleNext = () => {
    const errors = {};
    const requiredFields = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    requiredFields.forEach(day => {
      if (!openTimes[day]) {
        errors[day + '_open'] = 'Open time is required';
      }
      if (!closeTimes[day]) {
        errors[day + '_close'] = 'Close time is required';
      }
    });

    if (selectedDays.length === 0) {
      errors.weeklyClosed = 'At least one day must be selected for closure';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
      const params = {
        res_id: restaurantDetails.res_id,
        res_name: item.res_name,
        res_address: item.res_address,
        res_latitude: item.res_latitude,
        res_longitude: item.res_longitude,
        res_image: item.res_image,
        res_certificate: item.res_certificate,
        res_weekly_closed: selectedDays.join(','),
        res_monday_open: openTimes.Monday,
        res_tuesday_open: openTimes.Tuesday,
        res_wednesday_open: openTimes.Wednesday,
        res_thursday_open: openTimes.Thursday,
        res_friday_open: openTimes.Friday,
        res_saturday_open: openTimes.Saturday,
        res_sunday_open: openTimes.Sunday,
        res_monday_close: closeTimes.Monday,
        res_tuesday_close: closeTimes.Tuesday,
        res_wednesday_close: closeTimes.Wednesday,
        res_thursday_close: closeTimes.Thursday,
        res_friday_close: closeTimes.Friday,
        res_saturday_close: closeTimes.Saturday,
        res_sunday_close: closeTimes.Sunday,
        res_users_restaurants_id: user?.user_data?.useres_id,
        navigation: navigation,
      };

     
      dispatch(update_restaurant_details(params));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
    <StatusBar   backgroundColor={'#fff'} />
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name={'Restaurant Details'} Dwidth={'45%'} />
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Weekly Close</Text>
          <View
            style={[
              styles.flatListContainer,
              validationErrors.weeklyClosed && styles.errorBorder,
            ]}>
            <FlatList
              data={Data}
              numColumns={3}
              renderItem={renderDayItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
            {validationErrors.weeklyClosed && (
              <Text style={styles.errorText}>{validationErrors.weeklyClosed}</Text>
            )}
          </View>

          <Text style={styles.sectionTitle}>Open Timings</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={Data}
              numColumns={3}
              renderItem={renderTimeItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={styles.sectionTitle}>Close Timings</Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={Data}
              numColumns={3}
              renderItem={renderCloseTimeItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

      {!isEdit &&  <TouchableOpacity onPress={handleNext} style={styles.tabBtn}>
          <Text style={styles.nextButtonText}>Save</Text>
        </TouchableOpacity>}
        <View style={{ height: hp(2) }} />
      </ScrollView>
      <DatePicker
        modal
        open={isDatePickerVisible}
        date={new Date()}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setDatePickerVisible(false)}
      />
    </View>
    </SafeAreaView>
  );
}

const Data = [
  { id: '1', name: 'Monday' },
  { id: '2', name: 'Tuesday' },
  { id: '3', name: 'Wednesday' },
  { id: '4', name: 'Thursday' },
  { id: '5', name: 'Friday' },
  { id: '6', name: 'Saturday' },
  { id: '7', name: 'Sunday' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  iosHeader: {
    height: 68,
  },
  androidHeader: {
    height: 5,
  },
  formContainer: {
    marginTop: hp(2),
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: '#000000',
  },
  flatListContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dayItem: {
    width: '30%',
    marginHorizontal: 6,
    marginVertical: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: '#F7F8F8',
  },
  selectedDayItem: {
    backgroundColor: 'red',
  },
  dayItemText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#000',
  },
  timeItem: {
    width: '30%',
    marginHorizontal: 6,
    marginVertical: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: '#F7F8F8',
  },
  timeItemText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#000',
  },
  timeItemTime: {
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 18,
    color: '#000',
  },
  tabBtn: {
    backgroundColor: '#3498db',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: hp(5),
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 25.5,
    marginLeft: 10,
  },
  errorBorder: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
