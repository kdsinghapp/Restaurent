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
 
};

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
        `${base_url.url}/restaurant/details/update-restaurant-details`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response restaurant=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        successToast(responseData.message);
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
        `${base_url.url}/restaurant/details/delete-restaurant-dish`,
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response delete_restaurant_dish=>>>>>>>>>>>>> :', responseData.success);

      // Handle successful response
      if (responseData.success) {
        successToast(responseData.message);
       
       
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
      console.error('Error:', error);
      errorToast('Network error');
      // Reject with error
      throw error;
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
      const response = await API.post('/auth/get-profile',null,{ headers: {
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

      console.log('🚀 ~ get_privacy_policy ~ response:', response);

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
    builder.addCase(get_restaurant_dish.pending, state => {
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
