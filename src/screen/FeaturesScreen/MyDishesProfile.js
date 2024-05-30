
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import {useNavigation} from '@react-navigation/native';
  import {styles} from '../../configs/Styles';
  import {BottomTabView} from '@react-navigation/bottom-tabs';
  import Arrow from '../../assets/sgv/2arrow.svg';
  import ProfileHeader from './ProfileHeader';
  import ScreenNameEnum from '../../routes/screenName.enum';
import { FlipInXDown } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { get_restaurant_dish } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 
  export default function MyDishesProfile() {
  const dispatch = useDispatch()
    const navigation = useNavigation()
    const isLoading = useSelector(state => state.feature.isLoading);
    const ResturantDish = useSelector(state => state.feature.ResturantDish);
    const user = useSelector(state => state.auth.userData);
   useEffect(()=>{
      get_Mydishes()
    },[])
      

    console.log('===========ResturantDish=========================');
    console.log(ResturantDish);
    console.log('====================================');
    const get_Mydishes =async()=>{

      const id = await AsyncStorage.getItem('Restaurant')
       const res = JSON.parse(id)
      
      const params ={

       user_id:res.res_id
        
      }
  await dispatch(get_restaurant_dish(params))
    }
    const Order_List = ({item}) => (
      <View
        style={[
          styles.shadow,
          {
           
         marginTop:5,
            borderRadius: 10,
            backgroundColor: '#FFF',
            marginHorizontal: 5,
            padding:10,
            marginBottom:hp(1),
            width:'45%',
            alignItems:'center',
            justifyContent:'center'
          },
        ]}>
    
          <View>
            <Image
              source={{uri:item.restaurant_dish_image}}
              style={{height:100, width:100, 
                borderRadius:50}}
            />
          </View>
          <View style={{marginTop:10}}>
            
            <Text
              style={{
                color: '#352C48',
                fontSize:18,
                fontWeight: '700',
                lineHeight: 28,
              }}>
              {item.restaurant_dish_name}
            </Text>
          </View>
          <View style={{marginTop:5}}>
            <Text
              style={{
                color: '#E79B3F',
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 24,
              }}>
              {item.restaurant_dish_price}
            </Text>
          </View>

          <TouchableOpacity 
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.EditDish,{item:item})
          }}
          style={{backgroundColor:'#7756FC',borderRadius:20,
          paddingHorizontal:30,paddingVertical:5,
          justifyContent:'center',alignItems:'center',marginTop:10}}>
            <Text style={{fontSize:14,fontWeight:'500',lineHeight:15,color:'#FFF'}}>Edit</Text>
          </TouchableOpacity>
      
     
      </View>
    );



  

    return (
      <View style={{flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10}}>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading?<Loading />:null}
        <View style={{flexDirection:'row',alignItems:'center',}}>
            <View style={{width:'90%'}}>
          <ProfileHeader name={'My Dishes'}  />
          </View>

          <TouchableOpacity
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.Add_DISH)
          }}
          
          style={{justifyContent:'center',marginTop:8}} >
            <Image    source={require('../../assets/croping/IconPlus3x.png')} style={{height:32,width:32}}/>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: hp(3),
            flex: 1,
          }}>
        {ResturantDish &&  <FlatList
            data={ResturantDish}
            numColumns={2}
            renderItem={Order_List}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} // Optional: hide horizontal scroll indicator
          />
        }
        {ResturantDish?.length == 0 &&
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:"#777777",fontSize:12,fontWeight:'500'}}>No Dish Found</Text>
          </View>
        }
        
        </View>
        </ScrollView>
      </View>
    )
  }
  
  const OrderList = [
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    {
     
      name: 'Cheese Pizza',
      price: '$20.00',
      img: require('../../assets/images/Image-16.png'),
  
    },
    
   
  ];