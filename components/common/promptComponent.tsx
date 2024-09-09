import { View, Text, TextInput } from 'react-native'
import React from 'react'



interface Props {
    promptValue: string
    onPromptChange: (e: string) => void
    placeholder?: string
    keyboardType?: "numeric" | "default"
    style?: string
}
const PromptComponent = (props: Props) => {
    return (
        <TextInput
            keyboardType={props.keyboardType || "default"}
            value={props.promptValue}
            onChangeText={props.onPromptChange}
            placeholder={props.placeholder || "prompt"}
            className={`mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline ${props.style}`}
            placeholderTextColor={"#65558F"} />
    )
}

export default PromptComponent