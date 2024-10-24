import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import ProfileHeader from './ProfileHeader';
import ScreenNameEnum from '../../routes/screenName.enum';
import { useDispatch, useSelector } from 'react-redux';
import { delete_restaurant_dish, get_restaurant_dish } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function MyDishesProfile() {
    const route = useRoute();
  const { item } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const ResturantDish = useSelector(state => state.feature.ResturantDish) || [];
  const user = useSelector(state => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState(null);
const isFocus = useIsFocused()


  useEffect(() => {
    get_Mydishes();
  }, [isFocus]);

  const get_Mydishes = async () => {
    const params = {
      user_id: user.user_data?.restaurant_id,
      category_id: item?.rescat_id,
    };
    await dispatch(get_restaurant_dish(params));
  };

  const delete_dish = async (id) => {

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



  const renderDish = ({ item }) => (
    <View style={[styles.dishContainer, styles.shadow]}>
      <View>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.activityIndicator}
          />
        )}
        <Image
          source={{ uri: item.restaurant_dish_image }}
          style={styles.dishImage}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={styles.dishNameContainer}>
        <Text style={styles.dishName}>
          {item.restaurant_dish_name}
        </Text>
      </View>
      <View style={styles.dishPriceContainer}>
        <Text style={styles.dishPrice}>
          <Text style={styles.dishPriceLabel}>
            {' '}
            Price:-
          </Text>{' '}
          £{item.restaurant_dish_price}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.EditDish, { item: item,categoryitem:route.params.item });
        }}
        style={styles.editButton}>
        <Text style={styles.buttonText}>
          Edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          
          Alert.alert(
            'Delete Dish',
            'Are you sure you want to delete this dish?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => delete_dish(item.restaurant_dish_id),
              },
            ],
            { cancelable: false }
          );
        }}
        style={styles.deleteButton}>
        <Text style={styles.buttonText}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={{ flex: 1,backgroundColor:'#fff' }}>
    <StatusBar   backgroundColor={'#fff'} />
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? <Loading /> : null}
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <View style={{width:'100%'}}>

            <ProfileHeader name={item?.rescat_name} />
            </View>

            <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.Add_DISH);
            }}
            style={styles.addButton}>
            <Image
              source={require('../../assets/croping/IconPlus3x.png')}
              style={styles.addIcon}
            />
          </TouchableOpacity>
          </View>

         
        </View>
        <View style={styles.dishesContainer}>
          {ResturantDish.length > 0 ? (
                <FlatList
                data={ResturantDish}
                numColumns={2}
                renderItem={renderDish}
                keyExtractor={(item) => item.restaurant_dish_id.toString()}
              />
          ) : (
            <View style={styles.noDishFound}>
              <Text style={styles.noDishText}>
                No Dish Found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  headerTitle: {
    width: '90%',
    flexDirection:'row',justifyContent:'space-between',alignItems:'center'
  },
  addButton: {
marginTop:40
  },
  addIcon: {
    height: 32,
    width: 32,
  },
  dishesContainer: {
    marginTop: hp(3),
    flex: 1,
  },
  noDishFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDishText: {
    color: '#777777',
    fontSize: 12,
    fontWeight: '500',
  },
  dishContainer: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    padding: 10,
    marginBottom: hp(1),
    width: '45%',
    justifyContent: 'center',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  },
  shadow: {
    // Add your shadow styles here
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1,
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  dishImage: {
    height: 120,
    width: 150,
    borderRadius: 5,
  },
  dishNameContainer: {
    marginTop: 10,
  },
  dishName: {
    color: '#352C48',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  dishPriceContainer: {
    marginTop: 5,
  },
  dishPrice: {
    color: '#E79B3F',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  dishPriceLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  editButton: {
    backgroundColor: '#7756FC',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#fa7d87',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 15,
    color: '#FFF',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: '#000',
  },
  seeAllButton: {
    marginRight: 10,

  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007bff',
  },
});
