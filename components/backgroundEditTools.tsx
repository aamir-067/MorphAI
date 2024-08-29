import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ToolCard from './toolCard'
import { Link } from 'expo-router'

const BackgroundEditTools = () => {
    return (
        <View className='mt-5'>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-2xl mb-2.5'>Background Edit</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Link className='mr-4' href={"/effects/backgroundRemove"}>
                    <ToolCard title={"Remove Background"} img={require("@/assets/images/toolsImages/backgroundRemove.png")} />
                </Link>
                <Link className='' href={"/effects/backgroundReplace"}> {/* add mr-4 after you add the third effect */}
                    <ToolCard title={"Replace Background"} img={require("@/assets/images/toolsImages/backgroundReplace.png")} />
                </Link>
            </ScrollView>
        </View>
    )
}

export default BackgroundEditTools