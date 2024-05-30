import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loading from '../configs/Loader';
import ProfileHeader from './FeaturesScreen/ProfileHeader';

export default function TermConditions() {

  const navigation = useNavigation();



  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 15}}>
      {false ? <Loading /> : null}
      <ProfileHeader name={'Terms and Conditions'} Dwidth={'58%'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: hp(30),
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/croping/TermsAndConditions3x.png')}
            style={{height: '80%', width: '80%'}}
            resizeMode="contain"
          />
        </View>

        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: '400',
              lineHeight: 18,
              fontSize: 12,
              color: '#9796A1',
            }}>
            Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus suspendisse aliquam.
Amet dui diam integer purus vitae. Lobortis mauris enim at vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id. Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper. Risus netus lacus vitae posuere a sed magna egestas.
Urna pellentesque neque convallis rhoncus quisque viverra placerat duis eros. In viverra eget in velit lacus viverra. Platea mattis at cum blandit curabitur pretium lacus. Mattis egestas mi eget aliquet. Vestibulum tortor augue nibh posuere. Mattis at lacus neque massa neque purus gravida bibendum. Duis ac eu.
Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus suspendisse aliquam.
Amet dui diam integer purus vitae. Lobortis mauris enim at vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id. Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper. Risus netus lacus vitae posuere a sed magna egestas.
Urna pellentesque neque convallis rhoncus quisque viverra placerat duis eros. In viverra eget in velit lacus viverra. Platea mattis at cum blandit curabitur pretium lacus. Mattis egestas mi eget aliquet. Vestibulum tortor augue nibh posuere. Mattis at lacus neque massa neque purus gravida bibendum. Duis ac eu.

          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    height: 60,
    marginHorizontal: '9%',
    position: 'absolute',
    width: '91%',
    alignSelf: 'center',
    bottom: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#1D0B38',
  },
  txtInput: {
    flexDirection: 'row',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
