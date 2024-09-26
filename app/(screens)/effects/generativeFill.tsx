import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import LoadingWithMessage from '@/components/common/loadingWithMessage';
import { generativeRemove } from '@/utils/effects/generativeRemove';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { GlobalContext } from '@/context/contextProvider';
import { generalTransformation } from '@/utils/effects/generalTransformation';
import Checkbox from "expo-checkbox";
import { validateAppVersion } from '@/utils/validateAppVersion';
import FocusBox from '@/components/focusBox';
import DropDown from '@/components/dropDown';
import PromptComponent from '@/components/common/promptComponent';
import { generativeFill } from '@/utils/effects/generativeFill';


const dots = {
    north_west: 0,
    north: 1,
    north_east: 2,
    west: 3,
    center: 4,
    east: 5,
    south_west: 6,
    south: 7,
    south_east: 8,
}

const GenerativeFill = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");

    // parameters
    const [aspect, setAspect] = useState<"Square" | "Portrait" | "Landscape" | "Custom">("Square");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [focus, setFocus] = useState<keyof typeof dots>("center");




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


            setLoadingMessage("Initializing generative recolor...");


            await validateAppVersion();

            if (!img || !aspect || !focus) {
                Alert.alert("Error",
                    !img ? "Image is missing, kindly select image to transform." :
                        "please fill the inputs"
                );
                return;
            }

            // if the aspect is custom then the height and width are must.
            if (aspect === "Custom") {
                if (!height.trim() || !width.trim()) {
                    Alert.alert("Error", "Image dimensions are missing. Enter height and width to continue");
                    return;
                }
            }


            // console.log("generative fill", aspect, height, width, focus);
            const transformedUrl = await generativeFill({
                image: img,
                aspect,
                height,
                width,
                focus
            });

            if (transformedUrl) {
                setTransformedImageUrl(transformedUrl);
            } else {
                Alert.alert("Error", "Please try again later");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong while processing");
        }
        finally {
            setLoadingMessage("");
        }
    }



    const handleHeight = (newDimension: string) => {
        handleDimensionChange(newDimension, "height");
    }
    const handleWidth = (newDimension: string) => {
        handleDimensionChange(newDimension, "width");
    }
    const handleDimensionChange = (newDimension: string, item: "height" | "width") => {
        // make sure that the number is not greater then 2000. else only save 2000. and if its -ve then save 0.
        if (parseInt(newDimension) > 2000) {
            item === "height" ? setHeight("2000") : setWidth("2000");
        } else if (parseInt(newDimension) < 0) {
            item === "height" ? setHeight("0") : setWidth("0");
        } else {
            item === "height" ? setHeight(newDimension) : setWidth(newDimension);
        }
    }


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Generative Fill</Text>

                {

                    <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] relative items-center rounded-[10px] justify-center'>

                        <Image
                            onLoadStart={() => setLoadingMessage("Generative fill in progress...")}
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




                <View className='flex-row justify-between z-50 items-center mt-4'>
                    <View className='w-1/2 max-w-40'>
                        <DropDown
                            items={["Square", "Portrait", "Landscape", "Custom"]}
                            setCurrentItem={setAspect}
                            currentItem={aspect}
                        />
                    </View>

                    <View className='w-1/2 h-full flex-row justify-evenly gap-x-3 items-center'>
                        <Text className='text-text mr-2'>Focus on</Text>
                        <FocusBox
                            selected={focus}
                            setSelected={setFocus}
                            dots={dots}
                        />
                    </View>
                </View>


                {/* custom pixels */}
                {aspect === "Custom" ? <View className='flex flex-row -mt-4 justify-between items-center'>
                    <View className='w-[48%] max-w-40'>
                        <PromptComponent
                            promptValue={height}
                            onPromptChange={handleHeight}
                            placeholder={"height"}
                            keyboardType={"numeric"}
                        />
                    </View>
                    <View className='w-[48%] max-w-40'>
                        <PromptComponent
                            promptValue={width}
                            onPromptChange={handleWidth}
                            placeholder={"width"}
                            keyboardType={"numeric"}
                        />
                    </View>
                </View> : null}

                {/* buttons */}
                <View className='flex-row justify-between pb-96 items-center mt-4'>
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
            <BannerAdComponent />
        </View>
    )
}

export default GenerativeFill