import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { RadioButton } from 'react-native-paper';
import ProfileHeader from './ProfileHeader';
import { useDispatch, useSelector } from 'react-redux';
import { add_account_restaurant, delete_account, get_Profile, get_account_restaurant, update_profile } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import { errorToast } from '../../configs/customToast';
import { useIsFocused } from '@react-navigation/native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function Account() {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [sortCode, setSortCode] = useState('');
    const [accountType, setAccountType] = useState('');
    const [isAddingAccount, setIsAddingAccount] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const user = useSelector(state => state.auth.userData);
    const isLoading = useSelector(state => state.feature.isLoading);
    const accountList = useSelector(state => state.feature.BankAccountList);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const slideAnim = useState(new Animated.Value(-300))[0];  // Initial position
    const getProfile = useSelector(state => state.feature.getProfile);
    useEffect(() => {
        getBankAccount();
        get_Profile_data()
    }, [user, isFocused]);

    const getBankAccount = () => {
        const params = {
            token: user?.token
        };
        dispatch(get_account_restaurant(params)).then(response => {
            if (response.payload) {
                dispatch({ type: 'UPDATE_ACCOUNT_LIST', payload: response.payload });
            }
        });
    };

    const Remove_account = (id) => {
        const params = {
            account_id: id,
            token: user?.token
        };
        dispatch(delete_account(params)).then(response => {
            getBankAccount();
        });
    };

    const handleAddAccount = () => {
        if (accountNumber === '' || accountHolderName === '' || sortCode === '' || accountType === '') {
            return errorToast("Please Fill All Fields");
        }

        const data = new FormData();
        data.append('account_number', accountNumber);
        data.append('account_name', accountHolderName);
        data.append('sort_code', sortCode);
        data.append('account_type', accountType);

        const params = {
            data: data,
            token: user?.token,
        };

        dispatch(add_account_restaurant(params)).then(res => {
            getBankAccount();
            setIsAddingAccount(false);
            setAccountNumber('');
            setAccountHolderName('');
            setSortCode('');
            setAccountType('');
        });
    };

    const updateAccount = async (account_id) => {
        const data = new FormData();
        data.append('user_id', user?.user_data?.useres_id);
        data.append('account_id', account_id);

        const params = {
            data: data,
            token: user?.token
        }



        dispatch(update_profile(params)).then(res => {
            getBankAccount(),
            get_Profile_data()
        })
    };


    const showAddAccountForm = () => {
        setIsAddingAccount(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hideAddAccountForm = () => {
        setIsAddingAccount(false);
        setAccountNumber('');
        setAccountHolderName('');
        setSortCode('');
        setAccountType('');
        Animated.timing(slideAnim, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
   const get_Profile_data =() => {
        const params = {
          token: user.token,
        };
        dispatch(get_Profile(params));
      }
    
    return (
        <View style={{ flex: 1, padding: 20 }}>
            {isLoading && <Loading />}
            <ProfileHeader name={'Account'} />
            <ScrollView>
                {accountList?.length > 0 ? (
                    accountList.map((details, index) => (
                        <TouchableOpacity 
                        onPress={() => {
                            updateAccount(details?.account_id)
                          
                        }}
                        key={index} style={styles.accountCard}>
                            <View style={{ width: '90%' }}>
                                <Text style={styles.cardTitle}>Account Details {index + 1}</Text>
                                <Text style={{ color: '#777777', fontWeight: '600' }}>Account Number :- <Text style={{ color: '#000', fontWeight: '700' }}>{details.account_number}</Text></Text>
                                <Text style={{ color: '#777777', fontWeight: '600' }}>Account Holder Name :-<Text style={{ color: '#000', fontWeight: '700' }}> {details.account_name}</Text></Text>
                                <Text style={{ color: '#777777', fontWeight: '600' }}>Sort Code :-<Text style={{ color: '#000', fontWeight: '700' }}> {details.sort_code}</Text></Text>
                                <Text style={{ color: '#777777', fontWeight: '600' }}>Account Type :- <Text style={{ color: '#000', fontWeight: '700' }}>{details.account_type}</Text></Text>
                                <TouchableOpacity
                                    onPress={() => Remove_account(details.account_id)}
                                    style={[styles.deleteButton]}>
                                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <RadioButton
                                    value={index}
                                    status={getProfile?.account_id === details?.account_id ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        updateAccount(details?.account_id)
                                      
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    ))
                ) : <Text style={styles.noAccountText}>No Account Added</Text>}

                <TouchableOpacity
                    onPress={showAddAccountForm}
                    style={[styles.tabBtn, { marginTop: 15 }]}>
                    <Text style={styles.tabBtnText}>Add Account</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isAddingAccount}
                    onRequestClose={hideAddAccountForm}
                >
                    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                            <ScrollView contentContainerStyle={styles.modalScrollContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.label}>Account Holder Name:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={accountHolderName}
                                        onChangeText={setAccountHolderName}
                                        placeholder="Enter account holder name"
                                    />
                                    <Text style={styles.label}>Account Number:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={accountNumber}
                                        onChangeText={setAccountNumber}
                                        placeholder="Enter account number"
                                    />
                                    <Text style={styles.label}>Sort Code:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={sortCode}
                                        onChangeText={setSortCode}
                                        placeholder="Enter sort code"
                                    />
                                    <Text style={styles.label}>Account Type:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={accountType}
                                        onChangeText={setAccountType}
                                        placeholder="Enter account type"
                                    />
                                    <TouchableOpacity
                                        onPress={handleAddAccount}
                                        style={[styles.tabBtn, { marginTop: 15 }]}>
                                        <Text style={styles.tabBtnText}>Submit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={hideAddAccountForm}
                                        style={[styles.tabBtn, { marginTop: 15 }]}>
                                        <Text style={styles.tabBtnText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </Animated.View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        color: "#000"
    },
    input: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 30,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    accountCard: {
        flexDirection: 'row',
        marginTop: 30,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    deleteButton: {
        marginTop: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: '40%',
        backgroundColor: 'red'
    },
    deleteButtonText: {
        fontWeight: '600',
        fontSize: 12,
        color: '#FFFFFF',
        lineHeight: 25.5,
        marginLeft: 10,
    },
    noAccountText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
        marginVertical: 20,
        marginHorizontal: 20
    },
    tabBtn: {
        height: 50,
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
    tabBtnText: {
        fontWeight: '600',
        fontSize: 17,
        color: '#FFFFFF',
        lineHeight: 25.5,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: widthPercentageToDP(100),
        padding: 20,
        marginTop: heightPercentageToDP(25),
        height: heightPercentageToDP(75),
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalScrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});
