import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Food_categories } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import ProfileHeader from './ProfileHeader';
import ScreenNameEnum from '../../routes/screenName.enum';

const numColumns = 2;

export default function Category() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const FoodCategory = useSelector(state => state.feature.FoodCategory);


  useEffect(() => {
    const params = {
      token: user?.token,
    };
    dispatch(Food_categories(params));
  }, [isFocused, user]);


  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate(ScreenNameEnum.MY_DISHES_PROFILE, { item: item });
      }}
      style={styles.itemContainer}>
        <Image
          source={{ uri: item.rescat_image }}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <Text style={styles.itemText}>{item.rescat_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ProfileHeader title={'Category'} />
      {FoodCategory?.length > 0 ? (
      
         <FlatList
         showsVerticalScrollIndicator={false}
         data={FoodCategory}
         renderItem={renderItem}
         keyExtractor={item => item.rescat_id.toString()}
         numColumns={numColumns}
       />
      ) : (
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Category found</Text>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:15
  },
  itemContainer: {
    padding: 5,
    width: '45%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(25),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '80%',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
  },
});
