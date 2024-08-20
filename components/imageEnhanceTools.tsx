import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'
import { Link } from 'expo-router'
const BackgroundEditTools = () => {
    return (
        <View className='mt-10'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Image Enhance</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Link href={"/effects/imageRestore"}>
                    <ToolCard title={"Image Restore"} img={require("@/assets/images/toolsImages/imageRestore.png")} />
                </Link>
                <Link href={"/effects/imageUpscale"}>
                    <ToolCard title={"Image Upscale"} img={require("@/assets/images/toolsImages/imageRescale.png")} />
                </Link>
            </ScrollView>
        </View>
    )
}

export default BackgroundEditTools