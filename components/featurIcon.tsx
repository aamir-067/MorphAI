import { View, Text, Image } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg";
import { Link } from 'expo-router';

const FeatureTool = ({ title, backgroundColor, icon }: { title: string, backgroundColor: string, icon: any }) => {

    return (
        <View className='gap-y-1 w-[80px] items-center'>
            <View style={{ backgroundColor: backgroundColor }} className={`w-full rounded-[15px] h-[75px] justify-center items-center`}>
                <Image style={{ width: 42, height: 42 }} source={icon} />
            </View>
            <Text style={{ fontFamily: "Poppins-Regular" }} className='text-text text-center text-xs'>{title}</Text>
        </View>
    )
}

export default FeatureTool