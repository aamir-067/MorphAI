import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProIcon = () => {
    return (
        <View className='w-[70px] h-[30px] bg-error items-center justify-center rounded-full'>
            <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-sm text-text'>Try Pro</Text>
        </View>
    )
}

export default ProIcon

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        padding: 4,
        paddingHorizontal: 6,
        borderRadius: 200
    },
    text: {
        // color: "white",

    }
})