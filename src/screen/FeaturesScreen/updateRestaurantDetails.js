import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import Loading from '../../configs/Loader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from './ProfileHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { get_restaurant_details } from '../../redux/feature/featuresSlice';

import Geolocation from '@react-native-community/geolocation';
import GooglePlacesInput from '../../configs/AutoAddress copy';

export default function UpdateRestaurantDetails() {
  const isLoading = useSelector(state => state.feature.isLoading);
  const restaurantDetails = useSelector(state => state.feature.ResturantDetails);
  const user = useSelector(state => state.auth.userData);

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('select address');
  const [restaurantPhoto, setRestaurantPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [Location, setLocation] = useState(null)
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      get_MyRestaurant();
    }
    requestLocationPermission();
  }, [user]);

  useEffect(() => {
    if (restaurantDetails) {
      setRestaurantName(restaurantDetails.res_name || '');
      setRestaurantLocation(restaurantDetails.res_address || '');
      setRestaurantPhoto({ path: restaurantDetails.res_image } || null);
      setCertificate({ path: restaurantDetails.res_certificate } || null);
    }
  }, [restaurantDetails]);

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Permission",
            message: "We would like to use your location to show nearby places.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the location");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      Geolocation.requestAuthorization();
    }
  }

  const get_MyRestaurant = async () => {
    const params = {
      res_id: user.user_data?.restaurant_id,
    };
    await dispatch(get_restaurant_details(params));
  };


  const openImageLibrary = (setImage) => {
    ImagePicker.openPicker({
      width: 1600,
      height: 900,
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
      res_latitude: Location?.latitude,
      res_longitude: Location?.longitude,
      res_certificate: certificate?.cropRect ? {
        uri: Platform.OS === 'android' ? certificate.path : certificate.path.replace("file://", ""),
        type: certificate.mime,
        name: `${Date.now()}.png`
      } : {
        uri: certificate.path,
        name: 'image.png',
        type: 'image/jpeg',
      },
      res_image: restaurantPhoto?.cropRect ? {
        uri: Platform.OS === 'android' ? restaurantPhoto.path : restaurantPhoto.path.replace("file://", ""),
        type: restaurantPhoto.mime,
        name: `${Date.now()}.png`
      } : {
        uri: restaurantPhoto.path,
        name: 'image.png',
        type: 'image/jpeg',
      },
    };

    navigation.navigate(ScreenNameEnum.UpdateAddRestaurantDetails, { item: updatedRestaurantDetails, restaurantDetails });
  };

  function formatAddress(addressData) {
    const components = addressData.address_components;
    const addressParts = [];

    components.forEach(component => {
      if (component.types.includes("premise")) {
        addressParts.push(component.long_name);
      } else if (component.types.includes("sublocality_level_1") || component.types.includes("sublocality")) {
        addressParts.push(component.long_name);
      } else if (component.types.includes("locality")) {
        addressParts.push(component.long_name);
      } else if (component.types.includes("administrative_area_level_1")) {
        addressParts.push(component.long_name);
      } else if (component.types.includes("country")) {
        addressParts.push(component.long_name);
      }
    });

    return addressParts.join(", ");
  }
  const handleSelectLocation = useCallback(
    (details) => {
        const { lat, lng } = details.geometry.location;
        console.log({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        setLocation({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
  
  
        const formattedAddress = formatAddress(details);
        console.log('details=>>>>>>>>>>>>>>>>>>>>>', formattedAddress);
        setRestaurantLocation(formattedAddress)
     
    },
    [navigation]
);
  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={styles.iosHeader} />
      ) : (
        <View style={styles.androidHeader} />
      )}
      {restaurantDetails && (<>
        <ProfileHeader name={'Restaurant Details'} Dwidth={'45%'} />
         <View >
         <GooglePlacesInput placeholder={restaurantLocation} onPlaceSelected={handleSelectLocation} />
       </View>
        <ScrollView showsVerticalScrollIndicator={false}>
         
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

          <View style={{ height: hp(10) }} />
        </ScrollView>
        </>
      )}
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
