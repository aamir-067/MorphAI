import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import { generativeReplace } from '@/utils/effects/generativeReplace';
import LoadingWithMessage from '@/components/loadingWithMessage';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { GlobalContext } from '@/context/contextProvider';
import Checkbox from 'expo-checkbox';


const GenerativeReplace = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [detectMultiple, setDetectMultiple] = useState(false);
    const [preserveGeometry, setPreserveGeometry] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [transformedImageUrl, setTransformedImageUrl] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("");
    const { allowAds } = useContext(GlobalContext);
    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setTransformedImageUrl("");
        setImg(asset)
    }


    const handleTransformation = async () => {
        if (loadingMessage) return;  // means something is processing
        // if their is transformed Image then download it.
        if (transformedImageUrl) {
            setLoadingMessage("Downloading...");
            await downloadImage({ imageUrl: transformedImageUrl });
            setLoadingMessage("");
            setTransformedImageUrl("");
            Alert.alert("Image Downloaded Successful");
            return;
        }

        try {
            // make sure the image is selected.
            if (img == undefined) {
                Alert.alert("please select the image first");
                return;
            }

            if (from == "" || to == "") {
                Alert.alert("Missing arguments", "please enter both From and To values to proceed");
                return;
            }

            setLoadingMessage("Initializing Generative Replace...");

            const transformedUrl = await generativeReplace({ image: img, from, to, preserveShape: preserveGeometry, replaceAllInstances: detectMultiple });
            if (transformedUrl) {
                setTransformedImageUrl(transformedUrl);
            } else {
                Alert.alert("Error", "Please try again later");
            }
        } catch (error) {
            // console.log(error);
            Alert.alert("Error", "Something went wrong while Generative Replace effect");
        } finally {
            setLoadingMessage("");
        }
    }


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Generative Replace</Text>

                {

                    <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] relative items-center rounded-[10px] justify-center'>
                        <Image
                            onLoadStart={() => setLoadingMessage("Background Replace in progress...")}
                            onLoad={() => setLoadingMessage("")}
                            onError={() => {
                                setLoadingMessage("")
                                Alert.alert("Error", "something went wrong while loading images. try again later");
                                setTransformedImageUrl("")
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
                <View className='flex-row mt-8 justify-between items-center'>
                    <TextInput onChangeText={(e) => setFrom(e)} value={from} placeholder='From' className=' h-12 w-[45%] px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline' placeholderTextColor={"#65558F"} />
                    <TextInput onChangeText={(e) => setTo(e)} value={to} placeholder='To' className='h-12 w-[45%] px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline' placeholderTextColor={"#65558F"} />

                </View>

                {/* size of the image. width and height */}
                <View className='flex-row justify-between items-center mt-4'>

                    <TouchableOpacity onPress={() => setDetectMultiple(prev => !prev)} activeOpacity={1} className='flex-row py-1.5 items-center'>
                        <Checkbox value={detectMultiple} onValueChange={setDetectMultiple} color={detectMultiple ? "#326AFD" : "white"} />
                        <Text className='text-text ml-2'>Detect multiple</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setPreserveGeometry(prev => !prev)} activeOpacity={1} className='flex-row py-1.5 items-center'>
                        <Checkbox value={preserveGeometry} onValueChange={setPreserveGeometry} color={preserveGeometry ? "#326AFD" : "white"} />
                        <Text className='text-text ml-2'>Preserve Geometry</Text>
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
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>{(transformedImageUrl && !loadingMessage) ? "Save" : "Replace"}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>


            {/* Ad here  */}
            {allowAds && <BannerAdComponent size={BannerAdSize.LEADERBOARD} />}
        </View>
    )
}

export default GenerativeReplace