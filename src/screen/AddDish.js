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
import { Food_categories, add_restaurant_dish, get_restaurant_dish } from '../redux/feature/featuresSlice';
import Loading from '../configs/Loader';
import { errorToast } from '../configs/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';

export default function AddDish() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null); // State to hold the selected image
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishOffer, setDishOffer] = useState('');
  const [prepareTime, setPrepareTime] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null); // State to hold the selected category

  const isLoading = useSelector(state => state.feature.isLoading);
  const FoodCategory = useSelector(state => state.feature.FoodCategory);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    Get_Category();
  }, [user]);

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

  useEffect(() => {
    requestPermissions();
  }, []);

  const openImageLibrary = async () => {
    const cameraPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    const storagePermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    const readPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image);
    }).catch((err) => {
      console.log('ImagePicker error:', err);
    });
  };

  const isDishNameValid = dishName.trim() !== '';
  const get_Mydishes = async () => {
    const params = {
      user_id: user.user_data?.restaurant_id,
    };
    await dispatch(get_restaurant_dish(params));
  };

  const Add_Dish = async () => {
    try {
      const params = {
        restaurant_dish_restaurant_id: user.user_data?.restaurant_id,
        restaurant_dish_name: dishName,
        restaurant_dish_price: dishPrice,
        restaurant_dish_offer: dishOffer,
        restaurant_dish_preapare_time: prepareTime,
        restaurant_dish_description: description,
        restaurant_dish_category:category,
        restaurant_dish_image: {
          uri: Platform.OS === 'android' ? image?.path : image?.path?.replace("file://", ""),
          type: image?.mime,
          name: `${Date.now()}.png`,
        },
        restaurant_dish_category_id: category,
        navigation: navigation,
      };

      dispatch(add_restaurant_dish(params)).then(res => {
        get_Mydishes();
      });
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  };

  const Get_Category = () => {
    const params = {
      token: user?.token,
    };
    dispatch(Food_categories(params));
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {Platform.OS === 'ios' ? (
        <View style={{ height:-20 }} />
        ) : (
          <View style={{ height: 0 }} />
          )}
          <ProfileHeader name={'Add Dish'} Dwidth={'25%'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.uploadButton}>
          {image ? (
            <Image
              source={{ uri: image.path }}
              style={styles.uploadImage}
 
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
        <Text style={{color:'#000',marginLeft:15,fontWeight:'600',fontSize:16,marginTop:10}}>Dish Category</Text>
  { FoodCategory &&    <View style={[styles.inputContainer, !isDishNameValid && styles.invalidInput]}>
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[styles.selectedTextStyle,{color:'#000'}]}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color:'#000',fontWeight:'500'}}
            iconStyle={styles.iconStyle}
            data={FoodCategory}
            maxHeight={300}
            labelField="rescat_name"
            valueField="rescat_id"
            placeholder="Select Category"
            value={category}
            onChange={item => setCategory(item.rescat_id)}
          />
        </View>
        }
             <Text style={{color:'#000',marginLeft:10,fontWeight:'600',fontSize:16,marginTop:10}}>Dish Name</Text>
        <View style={[styles.inputContainer, !isDishNameValid && styles.invalidInput]}>
          <TextInput
            placeholder="Dish Name"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishName(text)}
          />
        </View>
        <Text style={{color:'#000',marginLeft:15,fontWeight:'600',fontSize:16,marginTop:10}}>Dish Price</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Dish Price"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishPrice(text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={{color:'#000',marginLeft:15,fontWeight:'600',fontSize:16,marginTop:10}}>Dish Offer %</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Dish Offer"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishOffer(text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={{color:'#000',marginLeft:15,fontWeight:'600',fontSize:16,marginTop:10}}>Dish Prepare Time (in minutes)</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Prepare Time (in minutes)"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setPrepareTime(text)}
            keyboardType="numeric"
          />
        </View>
        <Text style={{color:'#000',marginLeft:15,fontWeight:'600',fontSize:16,marginTop:10}}>Dish Description</Text>
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
        <View style={{ height: 20 }} />
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
    height: hp(25),
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
    height:60,
    borderRadius: 40,
    justifyContent: 'center',
    marginTop:5,
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
  dropdown: {
    height: 50,
    borderColor: 'gray',
    color:'#000',
   
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#000'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  tabBtn: {

    height: 50,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    borderRadius: 30,
    backgroundColor: '#352C48',
  },
  nextButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 25.5,
    marginLeft: 10,
  },
});

