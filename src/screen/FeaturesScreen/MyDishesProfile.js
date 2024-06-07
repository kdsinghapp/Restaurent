import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../configs/Styles';
import ProfileHeader from './ProfileHeader';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import { delete_restaurant_dish, get_restaurant_dish } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function MyDishesProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const ResturantDish = useSelector(state => state.feature.ResturantDish) || [];
  const user = useSelector(state => state.auth.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_Mydishes();
  }, []);

  const get_Mydishes = async () => {
    const params = {
      user_id: user.user_data?.restaurant_id,
    };
    await dispatch(get_restaurant_dish(params));
  };

  const delete_dish = async (id) => {
    console.log('Deleting dish with ID:', id);
    try {
      const params = {
        restaurant_dish_id: id,
      };
      await dispatch(delete_restaurant_dish(params)).then(res => {
        get_Mydishes();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const groupedDishes = ResturantDish.reduce((groups, dish) => {
    const category = dish.restaurant_dish_category_name;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(dish);
    return groups;
  }, {});

  const renderDish = ({ item }) => (
    <View
      style={[
        styles.shadow,
        {
          marginTop: 5,
          borderRadius: 10,
          backgroundColor: '#FFF',
          marginHorizontal: 5,
          padding: 10,
          marginBottom: hp(1),
          width: '45%',
          justifyContent: 'center',
        },
      ]}>
      <View>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 1,
              transform: [{ translateX: -25 }, { translateY: -25 }],
            }}
          />
        )}
        <Image
          source={{ uri: item.restaurant_dish_image }}
          style={{ height: 120, width: 150, borderRadius: 5 }}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            color: '#352C48',
            fontSize: 18,
            fontWeight: '700',
            lineHeight: 28,
          }}>
          {item.restaurant_dish_name}
        </Text>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            color: '#E79B3F',
            fontSize: 16,
            fontWeight: '700',
            lineHeight: 24,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 14,
              fontWeight: '700',
              lineHeight: 20,
            }}>
            {' '}
            Price:-
          </Text>{' '}
          ${item.restaurant_dish_price}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.EditDish, { item: item });
        }}
        style={{
          backgroundColor: '#7756FC',
          borderRadius: 20,
          paddingHorizontal: 30,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 15,
            color: '#FFF',
          }}>
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          delete_dish(item.restaurant_dish_id);
        }}
        style={{
          backgroundColor: '#fa7d87',
          borderRadius: 20,
          paddingHorizontal: 30,
          paddingVertical: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            lineHeight: 15,
            color: '#FFF',
          }}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategory = ({ item: [categoryName, dishes] }) => (
    <View key={categoryName}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          marginLeft: 10,
          color:'#000'
        }}>
        {categoryName}
      </Text>
      <FlatList
        data={dishes}
        numColumns={2}
        renderItem={renderDish}
        keyExtractor={(item) => item.restaurant_dish_id.toString()}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '90%' }}>
            <ProfileHeader name={'My Dishes'} />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.Add_DISH);
            }}
            style={{ justifyContent: 'center', marginTop: 8 }}>
            <Image
              source={require('../../assets/croping/IconPlus3x.png')}
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: hp(3), flex: 1 }}>
          {Object.entries(groupedDishes).length > 0 ? (
            <FlatList
              data={Object.entries(groupedDishes)}
              renderItem={renderCategory}
              keyExtractor={(item) => item[0]}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#777777', fontSize: 12, fontWeight: '500' }}>
                No Dish Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
