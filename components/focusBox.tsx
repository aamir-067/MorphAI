// FocusOnComponent.js

import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';


const dots = {
    north_west: 0,
    north: 1,
    north_east: 2,
    west: 3,
    center: 4,
    east: 5,
    south_west: 6,
    south: 7,
    south_east: 8,
}
interface Props {
    selected: keyof typeof dots,
    dots: typeof dots
    setSelected: React.Dispatch<React.SetStateAction<keyof typeof dots>>
}

const FocusBox = (props: Props) => {
    return (
        <View className="w-[80px]  aspect-square flex-row justify-evenly items-stretch flex-wrap border-[1px] border-gray-300 rounded-sm p-1">
            {
                (Object.keys(dots) as (keyof typeof dots)[]).map((key: keyof typeof dots, index) => (
                    <Pressable key={index} onPress={() => props.setSelected(key)}>
                        <View className={`w-[7px] h-[7px] m-2 rounded-full ${props.selected == key ? "bg-accentBlue scale-150" : "bg-gray-500"}`} />
                    </Pressable>
                ))
            }

        </View>

    );
};

export default FocusBox;
