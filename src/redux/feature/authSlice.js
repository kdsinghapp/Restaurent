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
      'https://server-php-8-3.technorizen.com/loveeat/api/restaurant/auth/login',
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

      if (restaurantRegister) {
        params.navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
      } else {
        params.navigation.navigate(ScreenNameEnum.RESTAURANT_DETAILS);
      }
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
        'https://server-php-8-3.technorizen.com/loveeat/api/restaurant/auth/verify-otp',
        requestOptions,
      );

      // Parse response as JSON
      const responseData = await response.json();

      console.log('Response:', responseData);

      // Handle successful response
      if (responseData.status === '1') {
        successToast(responseData.message);
        // Assuming ScreenNameEnum.CREATE_PASSWORD is imported properly
        params.navigation.navigate(ScreenNameEnum.CREATE_PASSWORD);
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
    console.log('identity, password, otp,', identity, password, otp);
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
        'https://server-php-8-3.technorizen.com/loveeat/api/restaurant/auth/create-new-password',
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
    const response = await API.post('/log_out', params.data, {
      headers: {
        Authorization: `Bearer ${params.authToken}`,
      },
    });

    console.log(
      '🚀 ~ file: AuthSlice.js:29 ~ logout ~ response:',
      response.data,
    );

    if (response.data.status) {
      Alert.alert(
        'LogOut',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => {
              AsyncStorage.clear();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'LogOut',
        response.data.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        {cancelable: false},
      );
    }

    params.navigation.navigate('Login');
  } catch (error) {
    Alert.alert(
      'Network error',
      'server not responding please try later',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
    console.log('🚀 ~ file: AuthSlice.js:32 ~ logout ~ error:', error);
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
