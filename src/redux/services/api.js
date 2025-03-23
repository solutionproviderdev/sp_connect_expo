 

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { checkTokenAndLogout } from '../utils/checkTokenAndLogout';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://192.168.68.126:5000',
    baseUrl: 'https://crm.solutionprovider.com.bd/api',
    prepareHeaders: async (headers, {getState}) => {
      let token = getState().auth.token;
      // console.log("token from redux api",token);
      if (!token) {
        token = await AsyncStorage.getItem('token');
      }

      if (token) {
        const isValid = await checkTokenAndLogout(token);
        if (isValid) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }

      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }

      return headers;
    },
  }),
  tagTypes: ['Meeting', 'ProjectStatus', 'Comment', 'Lead','followUp'],  

  endpoints: builder => ({})

});



