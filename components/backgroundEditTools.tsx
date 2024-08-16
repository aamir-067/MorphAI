import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'

const BackgroundEditTools = () => {
    return (
        <View className='mt-10'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Background Edit</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ToolCard title={"Remove Background"} img={require("@/assets/images/toolsImages/backgroundRemove.png")} />
                <ToolCard title={"Replace Background"} img={require("@/assets/images/toolsImages/backgroundReplace.png")} />
            </ScrollView>
        </View>
    )
}

export default BackgroundEditTools