import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const FullscreenLoading = () => {
    return (
        <View>
            <ActivityIndicator size={"large"} color={"#fff"} />
        </View>
    )
}

export default FullscreenLoading