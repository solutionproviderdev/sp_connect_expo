
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {Picker} from '@react-native-picker/picker';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const ChooseProject = () => {
//   const {params} = useRoute();
//   const projectType = params?.params;
//   const navigation = useNavigation();

//   // States
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     area: 'Kitchen',
//     product: 'Kitchen Cabinet',
//     itemTypes: 'Middle Part Cabinets',
//     series: 'Premium',
//     ratePerSqft: '2250',
//     section: 'L Shape',
//     height: '',
//     width: '',
//     depth: '',
//     sqft: '0',
//   });

//   // Calculate SQFT when dimensions change
//   useEffect(() => {
//     if (formData.height && formData.width) {
//       // h*w/144 = sqft as per requirements
//       const calculatedSqft = (
//         (parseFloat(formData.height) * parseFloat(formData.width)) / 144
//       ).toFixed(2);
//       setFormData({...formData, sqft: calculatedSqft.toString()});
//     }
//   }, [formData.height, formData.width]);

//   // Organize products by title/section
//   const organizeProductsByTitle = () => {
//     const organizedProducts = {};
    
//     selectedProducts.forEach(product => {
//       if (!organizedProducts[product.title]) {
//         organizedProducts[product.title] = {
//           title: product.title,
//           parts: []
//         };
//       }
      
//       organizedProducts[product.title].parts = [
//         ...organizedProducts[product.title].parts,
//         ...product.parts
//       ];
//     });
    
//     return Object.values(organizedProducts);
//   };

//   // Handle adding a new product
//   const handleAddProduct = () => {
//     if (!formData.height || !formData.width) {
//       Alert.alert('Error', 'Please enter height and width values');
//       return;
//     }

//     let newProduct;
    
//     // Calculate total based on sqft and rate
//     const total = (parseFloat(formData.sqft) * parseFloat(formData.ratePerSqft)).toFixed(2);
//     const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
//     if (formData.product === 'Kitchen Cabinet') {
//       // For Kitchen Cabinet, add with sections
//       newProduct = {
//         id: Date.now(),
//         title: `${formData.area} - ${formData.section} - section A`,
//         productType: formData.product,
//         parts: [
//           {
//             name: formData.itemTypes,
//             sqft: formData.sqft,
//             rate: formData.ratePerSqft,
//             total: formattedTotal,
//           },
//         ],
//       };
//     } else {
//       // For other products, add directly
//       newProduct = {
//         id: Date.now(),
//         title: `${formData.area} - ${formData.product}`,
//         productType: formData.product,
//         parts: [
//           {
//             name: formData.product,
//             sqft: formData.sqft,
//             rate: formData.ratePerSqft,
//             total: formattedTotal,
//           },
//         ],
//       };
//     }

//     // Check if product with same title exists
//     const existingProductIndex = selectedProducts.findIndex(
//       p => p.title === newProduct.title
//     );
    
//     if (existingProductIndex !== -1) {
//       // Add part to existing product
//       const updatedProducts = [...selectedProducts];
//       updatedProducts[existingProductIndex].parts = [
//         ...updatedProducts[existingProductIndex].parts,
//         ...newProduct.parts,
//       ];
//       setSelectedProducts(updatedProducts);
//     } else {
//       // Add as new product
//       setSelectedProducts([...selectedProducts, newProduct]);
//     }
    
//     setShowAddForm(false);
    
//     // Reset form data after adding
//     setFormData({
//       ...formData,
//       height: '',
//       width: '',
//       depth: '',
//       sqft: '0',
//     });
//   };

//   // Handle removing a product part
//   const handleRemovePart = (title, partIndex) => {
//     const updatedProducts = [...selectedProducts];
    
//     // Find the product by title
//     const productIndex = updatedProducts.findIndex(p => p.title === title);
    
//     if (productIndex !== -1) {
//       // Remove the part
//       const product = updatedProducts[productIndex];
      
//       if (product.parts.length === 1) {
//         // If it's the last part, remove the whole product
//         updatedProducts.splice(productIndex, 1);
//       } else {
//         // Otherwise just remove the specific part
//         product.parts.splice(partIndex, 1);
//       }
      
//       setSelectedProducts(updatedProducts);
//     }
//   };

//   // Handle editing a part
//   const handleEditPart = (title, partIndex) => {
//     // Implementation for editing would go here
//     Alert.alert('Edit', 'Edit functionality to be implemented');
//   };

//   // Render selected products list
//   const renderSelectedProducts = () => {
//     const organizedProducts = organizeProductsByTitle();
    
//     return organizedProducts.map((product, idx) => (
//       <View key={idx} className="bg-calCardgray rounded-lg p-4 mb-4">
//         <Text className="text-white text-lg font-semibold mb-2">
//           {product.title}
//         </Text>
//         {product.parts.map((part, index) => (
//           <View
//             key={index}
//             className="flex-row justify-between items-center mb-2">
//             <Text className="text-white w-24">{part.name}</Text>
//             <Text className="text-white w-16">{part.sqft} SqFt</Text>
//             <Text className="text-white w-16">*{part.rate}</Text>
//             <Text className="text-white w-20">{part.total}</Text>
//             <View className="flex-row space-x-2">
//               <TouchableOpacity onPress={() => handleEditPart(product.title, index)}>
//                 <Icon name="pencil" size={20} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleRemovePart(product.title, index)}>
//                 <Icon name="delete" size={20} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}
//       </View>
//     ));
//   };

//   // Conditional rendering based on product type
//   const renderProductSpecificFields = () => {
//     if (formData.product === 'Kitchen Cabinet') {
//       return (
//         <>
//           {/* Item Types - Only for Kitchen Cabinets */}
//           <View className="mb-2">
//             <Text className="text-white mb-1">Item Types</Text>
//             <View className="bg-calBg rounded-lg border border-white">
//               <Picker
//                 selectedValue={formData.itemTypes}
//                 onValueChange={value =>
//                   setFormData({...formData, itemTypes: value})
//                 }
//                 style={{color: 'white', height: 35}}
//                 dropdownIconColor="white">
//                 <Picker.Item
//                   label="Lower Front Shutter (Under Slab)"
//                   value="Lower Front Shutter (Under Slab)"
//                 />
//                 <Picker.Item
//                   label="Middle Front Shutter (Under Slab)"
//                   value="Middle Front Shutter (Under Slab)"
//                 />
//                 <Picker.Item
//                   label="Upper Front Shutter (Under Slab)"
//                   value="Upper Front Shutter (Under Slab)"
//                 />
//                 <Picker.Item
//                   label="Lower Modular Cabinet"
//                   value="Lower Modular Cabinet"
//                 />
//                 <Picker.Item
//                   label="Middle Part Cabinets"
//                   value="Middle Part Cabinets"
//                 />
//                 <Picker.Item
//                   label="Upper Part Cabinet"
//                   value="Upper Part Cabinet"
//                 />
//                 <Picker.Item label="Larder Unit" value="Larder Unit" />
//                 <Picker.Item label="Open Shelve" value="Open Shelve" />
//                 <Picker.Item label="Drawer Unit" value="Drawer Unit" />
//               </Picker>
//             </View>
//           </View>

//           {/* Sections - Only for Kitchen Cabinets */}
//           <View className="mb-2">
//             <Text className="text-white mb-1">Sections</Text>
//             <View className="bg-calBg rounded-lg border border-white">
//               <Picker
//                 selectedValue={formData.section}
//                 onValueChange={value =>
//                   setFormData({...formData, section: value})
//                 }
//                 style={{color: 'white', height: 35}}
//                 dropdownIconColor="white">
//                 <Picker.Item label="I Shape" value="I Shape" />
//                 <Picker.Item label="L Shape" value="L Shape" />
//                 <Picker.Item label="U Shape" value="U Shape" />
//               </Picker>
//             </View>
//           </View>
          
//           {/* Section visualization for Kitchen Cabinet */}
//           <View className="mb-3 flex items-center justify-center h-24">
//             {formData.section === 'L Shape' && (
//               <View className="relative w-48 h-24">
//                 <View className="absolute top-0 left-0 w-12 h-20 bg-spBlue rounded-lg flex items-center justify-center">
//                   <Text className="text-white font-bold">A</Text>
//                 </View>
//                 <View className="absolute border-2 border-dashed border-white w-28 h-12 top-8 left-10 rounded-lg flex items-center justify-center">
//                   <Text className="text-white font-bold">B</Text>
//                 </View>
//               </View>
//             )}
//             {formData.section === 'I Shape' && (
//               <View className="relative w-48 h-24">
//                 <View className="absolute top-0 left-0 w-36 h-12 bg-spBlue rounded-lg flex items-center justify-center">
//                   <Text className="text-white font-bold">A</Text>
//                 </View>
//               </View>
//             )}
//             {formData.section === 'U Shape' && (
//               <View className="relative w-48 h-24">
//                 <View className="flex-row">
//                   <View className="w-12 h-20 bg-spBlue rounded-lg mx-1 flex items-center justify-center">
//                     <Text className="text-white font-bold">A</Text>
//                   </View>
//                   <View className="w-12 h-12 border-2 border-dashed border-white rounded-lg mx-1 flex items-center justify-center">
//                     <Text className="text-white font-bold">B</Text>
//                   </View>
//                   <View className="w-12 h-20 bg-spBlue rounded-lg mx-1 flex items-center justify-center">
//                     <Text className="text-white font-bold">C</Text>
//                   </View>
//                 </View>
//               </View>
//             )}
//           </View>
//         </>
//       );
//     }
//     return null;
//   };

//   // Render add product form
//   const renderAddForm = () => {
//     return (
//       <View className="bg-calCardgray rounded-lg p-4 relative mb-4">
//         {/* Close button */}
//         <TouchableOpacity
//           className="absolute top-2 right-2 z-10"
//           onPress={() => setShowAddForm(false)}>
//           <Icon name="close" size={24} color="white" />
//         </TouchableOpacity>

//         {/* Area and Product Row */}
//         <View className="flex-row justify-between mb-2">
//           <View className="w-[48%]">
//             <Text className="text-white mb-1">Area</Text>
//             <View className="bg-calBg rounded-lg border border-white">
//               <Picker
//                 selectedValue={formData.area}
//                 onValueChange={value => setFormData({...formData, area: value})}
//                 style={{color: 'white', height: 35}}
//                 dropdownIconColor="white">
//                 <Picker.Item label="Kitchen" value="Kitchen" />
//                 <Picker.Item label="Dining Area" value="Dining Area" />
//                 <Picker.Item label="Living Room" value="Living Room" />
//                 <Picker.Item label="Bedroom" value="Bedroom" />
//                 <Picker.Item label="Bathroom" value="Bathroom" />
//               </Picker>
//             </View>
//           </View>

//           <View className="w-[48%]">
//             <Text className="text-white mb-1">Product</Text>
//             <View className="bg-calBg rounded-lg border border-white">
//               <Picker
//                 selectedValue={formData.product}
//                 onValueChange={value =>
//                   setFormData({...formData, product: value})
//                 }
//                 style={{color: 'white', height: 35}}
//                 dropdownIconColor="white">
//                 <Picker.Item
//                   label="Kitchen Cabinet"
//                   value="Kitchen Cabinet"
//                 />
//                 <Picker.Item
//                   label="Full Height Cabinets"
//                   value="Full Height Cabinets"
//                 />
//                 <Picker.Item label="Folding Door" value="Folding Door" />
//                 <Picker.Item label="Dinner Wagon" value="Dinner Wagon" />
//                 <Picker.Item label="Dressing Unit" value="Dressing Unit" />
//                 <Picker.Item
//                   label="Dressing Unit With Cabinets"
//                   value="Dressing Unit With Cabinets"
//                 />
//                 <Picker.Item
//                   label="TV Units / Media Units"
//                   value="TV Units / Media Units"
//                 />
//                 <Picker.Item
//                   label="Floating Cabinets"
//                   value="Floating Cabinets"
//                 />
//                 <Picker.Item
//                   label="Upper Storage Cabinets"
//                   value="Upper Storage Cabinets"
//                 />
//                 <Picker.Item
//                   label="Modular Storage Cabinets"
//                   value="Modular Storage Cabinets"
//                 />
//                 <Picker.Item
//                   label="Floating Self (Horizontal I)"
//                   value="Floating Self (Horizontal I)"
//                 />
//                 <Picker.Item
//                   label="Open Shelves (Box)"
//                   value="Open Shelves (Box)"
//                 />
//                 <Picker.Item label="False Ceiling" value="False Ceiling" />
//                 <Picker.Item
//                   label="Decorative Wall Panelling"
//                   value="Decorative Wall Panelling"
//                 />
//                 <Picker.Item
//                   label="Bedhead Panelling"
//                   value="Bedhead Panelling"
//                 />
//                 <Picker.Item
//                   label="Mirror Panelling"
//                   value="Mirror Panelling"
//                 />
//                 <Picker.Item
//                   label="Wardrobes with Upper Storage (Cabinets)"
//                   value="Wardrobes with Upper Storage (Cabinets)"
//                 />
//                 <Picker.Item
//                   label="Walking Closets (Cabinets)"
//                   value="Walking Closets (Cabinets)"
//                 />
//                 <Picker.Item label="Corner Cabinets" value="Corner Cabinets" />
//                 <Picker.Item
//                   label="Customize Sofa Sets"
//                   value="Customize Sofa Sets"
//                 />
//                 <Picker.Item label="Customize Bed" value="Customize Bed" />
//               </Picker>
//             </View>
//           </View>
//         </View>

//         {/* Series and Rate per Sqft Row */}
//         <View className="flex-row justify-between mb-2">
//           <View className="w-[48%]">
//             <Text className="text-white mb-1">Series</Text>
//             <View className="bg-calBg rounded-lg border border-white">
//               <Picker
//                 selectedValue={formData.series}
//                 onValueChange={value =>
//                   setFormData({...formData, series: value})
//                 }
//                 style={{color: 'white', height: 35}}
//                 dropdownIconColor="white">
//                 <Picker.Item label="Premium" value="Premium" />
//                 <Picker.Item label="Standard" value="Standard" />
//                 <Picker.Item label="Economy" value="Economy" />
//               </Picker>
//             </View>
//           </View>

//           <View className="w-[48%]">
//             <Text className="text-white mb-1">Rate per SqFt</Text>
//             <View className="flex-row items-center">
//               <TextInput
//                 value={formData.ratePerSqft}
//                 onChangeText={value =>
//                   setFormData({...formData, ratePerSqft: value})
//                 }
//                 className="bg-calBg text-white p-2 rounded-lg border border-white flex-1"
//                 keyboardType="numeric"
//               />
//               <Text className="text-white ml-2">₹</Text>
//             </View>
//           </View>
//         </View>

//         {/* Conditional fields based on product type */}
//         {renderProductSpecificFields()}

//         {/* Measurements */}
//         <View className="mb-2">
//           <Text className="text-white mb-1">Measurements</Text>
//           <View className="flex-row justify-between">
//             <TextInput
//               placeholder="Height"
//               placeholderTextColor="#9CA3AF"
//               value={formData.height}
//               onChangeText={value => setFormData({...formData, height: value})}
//               className="bg-calBg text-white p-2 rounded-lg border border-white w-[32%]"
//               keyboardType="numeric"
//             />
//             <TextInput
//               placeholder="Width"
//               placeholderTextColor="#9CA3AF"
//               value={formData.width}
//               onChangeText={value => setFormData({...formData, width: value})}
//               className="bg-calBg text-white p-2 rounded-lg border border-white w-[32%]"
//               keyboardType="numeric"
//             />
//             <TextInput
//               placeholder="Depth"
//               placeholderTextColor="#9CA3AF"
//               value={formData.depth}
//               onChangeText={value => setFormData({...formData, depth: value})}
//               className="bg-calBg text-white p-2 rounded-lg border border-white w-[32%]"
//               keyboardType="numeric"
//             />
//           </View>
//         </View>

//         {/* SQFT Display */}
//         <View className="items-end mb-3">
//           <View className="w-24 border border-white rounded overflow-hidden">
//             <View className="items-center py-1">
//               <Text className="text-white text-lg">{formData.sqft}</Text>
//             </View>
//             <View className="bg-spBlue py-1 items-center">
//               <Text className="text-white text-xs">SQFT</Text>
//             </View>
//           </View>
//         </View>

//         {/* Add Button */}
//         <TouchableOpacity
//           className="bg-spGreen p-3 rounded-lg"
//           onPress={handleAddProduct}>
//           <Text className="text-white text-center font-bold">ADD</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <View className="flex-1 bg-calBg px-4 pt-2 pb-4">
//       <Text className="text-white text-2xl font-bold py-6">
//         Selected Products
//       </Text>
      
//       <ScrollView className="flex-1">
//         {/* Selected Products List */}
//         {selectedProducts.length > 0 && renderSelectedProducts()}

//         {/* Add Product Button or Form */}
//         {showAddForm ? (
//           renderAddForm()
//         ) : (
//           <TouchableOpacity
//             onPress={() => setShowAddForm(true)}
//             className="flex-row items-center justify-center gap-2 border-2 border-dashed border-white p-6 rounded-xl mb-4">
//             <Icon name="plus" size={40} color="white" />
//             <Text className="text-center text-white text-2xl font-bold">
//               Add Product
//             </Text>
//           </TouchableOpacity>
//         )}
//       </ScrollView>
      
//       {/* Navigation Buttons */}
//       <View className="flex-row justify-between items-center pt-2">
//         <TouchableOpacity
//           className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
//           onPress={() => navigation.goBack()}>
//           <Text className="text-center font-extrabold text-white">Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           className="ml-2 bg-spGreen rounded-lg py-3 w-1/3"
//           onPress={() => {
//             if (selectedProducts.length === 0) {
//               Alert.alert('Error', 'Please add at least one product');
//               return;
//             }
//             // Navigate to next screen with selected products
//             // navigation.navigate('NextScreen', { selectedProducts });
//             Alert.alert('Success', 'Products saved successfully');
//           }}>
//           <Text className="text-center font-extrabold text-white">Next</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default ChooseProject;








import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductList from '../components/addProduct/ProductList';
import ProductForm from '../components/addProduct/ProductForm';


const AddProduct = () => {
  const {params} = useRoute();
  const projectType = params?.params;
  const navigation = useNavigation();

  // States
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Handle adding a new product
  const handleAddProduct = (formData) => {
    let newProduct;
    
    // Calculate total based on sqft and rate
    const total = (parseFloat(formData.sqft) * parseFloat(formData.ratePerSqft)).toFixed(2);
    const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    if (formData.product === 'Kitchen Cabinet') {
      // For Kitchen Cabinet, add with sections
      newProduct = {
        id: Date.now(),
        title: `${formData.area} - ${formData.section} - section ${formData.selectedSection || 'A'}`,
        productType: formData.product,
        parts: [
          {
            name: formData.itemTypes,
            sqft: formData.sqft,
            rate: formData.ratePerSqft,
            total: formattedTotal,
          },
        ],
      };
    } else {
      // For other products, add directly
      newProduct = {
        id: Date.now(),
        title: `${formData.area} - ${formData.product}`,
        productType: formData.product,
        parts: [
          {
            name: formData.product,
            sqft: formData.sqft,
            rate: formData.ratePerSqft,
            total: formattedTotal,
          },
        ],
      };
    }

    // Check if product with same title exists
    const existingProductIndex = selectedProducts.findIndex(
      p => p.title === newProduct.title
    );
    
    if (existingProductIndex !== -1) {
      // Add part to existing product
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex].parts = [
        ...updatedProducts[existingProductIndex].parts,
        ...newProduct.parts,
      ];
      setSelectedProducts(updatedProducts);
    } else {
      // Add as new product
      setSelectedProducts([...selectedProducts, newProduct]);
    }
    
    setShowAddForm(false);
  };

  // Handle removing a product part
  const handleRemovePart = (title, partIndex) => {
    const updatedProducts = [...selectedProducts];
    
    // Find the product by title
    const productIndex = updatedProducts.findIndex(p => p.title === title);
    
    if (productIndex !== -1) {
      // Remove the part
      const product = updatedProducts[productIndex];
      
      if (product.parts.length === 1) {
        // If it's the last part, remove the whole product
        updatedProducts.splice(productIndex, 1);
      } else {
        // Otherwise just remove the specific part
        product.parts.splice(partIndex, 1);
      }
      
      setSelectedProducts(updatedProducts);
    }
  };

  // Handle editing a part
  const handleEditPart = (title, partIndex) => {
    Alert.alert('Edit', 'Edit functionality to be implemented');
  };

  return (
    <View className="flex-1 bg-calBg px-4 pt-2 pb-4">
      <Text className="text-white text-2xl font-bold py-6">
        Selected Products
      </Text>
      
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        {/* Selected Products List */}
        {selectedProducts.length > 0 && (
          <ProductList 
            selectedProducts={selectedProducts}
            onEditPart={handleEditPart}
            onRemovePart={handleRemovePart}
          />
        )}

        {/* Add Product Button or Form */}
        {showAddForm ? (
          <ProductForm 
            onAddProduct={handleAddProduct}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <TouchableOpacity
            onPress={() => setShowAddForm(true)}
            className="flex-row items-center justify-center gap-2 border-2 border-dashed border-white p-6 rounded-xl mb-4">
            <Icon name="plus" size={40} color="white" />
            <Text className="text-center text-white text-2xl font-bold">
              Add Product
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      
      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center pt-2">
        <TouchableOpacity
          className="mr-2 bg-spBlue rounded-lg py-3 w-1/3"
          onPress={() => navigation.goBack()}>
          <Text className="text-center font-extrabold text-white">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="ml-2 bg-spGreen rounded-lg py-3 w-1/3"
          onPress={() => {
            if (selectedProducts.length === 0) {
              Alert.alert('Error', 'Please add at least one product');
              return;
            }
            // Navigate to next screen with selected products
            // navigation.navigate('NextScreen', { selectedProducts });
            Alert.alert('Success', 'Products saved successfully');
          }}>
          <Text className="text-center font-extrabold text-white">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProduct;
