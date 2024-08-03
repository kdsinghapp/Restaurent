import {createSlice, createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {API, base_url} from '../Api';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenNameEnum from '../../routes/screenName.enum';
import {errorToast, successToast} from '../../configs/customToast';
import axios from 'axios';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
  isLogin: false,
  isLogOut: false,
};

export const login = createAsyncThunk('login', async (params, thunkApi) => {
  try {
    // Create form data with identity and otp
    const formData = new FormData();
    formData.append('useres_identity', params.data.useres_identity);
    formData.append('useres_password', params.data.useres_password);

    // Configure request headers
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    // Create request options
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow',
    };

    // Make POST request to verify OTP
    const response = await fetch(
      'https://loveeatsdb.com/api/restaurant/auth/login',
      requestOptions,
    );

    // Parse response as JSON
    const responseData = await response.json();

    console.log('Response login :', responseData.data);

    // Handle successful response
    if (responseData.success) {
      successToast(responseData.message);
      thunkApi.dispatch(loginSuccess(responseData.data));
      // Assuming ScreenNameEnum.CREATE_PASSWORD is imported properly

      const restaurantRegister = responseData.data.restaurant_register;


        params.navigation.navigate(ScreenNameEnum.AskLocation);
     
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
});
export const sendOtpRestPass = createAsyncThunk(
  'auth/sendOtpRestPass',
  async (params, thunkApi) => {
    try {
      console.log('==================params ==================');
      console.log(params.data);
      console.log('====================================');

      const formData = new FormData();
      formData.append('identity', params.data.identity);

      console.log('FormData:', formData);

      const response = await API.post(
        '/restaurant/auth/password-reset',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json', // Add Accept header for JSON
          },
        },
      );

      console.log('Response:', response);

      if (response.data.success) {
        successToast('OTP Sent Successfully');
        params.navigation.navigate(ScreenNameEnum.OTP_SCREEN, {
          identity: params.data.identity,
        });
      } else {
        errorToast(response.data.message);
      }

      return response.data;
    } catch (error) {
      console.log('Error:', error);
      if (error.response) {
        console.log('Error Response:', error.response);
        errorToast(error.response.data.message || 'Network Error');
      } else if (error.request) {
        console.log('Error Request:', error.request);
        errorToast('Network Error');
      } else {
        console.log('General Error:', error.message);
        errorToast(error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
export const validOtp = createAsyncThunk(
  'auth/validOtp',
  async (params, thunkApi) => {
    try {
      // Create form data with identity and otp
      const formData = new FormData();
      formData.append('identity', params.data.identity);
      formData.append('otp', params.data.otp);

      // Configure request headers
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      // Create request options
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      };

      // Make POST request to verify OTP
      const response = await fetch(
        'https://loveeatsdb.com/api//restaurant/auth/verify-otp',
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response:', responseData.status);

      // Handle successful response
      if (responseData.status == '1') {
        successToast(responseData.message);
        // Assuming ScreenNameEnum.CREATE_PASSWORD is imported properly
        params.navigation.navigate(ScreenNameEnum.CREATE_PASSWORD,{identity:{identity:params.data.identity,otp:params.data.otp}});
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
export const CreateNewPassword = createAsyncThunk(
  'create-new-password-without-login',
  async (params, thunkApi) => {
    const {identity, password, otp} = params.data;
    console.log('create-new-password-without-login', identity, password, otp);
    try {
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');

      const formdata = new FormData();
      formdata.append('password', password);
      formdata.append('c_password', password);
      formdata.append('identity', identity);
      formdata.append('otp', otp);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      const response = fetch(
        'https://loveeatsdb.com/api/restaurant/auth/create-new-password-without-login',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          const response = JSON.parse(result);
          console.log(response);
          if (response.success) {
            params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
            successToast('Password updated successfully');
            return response;
          } else {
            errorToast(response.message);
            params.navigation.navigate(ScreenNameEnum.PASSWORD_RESET);
            return response;
          }
        })
        .catch(error => console.error(error));

      return response;
    } catch (error) {
      console.log('Error:', error);

      errorToast('Network Error');

      return thunkApi.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('logout', async (params, thunkApi) => {
  try {
    const response = await API.post('/restaurant/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });

    console.log(
      '🚀 ~ file: AuthSlice.js:29 ~ logout ~ response:',
      response.data,
    );

    if (response.data.status == '1') {
      successToast('User LogOut Successfuly');
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    } else {
      errorToast('User LogOut Faild');
    }

  
  } catch (error) {
    errorToast('Network error');
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});
export const delete_acc = createAsyncThunk('delete_acc', async (params, thunkApi) => {
  try {
    const response = await API.get('/restaurant/auth/delete-acc', null, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });

    console.log(
      '🚀 ~ file: delete_acc.js:29 ~ delete_acc ~ response:',
      response.data,
    );

    if (response.data.status == '1') {
      successToast('User Account Successfuly');
      params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    } else {
      errorToast('User LogOut Faild');
    }

  } catch (error) {
    errorToast('Network error');
    console.log('🚀 ~ file: delete_acc.js:32 ~ delete_acc ~ error:', error);
    return thunkApi.rejectWithValue(error);
  }
});
const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogin = true;
      state.isLogOut = false;
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    // login cases
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLogOut = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = false;
    });
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = true;
    });
    builder.addCase(sendOtpRestPass.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(delete_acc.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isLogin = false;
      state.isLogOut = false;
    });
    builder.addCase(delete_acc.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.isLogin = true;
    });
    builder.addCase(delete_acc.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(sendOtpRestPass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(sendOtpRestPass.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(validOtp.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(validOtp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(validOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(CreateNewPassword.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(CreateNewPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(CreateNewPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {loginSuccess} = AuthSlice.actions;

export default AuthSlice.reducer;
