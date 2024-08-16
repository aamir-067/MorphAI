import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'

const BackgroundEditTools = () => {
    return (
        <View className='mt-10'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Image Enhance</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ToolCard title={"Image Restore"} img={require("@/assets/images/toolsImages/imageRestore.png")} />
                <ToolCard title={"Image Upscale"} img={require("@/assets/images/toolsImages/imageRescale.png")} />
            </ScrollView>
        </View>
    )
}

export default BackgroundEditTools