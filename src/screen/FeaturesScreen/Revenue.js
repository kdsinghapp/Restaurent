
  import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
    StyleSheet,
    ImageBackground,
    Platform,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import {useNavigation} from '@react-navigation/native';
  import { styles } from '../configs/Styles';
  import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../configs/Loader';
import { get_payments, my_earning, payment_withdraw } from '../../redux/feature/featuresSlice';
import ProfileHeader from './ProfileHeader';
import { errorToast } from '../../configs/customToast';

  
  export default function Revenue() {
  
  
    const navigation = useNavigation();
    const isLoading = useSelector(state => state.feature.isLoading);
    const PaymentsTransaction = useSelector(state => state.feature.PaymentsTransaction);
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.userData);
  

   
    useEffect(() => {
      getEarning()
    }, [user])
  
  //   function formatDate(inputDate) {
  //     const date = new Date(inputDate);
    
  //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      
  //     const day = date.getDate();
  //     const month = months[date.getMonth()];
  //     const year = date.getFullYear();
    
  //     return `${day} ${month} ${year}`;
  //   }
  
  const getEarning  =()=>{
  
  
    const params ={
      token: user?.token,
    }
    dispatch(get_payments(params))
  }
  const Add_withdraw  =()=>{
  if(PaymentsTransaction?.Wallet>0){
  try{
  
  
    const params ={
      token: user?.token,
    }
    dispatch(payment_withdraw(params)).then(res=>{
      getEarning()
  
    })
  } catch(err){
    console.log('=>>>>>>>>>>>>',err);
  }
}
else{
errorToast("Insufficient Balance")
}
  }
  

    const renderItem = ({item}) => {
      return (

        <View style={{height: hp(12),
        paddingHorizontal:5,
        justifyContent: 'center'}}>
        {item.order_id &&  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 12,
                      marginTop:10,
                      lineHeight:14,
                      alignItems: 'center',
                      color:'#777777',
                      position:'absolute',
                      top:5,
                      left:10,
                      

                    }}>
                    Order ID-{item.order_id}
                    
                  </Text>}
      
          <View
            style={{
              height: 45,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
 
            }}>
                               
            <View
              style={{
                ustifyContent: 'space-between',
                 marginLeft: 5,
              }}>
        
            
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 16,
                      lineHeight: 22,
                      alignItems: 'center',
                      color: '#000000',
                    }}>
                    £ {item.payment_amount}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 12,
                      marginTop:10,
                      lineHeight:14,
                      alignItems: 'center',
                      color:item.payment_type == 'Debit'? '#F44336':'#4CAF50',
                    }}>
                    {item.payment_type}
                    
                  </Text>

            
            </View>
  
            <View
                style={{}}>
                {item.payment_type == 'Debit' ? (
                  <Image
                    source={require('../../assets/croping/Iconred3x.png')}
                    style={{height:30, width:30,alignSelf:'flex-end'}}
                  />
                ) : (
                  <Image
                    source={require('../../assets/croping/Icongreenreceived3x.png')}
                    style={{height:30, width:30,alignSelf:'flex-end'}}
                  />
                )}
                 <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 10,
                      lineHeight:22,
                      alignItems: 'center',
                      color: '#777777',
                      marginTop:10
                    }}>
                 {item.status}
                  </Text>
                 <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 12,
                      lineHeight:22,
                      alignItems: 'center',
                      color: '#000',
                
                    }}>
                 {item.payment_date}
                  </Text>
              </View>
          </View>
        </View>
      );
    };
    return (
      <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 15}}>
           <ScrollView showsVerticalScrollIndicator={false}>
         {Platform.OS === 'ios' ? (
          <View style={{ height:10,backgroundColor:'#fff' }} />
        ) : (
          <View style={{ height: 0 }} />
        )}
        <ProfileHeader name={'My Revenue'} />
        {isLoading?<Loading />:null}
        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 24,
              lineHeight: 36,
              fontWeight: '700',
              color: '#000000',
            }}>
            Revenue
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#7756FC',
            height: hp(20),
            borderRadius:20,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 21,
              fontWeight: '500',
              color: '#FFFFFF',
            }}>
            Your Available Balance
          </Text>
          <Text
            style={{
              marginTop:10,
              fontSize: 20,
              lineHeight: 22,
              fontWeight: '700',
              color: '#FFFFFF',
            }}>
          £ {PaymentsTransaction?.Wallet}.00
          </Text>
          <TouchableOpacity
            onPress={() => {
              Add_withdraw();
            }}
            style={{height:45,backgroundColor:'#352C48',
            justifyContent:'center',alignItems:'center',paddingHorizontal:30,
            borderRadius:30,marginTop:20}}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 14,
                color: '#FFFFFF',
                lineHeight: 25.5,
                marginLeft: 10,
                
              }}>
              Withdraw
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: hp(5), marginTop: 10, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontWeight: '700',
              color: '#000',
            }}>
            Payment History
          </Text>
        </View>
     { PaymentsTransaction?.payments &&   <View style={{flex: 1}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={PaymentsTransaction?.payments}
            renderItem={renderItem}
          />
        </View>}
  
        </ScrollView>
      </View>
    );
  }
  
