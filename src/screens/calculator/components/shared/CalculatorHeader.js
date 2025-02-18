import { useState } from 'react';
import { getDeviceType } from '../../../MainTabNavigator/HomeScreen';
import { useUserCredentials } from '../../../../utils/UserCredentials';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CalculatorHeader = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const deviceType = getDeviceType();
  const { userData } = useUserCredentials();

  return (
    <SafeAreaView
      className={`${
        deviceType === 'tablet'
          ? 'flex-row items-center justify-between px-4 pt-2 bg-calBg rounded-lg'
          : 'flex-row items-center justify-between px-4 py-2 bg-calBg rounded-lg'
      }`}
    >
      {/* ⚙️ Gear Icon */}
      <TouchableOpacity>
        <Image
          source={require('../../../../assets/gearIcon/white_gear_icon.png')}
          style={{ width: 35, height: 35, marginTop: 1 }}
        />
      </TouchableOpacity>

      {/* 🔍 Search Button */}
      <TouchableOpacity
        className="flex-1 mx-3 flex-row items-center justify-center border border-spBg h-10 px-4 rounded-3xl bg- "
      >
        <Icon name="magnify" size={22} color="white" />
        <View className="ml-2 flex-row mb-1">
          <Text className="text-lg font-extrabold text-spBg">Find Solutions</Text>
        </View>
      </TouchableOpacity>

      {/* 🔔 Bell Icon */}
      <TouchableOpacity className="mr-2">
        <Icon name="bell-badge-outline" size={25} color="white" />
      </TouchableOpacity>

      {/* 👤 Profile Dropdown */}
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <Avatar.Image
              size={35}
              source={{
                uri: userData?.profilePicture || 'https://via.placeholder.com/35',
              }}
            />
          </TouchableOpacity>
        }
        contentStyle={{
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          elevation: 5,
        }}
      >
        <Menu.Item
          onPress={closeMenu}
          title="Profile"
          titleStyle={{ color: '#000000' }}
          leadingIcon={() => <Icon name="account-circle-outline" size={20} color="black" />}
        />
        <Menu.Item
          onPress={closeMenu}
          title="Logout"
          titleStyle={{ color: '#000000' }}
          leadingIcon={() => <Icon name="logout" size={20} color="red" />}
        />
      </Menu>
    </SafeAreaView>
  );
};

export default CalculatorHeader;
