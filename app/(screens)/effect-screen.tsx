import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from '@/components/navbar'

const index = () => {
    return (
        <View className='bg-background min-h-screen'>
            <Text className='text-text text-3xl'>Welcome world</Text>
        </View>
    )
}

export default index