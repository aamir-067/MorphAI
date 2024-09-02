import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import LoadingWithMessage from '@/components/loadingWithMessage';
import { generativeRemove } from '@/utils/effects/generativeRemove';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { GlobalContext } from '@/context/contextProvider';
import Checkbox from 'expo-checkbox';


const MagicEraser = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [removeAllInstances, setRemoveAllInstances] = useState(false);
    const [removeShadows, setRemoveShadows] = useState(false);
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");
    const { allowAds } = useContext(GlobalContext);

    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setImg(asset)
        setTransformedImageUrl(undefined)
    }




    const handleTransformation = async () => {

        if (loadingMessage) return;  // means something is processing
        // if their is transformed Image then download it.
        if (transformedImageUrl) {
            setLoadingMessage("Downloading...");
            await downloadImage({ imageUrl: transformedImageUrl });
            setLoadingMessage("");
            setTransformedImageUrl(undefined);
            Alert.alert("Image Downloaded Successful");
            return;
        }

        try {
            // make sure the image is selected.
            if (img == undefined) {
                Alert.alert("please select the image first");
                return;
            }


            if (prompt.length === 0) {
                Alert.alert("Prompt Missing", "Please provide a prompt to imitate process");
                return;
            }


            setLoadingMessage("Initializing magic erase...");

            const transformedUrl = await generativeRemove({ image: img, prompt, removeAllInstances, removeShadows });

            if (transformedUrl) {
                setTransformedImageUrl(transformedUrl);
            } else {
                Alert.alert("Error", "Please try again later");
            }
        } catch (error) {
            // console.log(error);
            Alert.alert("Error", "Something went wrong while processing");
        }
        finally {
            setLoadingMessage("");
        }
    }



    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Magic Eraser</Text>

                {

                    <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] relative items-center rounded-[10px] justify-center'>

                        <Image
                            onLoadStart={() => setLoadingMessage("Magic erase in progress...")}
                            onPartialLoad={() => { setLoadingMessage("Finalizing result...") }}
                            onLoad={() => setLoadingMessage("")}
                            onError={() => {
                                setLoadingMessage("")
                                Alert.alert("Error", "something went wrong while loading images. try again later");
                            }}
                            resizeMode={"contain"}
                            className={`w-full absolute top-0 left-0 h-full ${loadingMessage ? "opacity-0" : "opacity-100"}`}
                            source={{
                                uri: transformedImageUrl ? transformedImageUrl :
                                    img?.uri ? img?.uri : require("@/assets/images/transparent.png")
                            }}
                        />

                        <View className={`items-center absolute top-1/3 left-1/3 z-0 gap-y-2 ${(img || transformedImageUrl) ? "hidden" : ""}`}>
                            <Svg width="32" height="41" viewBox="0 0 32 41" fill="">
                                <Path d="M20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.8 40.5 4 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM6 32.5L11 25.834L14 29.834L19 23.168L26 32.5H6ZM18 14.5V3.5L29 14.5H18Z" fill="#e5e7eb" />
                            </Svg>
                            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-gray-200 text-xl'>Select Image</Text>
                        </View>


                        <LoadingWithMessage message={loadingMessage} />
                    </TouchableOpacity>
                }


                {/* prompt Area */}
                <TextInput value={prompt} onChangeText={(e) => setPrompt(e)} numberOfLines={3} placeholder='erase the person in the left from car' className='mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline' placeholderTextColor={"#65558F"} />


                {/* to remove shadows, and target multiple instances */}
                <View className='flex-row justify-between items-center mt-4'>

                    <TouchableOpacity onPress={() => setRemoveAllInstances(prev => !prev)} activeOpacity={1} className='flex-row py-1.5 items-center'>
                        <Checkbox value={removeAllInstances} onValueChange={setRemoveAllInstances} color={removeAllInstances ? "#326AFD" : "white"} />
                        <Text className='text-text ml-2'>Detect multiple</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setRemoveShadows(prev => !prev)} activeOpacity={1} className='flex-row py-1.5 items-center'>
                        <Checkbox value={removeShadows} onValueChange={setRemoveShadows} color={removeShadows ? "#326AFD" : "white"} />
                        <Text className='text-text ml-2'>Remove Shadows</Text>
                    </TouchableOpacity>

                </View>

                {/* buttons */}
                <View className='flex-row justify-between items-center mt-4'>
                    <Link href={".."} asChild>
                        <TouchableOpacity activeOpacity={0.5} className='border-2 border-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                            <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Cancel</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity onPress={handleTransformation} activeOpacity={0.5} className='bg-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>{(transformedImageUrl && !loadingMessage) ? "Save" : "Erase"}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


            {/* Ad here  */}
            {allowAds && <BannerAdComponent size={BannerAdSize.LEADERBOARD} />}
        </View>
    )
}

export default MagicEraser