import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RegistrationRoutes from './RegistrationRoutes'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import toastConfig from '../configs/customToast'
import Toast from 'react-native-toast-message'

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{flex:1}}>


    <NavigationContainer >
      <RegistrationRoutes />
      <Toast config={toastConfig} />
      </NavigationContainer>
      </GestureHandlerRootView>
  )
}