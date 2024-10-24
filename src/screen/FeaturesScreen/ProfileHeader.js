import { View, Text, Platform,TouchableOpacity,Image, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ProfileHeader({name,Dwidth}) {

    const navigation  = useNavigation();

  return (

    <View >
        
        <View
          style={{
          paddingBottom:hp(3),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/croping/Back-Navs3x.png')}
              style={{height: 32, width: 32}}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center', width:Dwidth}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 27,
                color: '#000',
              }}>
             {name}
            </Text>
          </View>
          <View>

          </View>
        </View>
    </View>
 
  )
}