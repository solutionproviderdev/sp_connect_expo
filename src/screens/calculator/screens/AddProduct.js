import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalculatorHeader from '../components/shared/CalculatorHeader';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChooseProject = () => {
  const {params} = useRoute();
  const projectType = params.params;
  const navigation = useNavigation();

  // States
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    area: 'Kitchen',
    product: 'Kitchen Cabinet',
    itemTypes: 'Middle Part Cabinets',
    series: 'Premium',
    ratePerSqft: '2250',
    section: 'L Shape',
    height: '',
    width: '',
    depth: '',
    sqft: '0',
  });

  // Handle adding a new product
  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      title: `${formData.area} - ${formData.section} - section A`,
      parts: [
        {
          name: 'Upper Part',
          sqft: '13',
          rate: '1650',
          total: '21,450',
        },
        {
          name: 'Middle Part',
          sqft: '24',
          rate: '2350',
          total: '56,400',
        },
        {
          name: 'Lower Part',
          sqft: '12',
          rate: '1650',
          total: '19,800',
        },
      ],
    };

    setSelectedProducts([...selectedProducts, newProduct]);
    setShowAddForm(false);
  };

  // Render selected products list
  const renderSelectedProducts = () => {
    return selectedProducts.map(product => (
      <View key={product.id} className="bg-gray-800 rounded-lg p-4 mb-4">
        <Text className="text-white text-lg font-semibold mb-2">
          {product.title}
        </Text>
        {product.parts.map((part, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mb-2">
            <Text className="text-white w-24">{part.name}</Text>
            <Text className="text-white w-16">{part.sqft} SqFt</Text>
            <Text className="text-white w-16">*{part.rate}</Text>
            <Text className="text-white w-20">{part.total}</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity>
                <Icon name="pencil" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    ));
  };

  // Render add product form
  const renderAddForm = () => {
    return (
      <View className="bg-gray-800 rounded-lg p-4">
        <Text className="text-white text-lg font-semibold mb-4">
          Selected Products
        </Text>

        {/* Area and Product Row */}
        <View className="flex-row justify-between mb-4">
          <View className="w-[48%]">
            <Text className="text-white mb-1">Area</Text>
            <View className="bg-gray-700 rounded-lg">
              <Picker
                selectedValue={formData.area}
                onValueChange={value => setFormData({...formData, area: value})}
                style={{color: 'white'}}
                dropdownIconColor="white">
                <Picker.Item label="Kitchen" value="Kitchen" />
                <Picker.Item label="Dining" value="Dining" />
              </Picker>
            </View>
          </View>

          {/* <View className="w-[48%]">
            <Text className="text-white mb-1">Product</Text>
            <View className="bg-gray-700 rounded-lg">
              <Picker
                selectedValue={formData.product}
                onValueChange={value =>
                  setFormData({...formData, product: value})
                }
                style={{color: 'white'}}
                dropdownIconColor="white">
                <Picker.Item label="Kitchen Cabinet" value="Kitchen Cabinet" />
              </Picker>
            </View>
          </View> */}
          <View className="w-[48%]">
            <Text className="text-white mb-1">Product</Text>
            <View className="bg-gray-700 rounded-lg">
              <Picker
                selectedValue={formData.product}
                onValueChange={value =>
                  setFormData({...formData, product: value})
                }
                style={{color: 'white'}}
                dropdownIconColor="white">
                <Picker.Item
                  label="Kitchen Cabinets"
                  value="Kitchen Cabinets"
                />
                <Picker.Item
                  label="Full Height Cabinets"
                  value="Full Height Cabinets"
                />
                <Picker.Item label="Folding Door" value="Folding Door" />
                <Picker.Item label="Dinner Wagon" value="Dinner Wagon" />
                <Picker.Item label="Dressing Unit" value="Dressing Unit" />
                <Picker.Item
                  label="Dressing Unit With Cabinets"
                  value="Dressing Unit With Cabinets"
                />
                <Picker.Item
                  label="TV Units / Media Units"
                  value="TV Units / Media Units"
                />
                <Picker.Item
                  label="Floating Cabinets"
                  value="Floating Cabinets"
                />
                <Picker.Item
                  label="Upper Storage Cabinets"
                  value="Upper Storage Cabinets"
                />
                <Picker.Item
                  label="Modular Storage Cabinets"
                  value="Modular Storage Cabinets"
                />
                <Picker.Item
                  label="Floating Self (Horizontal I)"
                  value="Floating Self (Horizontal I)"
                />
                <Picker.Item
                  label="Open Shelves (Box)"
                  value="Open Shelves (Box)"
                />
                <Picker.Item label="False Ceiling" value="False Ceiling" />
                <Picker.Item
                  label="Decorative Wall Panelling"
                  value="Decorative Wall Panelling"
                />
                <Picker.Item
                  label="Bedhead Panelling"
                  value="Bedhead Panelling"
                />
                <Picker.Item
                  label="Mirror Panelling"
                  value="Mirror Panelling"
                />
                <Picker.Item
                  label="Wardrobes with Upper Storage (Cabinets)"
                  value="Wardrobes with Upper Storage (Cabinets)"
                />
                <Picker.Item
                  label="Walking Closets (Cabinets)"
                  value="Walking Closets (Cabinets)"
                />
                <Picker.Item label="Corner Cabinets" value="Corner Cabinets" />
                <Picker.Item
                  label="Customize Sofa Sets"
                  value="Customize Sofa Sets"
                />
                <Picker.Item label="Customize Bed" value="Customize Bed" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Item Types and Series Row */}
        <View className="flex-row justify-between mb-2">
          <View className="w-[48%]">
            <Text className="text-white mb-1">Item Types</Text>
            <View className="bg-gray-700 rounded-lg">
              <Picker
                selectedValue={formData.itemTypes}
                onValueChange={value =>
                  setFormData({...formData, itemTypes: value})
                }
                style={{color: 'white'}}
                dropdownIconColor="white">
                <Picker.Item
                  label="Lower Front Shutter (Under Slab)"
                  value="Lower Front Shutter (Under Slab)"
                />
                <Picker.Item
                  label="Middle Front Shutter (Under Slab)"
                  value="Middle Front Shutter (Under Slab)"
                />
                <Picker.Item
                  label="Upper Front Shutter (Under Slab)"
                  value="Upper Front Shutter (Under Slab)"
                />
                <Picker.Item
                  label="Lower Modular Cabinet"
                  value="Lower Modular Cabinet"
                />
                <Picker.Item
                  label="Middle Part Cabinet"
                  value="Middle Part Cabinet"
                />
                <Picker.Item
                  label="Upper Part Cabinet"
                  value="Upper Part Cabinet"
                />
                <Picker.Item label="Larder Unit" value="Larder Unit" />
                <Picker.Item label="Open Shelve" value="Open Shelve" />
                <Picker.Item label="Drawer Unit" value="Drawer Unit" />
              </Picker>
            </View>
          </View>

          <View className="w-[48%]">
            <Text className="text-white mb-1">Series</Text>
            <View className="bg-gray-700 rounded-lg">
              <Picker
                selectedValue={formData.series}
                onValueChange={value =>
                  setFormData({...formData, series: value})
                }
                style={{color: 'white'}}
                dropdownIconColor="white">
                <Picker.Item label="Premium" value="Premium" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Rate per Sqft */}
        <View className="mb-4">
          <Text className="text-white mb-1">Rate per SqFt</Text>
          <TextInput
            value={formData.ratePerSqft}
            onChangeText={value =>
              setFormData({...formData, ratePerSqft: value})
            }
            className="bg-gray-700 text-white p-2 rounded-lg"
            keyboardType="numeric"
          />
        </View>

        {/* Sections */}
        <View className="mb-4">
          <Text className="text-white mb-1">Sections</Text>
          <View className="bg-gray-700 rounded-lg">
            <Picker
              selectedValue={formData.section}
              onValueChange={value =>
                setFormData({...formData, section: value})
              }
              style={{color: 'white'}}
              dropdownIconColor="white">
              <Picker.Item label="I Shape" value="L Shape" />
              <Picker.Item label="L Shape" value="L Shape" />
              <Picker.Item label="U Shape" value="L Shape" />
            </Picker>
          </View>
        </View>

        {/* Measurements */}
        <View className="mb-4">
          <Text className="text-white mb-2">Measurements</Text>
          <View className="flex-row justify-between">
            <TextInput
              placeholder="Height"
              placeholderTextColor="#9CA3AF"
              value={formData.height}
              onChangeText={value => setFormData({...formData, height: value})}
              className="bg-gray-700 text-white p-2 rounded-lg w-[32%]"
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Width"
              placeholderTextColor="#9CA3AF"
              value={formData.width}
              onChangeText={value => setFormData({...formData, width: value})}
              className="bg-gray-700 text-white p-2 rounded-lg w-[32%]"
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Depth"
              placeholderTextColor="#9CA3AF"
              value={formData.depth}
              onChangeText={value => setFormData({...formData, depth: value})}
              className="bg-gray-700 text-white p-2 rounded-lg w-[32%]"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* SQFT Display */}
        <View className="items-end mb-4">
          <Text className="text-white">0</Text>
          <Text className="text-white">SQFT</Text>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          className="bg-spGreen p-3 rounded-lg"
          onPress={handleAddProduct}>
          <Text className="text-white text-center font-bold">ADD</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-900 px-4 pt-2 pb-2">
      <CalculatorHeader />
      <Text className="text-gray-100 text-center text-2xl font-bold py-2">
        {projectType}
      </Text>
      <ScrollView className="">
        {/* Header */}
        {/* <CalculatorHeader /> */}

        <ScrollView>
          {/* Selected Products List */}
          {selectedProducts.length > 0 && renderSelectedProducts()}

          {/* Add Product Button or Form */}
          {showAddForm ? (
            renderAddForm()
          ) : (
            <TouchableOpacity
              onPress={() => setShowAddForm(true)}
              className="flex-row items-center justify-center gap-2 border-2 border-dashed border-white p-6 rounded-xl">
              <Icon name="plus" size={40} color="white" />
              <Text className="text-center text-white text-2xl font-bold">
                Add Product
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </ScrollView>
      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center pt-2">
        <TouchableOpacity
          className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
          onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity className="ml-2 bg-spGreen rounded-lg py-3 w-1/3 ">
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseProject;
