import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import Star from '../../assets/sgv/star.svg';
import BlackPin from '../../assets/sgv/BlackPin2.svg';
import Edit from '../../assets/sgv/Edit.svg';
import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from './ProfileHeader';
import { get_Profile, update_profile } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import ImagePicker from 'react-native-image-crop-picker';
export default function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [Profile, setProfile] = useState('');

  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const getProfile = useSelector(state => state.feature.getProfile);
  const [profile, setprofile] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      token: user.token,
    };
    dispatch(get_Profile(params));
  }, [user]);

  useEffect(() => {
    if (getProfile) {
      setName(getProfile.useres_full_name || '');
      setEmail(getProfile.useres_email || '');
      setAddress(getProfile.useres_address || '');
      setMobile(getProfile.useres_mobile_number || '');
      setimageUrl(getProfile?.useres_images);
    }
  }, [getProfile]);
  const openImageLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setprofile(image);
        setimageUrl(image.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSave = () => {

    const data = new FormData();
    data.append('user_id', user?.user_data.useres_id,);
    data.append('useres_full_name', name);
    data.append('useres_email', email);
    data.append('useres_address', address);
    data.append('useres_mobile_number', mobile);
    data.append('useres_images', profile?.path
      ? {
        uri:
          Platform.OS === 'android'
            ? profile.path
            : profile?.path?.replace('file://', ''),
        type: profile.mime,
        name: `image${user?.user_data.useres_id}.png`,
      }
      : {
        uri: imageUrl,
        type: 'image/jpeg',
        name: `image${user?.user_data.useres_id}.png`,
      },);
    const params = {
      data: data,
      token: user?.token,
      Notification:false
    };
    dispatch(update_profile(params)).then(err => {
      const params = {
        token: user.token,
      };
      dispatch(get_Profile(params));
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader name={'Edit Profile'} Dwidth={'33%'} />
        <TouchableOpacity
          onPress={() => {
            openImageLibrary();
          }}
          style={[styles.profileImageContainer, { borderWidth: 2 }]}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          ) : (
            <Text style={{ fontSize: 20, color: '#000', fontWeight: '600' }}>
              {name[0]?.toUpperCase()}
            </Text>
          )}
          <View style={styles.editIcon}>
            <Edit />
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter name"
            placeholderTextColor={'#ADA4A5'}
            style={styles.textInput}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="Enter address..."
            placeholderTextColor={'#ADA4A5'}
            style={styles.textInput}
            value={address}
            onChangeText={setAddress}
          />
          <BlackPin />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter email"
            placeholderTextColor={'#ADA4A5'}
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter mobile"
            placeholderTextColor={'#ADA4A5'}
            style={styles.textInput}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleSave();
          }}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
  },
  profileImageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    ...StyleSheet.shadow, // Assuming styles.shadow is defined elsewhere
  },
  profileImage: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  inputContainer: {
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    height: 66,
    borderRadius: 40,
    justifyContent: 'center',
    marginTop: 30,
  },
  addressContainer: {
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    height: 66,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  saveButton: {
    height: 60,

    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 60,
    marginTop: 25,

    width: '100%',

    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,

    elevation: 1,
    backgroundColor: '#352C48',
  },
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
    color: '#CBC3E3',
    lineHeight: 25.5,
    marginLeft: 10,
  },
  bottomSpacing: {
    height: hp(5),
  },
});
