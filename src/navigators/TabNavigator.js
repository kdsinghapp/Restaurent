import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';
import Home from '../screen/Home';
import AddDish from '../screen/AddDish';
import Profile from '../screen/FeaturesScreen/Profile';
import PlusBlue from '../assets/sgv/PlusBlue.svg';
import AddDishBottomTab from '../screen/FeaturesScreen/AddBottomTabDish';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 65,
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
        component={AddDishBottomTab}
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
