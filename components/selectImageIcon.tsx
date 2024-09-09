import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SelectImageIcon = () => {
    return (
        <>
            <Svg width="32" height="41" viewBox="0 0 32 41" fill="">
                <Path d="M20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.8 40.5 4 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM6 32.5L11 25.834L14 29.834L19 23.168L26 32.5H6ZM18 14.5V3.5L29 14.5H18Z" fill="#e5e7eb" />
            </Svg>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-gray-200 text-xl'>Select Image</Text>
        </>

    )
}

export default SelectImageIcon