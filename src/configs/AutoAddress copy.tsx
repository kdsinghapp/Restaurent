import React, { useEffect } from 'react';
import { Alert, Linking, PermissionsAndroid, Platform, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
                showSettingsAlert()
            }
        } catch (err) {
            console.warn(err);
        }
    }
};


const showSettingsAlert = () => {
    Alert.alert(
        'Permission Required',
        'Location permission is required to use this feature. Please enable it in the app settings.',
        [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Open Settings',
                onPress: () => {
                    // Open the app settings
                    if (Platform.OS === 'ios') {
                        Linking.openURL('app-settings:');
                    } else {
                        // For Android, use the package name to open settings
                        Linking.openSettings();
                    }
                }
            }
        ],
        { cancelable: false }
    );
};
const GooglePlacesInput = ({ placeholder, onPlaceSelected }) => {
    useEffect(() => {
        requestLocationPermission();
    }, []);

    return (
        <View style={{ borderRadius: 30, flexDirection: 'row', alignItems: 'center' }}>
            <GooglePlacesAutocomplete
                fetchDetails={true}
                placeholder={placeholder}
                onPress={(data, details = null) => {
                    if (details) {
                        try{
                       
                        
                        onPlaceSelected(details);
                        }
                        catch(err){
                            console.log('GooglePlacesAutocomplete=>>>>>',err);
                        }
                    }
                }}
                styles={{
                    description: {
                        fontWeight: 'bold',
                        color: 'black',
                        width: '90%',
                    },
                    container: {
             
                        marginTop: 10,
                        backgroundColor: '#fff'
                    },
                    textInput: {
                        paddingHorizontal:15,
                        fontSize: 14,
                        color: '#ADA4A5',
                        height: '100%',
                        width: '90%',
                        backgroundColor: '#F7F8F8',
                        paddingVertical:15,
                        borderRadius:30,
                    },
                }}
                textInputProps={{
                    placeholderTextColor: "#ADA4A5",
           
                }}
                query={{
                    key: process.env.GOOGLE_PLACES_API_KEY,
                    language: 'en',
                }}
                enablePoweredByContainer={false}
            />
        </View>
    );
};

export default GooglePlacesInput;
