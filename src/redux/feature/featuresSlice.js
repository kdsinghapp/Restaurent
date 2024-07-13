import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API, base_url} from '../Api';

import {Alert} from 'react-native';
import { SuccessToast } from 'react-native-toast-message';
import { errorToast, successToast } from '../../configs/customToast';
import ScreenNameEnum from '../../routes/screenName.enum';
import { err } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  DashboardList: null,
  ResturantDish: null,
  Privacypolicy: null,
  TermsCondition:null,
  getProfile:null,
  FavoriteList:null,
  ResturantDetails:null,
  OrderDetails:null,
  TotalList:null,
  FoodCategory:null,
  Orderlocations: [],
  BankAccountList:[],
};
export const get_order_locations = createAsyncThunk(
  'get_order_locations',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp

      console.log('get_order_locations=>>>>', params);



      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/driver/get-locations`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('get_order_locations =>>>>>>>>>>>>> :', responseData.data);


      if (responseData.success) {
        console.log('get_order_locations ', responseData.message);
        // successToast("Your order has been successfully canceled.")
      } else {
        //errorToast(responseData.message); 
        console.log('get_order_locations ', responseData.message);
      }


      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      //  errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const get_HomeDashBoard = createAsyncThunk(
  'get_HomeDashBoard',
  async (params, thunkApi) => {
    try {
      const response = await API.post('/home/get-home', null, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });

      if (response.data.success) {
        console.log('User Get_Home Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_HomeDashBoard .js:16 ~ get_HomeDashBoard ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_restaurant_dish = createAsyncThunk(
  'get_restaurant_dish',
  async (params, thunkApi) => {
    console.log('================get_restaurant_dish=APi===================',params);
    try {
      const response = await API.get(`/restaurant/details/products/dishes/get-restaurant-dish?restaurant_id=${params.user_id}`, {
        headers: {
          Accept: 'application/json'
        },
      });
      console.log('================get_restaurant_dish=APi===================',response.data);
      if (response.data.success) {
        console.log('User get_restaurant_dish Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_restaurant_dish .js:16 ~ get_restaurant_dish ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_restaurant_details = createAsyncThunk(
  'get_restaurant_details',
  async (params, thunkApi) => {
    console.log('================get_restaurant_details=APi===================',params);
    try {
      const response = await API.get(`/restaurant/details/get-restaurant-details-by-restaurant-user-id?res_users_restaurants_id=${params.res_id}`, {
        headers: {
          Accept: 'application/json'
        },
      });
      console.log('================get_restaurant_details=APi===================',response.data);
      if (response.data.success) {
        console.log('User get_restaurant_details Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_restaurant_details  ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const update_restaurant_details = createAsyncThunk(
  'update_restaurant_details',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      const formdata = new FormData();
      formdata.append("res_name", params.res_name);
      formdata.append("res_address", params.res_address);
      formdata.append("res_image", params.res_image);
      formdata.append("res_certificate", params.res_certificate);
      formdata.append("res_latitude", params.res_latitude);
      formdata.append("res_longitude",params.res_longitude);
      formdata.append("res_weekly_closed", params.res_weekly_closed);
      formdata.append("res_monday_open", params.res_monday_open);
      formdata.append("res_tuesday_open", params.res_tuesday_open);
      formdata.append("res_wednesday_open", params.res_wednesday_open);
      formdata.append("res_thursday_open", params.res_thursday_open);
      formdata.append("res_friday_open", params.res_friday_open);
      formdata.append("res_saturday_open", params.res_saturday_open);
      formdata.append("res_sunday_open", params.res_sunday_open);
      formdata.append("res_monday_close", params.res_monday_close);
      formdata.append("res_tuesday_close", params.res_tuesday_close);
      formdata.append("res_wednesday_close", params.res_wednesday_close);
      formdata.append("res_thursday_close", params.res_thursday_close);
      formdata.append("res_friday_close", params.res_friday_close);
      formdata.append("res_saturday_close",params.res_saturday_close);
      formdata.append("res_sunday_close", params.res_sunday_close);
      formdata.append("res_users_restaurants_id", params.res_users_restaurants_id);


      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/details/update-restaurant-details`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response restaurant=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {
        successToast('Update Restaurant Details Successfuly');
        params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        errorToast(responseData.message); 
       
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const Food_categories = createAsyncThunk(
  'Food_categories',
  async (params, thunkApi) => {
    console.log('=============Food_categories=======================',params);
    try {

      
      
      // Create form data with identity and otp
    
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);
      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: null,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/get-restaurant-categories`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response restaurant/get-restaurant-categories=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        //successToast(responseData.message);
       
      } else {
       // errorToast(responseData.message); 
       
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const change_order_status = createAsyncThunk(
  'change_order_status',
  async (params, thunkApi) => {
    console.log('=============change_order_status=======================',params);
    try {

      
      
      // Create form data with identity and otp
      const formdata = new FormData();
      formdata.append("order_id", params.order_id);
      formdata.append("status", params.status);
      formdata.append("order_preapare_time", params.order_preapare_time);
      
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);
      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/change-order-status`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response restaurant/change-order-status=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        successToast("Order Is Accepted ");
        params.navigation.navigate(ScreenNameEnum.MyOrder)
       
      } else {
        errorToast(responseData.message); 
       
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const get_order_data_by_id = createAsyncThunk(
  'get_order_data_by_id',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
console.log('============get_order_data_by_id========================');
console.log(params.data);
console.log('====================================');
      const formdata = new FormData();

      formdata.append("restaurant_id", params.data.restaurant_id);
      formdata.append("status", params.data.status);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/get-order-data-by-id`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('restaurant/get-order-data-by-id=>>>>>>>>>>>>> :', responseData);

      // Handle successful response
      if (responseData.success) {
        //successToast(responseData.message);
        //params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        //errorToast(responseData.message); 
       console.log('restaurant/get-order-data-by-id',responseData.message);
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const delete_restaurant_dish = createAsyncThunk(
  'delete_restaurant_dish',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      const formdata = new FormData();
    
     
      formdata.append("restaurant_dish_id", params.restaurant_dish_id);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/details/products/dishes/delete-restaurant-dish`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response delete_restaurant_dish=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        successToast('Dish Deleted Successfuly');
       
       
        params.navigation.navigate(ScreenNameEnum.MY_DISHES_PROFILE);
      } else {
        errorToast(responseData.message); 
        console.log('====================================');
      
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:',error );
      return error;
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const delete_account = createAsyncThunk(
  'delete_account',
  async (params, thunkApi) => {
    try {
      const formdata = new FormData();
      formdata.append("account_id", params.account_id);

      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`); // Add token to headers

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(
        `${base_url.url}/restaurant/delete-account`,
        requestOptions,
      );

      const responseData = await response.json();

      console.log('Response delete_account=>>>>>>>>>>>>> :', responseData.success);

      if (responseData.success) {
        successToast('Account Deleted Successfully');
      } else {
        errorToast(responseData.message); 
        console.log(responseData.message);
      }

      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      return thunkApi.rejectWithValue(error); // Use rejectWithValue to pass error
    }
  },
);

export const add_restaurant_dish = createAsyncThunk(
  'add_restaurant_dish',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========add_restaurant_dish==========================',params);
   
      const formdata = new FormData();
      formdata.append("restaurant_dish_restaurant_id",params.restaurant_dish_restaurant_id);
      formdata.append("restaurant_dish_name", params.restaurant_dish_name);
      formdata.append("restaurant_dish_price",params.restaurant_dish_price);
      formdata.append("restaurant_dish_offer", params.restaurant_dish_offer);
      formdata.append("restaurant_dish_preapare_time", params.restaurant_dish_preapare_time);
      formdata.append("restaurant_dish_description",params.restaurant_dish_description);
      formdata.append("restaurant_dish_image",params.restaurant_dish_image);
      formdata.append("restaurant_dish_category",params.restaurant_dish_category);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/details/products/dishes/add-restaurant-dish`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response add_restaurant_dish=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
       successToast(responseData.message);
       
       params.navigation.navigate(ScreenNameEnum.MY_DISHES_PROFILE);
      } else {
        errorToast(responseData.message); 
        console.log('==============add_restaurant_dish======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const update_restaurant_dish = createAsyncThunk(
  'update_restaurant_dish',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========update_restaurant_dish==========================',params);
   
      const formdata = new FormData();
      formdata.append("restaurant_dish_id",params.restaurant_dish_id);
      formdata.append("restaurant_dish_category",params.restaurant_dish_category);
      formdata.append("restaurant_dish_name", params.restaurant_dish_name);
      formdata.append("restaurant_dish_price",params.restaurant_dish_price);
      formdata.append("restaurant_dish_offer", params.restaurant_dish_offer);
      formdata.append("restaurant_dish_preapare_time", params.restaurant_dish_preapare_time);
      formdata.append("restaurant_dish_description",params.restaurant_dish_description);
      formdata.append("restaurant_dish_image",params.restaurant_dish_image);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/details/products/dishes/update-restaurant-dish`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response update_restaurant_dish=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
       successToast(responseData.message);
       
        params.navigation.navigate(ScreenNameEnum.MY_DISHES_PROFILE);
      } else {
        errorToast(responseData.message); 
        console.log('==============update_restaurant_dish======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const update_profile = createAsyncThunk(
  'update_profile',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========update_profile==========================',params.data);
   
  
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/auth/update-profile`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response update_profile=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        if(!params.Notification){

          successToast(responseData.message);
        }
       
       
      } else {
        errorToast(responseData.message); 
        console.log('==============update_profile======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
export const add_account_restaurant = createAsyncThunk(
  'add_account_restaurant',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      console.log('==========add_account_restaurant==========================',params.data);
   
  
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: params.data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/add-account-restaurant`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response add_account_restaurant=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        if(!params.Notification){

          successToast(responseData.message);
        }
       
       
      } else {
        errorToast(responseData.message); 
        console.log('==============add_account_restaurant======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);

export const create_new_password = createAsyncThunk(
  'create_new_password',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
 
   
      const data = new FormData();
    
      data.append('password', params.password);
      data.append('c_password', params.c_password);
      data.append('old_password', params.old_password);
      data.append('user_id', params.user_id);
     
      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${params.token}`);


      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        `${base_url.url}/restaurant/auth/create-new-password`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response create_new_password=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
       successToast(responseData.message);
       
       
      } else {
        errorToast(responseData.message); 
        console.log('==============create_new_password======================');
        console.log(responseData.message);
        console.log('====================================');
      }

      // Return response data
      return responseData.data;
    } catch (error) {
      console.log('==========create_new_password==========================',error);
      errorToast('Network error');
      // Reject with error
      throw error;
    }
  },
);
  

export const get_terms_conditions = createAsyncThunk(
  'get_terms_conditions',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/home/get-terms-and-conditions',null,{ headers: {
        Authorization: `Bearer ${params.token}`,
      }
    },);

     

      if (response.data.success) {
        console.log('User get_terms_conditions Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ : get_terms_conditions error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_Profile = createAsyncThunk(
  'get-profile',
  async (params, thunkApi) => {

    console.log(params);
    try {
      const response = await API.post('/restaurant/auth/get-profile',null,{ headers: {
        Authorization: `Bearer ${params.token}`,
      }
    },);

  
      if (response.data.success) {
        console.log('User get-profile Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ :auth/get-profile error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_account_restaurant = createAsyncThunk(
  'get_account_restaurant',
  async (params, thunkApi) => {

    try {
      const response = await API.post('/restaurant/get-account-restaurant',null,{ headers: {
        Authorization: `Bearer ${params.token}`,
      }
    },);

  
      if (response.data.success) {
        console.log('User get_account_restaurant Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ :get_account_restaurant:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const dashboard_data = createAsyncThunk(
  'dashboard_data',
  async (params, thunkApi) => {
    const formdata = new FormData();
    formdata.append('restaurant_id', params.restaurant_id);

    try {
      const response = await API.post('/restaurant/dashboard-data', formdata, {
        headers: {
          Authorization: `Bearer ${params.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        timeout: 5000, // Optional: specify timeout in ms
      });

      if (response.data.success) {
        console.log('User /restaurant/dashboard-data Successfully');
      }
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Axios error response:', error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Axios error request:', error.request);
        }
      } else {
        // Other error
        console.error('Unexpected error:', error);
      }

      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const get_FavoriteList = createAsyncThunk(
  'get_FavoriteList',
  async (params, thunkApi) => {

    console.log(params);
    try {
      const response = await API.post('/favorite/list-favorite-restaurant',null,{ headers: {
        Authorization: `Bearer ${params.token}`,
      }
    },);

  
      if (response.data.success) {
        console.log('User get_FavoriteList Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('get_FavoriteList error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);
export const get_privacy_policy = createAsyncThunk(
  'get_privacy_policy',
  async (params, thunkApi) => {
    try {
      const response = await API.get('/home/get-privacy-policy',null,{
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });

      //console.log('🚀 ~ get_privacy_policy ~ response:', response);

      if (response.data.success) {
        console.log('User get_privacy_policy Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log('🚀 ~ : get_privacy_policy error:', error);

      return thunkApi.rejectWithValue(error);
    }
  },
);

const FeatureSlice = createSlice({
  name: 'featureSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {

    builder.addCase(get_order_locations.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_order_locations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Orderlocations = action.payload;
    });
    builder.addCase(get_order_locations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_account.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_account.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(delete_account.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_account_restaurant.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_account_restaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.BankAccountList = action.payload;
    });
    builder.addCase(get_account_restaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(add_account_restaurant.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_account_restaurant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(add_account_restaurant.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(create_new_password.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(create_new_password.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
     
    });
    builder.addCase(create_new_password.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    // DashboardSlice cases
    builder.addCase(get_HomeDashBoard.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_HomeDashBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DashboardList = action.payload;
    });
    builder.addCase(get_HomeDashBoard.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(Food_categories.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(Food_categories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.FoodCategory = action.payload;
    });
    builder.addCase(Food_categories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
     
    });
    builder.addCase(get_restaurant_dish.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(change_order_status.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.DashboardList = action.payload;
    });
    builder.addCase(change_order_status.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;

    });
    builder.addCase(update_profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(change_order_status.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_restaurant_dish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ResturantDish = action.payload;
    });
    builder.addCase(get_restaurant_dish.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_restaurant_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_restaurant_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ResturantDetails = action.payload;
    });
    builder.addCase(get_restaurant_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_privacy_policy.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_privacy_policy.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.Privacypolicy = action.payload;
    });
    builder.addCase(get_privacy_policy.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_terms_conditions.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_terms_conditions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TermsCondition = action.payload;
    });
    builder.addCase(get_terms_conditions.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_Profile.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_Profile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.getProfile = action.payload;
    });
    builder.addCase(get_Profile.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(dashboard_data.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(dashboard_data.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.TotalList = action.payload;
    });
    builder.addCase(dashboard_data.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_FavoriteList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_FavoriteList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.FavoriteList = action.payload;
    });
    builder.addCase(get_FavoriteList.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(get_order_data_by_id.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_order_data_by_id.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.OrderDetails = action.payload;
    });
    builder.addCase(get_order_data_by_id.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_restaurant_details.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_restaurant_details.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_restaurant_details.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(add_restaurant_dish.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(add_restaurant_dish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(add_restaurant_dish.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(update_restaurant_dish.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(update_restaurant_dish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(update_restaurant_dish.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
    builder.addCase(delete_restaurant_dish.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_restaurant_dish.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(delete_restaurant_dish.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default FeatureSlice.reducer;
