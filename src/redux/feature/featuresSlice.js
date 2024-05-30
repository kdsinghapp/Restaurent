import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {API} from '../Api';

import {Alert} from 'react-native';
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  DashboardList: null,
  ResturantDetails: null,
  Privacypolicy: null,
  TermsCondition:null,
  getProfile:null,
  FavoriteList:null
 
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
export const get_RestauRantDetails = createAsyncThunk(
  'get_RestauRantDetails',
  async (params, thunkApi) => {
    console.log('================RestauRantDetails=APi===================');
    try {
      const response = await API.post('/restaurant/get-restaurant-by-id', params.data, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });
      console.log('================RestauRantDetails=APi===================',response.data);
      if (response.data.success) {
        console.log('User get_RestauRantDetails Succesfuly');
      }
      return response.data.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: get_RestauRantDetails .js:16 ~ get_RestauRantDetails ~ error:',
        error,
      );

      return thunkApi.rejectWithValue(error);
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
    builder.addCase(get_RestauRantDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(get_RestauRantDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.ResturantDetails = action.payload;
    });
    builder.addCase(get_RestauRantDetails.rejected, (state, action) => {
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
  },
});

export default FeatureSlice.reducer;
