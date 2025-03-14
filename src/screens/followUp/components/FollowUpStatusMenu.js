import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const FollowUpStatusMenu = ({status, onStatusChange, deviceType}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const statusOptions = [
    {label: 'Pending', icon: 'checkbox-blank-circle-outline'},
    {label: 'Complete', icon: 'check-bold'},
    {label: 'Missed', icon: 'alert-circle-outline'},
    {label: 'Late Complete', icon: 'clock-alert-outline'},
  ];

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity
        onPress={openMenu}
          className="bg-spCardGray px-3 py-2 my-2 rounded-xl flex-row items-center justify-between">
          <Text className="text-2xl font-robotoCondensed text-spBlue mx-auto">
            {status}
          </Text>
          <SimpleLineIcons
            name="arrow-down"
            size={25}
            color="rgb(4, 98, 138)"
          />
        </TouchableOpacity>
      }
      contentStyle={{
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
      }}>
      {statusOptions.map(option => (
        <Menu.Item
          key={option.label}
          onPress={() => {
            onStatusChange(option.label);
            closeMenu();
          }}
          title={option.label}
          titleStyle={{
            color: 'rgb(4,98,138)',
            fontSize: 16,
            fontWeight: 'bold',
          }}
          leadingIcon={() => (
            <Icon
              name={option.icon}
              size={deviceType === 'tablet' ? 24 : 20}
              color="rgb(4,98,138)"
            />
          )}
        />
      ))}
    </Menu>
  );
};

export default FollowUpStatusMenu;







 