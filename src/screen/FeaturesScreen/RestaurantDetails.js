import React, { useState, useEffect, useCallback } from 'react';
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
  Alert,
  Linking,
} from 'react-native';
import Loading from '../../configs/Loader';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import Location from '../../assets/sgv/Location.svg';
import ProfileHeader from './ProfileHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import GooglePlacesInput from '../../configs/AutoAddress copy';

export default function RestaurantDetails() {
  const isLoading = useSelector(state => state.feature.isLoading);
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantLocation, setRestaurantLocation] = useState('select address');
  const [restaurantPhoto, setRestaurantPhoto] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [Location, setLocation] = useState(null)
  const navigation = useNavigation();
const isFocuse = useIsFocused()
  useEffect(() => {
    requestPermissions();
  }, [isFocuse,openImageLibrary]);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([

        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
      
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        
      }
      else{
  
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const openImageLibrary = async (setImage) => {
  //   const cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
  //   const storagePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  //   const readStoragePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

  //   if (cameraPermission && storagePermission &&readStoragePermission) {
  //     ImagePicker.openPicker({
  //       width: 1600,
  //       height: 900,
  //       cropping: true,
  //     })
  //       .then((image) => {
  //         setImage(image);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     requestPermissions();
  //   }
  // };
  const openImageLibrary = (setImage) => {


    ImagePicker.openPicker({
      width: 1600,
      height: 900,
      cropping: true,

      maxFiles: 1
    })
      .then(images => {
        setImage(images);



      })
      .catch(err => {
        console.log(err);
        errorToast('Please reselect image');
      });
  };

  const handleSelectLocation = useCallback(
    (details) => {
      const { lat, lng } = details.geometry.location;
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
  const handleNext = () => {
    const restaurantDetails = {
      res_name: restaurantName,
      res_address: restaurantLocation,
      res_latitude: Location?.latitude,
      res_longitude: Location?.longitude,
      res_certificate: {
        uri: Platform.OS === 'android' ? certificate?.path : certificate?.path?.replace('file://', ''),
        type: certificate?.mime,
        name: `${Date.now()}.png`,
      },
      res_image: {
        uri: Platform.OS === 'android' ? restaurantPhoto?.path : restaurantPhoto?.path?.replace('file://', ''),
        type: restaurantPhoto?.mime,
        name: `${Date.now()}.png`,
      },
    };

    navigation.navigate(ScreenNameEnum.ADD_RESTAURANT_DETAILS, { item: restaurantDetails });
    // Make the API call here with restaurantDetails
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={styles.iosHeader} />
      ) : (
        <View style={styles.androidHeader} />
      )}
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

          {/* <View style={{}}>
            <GooglePlacesInput  />
          
            </View> */}
          <TouchableOpacity
            style={styles.imageUploadContainer}
            onPress={() => openImageLibrary(setRestaurantPhoto)}>
            {restaurantPhoto ? (
              <Image
                source={{ uri: restaurantPhoto.path }}
                style={styles.image}
                resizeMode="contain"
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
                resizeMode="contain"
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
