import {View, Text, Image, Keyboard, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';
import Home from '../screen/Home';
import AddDish from '../screen/AddDish';
import Profile from '../screen/FeaturesScreen/Profile';
import PlusBlue from '../assets/sgv/PlusBlue.svg';
import AddDishBottomTab from '../screen/FeaturesScreen/AddBottomTabDish';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {



  const user = useSelector(state => state.auth.userData);



  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
    initialRouteName='Home'

      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height:70,
          paddingTop:Platform.OS == 'ios'?20:0,
          display: isKeyboardVisible ? 'none' : 'flex', 
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <>
            <Image
              source={require('../assets/croping/HomeUnactive3x.png')} // Assuming you have imported icon for each screen
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#7756FC' : color,
              }} 
            />
            <Text style={{color:'#9E9E9E',lineHeight:15,fontWeight:'600',fontSize:10,marginTop:5}}>Home</Text>
            </>
          ),
        
        }}
      />

      <Tab.Screen
        name={'AddDish'}
        component={AddDish}
        options={{
          tabBarIconStyle:{

          },
          tabBarIcon: ({focused, color, size}) => (
            <PlusBlue height={52} width={52} />
            
       
          ),

        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <>
            <Image
              source={require('../assets/croping/Profile3x.png')} // Assuming you have imported icon for each screen
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#7756FC' : color,
              }} 
            />
            <Text style={{color:'#9E9E9E',lineHeight:15,fontWeight:'600',fontSize:10,marginTop:5}}>Profile</Text>
            </>
          ),
         
        }}
      />
    </Tab.Navigator>
  );
}
