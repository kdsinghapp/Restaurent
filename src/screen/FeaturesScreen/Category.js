import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Food_categories } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

import ScreenNameEnum from '../../routes/screenName.enum';
import ProfileHeader from './ProfileHeader';
import Searchbar from '../../configs/Searchbar';

const numColumns = 2;

export default function Category() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const FoodCategory = useSelector(state => state.feature.FoodCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(FoodCategory);


  useEffect(() => {
    const params = {
      token: user?.token,
    };
    dispatch(Food_categories(params)).then(res=>{
      setFilteredCategories(FoodCategory)
    })


  }, [isFocused, user]);
  useEffect(() => {
    setFilteredCategories(FoodCategory);
}, [FoodCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => {
        navigation.navigate(ScreenNameEnum.MY_DISHES_PROFILE, { item: item });
      }}

      disabled={item.rescat_admin_status === 'INACTIVE'}
      style={[styles.itemContainer,{backgroundColor:item.rescat_admin_status === 'INACTIVE'?'grey':'#f5f5f5'}]}>
        <Image
          source={{ uri: item.rescat_image }}
          style={styles.itemImage}
      
        />
        <Text style={styles.itemText}>{item.rescat_name}</Text>

        {item.rescat_admin_status === 'INACTIVE' && 
        <View style={{position:'absolute',top:'50%',backgroundColor:'rgba(0, 0, 0, 0.7)',width:'100%',height:55,alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:14,color:'#fff',fontWeight:'600'}}>
          Temporary
          </Text>
          <Text style={{fontSize:18,color:'#fff',fontWeight:'600'}}>
          INACTIVE
          </Text>
          </View>  }
    </TouchableOpacity>
  );
  const handleSearch = (text) => {


    setSearchTerm(text);
    if (text) {
        const filtered = FoodCategory.filter((item) =>
            item?.rescat_name.toLowerCase().includes(text?.toLowerCase())
        );
        setFilteredCategories(filtered);
    } else {
        setFilteredCategories(FoodCategory);
    }
};

  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      <ProfileHeader name={'Category'} Dwidth={'25%'} />


      <View style={{ marginTop: 5 }}>
                    <Searchbar
                        placeholder={'Search dishes, restaurants'}
         
                        onSearchTxt={handleSearch}
                        searchText={searchTerm}
                    />
                </View>
      {filteredCategories?.length > 0 ? (
      
         <FlatList
         showsVerticalScrollIndicator={false}
         data={filteredCategories}
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
   paddingVertical:5,
    width: '45%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(20),
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
