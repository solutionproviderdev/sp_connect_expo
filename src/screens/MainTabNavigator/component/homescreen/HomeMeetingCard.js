import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import IconE from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {getDeviceType} from '../../HomeScreen';

const HomeMeetingCard = ({item}) => {
  // console.log('HomeMeetingCard item--<><>', item);
  const navigation = useNavigation();

  const deviceType = getDeviceType();

  // console.log('deviceType from home meeting card----->', deviceType);
  const {
    lead = {},
    slot = 'N/A',
    date = 'N/A',
    salesExecutive = {},
    visitCharge = 0,
  } = item || {};
  const {name = 'Unknown Name', address = {}, requirements = []} = lead || {};
  const {area = 'Unknown Area', district = 'Unknown District'} = address || {};

  // console.log('homemeetng card validation--->',item)

  return (
    <TouchableOpacity
      className={`
        ${
          deviceType === 'tablet'
            ? 'flex-row items-start rounded-xl p-4 mt-4 border border-gray-300 bg-spCardGray'
            : 'flex-row items-start rounded-xl p-2 mt-2 border border-gray-300 bg-spCardGray'
        }
      `}
      // onPress={() =>
      //   navigation.navigate('meeting', {
      //     screen: 'SingleMeeting',
      //     params: {meeting: item},
      //   })
      // }

      onPress={() => {
        if (item && item.lead) {
          navigation.navigate('meeting', {
            screen: 'SingleMeeting',
            params: { meeting: item },
          });
        } else {
          console.warn('Invalid meeting data');
        }
      }}
     >
      {/* Left Section */}
      <View className="flex-1 pr-3">
        {/* Name */}
        <View
          className={`
          ${
            deviceType === 'tablet'
              ? 'flex-row items-center mb-2'
              : 'flex-row items-center mb-'
          }
        `}>
          <Icon name="account" size={16} color="#6B7280" />
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'font-semibold text-2xl text-gray-800 ml-2'
                : 'font-semibold text-xl text-gray-800 ml-2'
            }
          `}>
            {name || 'Unknown Name'}
          </Text>
        </View>

        {/* Address */}
        <View
          className={`
          ${
            deviceType === 'tablet'
              ? 'flex-row items-center mb-2'
              : 'flex-row items-center mb-'
          }
        `}>
          <Icon name="map-marker" size={16} color="#6B7280" />
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'font-semibold text-2xl text-gray-800 ml-2'
                : 'font-semibold text- text-gray-400 ml-2'
            }
          `}>
            {area || 'Unknown Area'}, {district || 'Unknown District'}
          </Text>
        </View>

        {/* Status */}
        <View
          className={`
          ${
            deviceType === 'tablet'
              ? 'flex-row items-center mb-2'
              : 'flex-row items-center mb-'
          }
        `}>
          <Icon name="calendar" size={16} color="#6B7280" />
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'font-semibold text-2xl text-gray-800 ml-2'
                : 'font-semibold text- text-spBlue ml-2'
            }
          `}>
            {item?.status || 'No Status'}
          </Text>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap items-center mt-1 gap-2">
          <IconE name="info-with-circle" size={16} color="#6B7280" />
          {requirements?.length > 0 ? (
            <View className="flex-row items-center flex-wrap ml-2">
              {requirements.map((req, index) => (
                <Text
                  key={index}
                  className={`
                    ${
                      deviceType === 'tablet'
                        ? 'text-white bg-gray-700 px-2 mr-2 rounded-md text-xl'
                        : 'text-white bg-gray-600 mr-1 rounded-md px-1 '
                    }
                  `}>
                  {req.trim()}
                </Text>
              ))}
            </View>
          ) : (
            <Text className="text-gray-400 ml-2">No Requirements</Text>
          )}
        </View>

        {/* Accept/Pass Buttons */}
        <View
          className={`
          ${
            deviceType === 'tablet'
              ? 'flex-row mt-4 gap-4'
              : 'flex-row mt-2 gap-4'
          }
        `}>
          <TouchableOpacity
            className={`
          ${
            deviceType === 'tablet'
              ? 'flex-1 bg-spGreen py-2 rounded-full'
              : 'flex-1 bg-spGreen py-1 rounded-full'
          }
        `}>
            <Text
              className={`
              ${
                deviceType === 'tablet'
                  ? 'text-white text-center font-bold text-xl'
                  : 'text-white text-center font-bold '
              }
            `}>
              ACCEPT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`
              ${
                deviceType === 'tablet'
                  ? 'flex-1 bg-spRed py-2 rounded-full'
                  : 'flex-1 bg-spRed py-1 rounded-full'
              }
            `}>
            <Text
              className={`
              ${
                deviceType === 'tablet'
                  ? 'text-white text-center font-bold text-xl'
                  : 'text-white text-center font-bold '
              }
            `}>
              PASS
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Section */}
      <View className="items-end w-1/3">
        {/* CID */}
        <View className="bg-gray-200 border border-gray-400 mb-1 w-full overflow-hidden rounded-md">
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'bg-spDarkGray text-center font-bold px-2 py-0.5 text-white'
                : 'bg-spDarkGray text-center font-bold text-white text-xs'
            }
          `}>
            CID{lead?._id || 'N/A'}
          </Text>
        </View>

        {/* Time and Date */}
        <View className="bg-white border border-gray-400 mb-1 rounded-md overflow-hidden w-full">
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'bg-spRed text-center font-bold px-2 py-0.5 text-white text-lg'
                : 'bg-spRed text-center font-bold  text-white text-  '
            }
          `}>
            {slot || 'N/A'}
          </Text>
          <Text
            className={`
              ${
                deviceType === 'tablet'
                  ? 'bg-spDarkGray text-center font-medium px-2 py-0.5 text-white text-lg'
                  : 'bg-spDarkGray text-center font-bold text-white text-'
              }
            `}>
            {date
              ? new Date(date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: '2-digit',
                })
              : 'N/A'}
          </Text>
        </View>

        {/* CRE and Visit Charge */}
        <View className="border border-gray-400 w-full overflow-hidden rounded-md">
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'text-center text-lg font-bold px-2 py-0.5 text-gray-800'
                : 'text-center text-sm font-bold  text-gray-800'
            }
          `}>
            {salesExecutive?.nickname?.toUpperCase() || 'Unknown CRE'}
          </Text>
          <Text
            className={`
            ${
              deviceType === 'tablet'
                ? 'bg-gray-700 text-center text-lg font-medium px-2 py-0.5 text-white rounded'
                : 'bg-gray-700 text-center text-sm font-bold px-2 py-0.5 text-white rounded'
            }
          `}>
            {visitCharge ? `${visitCharge}/-` : 'Free'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeMeetingCard;

const styles = StyleSheet.create({});
