import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
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
import { generalTransformation } from '@/utils/effects/generalTransformation';
import Checkbox from "expo-checkbox";


const GenerativeFill = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [items, setItems] = useState<string[]>([]);
    const [multiple, setMultiple] = useState(false);
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");
    const { allowAds } = useContext(GlobalContext);

    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setImg(asset)
        setTransformedImageUrl(undefined)
    }
    const handleItems = (e: string) => {
        if (items.length === 3) {
            setPrompt("");
            return;
        }
        setPrompt(e);
        if (e.endsWith(",") && items.length < 3) {
            setItems(prev => [...prev, e.slice(0, -1).trim()]);
            setPrompt("");
        }
    }

    const removeItem = (itemIndex: number) => {
        const newItems = items.filter((item, index) => index !== itemIndex);
        setItems(newItems);
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

            if (items.length === 0) {
                Alert.alert("Prompt Missing", "Select at least one item to recolor");
                return;
            }

            setLoadingMessage("Initializing generative recolor...");
            const color = "326AFD"
            const promptToSend = items.length === 1 ? items.join("") : `(${items.join(";")})`;
            const transformedUrl = await generalTransformation({
                image: img,
                effect: "gen_recolor",
                args: `prompt_${promptToSend};to-color_${color};multiple_${multiple}`
            });

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
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Generative Fill</Text>

                {

                    <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] relative items-center rounded-[10px] justify-center'>

                        <Image
                            onLoadStart={() => setLoadingMessage("Background Replace in progress...")}
                            onLoad={() => setLoadingMessage("")}
                            onError={() => {
                                setLoadingMessage("")
                                Alert.alert("Error", "something went wrong while loading images. try again later");
                                setTransformedImageUrl(undefined)
                            }}
                            resizeMode={"contain"}
                            className={`w-full absolute top-0 left-0 h-full ${loadingMessage ? "opacity-0" : "opacity-100"}`}
                            source={transformedImageUrl
                                ? { uri: transformedImageUrl }
                                : img?.uri
                                    ? { uri: img.uri }
                                    : require("@/assets/images/transparent.png")}
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
                <TextInput
                    value={prompt}
                    onChangeText={(e) => handleItems(e)}
                    numberOfLines={3}
                    placeholder={items.length === 0 ? 'Items to recolor separate my comma. (3 max)' : items.length >= 3 ? "Max items selected" : "New items"}
                    className='mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline'
                    placeholderTextColor={"#65558F"}
                />

                {/* items to recolor */}
                <View className={`flex-row mt-2 w-full flex-wrap gap-x-2 justify-start items-center ${items.length ? "" : "hidden"}`}>
                    {
                        items.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => removeItem(index)} key={index} className='flex-row h-6 pr-2 gap-x-2 bg-outline rounded-full justify-between items-center'>
                                    <Text
                                        style={{
                                            fontFamily: "Poppins-Medium",
                                        }}
                                        className='text-text mr-1 mb-0.5 text-sm'
                                    >{item.toLowerCase()}</Text>
                                    <Image resizeMode={"contain"} className='w-2.5 aspect-square' source={require("@/assets/icons/crossIcon.png")} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>


                <View className='flex-row justify-between items-center mt-4 gap-x-3'>
                    <TouchableOpacity onPress={() => setMultiple(prev => !prev)} activeOpacity={1} className='flex-row py-1.5 items-center'>
                        <Checkbox value={multiple} onValueChange={setMultiple} color={multiple ? "#326AFD" : "white"} />
                        <Text className='text-text ml-2'>Recolor multiple</Text>
                    </TouchableOpacity>


                    <View className='w-1/2 h-full flex-row justify-end gap-x-3 items-center'>
                        <Text className='text-text'>Color</Text>
                        <TouchableOpacity className='bg-green-500 h-full w-8/12 rounded-sm' />
                    </View>
                </View>

                {/* buttons */}
                <View className='flex-row justify-between items-center mt-4'>
                    <Link href={".."} asChild>
                        <TouchableOpacity activeOpacity={0.5} className='border-2 border-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                            <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Cancel</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity onPress={handleTransformation} activeOpacity={0.5} className='bg-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>{(transformedImageUrl && !loadingMessage) ? "Save" : "Recolor"}</Text>
                    </TouchableOpacity>
                </View>



                {/* <ColorPickerModel /> */}
            </ScrollView>


            {/* Ad here  */}
            {allowAds && <BannerAdComponent size={BannerAdSize.LEADERBOARD} />}
        </View>
    )
}

export default GenerativeFill