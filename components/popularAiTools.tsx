import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'
import { Link } from 'expo-router'
const PopularAiTools = () => {
    return (
        <View className='mt-10'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Popular AI tools</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Link className='mr-4' href={"/effects/magicEraser"}>
                    <ToolCard title={"Generative Remove"} img={require("@/assets/images/toolsImages/generativeRemove.png")} />
                </Link>

                <Link className='mr-4' href={"/effects/generativeReplace"}>
                    <ToolCard title={"Generative Replace"} img={require("@/assets/images/toolsImages/generativeReplace.png")} />
                </Link>
            </ScrollView>
        </View>
    )
}

export default PopularAiTools