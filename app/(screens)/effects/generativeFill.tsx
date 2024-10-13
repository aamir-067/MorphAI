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
import { rewarded } from '@/ads/reward';
import EffectImagePreview from '@/components/common/effectImagePreview';
import ActionButtons from '@/components/common/actionButtons';

export const dots = {
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
    const { allowAds } = useContext(GlobalContext);
    const [buttonText, setButtonText] = useState("Fill");

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


            setLoadingMessage("Initializing generative Fill...");


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


            if (allowAds && rewarded.loaded) {
                rewarded.show();
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


    useEffect(() => {
        rewarded.load();
    }, [img]);


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>


                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Generative Fill"}
                    image={img}
                    originalButtonText='Fill'
                    setButtonText={setButtonText}
                    loadingMessage={loadingMessage}
                    setLoadingMessage={setLoadingMessage}
                    transformedImageUrl={transformedImageUrl}
                    setTransformedImageUrl={setTransformedImageUrl}

                />





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
                <ActionButtons
                    mainButtonAction={handleTransformation}
                    mainButtonText={buttonText}
                    loading={loadingMessage.length > 1}
                    style='pb-40'
                />



                {/* <ColorPickerModel /> */}
            </ScrollView>


            {/* Ad here  */}
            <BannerAdComponent />
        </View>
    )
}

export default GenerativeFill