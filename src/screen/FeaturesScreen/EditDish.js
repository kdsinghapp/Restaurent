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
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../configs/Loader';
import ProfileHeader from './ProfileHeader';
import { update_restaurant_dish } from '../../redux/feature/featuresSlice';

export default function EditDish() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const [image, setImage] = useState(item.restaurant_dish_image); // State to hold the selected image
  const [dishName, setDishName] = useState(item.restaurant_dish_name);
  const [dishPrice, setDishPrice] = useState(item.restaurant_dish_price);
  const [dishOffer, setDishOffer] = useState(item.restaurant_dish_offer);
  const [prepareTime, setPrepareTime] = useState(item.restaurant_dish_preapare_time);
  const [description, setDescription] = useState(item.restaurant_dish_description);

  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    setDishName(item.restaurant_dish_name);
    setDishPrice(item.restaurant_dish_price.toString());
    setDishOffer(item.restaurant_dish_offer.toString());
    setPrepareTime(item.restaurant_dish_preapare_time);
    setDescription(item.restaurant_dish_description);
    setImage({path:item.restaurant_dish_image});
  }, [item]);


  
  const openImageLibrary = () => {
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

  const isDishNameValid = dishName.trim() !== '';

  const Update_Dish = async () => {
    const id = await AsyncStorage.getItem('Restaurant');
    const res = JSON.parse(id);
    const params = {
       
      restaurant_dish_id: item.restaurant_dish_id,
      restaurant_dish_name: dishName,
      restaurant_dish_price: dishPrice,
      restaurant_dish_offer: dishOffer,
      restaurant_dish_preapare_time: prepareTime,
      restaurant_dish_description: description,
      restaurant_dish_image:image.uri?{
        uri: Platform.OS === 'android' ? image?.path : image?.path?.replace("file://", ""),
        type: image?.mime,
        name: `${Date.now()}.png`
      }: {
        uri:image.path,
        name: 'image.png',
        type: 'image/jpeg',
    },
      navigation: navigation,
    };

    dispatch(update_restaurant_dish(params));
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
        <ProfileHeader name={'Edit Dish'} Dwidth={'25%'} />
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
                source={require('../../assets/croping/Upload3x.png')}
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
            value={dishName}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Dish Price"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishPrice(text)}
            keyboardType="numeric"
            value={dishPrice}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Dish Offer"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDishOffer(text)}
            keyboardType="numeric"
            value={dishOffer}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Prepare Time (in minutes)"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setPrepareTime(text)}
            keyboardType="numeric"
            value={prepareTime}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Description"
            placeholderTextColor={'#ADA4A5'}
            style={styles.input}
            onChangeText={text => setDescription(text)}
            value={description}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (isDishNameValid) {
              Update_Dish();
            } else {
              alert('Please fill in all required fields.');
            }
          }}
          style={[styles.tabBtn, { marginTop: hp(5) }]}>
          <Text style={styles.nextButtonText}>
            Update Dish
          </Text>
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
    height:'90%',
    width:'90%',
    borderRadius:15
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
    alignSelf:'center',
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

  