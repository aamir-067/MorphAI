import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import LoadingWithMessage from '@/components/loadingWithMessage';
import { uploadAsset } from '@/cloudinary/imageUpload';
import { magicEraser } from '@/cloudinary/effects/image/magicEraser';


const MagicEraser = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");


    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setImg(asset)
    }




    const handleTransformation = async () => {

        // if their is transformed Image then download it.
        if (transformedImageUrl) {
            setLoadingMessage("Downloading...");
            await downloadImage({ imageUrl: transformedImageUrl });
            setLoadingMessage("");
            Alert.alert("Image Downloaded Successful");
            return;
        }


        try {
            setLoadingMessage("Initiating Eraser...");
            // make sure the image is selected.
            if (img == undefined) {
                Alert.alert("please select the image first");
                return;
            }

            // check the prompt whether its empty or not.
            if (prompt.length == 0) {
                Alert.alert("please enter the prompt");
                return;
            }

            // add a delay of 100ms
            await new Promise(resolve => setTimeout(resolve, 400));

            setLoadingMessage("Erasing in progress...");
            // upload the image to the cloud.
            const response = await uploadAsset({ fileUri: img.uri });

            if (!response) {
                Alert.alert("Error while uploading the image");
                return;
            }

            setLoadingMessage("Finalizing result...");
            // remove the background
            const transformedImage = await magicEraser({ publicId: response.public_id, prompt: prompt });

            transformedImage && setTransformedImageUrl(transformedImage);

            setLoadingMessage("");
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong while processing");
        }
    }



    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Magic Eraser</Text>

                {
                    !loadingMessage ?
                        <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] items-center rounded-[10px] justify-center'>
                            {
                                img ?
                                    transformedImageUrl ?
                                        <Image resizeMode={"contain"} className='w-full h-full' source={{ uri: transformedImageUrl }} /> :
                                        <Image className='w-full h-full' resizeMode={"contain"} source={{ uri: img?.uri }} />
                                    : <View className='items-center gap-y-2'>
                                        <Svg width="32" height="41" viewBox="0 0 32 41" fill="">
                                            <Path d="M20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.8 40.5 4 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM6 32.5L11 25.834L14 29.834L19 23.168L26 32.5H6ZM18 14.5V3.5L29 14.5H18Z" fill="#e5e7eb" />
                                        </Svg>
                                        <Text style={{ fontFamily: "Outfit-Medium" }} className='text-gray-200 text-xl'>Select Image</Text>
                                    </View>

                            }
                        </TouchableOpacity> :
                        <LoadingWithMessage message={loadingMessage} />
                }


                {/* prompt Area */}
                <TextInput value={prompt} onChangeText={(e) => setPrompt(e)} numberOfLines={3} placeholder='erase the person in the left from car' className='mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline' placeholderTextColor={"#65558F"} />


                {/* buttons */}
                <View className='flex-row justify-between items-center mt-4'>
                    <Link href={".."} asChild>
                        <TouchableOpacity activeOpacity={0.5} className='border-2 border-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                            <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Cancel</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity onPress={handleTransformation} activeOpacity={0.5} className='bg-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>{transformedImageUrl ? "Save" : "Erase"}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


            {/* Ad here  */}
            {/* <View className='bg-red-400 h-52 w-full'>
            </View> */}
        </View>
    )
}

export default MagicEraser