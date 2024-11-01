import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingWithMessage = ({ message }: { message: string }) => {
    return (
        <View className={`w-full h-[280px] z-50 justify-center items-center gap-y-2 ${message ? "" : "hidden"}`}>
            <ActivityIndicator size={"large"} color={'white'} />
            <Text style={{ fontFamily: "Poppins-Regular" }} className='text-[14px] text-text'>{message}</Text>
        </View>
    )
}

export default LoadingWithMessage