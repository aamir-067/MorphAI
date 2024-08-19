import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';


const ImageUpscale = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);

    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setImg(asset)
    }


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Image Upscale</Text>

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


                {/* prompt Area */}
                <TextInput numberOfLines={3} placeholder='Prompt' className='mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline' placeholderTextColor={"#65558F"} />

                {/* size of the image. width and height */}
                <View className='flex-row justify-between items-center mt-4'>

                    <View className='flex-row justify-between h-[50px] overflow-hidden rounded-md bg-backgroundContainer items-center max-w-40 w-[48%]'>
                        <TextInput keyboardType={"numeric"} keyboardAppearance={"dark"} placeholder='Width' placeholderTextColor={"#65558F"} className=' px-2 w-9/12 h-full text-text' />
                        <View className='h-full aspect-square justify-evenly items-center'>
                            <TouchableOpacity activeOpacity={0.5} className='w-full h-1/2 items-center justify-center'>
                                <Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                    <Path d="M5.95714 0L11.0914 7.5H0.822843L5.95714 0Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} className='w-full h-1/2 items-center justify-center'>
                                <Svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                                    <Path d="M5.95714 7L11.0914 0.25H0.822843L5.95714 7Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className='flex-row justify-between h-[50px] overflow-hidden rounded-md bg-backgroundContainer items-center max-w-40 w-[48%]'>
                        <TextInput keyboardType={"numeric"} keyboardAppearance={"dark"} placeholder='Height' placeholderTextColor={"#65558F"} className=' px-2 w-9/12 h-full text-text' />
                        <View className='h-full aspect-square justify-evenly items-center'>
                            <TouchableOpacity activeOpacity={0.5} className='w-full h-1/2 items-center justify-center'>
                                <Svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                                    <Path d="M5.95714 0L11.0914 7.5H0.822843L5.95714 0Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} className='w-full h-1/2 items-center justify-center'>
                                <Svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                                    <Path d="M5.95714 7L11.0914 0.25H0.822843L5.95714 7Z" fill="white" />
                                </Svg>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

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

export default ImageUpscale