import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'

const PopularAiTools = () => {
    return (
        <View className='mt-10'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Popular AI tools</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ToolCard title={"Generative Remove"} img={require("@/assets/images/toolsImages/generativeRemove.png")} />
                <ToolCard title={"Generative Replace"} img={require("@/assets/images/toolsImages/generativeReplace.png")} />
            </ScrollView>
        </View>
    )
}

export default PopularAiTools