import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getDeviceType} from '../../HomeScreen';
import {Avatar, Menu} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../../../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUserCredentials} from '../../../../utils/UserCredentials';
import { useGetUserbyIDQuery } from '../../../../redux/auth/authApi';
 
const FollowUpHeader = () => {
  const navigation = useNavigation();
  const DeviceType = getDeviceType();

  // ✅ Dropdown Menu Handlers
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');

      setTimeout(() => {
        if (navigationRef.isReady()) {
          console.log('✅ Navigation is ready. Resetting to welcome screen...');
          navigationRef.reset({
            index: 0,
            routes: [{name: 'welcome'}],
          });
        } else {
          console.warn('🚨 Navigation not ready yet. Will retry.');
        }
      }, 300);

      // navigationRef.reset({
      //   index: 0,
      //    routes: [{name: 'welcome'}],
      // });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Helper function to check token validity
  const {userId} = useUserCredentials();
  console.log('userId',userId);
  const {data: userData} = useGetUserbyIDQuery(userId, {skip: !userId});
  // console.log('user data is here ---------><>', userData);

  return (
    <View
      className={`
    ${
      DeviceType === 'tablet'
        ? 'flex-row items-center justify-between px-4 pt-2 bg-spBg rounded-lg'
        : 'flex-row items-center justify-between px-4 pt-2 bg-spBg rounded-lg'
    }
    `}
      // source={require('../../assets/orrangeEmojie.gif')}>
    >
      <TouchableOpacity>
        <Image
          source={require('../../../../assets/sp_gear_icon.png')}
          style={{width: 30, height: 30, borderRadius: 15}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 mx-3 flex-row items-center justify-center border border-spBlue h-10 px-4 rounded-3xl bg-spBg "
        //   onPress={() =>
        //     navigation.navigate('meeting', {
        //       screen: 'SearchMeeting',
        //       params: {meetings: meetings || []},
        //     })
        //   }
      >
        <Icon name="magnify" size={22} color="gray" />
        <View className="ml-2 flex-row ">
          <Text className="text-xl font-robotoCondensedSemiBold text-spDarkGray">
            Find{' '}
          </Text>
          <Text className="text-xl text-spBlue font-robotoCondensedSemiBold">
            Solutions
          </Text>
        </View>
      </TouchableOpacity>
      {/* bell */}
      <TouchableOpacity className="mr-2">
        <Icon name="bell-badge-outline" size={25} color="rgb(4,98,138)" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Avatar.Image
              size={35}
              source={{
                uri:
                  userData?.profilePicture || 'https://via.placeholder.com/35',
              }}
            />
          </TouchableOpacity>
        }
        contentStyle={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          elevation: 5,
        }}>
        <Menu.Item
          onPress={() => {
            closeMenu();
          }}
          title="Profile"
          titleStyle={{color: '#000000'}}
          leadingIcon={() => (
            <Icon name="account-circle-outline" size={20} color="black" />
          )}
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            // handleLogout();
          }}
          title="Logout"
          titleStyle={{color: '#000000'}}
          leadingIcon={() => <Icon name="logout" size={20} color="red" />}
        />
      </Menu>
    </View>
  );
};

export default FollowUpHeader;

const styles = StyleSheet.create({});
