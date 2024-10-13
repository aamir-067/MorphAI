import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox'

interface Props {
    onChecked: () => void
    checked: boolean
    label: string
    style?: string
}
const CustomCheckBox = ({ onChecked, checked, label, style }: Props) => {
    return (
        <TouchableOpacity
            onPress={onChecked}
            activeOpacity={1}
            className={'flex-row py-1.5 items-center' + style}
        >
            <Checkbox
                value={checked}
                onValueChange={onChecked}
                color={checked ? "#326AFD" : "white"}
            />
            <Text className='text-text ml-2'>{label}</Text>

        </TouchableOpacity>
    )
}

export default CustomCheckBox