import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ChoosProject = () => {
    const navigation=useNavigation()
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl font-bold text-amber-500'>Projects</Text>
      <Text className='text-2xl font-bold border rounded p-2 items-center mt-2' onPress={()=>navigation.goBack()}>go back</Text>
    </View>
  )
}

export default ChoosProject

const styles = StyleSheet.create({})