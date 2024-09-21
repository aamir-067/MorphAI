import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './common/toolCard'
import { Link } from 'expo-router'

const NewAddedTools = () => {
    return (
        <View className='mt-5'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Newly Added</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                <Link className='mr-4' href={"/effects/generativeRecolor"}>
                    <ToolCard title={"Generative Recolor"} img={require("@/assets/images/toolsImages/generativeRecolor.png")} />
                </Link>


                <Link className='mr-4' href={"/effects/generativeFill"}>
                    <ToolCard title={"Generative Fill"} img={require("@/assets/images/toolsImages/generativeFill.jpg")} />
                </Link>
            </ScrollView>
        </View>
    )
}

export default NewAddedTools