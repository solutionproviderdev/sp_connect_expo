// utils/userHooks.js

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUserbyIDQuery } from '../redux/auth/authApi';
// import { useGetUserbyIDQuery } from '../redux/services/api';

export const useUserCredentials = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setUserId(user);
      } catch (error) {
        console.error('Failed to retrieve user:', error);
      }
    };

    fetchUser();
  }, []);

    const {data: userData} = useGetUserbyIDQuery(userId, {skip: !userId});
  

  return { userId,userData };
};


 