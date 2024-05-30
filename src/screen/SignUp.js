import { View, Text,  Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { styles } from '../configs/Styles'
import TextInputField from '../configs/TextInput'
import CheckBox from 'react-native-check-box'
import { useNavigation } from '@react-navigation/native'
import ScreenNameEnum from '../routes/screenName.enum'
export default function SignUp() {
    const [isSelected, setSelection] = useState(false);

    const navigation = useNavigation()
  return (
    <View style={{flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
    <Image source={require('../assets/images/Image-36.png')}
     style={{height:hp(26),width:'100%'}} />

<View  style={{backgroundColor:'#FFF',

marginTop:hp(-5),padding:15,
flex:1,borderTopLeftRadius:25,borderTopRightRadius:25,}}>

<View>
    <Text style={styles.txtHeading}>Sign Up</Text>
    <Text style={styles.txtsubHeading}>Enter your email and password</Text>
</View>

<View style={{marginTop:10,paddingBottom:hp(2)}}>
<TextInputField  placeholder ={'Full Name'} 
firstLogo={true}

img={require('../assets/croping/Profile3x.png')} />
<TextInputField  placeholder ={'Email Address'} 
firstLogo={true}

img={require('../assets/croping/Emal3x.png')} />
<TextInputField  placeholder ={'Mobile Number'} 
firstLogo={true}

img={require('../assets/croping/Phone3x.png')} />
<TextInputField  placeholder ={'Password'} 
firstLogo={true}
showEye={true}
img={require('../assets/croping/Lock3x.png')} />
</View>

<View style={{flexDirection:'row',}}>
    <View style={{flexDirection:'row',
    paddingTop:2,
    height:25,width:25,justifyContent:'center',alignItems:'center'}}>
    <CheckBox
       onClick={()=>{
        setSelection(isChecked=>!isChecked)
      }}
      checkedCheckBoxColo={'#7756FC'}
    
      isChecked={isSelected}
          style={styles.checkbox}
        />

    </View>
    <View style={{marginLeft:5,}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
    <Text style={{color:'#909090',fontSize:14,lineHeight:24,fontWeight:'400'}}>
      I agree to the medidoc 
    </Text>
    <TouchableOpacity style={{marginHorizontal:5}}>
    <Text style={{color:'#7756FC',fontSize:14,fontWeight:'400',lineHeight:24}}>
      Terms of Service
    </Text>
    </TouchableOpacity>
    <Text style={{color:'#909090',fontSize:14,lineHeight:24,fontWeight:'400'}}>
     and
    </Text>
  </View>
  <TouchableOpacity style={{}}>
    <Text style={{color:'#7756FC',fontSize:14,fontWeight:'400',lineHeight:24}}>Privacy Policy</Text>
  </TouchableOpacity>
  </View>
</View>

<View style={{alignItems:'center'}}>
<TouchableOpacity
          style={Styles.btn}>
          <Text
            style={{
              color: '#FFF',
              fontSize: 17,
              fontWeight: '700',
              lineHeight: 21,
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      <View
        style={{
          height: hp(5),
          flexDirection: 'row',
          alignItems: 'center',
          marginTop:10,
          alignSelf:'center',
        
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16, lineHeight: 24, color: '#0000000'}}>
        Alrady have an account? 
        </Text>
        <TouchableOpacity style={{}}
        
        onPress={()=>{
         navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
        }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: '#6D6EEC',
              fontWeight: '700',
            }}>
            {' '}
          Login
          </Text>
        </TouchableOpacity>
      </View>
      </View>
</View>
</ScrollView>

    </View>
  )
}

const Styles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        backgroundColor: '#352C48',
        height: 60,
        width: '100%',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderBottomWidth: 0.5,
        borderColor: '#7756FC',
      }
    })