import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import Loading from '../../configs/Loader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import Location from '../../assets/sgv/Location.svg';
import ProfileHeader from './ProfileHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { get_restaurant_details } from '../../redux/feature/featuresSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateRestaurantDetails() {
  const isLoading = useSelector(state => state.feature.isLoading);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('');
  const [restaurantPhoto, setRestaurantPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const restaurantDetails = useSelector(state => state.feature.ResturantDetails);
  const user = useSelector(state => state.auth.userData);

  useEffect(() => {
    get_MyRestaurant();
  }, []);



  const get_MyRestaurant = async () => {
    const id = await AsyncStorage.getItem('Restaurant');
    const res = JSON.parse(id);

    const params = {
      res_id: res.res_id,
     
    };
    await dispatch(get_restaurant_details(params));
    // Set restaurant details
    if (restaurantDetails) {
      setRestaurantName(restaurantDetails.res_name || '');
      setRestaurantLocation(restaurantDetails.res_address || '');
      setRestaurantPhoto({path:restaurantDetails.res_image || null});
      setCertificate({path:restaurantDetails.res_certificate || null});
    }
  };

  const openImageLibrary = (setImage) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image);
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleNext = () => {
    const updatedRestaurantDetails = {
      res_name: restaurantName,
      res_address: restaurantLocation,
      res_latitude: 22.12,
      res_longitude: 77.75,
      res_certificate: certificate.uri?{
        uri: Platform.OS === 'android' ? certificate?.path : certificate?.path?.replace("file://", ""),
        type: certificate?.mime,
        name: `${Date.now()}.png`
      }: {
        uri:certificate.path,
        name: 'image.png',
        type: 'image/jpeg',
    },
      res_image:restaurantPhoto.uri?{
        uri: Platform.OS === 'android' ? restaurantPhoto?.path : restaurantPhoto?.path?.replace("file://", ""),
        type: restaurantPhoto?.mime,
        name: `${Date.now()}.png`
      }: {
        uri:restaurantPhoto.path,
        name: 'image.png',
        type: 'image/jpeg',
    },
    };

    navigation.navigate(ScreenNameEnum.UpdateAddRestaurantDetails, { item: updatedRestaurantDetails ,restaurantDetails:restaurantDetails});
    // Make the API call here with updatedRestaurantDetails
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={styles.iosHeader} />
      ) : (
        <View style={styles.androidHeader} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name={'Restaurant Details'} Dwidth={'45%'} />

        <View style={styles.formContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Restaurant Name"
              placeholderTextColor={'#ADA4A5'}
              style={styles.textInput}
              value={restaurantName}
              onChangeText={setRestaurantName}
            />
          </View>
          <View style={styles.locationInputContainer}>
            <TextInput
              placeholder="Restaurant Location"
              placeholderTextColor={'#ADA4A5'}
              style={styles.textInput}
              value={restaurantLocation}
              onChangeText={setRestaurantLocation}
            />
            <Location />
          </View>

          <TouchableOpacity
            style={styles.imageUploadContainer}
            onPress={() => openImageLibrary(setRestaurantPhoto)}>
            {restaurantPhoto ? (
              <Image
                source={{ uri: restaurantPhoto.path }}
                style={styles.image}
                resizeMode='contain'
              />
            ) : (
              <>
                <Image
                  source={require('../../assets/croping/Upload3x.png')}
                  style={styles.uploadIcon}
                />
                <View style={styles.uploadTextContainer}>
                  <Text style={styles.uploadText}>Add Photos</Text>
                </View>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageUploadContainer}
            onPress={() => openImageLibrary(setCertificate)}>
            {certificate ? (
              <Image
                source={{ uri: certificate.path }}
                style={styles.image}
                resizeMode='contain'
              />
            ) : (
              <>
                <Image
                  source={require('../../assets/croping/Upload3x.png')}
                  style={styles.uploadIcon}
                />
                <View style={styles.uploadTextContainer}>
                  <Text style={styles.uploadText}>Add Certificate</Text>
                </View>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.tabBtn, { bottom: 10, marginTop: hp(10) }]}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
    marginTop: hp(5),
  },
  textInputContainer: {
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    height: 66,
    borderRadius: 40,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '400',
    width: '90%',
    color: '#000',
  },
  locationInputContainer: {
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 66,
    borderRadius: 40,
    alignItems: 'center',
  },
  imageUploadContainer: {
    backgroundColor: '#F7F8F8',
    height: hp(30),
    padding: 10,
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  uploadIcon: {
    height: 45,
    width: 45,
  },
  uploadTextContainer: {
    marginTop: 15,
  },
  uploadText: {
    color: '#949494',
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '600',
  },
  tabBtn: {
    backgroundColor: '#3498db',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 25.5,
    marginLeft: 10,
  },
});
