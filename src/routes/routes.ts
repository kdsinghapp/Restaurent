

// import IniializeData from '../screens/WelcomeScreen/IniializeData';


import ProfileRoutes from "../navigators/Profile_Stack";
import TabNavigator from "../navigators/TabNavigator";

import Location from "../screen/Location";
import Login from "../screen/Login";
import OtpScreen from "../screen/OtpScreen";
import PasswordRest from "../screen/PasswordReset";
import PrivacyPolicy from "../screen/PrivacyPolicy";
import SignUp from "../screen/SignUp";
import TermConditions from "../screen/TermConditions";
import WELCOME_SCREEN from "../screen/WELCOME_SCREEN";
import CreatePassword from "../screen/createPassword";
import ScreenNameEnum from "./screenName.enum";

import AddRestaurantDetails from "../screen/AddRestaurantDetails";
import AddDish from "../screen/AddDish";
import DishList from "../screen/DishList";
import Home from "../screen/Home";
import Profile from "../screen/FeaturesScreen/Profile";
import Notification from "../screen/FeaturesScreen/Notification";
import ChangePassword from "../screen/FeaturesScreen/ChangePassword";
import EditProfile from "../screen/FeaturesScreen/EditProfile";
import OrdersDetails from "../screen/FeaturesScreen/OrdersDetails";
import TrackOrder from "../screen/FeaturesScreen/TrackOrder";
import MyDishesProfile from "../screen/FeaturesScreen/MyDishesProfile";
import RestaurantDetails from "../screen/FeaturesScreen/RestaurantDetails";
import EditDish from "../screen/FeaturesScreen/EditDish";
import UpdateRestaurantDetails from "../screen/FeaturesScreen/updateRestaurantDetails";
import UpdateAddRestaurantDetails from "../screen/FeaturesScreen/UpdateAddRestaurant";
import MyOrder from "../screen/FeaturesScreen/MyOrder";
import MyOrders from "../screen/FeaturesScreen/MyOrders";
import TrackResToUser from "../screen/FeaturesScreen/TrackResToUser";
import MsgNotification from "../screen/MsgNotification";
import Account from "../screen/FeaturesScreen/Account";
import AskLocation from "../screen/FeaturesScreen/AskLocation";
import Category from "../screen/FeaturesScreen/Category";
import Revenue from "../screen/FeaturesScreen/Revenue";

const _routes = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component:WELCOME_SCREEN,
    },
    {
      name: ScreenNameEnum.LOGIN_SCREEN,
      Component:Login,
    },
    {
      name: ScreenNameEnum.SIGNUP_SCREEN,
      Component:SignUp,
    },
    {
      name: ScreenNameEnum.PASSWORD_RESET,
      Component:PasswordRest,
    },
    {
      name: ScreenNameEnum.OTP_SCREEN,
      Component:OtpScreen,
    },
    {
      name: ScreenNameEnum.CREATE_PASSWORD,
      Component:CreatePassword,
    },
    
    {
      name: ScreenNameEnum.ADD_RESTAURANT_DETAILS,
      Component:AddRestaurantDetails,
    },
    {
      name: ScreenNameEnum.RESTAURANT_DETAILS,
      Component:RestaurantDetails,
    },
    {
      name: ScreenNameEnum.Add_DISH,
      Component:AddDish,
    },
    {
      name: ScreenNameEnum.EDIT_PROFILE,
      Component:EditProfile,
    },
    {
      name: ScreenNameEnum.DISH_LIST,
      Component:DishList,
    },
    {
      name: ScreenNameEnum.CHANGE_PASSWORD,
      Component:ChangePassword ,
    },
    {
      name: ScreenNameEnum.BOTTOM_TAB,
      Component:TabNavigator,
    },
   
    {
      name: ScreenNameEnum.TERMS_CONDITIONS,
      Component:TermConditions,
    },
    {
      name: ScreenNameEnum.PRIVACY_POLICY,
      Component:PrivacyPolicy,
    },
    {
      name: ScreenNameEnum.NOTIFICATION_SCREEN,
      Component:Notification ,
    },
   
    {
      name: ScreenNameEnum.ORDERS_DETAILS,
      Component:OrdersDetails ,
    },
    {
      name: ScreenNameEnum.TRACK_ORDER,
      Component:TrackOrder ,
    },
    {
      name: ScreenNameEnum.MY_DISHES_PROFILE,
      Component:MyDishesProfile ,
    },
    {
      name: ScreenNameEnum.EditDish,
      Component:EditDish ,
    },
    {
      name: ScreenNameEnum.UpdateRestaurantDetails,
      Component:UpdateRestaurantDetails ,
    },
    {
      name: ScreenNameEnum.UpdateAddRestaurantDetails,
      Component:UpdateAddRestaurantDetails ,
    },
    {
      name: ScreenNameEnum.MyOrder,
      Component:MyOrders ,
    },
    {
      name: ScreenNameEnum.TrackResToUser,
      Component:TrackResToUser ,
    },
   
    {
      name: ScreenNameEnum.MsgNotification,
      Component:MsgNotification ,
    },
    {
      name: ScreenNameEnum.Account,
      Component:Account ,
    },
    {
      name: ScreenNameEnum.AskLocation,
      Component:AskLocation ,
    },
    {
      name: ScreenNameEnum.Category,
      Component:Category ,
    },
    {
      name: ScreenNameEnum.Revenue,
      Component:Revenue ,
    },
   
   
    
  ],
  
  PROFILE_ROUTE: [
    {
      name: ScreenNameEnum.PROFILE_SCREEN,
      Component:Profile,
    }
 
   
    
  ],


  BOTTOMTAB_ROUTE:[
    
    {
      name: ScreenNameEnum.HOME_SCREEN,
      Component:Home,
      logo:require('../assets/croping/HomeUnactive3x.png'),
      lable:'Home'
    },
    {
      name: ScreenNameEnum.Add_DISH,
      Component:AddDish,
      logo:require('../assets/croping/IconPlus3x.png'),
      lable:''
    },
    {
      name: ScreenNameEnum.PROFILE_STACK,
      Component:ProfileRoutes,
      logo:require('../assets/croping/Profile3x.png'),
      lable:'Profile'
    },
  ]

};

export default _routes;
