import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { change_assign_order, get_order_locations } from '../../redux/feature/featuresSlice';
import ScreenNameEnum from '../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackResToUser = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);

  const { OrderId } = route.params || {};
  const mapRef = useRef(null);

  const Orderlocations = useSelector(state => state.feature.Orderlocations);

  const defaultLocation = {
    latitude: 22.7196,
    longitude: 75.8577,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const driverLocation = Orderlocations?.driver_data
    ? {
      latitude: parseFloat(Orderlocations.driver_data.driver_lat),
      longitude: parseFloat(Orderlocations.driver_data.driver_long),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
    : null;

  const dropLocation = Orderlocations?.user_data
    ? {
      latitude: parseFloat(Orderlocations.user_data.lat),
      longitude: parseFloat(Orderlocations.user_data.long),
    }
    : null;

  useEffect(() => {
    const intervalId = setInterval(() => {
      getOrderLocation();
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const getOrderLocation = async () => {
    try {
      let data = new FormData();
      data.append('order_id', OrderId);

      const params = {
        data: data,
      };

      await dispatch(get_order_locations(params));
    } catch (error) {
      console.error('Error fetching order locations:', error);
      Alert.alert('Error', 'Failed to fetch order locations. Please try again.');
    }
  };

  useEffect(() => {
    if (mapRef.current && driverLocation) {
      mapRef.current.animateCamera({
        center: driverLocation,
        zoom: 15,
      });
    }
  }, [driverLocation]);

  const assign_order_Status = async () => {
    try {
      await AsyncStorage.setItem('delivery_status', 'Delivered');
      await AsyncStorage.setItem('running_orderId', '');

      let data = new FormData();
      data.append('delivery_status', 'Delivered');
      data.append('order_id', OrderId);

      const params = {
        data: data,
        token: user.token
      };

      await dispatch(change_assign_order(params));
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
    } catch (error) {
      console.error('Error changing order status:', error);
      Alert.alert('Error', 'Failed to update order status. Please try again.');
    }
  };

  if (!dropLocation || !driverLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading locations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/croping/Map3x.png')} style={styles.mapBackground}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={dropLocation || defaultLocation}
          ref={mapRef}
        >
          {driverLocation && (
            <Marker coordinate={driverLocation} title="Delivery boy Location">
              <Image
                source={require('../../assets/croping/waiter.png')}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Marker>
          )}
          {dropLocation && (
            <Marker coordinate={dropLocation} title="User Location">
              <Image
                source={require('../../assets/croping/table.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
            </Marker>
          )}
          {driverLocation && dropLocation && (
            <MapViewDirections
              origin={driverLocation}
              destination={dropLocation}
              apikey={process.env.GOOGLE_MAPS_API_KEY}
              strokeWidth={5}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              mode="DRIVING"
              onError={errorMessage => {
                console.error('GOT AN ERROR', errorMessage);
              }}
            />
          )}
        </MapView>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={assign_order_Status}
          style={styles.pickupButton}
        >
          <Text style={styles.pickupButtonText}>Order Delivered</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 15,
    elevation: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  pickupButton: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    backgroundColor: '#4CAF50',
    alignSelf: 'center',
    height: 55,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '700',
  },
});

export default TrackResToUser;
