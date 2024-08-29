import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'
import { Link } from 'expo-router'

const NewAddedTools = () => {
    return (
        <View className='mt-5'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Newly Added</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Link className='mr-4' href={"/effects/improveColors"}>
                    <ToolCard title={"Improve Colors"} img={require("@/assets/images/toolsImages/improveColors.jpg")} />
                </Link>
            </ScrollView>
        </View>
    )
}

export default NewAddedTools