import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';


interface Props {
    mainButtonText: string;
    mainButtonAction: () => Promise<void>
    loading: boolean
    style?: string
}
const ActionButtons = (props: Props) => {
    return (
        <View className={`flex-row justify-between items-center mt-4 ${props.style}`}>
            <Link href={".."} asChild>
                <TouchableOpacity activeOpacity={0.5} className='border-2 border-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                    <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Cancel</Text>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity onPress={props.mainButtonAction} activeOpacity={0.5} className='bg-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                {
                    props.loading ?
                        <ActivityIndicator size="small" color="white" /> :
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>{props.mainButtonText}</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default ActionButtons