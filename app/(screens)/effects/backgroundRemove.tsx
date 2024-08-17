
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { DocumentPickerAsset, DocumentPickerResult, getDocumentAsync } from "expo-document-picker";
import { Image } from 'react-native';
const backgroundRemove = () => {
    const [img, setImg] = useState<DocumentPickerAsset | undefined>(undefined);

    const getPicture = async () => {
        const res: DocumentPickerResult = await getDocumentAsync({
            type: "image/*",
            copyToCacheDirectory: false
        });
        if (res?.canceled == false) {
            const img: DocumentPickerAsset = res?.assets[0];
            setImg(img);
        }
    }


    useEffect(() => {
        console.log(img);

    }, [img]);


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Background Remove</Text>

                <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] items-center rounded-[10px] justify-center'>
                    {
                        img ? <Image className='w-full h-full' resizeMode={"contain"} source={{ uri: img.uri }} /> : <View className='items-center gap-y-2'>
                            <Svg width="32" height="41" viewBox="0 0 32 41" fill="">
                                <Path d="M20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.8 40.5 4 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM6 32.5L11 25.834L14 29.834L19 23.168L26 32.5H6ZM18 14.5V3.5L29 14.5H18Z" fill="#e5e7eb" />
                            </Svg>
                            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-gray-200 text-xl'>Select Image</Text>
                        </View>
                    }
                </TouchableOpacity>



                {/* buttons */}
                <View className='flex-row justify-between items-center mt-4'>
                    <Link href={".."} asChild>
                        <TouchableOpacity activeOpacity={0.5} className='border-2 border-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                            <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Cancel</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity activeOpacity={0.5} className='bg-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Edit</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


            {/* Ad here  */}
            {/* <View className='bg-red-400 h-52 w-full'>
            </View> */}
        </View>
    )
}

export default backgroundRemove