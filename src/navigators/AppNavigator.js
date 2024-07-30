import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import toastConfig from '../configs/customToast';
import Toast from 'react-native-toast-message';
import { persistor, store } from '../redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { notificationListener, requestUserPermission } from '../screen/FeaturesScreen/NotificationComponent';

export default function AppNavigator() {



  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NavigationContainer>
              <RegistrationRoutes />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
