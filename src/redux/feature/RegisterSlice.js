import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API, base_url} from '../Api';
import {Alert} from 'react-native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { errorToast, successToast } from '../../configs/customToast';
import { SuccessToast } from 'react-native-toast-message';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userData: null,
};

// register
export const register = createAsyncThunk(
  'register',
  async (params, thunkApi) => {
    console.log('Register =>>>>>>>>>>', params.data);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      
      const formdata = new FormData();
      formdata.append("useres_full_name",params.data.full_name);
      formdata.append("useres_email", params.data.email);
      formdata.append("useres_mobile_number", params.data.mobile_number);
      formdata.append("useres_password",  params.data.password);
      formdata.append("useres_c_password", params.data.c_password);
      formdata.append("useres_country_code", params.data.country_code);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
      
 const response =    fetch(base_url.url+"/restaurant/auth/signup", requestOptions)
        .then((response) => response.text())
        .then((res) => {
          const response = JSON.parse(res)
    console.log(response);      
      if (response.success) {
        params.navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
     successToast(
          'User Registered Successfully'
        
        );
        return response
      } else {
        
          errorToast(response.message,
          
        );
        return response
      }
        })
        .catch((error) => console.error(error));

      return response;

      
    } catch (error) {
      console.log('🚀 ~ file: RegisterSlice.js:16 ~ register ~ error:', error);
    errorToast(
        'Network error',
        
      );

      return thunkApi.rejectWithValue(error);
    }
  },
);

const RegisterSlice = createSlice({
  name: 'registerSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // register cases
    builder.addCase(register.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });
  },
});

export default RegisterSlice.reducer;
