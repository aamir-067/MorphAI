import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import Svg, { Path } from 'react-native-svg';


interface Props {

    items: string[],
    currentItem: string;
    setCurrentItem: (React.Dispatch<React.SetStateAction<"Square" | "Portrait" | "Landscape" | "Custom">>) | ((item: string) => void)
}
const DropDown = (props: Props) => {
    const [showDropDown, setShowDropdown] = useState(false);
    return (
        <View className='w-full'>
            <View className='flex-row justify-between h-[50px] overflow-hidden rounded-md bg-backgroundContainer items-center'>
                <TextInput readOnly={true} value={props.currentItem} placeholder='Select Environment' placeholderTextColor={"#65558F"} className='capitalize px-2 w-9/12 h-full text-text' />
                <TouchableOpacity onPress={() => setShowDropdown(!showDropDown)} activeOpacity={0.5} className='h-full bg-buttonBackground aspect-square items-center justify-center'>
                    <View className='w-full h-full items-center justify-center'>
                        <Svg width="20" height="20" viewBox="0 0 12 7" fill="none">
                            <Path d="M5.95714 7L11.0914 0.25H0.822843L5.95714 7Z" fill="white" />
                        </Svg>
                    </View>
                </TouchableOpacity>
            </View>


            {
                showDropDown && <View className={`bg-outline z-50 rounded-md absolute top-full w-full`}>
                    {
                        props.items.map((item, index) => (
                            <Pressable key={index} onPress={() => {
                                props.setCurrentItem(item as any);
                                // transformedImageUrl && setTransformedImageUrl("");
                                setShowDropdown(false);
                            }}>
                                <Text style={{
                                    fontFamily: "Outfit-Medium"
                                }} className='text-text bg-black/10 p-2 rounded text-lg'>{item}</Text>
                            </Pressable>
                        ))
                    }
                </View>
            }
        </View>
    )
}

export default DropDown