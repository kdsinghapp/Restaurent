import { View, Text, Image, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, Alert, Linking, StyleSheet, SafeAreaView, StatusBar, BackHandler } from 'react-native'
import React, { useEffect } from 'react'



import { useNavigation } from '@react-navigation/native';

import Geolocation from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

import { useDispatch, useSelector } from 'react-redux';

import { heightPercentageToDP as hp, widthPercentageToDP } from 'react-native-responsive-screen';
import { update_profile } from '../redux/feature/featuresSlice';
import useBackHandler from './useBackHandler';

export default function CheckApporve() {
    const user = useSelector(state => state.auth.userData);
    const isLoading = false
    const navigation = useNavigation()
    const dispatch = useDispatch();





    useBackHandler(navigation, 'Home');

    useEffect(() => {
        getToken()
    }, [user])

    const getToken = async () => {
        try {
            const token = await messaging().getToken();

            send_token(token)
        } catch (error) {
            console.error('Error getting FCM token:', error);
        }
    };

    const send_token = async (token) => {

        try {
            const formData = new FormData();
            // formData.append('user_id', user?.user_data.useres_id,);
            formData.append('user_id', user?.user_data?.useres_id);
            formData.append('device_token', token);


            const params = {

                data: formData,
                token: user?.token,
                msg: false,
                Notification: true
            };



            await dispatch(update_profile(params))
        }
        catch (err) {
            console.log('token ', err);
        }
    }

    const handleExitApp = () => {
        Alert.alert(
            'Exit App',
            'Are you sure you want to exit the app?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => BackHandler.exitApp(),
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor={'#fff'} />
            <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#fff' }}>




                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 24,
                        lineHeight: 36,
                        color: '#7756FC'
                    }}>Restaurant Approval</Text>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 24,
                        lineHeight: 36,
                        color: '#7756FC'
                    }}>Pending</Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 16,
                        lineHeight: 24,
                        color: '#000',
                        textAlign: 'center',
                        marginTop: 20
                    }}>

                        Your restaurant registration is under review by our team. We will notify you once the approval process is complete. Thank you for your patience!

                    </Text>

                </View>
                <Text style={styles.queryText}>
                    For other queries, contact us via email at{' '}
                    <Text style={styles.emailText} onPress={() => { }}>
                        loveeatsltd@gmail.com
                    </Text>.

                </Text>
                <Text style={[styles.emailText, { alignSelf: 'center' }]} onPress={() => { }}>
                    Contact : (+44) 7492 222021
                </Text>
                <Text style={styles.queryText}>
                    Address:- {' '}
                    47 Ringwood Avenue CROYDON, N/A CR0 3DT United Kingdom

                </Text>
                <View style={{ height: hp(46), alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/images.png')}
                        resizeMode='contain'
                        style={{ height: '80%', width: '80%' }} />
                </View>

                <TouchableOpacity

                    onPress={() => {
                        handleExitApp()

                    }}
                    style={[styles.tabBtn, { position: 'absolute', bottom: 30 }]}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 17,
                            color: '#FFFFFF',
                            lineHeight: 25.5,
                            marginLeft: 10,
                        }}>
                        Go Back
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    queryText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',

        marginTop: 10
    },
    emailText: {
        color: '#ff6347',
        textDecorationLine: 'underline',
    },
    tabBtn: {
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
})