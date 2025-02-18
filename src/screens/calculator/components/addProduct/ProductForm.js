import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DimensionInput from './DimensionInput';
import SectionSelector from './SectionSelector';
 

const ProductForm = ({onAddProduct, onCancel}) => {
  // Form state with default values
  const [formData, setFormData] = useState({
    area: 'Kitchen',
    product: 'Kitchen Cabinet',
    itemTypes: 'Middle Part Cabinets',
    series: 'Premium',
    ratePerSqft: '2250',
    section: 'L Shape',
    selectedSection: 'A', // Default selected section
    height: '',
    width: '',
    depth: '',
    sqft: '0',
  });

  // Calculate SQFT when dimensions change
  useEffect(() => {
    if (formData.height && formData.width) {
      // h*w/144 = sqft as per requirements
      const calculatedSqft = (
        (parseFloat(formData.height) * parseFloat(formData.width)) / 144
      ).toFixed(2);
      setFormData({...formData, sqft: calculatedSqft.toString()});
    }
  }, [formData.height, formData.width]);

  // Handle section selection
  const handleSectionSelect = (section) => {
    setFormData({...formData, selectedSection: section});
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.height || !formData.width) {
      Alert.alert('Error', 'Please enter height and width values');
      return;
    }
    onAddProduct(formData);
    // Reset form after submission
    setFormData({
      ...formData,
      height: '',
      width: '',
      depth: '',
      sqft: '0',
    });
  };

  // Conditional rendering based on product type
  const renderProductSpecificFields = () => {
    if (formData.product === 'Kitchen Cabinet') {
      return (
        <>
          {/* Item Types - Only for Kitchen Cabinets */}
          <View className="mb-2">
            <Text className="text-white mb-1">Item Types</Text>
            <View className="bg-calBg rounded-lg border border-white">
              <Picker
                selectedValue={formData.itemTypes}
                onValueChange={value =>
                  setFormData({...formData, itemTypes: value})
                }
                style={{color: 'white', height: 35}}
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
                  label="Middle Part Cabinets"
                  value="Middle Part Cabinets"
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

          {/* Sections - Only for Kitchen Cabinets */}
          <View className="mb-2">
            <Text className="text-white mb-1">Sections</Text>
            <View className="bg-calBg rounded-lg border border-white">
              <Picker
                selectedValue={formData.section}
                onValueChange={value =>
                  setFormData({...formData, section: value, selectedSection: 'A'})
                }
                style={{color: 'white', height: 35}}
                dropdownIconColor="white">
                <Picker.Item label="I Shape" value="I Shape" />
                <Picker.Item label="L Shape" value="L Shape" />
                <Picker.Item label="U Shape" value="U Shape" />
              </Picker>
            </View>
          </View>
          
          {/* Section visualization for Kitchen Cabinet */}
          <SectionSelector 
            sectionType={formData.section} 
            selectedSection={formData.selectedSection}
            onSelectSection={handleSectionSelect}
          />
        </>
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View className="bg-calCardgray rounded-lg p-4 relative mb-4">
        {/* Close button */}
        <TouchableOpacity
          className="absolute top-2 right-2 z-10"
          onPress={onCancel}>
          <Icon name="close" size={24} color="white" />
        </TouchableOpacity>

        {/* Area and Product Row */}
        <View className="flex-row justify-between mb-2">
          <View className="w-[48%]">
            <Text className="text-white mb-1">Area</Text>
            <View className="bg-calBg rounded-lg border border-white">
              <Picker
                selectedValue={formData.area}
                onValueChange={value => setFormData({...formData, area: value})}
                style={{color: 'white', height: 35}}
                dropdownIconColor="white">
                <Picker.Item label="Kitchen" value="Kitchen" />
                <Picker.Item label="Dining Area" value="Dining Area" />
                <Picker.Item label="Living Room" value="Living Room" />
                <Picker.Item label="Bedroom" value="Bedroom" />
                <Picker.Item label="Bathroom" value="Bathroom" />
              </Picker>
            </View>
          </View>

          <View className="w-[48%]">
            <Text className="text-white mb-1">Product</Text>
            <View className="bg-calBg rounded-lg border border-white">
              <Picker
                selectedValue={formData.product}
                onValueChange={value =>
                  setFormData({...formData, product: value})
                }
                style={{color: 'white', height: 35}}
                dropdownIconColor="white">
                <Picker.Item
                  label="Kitchen Cabinet"
                  value="Kitchen Cabinet"
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

        {/* Series and Rate per Sqft Row */}
        <View className="flex-row justify-between mb-2">
          <View className="w-[48%]">
            <Text className="text-white mb-1">Series</Text>
            <View className="bg-calBg rounded-lg border border-white">
              <Picker
                selectedValue={formData.series}
                onValueChange={value =>
                  setFormData({...formData, series: value})
                }
                style={{color: 'white', height: 35}}
                dropdownIconColor="white">
                <Picker.Item label="Premium" value="Premium" />
                <Picker.Item label="Standard" value="Standard" />
                <Picker.Item label="Economy" value="Economy" />
              </Picker>
            </View>
          </View>

          <View className="w-[48%]">
            <Text className="text-white mb-1">Rate per SqFt</Text>
            <View className="flex-row items-center">
              <TextInput
                value={formData.ratePerSqft}
                onChangeText={value =>
                  setFormData({...formData, ratePerSqft: value})
                }
                className="bg-calBg text-white p-2 rounded-lg border border-white flex-1"
                keyboardType="numeric"
                defaultValue="2250"
              />
              <Text className="text-white ml-2">₹</Text>
            </View>
          </View>
        </View>

        {/* Conditional fields based on product type */}
        {renderProductSpecificFields()}

        {/* Measurements */}
        <DimensionInput 
          formData={formData}
          setFormData={setFormData}
        />

        {/* SQFT Display */}
        <View className="items-end mb-3">
          <View className="w-24 border border-white rounded overflow-hidden">
            <View className="items-center py-1">
              <Text className="text-white text-lg">{formData.sqft}</Text>
            </View>
            <View className="bg-spBlue py-1 items-center">
              <Text className="text-white text-xs">SQFT</Text>
            </View>
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          className="bg-spGreen p-3 rounded-lg"
          onPress={handleSubmit}>
          <Text className="text-white text-center font-bold">ADD</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProductForm;