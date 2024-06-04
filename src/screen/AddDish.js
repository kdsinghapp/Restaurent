import React, { useState, useEffect } from 'react';
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
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import ProfileHeader from './FeaturesScreen/ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { add_restaurant_dish, update_restaurant_dish } from '../redux/feature/featuresSlice';
import Loading from '../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorToast } from '../configs/customToast';

export default function AddDish() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null); // State to hold the selected image
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishOffer, setDishOffer] = useState('');
  const [prepareTime, setPrepareTime] = useState('');
  const [description, setDescription] = useState('');

  const isLoading = useSelector(state => state.feature.isLoading);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  

  console.log('====================================');
  console.log(user.user_data?.restaurant_id);
  console.log('====================================');
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera or storage permission denied');
        
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openImageLibrary = async () => {
    const cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    const storagePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    const readPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    // if (cameraPermission && storagePermission && readPermission) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then((image) => {
        setImage(image);
      }).catch((err) => {
        console.log('ImagePicker error:', err);
      });
    // } else {
    //   requestPermissions();
    // }
  };

  const isDishNameValid = dishName.trim() !== '';

  const Add_Dish = async () => {

    try{
    const params = {
      restaurant_dish_restaurant_id:user.user_data?.restaurant_id,
      restaurant_dish_name: dishName,
      restaurant_dish_price: dishPrice,
      restaurant_dish_offer: dishOffer,
      restaurant_dish_preapare_time: prepareTime,
      restaurant_dish_description: description,
      restaurant_dish_image: {
        uri: Platform.OS === 'android' ? image?.path : image?.path?.replace("file://", ""),
        type: image?.mime,
        name: `${Date.now()}.png`
      },
      navigation: navigation,
    };

    dispatch(add_restaurant_dish(params)).then(res=>{
      get_Mydishes();
    })
  }
  catch(err){
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={styles.iosMargin} />
      ) : (
        <View style={styles.androidMargin} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name={'Add Dish'} Dwidth={'25%'} />
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadButton}>
          {image ? (
            <Image
              source={{ uri: image.path }}
              style={styles.uploadImage}
              resizeMode='contain'
            />
          ) : (
            <>
              <Image
                source={require('../assets/croping/Upload3x.png')}
                style={[styles.uploadImage, { height: 60, width: 60 }]}
              />
              <View style={styles.uploadTextContainer}>
                <Text style={styles.uploadText}>
                  Add Photos
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <View style={[styles.inputContainer, !isDishNameValid && styles.invalidInput]}>
          <TextInput
            placeholder="Dish Name"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Dish Price"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishPrice(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Dish Offer"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishOffer(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Prepare Time (in minutes)"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setPrepareTime(text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Description"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (isDishNameValid) {
              Add_Dish();
            } else {
         errorToast('Please fill in all required fields.');
            }
          }}
          style={[styles.tabBtn, { marginTop: hp(5) }]}>
          <Text style={styles.nextButtonText}>
            Add Dish
          </Text>
        </TouchableOpacity>

        <View style={{height:20}} />
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
  iosMargin: {
    height: 68,
  },
  androidMargin: {
    height: 5,
  },
  uploadButton: {
    backgroundColor: '#F7F8F8',
    height: hp(20),
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadImage: {
    height: '90%',
    width: '90%',
    borderRadius: 15,
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
  inputContainer: {
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    height: 66,
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ADA4A5',
  },
  input: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  invalidInput: {
    borderColor: 'red', // Red border color for invalid input
  },
  tabBtn: {
    backgroundColor: '#007AFF',
    height: 50,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 25.5,
    marginLeft: 10,
  },
});
