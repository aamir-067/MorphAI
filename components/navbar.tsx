import { View, Text } from 'react-native'
import React from 'react'

import Svg, { Rect } from "react-native-svg";
import ProIcon from './proIcon';
const NavBar = () => {
    return (
        <View className='flex-row px-[10px] my-2 items-center justify-between w-full'>
            <Svg width="40" height="13" viewBox=
                "0 0 40 13" fill="none" >
                <Rect width="40" height="3" rx="1.5" fill="#D9D9D9" />
                <Rect y="10" width="30" height="3" rx="1.5" fill="#D9D9D9" />
            </Svg>
            <ProIcon />
        </View>
    )
}

export default NavBar