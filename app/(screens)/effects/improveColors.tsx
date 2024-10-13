import { Text, View, TouchableOpacity, TextInput, ScrollView, SectionList, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import LoadingWithMessage from '@/components/common/loadingWithMessage';
import { downloadImage } from '@/utils/downloadFile';
import { generalTransformation } from '@/utils/effects/generalTransformation';
import { GlobalContext } from '@/context/contextProvider';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { rewarded } from '@/ads/reward';
import { validateAppVersion } from '@/utils/validateAppVersion';
import EffectImagePreview from '@/components/common/effectImagePreview';
import PromptComponent from '@/components/common/promptComponent';
import ActionButtons from '@/components/common/actionButtons';
import DropDown from '@/components/dropDown';


const ImproveColors = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [showDropdown, setShowDropdown] = useState(false);
    const [mode, setMode] = useState("indoor");
    const [blend, setBlend] = useState("");
    const [loadingMessage, setLoadingMessage] = useState("");
    const [buttonText, setButtonText] = useState("Improve");
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>("");
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
            await downloadImage({ imageUrl: transformedImageUrl }).then(() => {
                Alert.alert("Image Downloaded Successful");
            }).finally(() => {
                setLoadingMessage("");
                setTransformedImageUrl("");
            })
            return;
        }

        try {
            // make sure the image is selected.
            if (img == undefined) {
                Alert.alert("please select the image first");
                return;
            }

            setLoadingMessage("Initializing color improvement...");


            await validateAppVersion();


            if (allowAds && rewarded.loaded) {
                rewarded.show();
            }


            const transformedUrl = await generalTransformation({ image: img, effect: "improve", args: `${mode}:${Number(blend) > 100 ? 100 : blend.length == 0 ? 70 : blend}` });

            if (transformedUrl) {
                setTransformedImageUrl(transformedUrl);
            } else {
                Alert.alert("Error", "Please try again later");
                setLoadingMessage("");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong while processing");
        } finally {
            setLoadingMessage("");
        }
    }


    const onBlendChange = (e: string) => {
        transformedImageUrl && setTransformedImageUrl("");
        let num = Number(e);
        if (Number.isNaN(num)) { return; }
        if (num > 100) {
            setBlend("100")
        }
        else if (num < 0) {
            setBlend("0")
        }
        else {
            setBlend(num + "")
        }
    }

    // ad setup
    useEffect(() => {
        rewarded.load();
    }, [img]);


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                {/* <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Improve Image Colors</Text> */}

                {
                    // <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] relative items-center rounded-[10px] justify-center'>

                    //     <Image
                    //         onLoadStart={() => setLoadingMessage("Color improvement in progress...")}
                    //         onLoad={() => {
                    //             setLoadingMessage("");
                    //             transformedImageUrl ? setButtonText("Save") : setButtonText("Improve")
                    //         }}
                    //         onError={() => {
                    //             setLoadingMessage("")
                    //             Alert.alert("Error", "something went wrong while loading images. try again later");
                    //             setTransformedImageUrl("");
                    //             setButtonText("Improve")
                    //         }}
                    //         resizeMode={"contain"}
                    //         className={`w-full absolute top-0 left-0 h-full ${loadingMessage ? "opacity-0" : "opacity-100"}`}
                    //         source={transformedImageUrl
                    //             ? { uri: transformedImageUrl }
                    //             : img?.uri
                    //                 ? { uri: img.uri }
                    //                 : require("@/assets/images/transparent.png")}
                    //     />

                    //     <View className={`items-center absolute top-1/3 left-1/3 z-0 gap-y-2 ${(img || transformedImageUrl) ? "hidden" : ""}`}>
                    //         <Svg width="32" height="41" viewBox="0 0 32 41" fill="">
                    //             <Path d="M20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.8 40.5 4 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM6 32.5L11 25.834L14 29.834L19 23.168L26 32.5H6ZM18 14.5V3.5L29 14.5H18Z" fill="#e5e7eb" />
                    //         </Svg>
                    //         <Text style={{ fontFamily: "Outfit-Medium" }} className='text-gray-200 text-xl'>Select Image</Text>
                    //     </View>


                    //     <LoadingWithMessage message={loadingMessage} />
                    // </TouchableOpacity>
                }

                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Improve Colors"}
                    image={img}
                    originalButtonText={"Improve"}
                    setButtonText={setButtonText}
                    loadingMessage={loadingMessage}
                    setLoadingMessage={setLoadingMessage}
                    transformedImageUrl={transformedImageUrl}
                    setTransformedImageUrl={setTransformedImageUrl}
                />


                <View className='flex-row justify-between mt-4'>

                    {/* <View className='max-w-40 w-[48%]'>
                        <View className='flex-row justify-between h-[50px] overflow-hidden rounded-md bg-backgroundContainer items-center'>
                            <TextInput readOnly={true} value={mode} placeholder='Select Environment' placeholderTextColor={"#65558F"} className='capitalize px-2 w-9/12 h-full text-text' />
                            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} activeOpacity={0.5} className='h-full bg-buttonBackground aspect-square items-center justify-center'>
                                <View className='w-full h-full items-center justify-center'>
                                    <Svg width="20" height="20" viewBox="0 0 12 7" fill="none">
                                        <Path d="M5.95714 7L11.0914 0.25H0.822843L5.95714 7Z" fill="white" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        </View>


                        {
                            showDropdown && <View className={`bg-outline z-50 rounded-md absolute top-full w-full`}>
                                <Pressable onPress={() => {
                                    setMode("indoor");
                                    transformedImageUrl && setTransformedImageUrl("");
                                    setShowDropdown(false);
                                }}>
                                    <Text style={{
                                        fontFamily: "Outfit-Medium"
                                    }} className='text-text bg-black/10 p-2 rounded text-lg'>Indoor</Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                    setMode("outdoor");
                                    transformedImageUrl && setTransformedImageUrl("");
                                    setShowDropdown(false);
                                }}>
                                    <Text style={{
                                        fontFamily: "Outfit-Medium"
                                    }} className='text-text bg-black/10 mt-1 p-2 rounded text-lg'>Outdoor</Text>
                                </Pressable>
                            </View>
                        }
                    </View> */}

                    <View className='max-w-40 w-[48%]'>
                        <DropDown
                            items={["indoor", "outdoor"]}
                            setCurrentItem={setMode}
                            currentItem={mode}
                        />
                    </View>

                    <View className='flex-row justify-between h-[50px] overflow-hidden rounded-md bg-backgroundContainer items-center max-w-40 w-[48%]'>
                        <TextInput
                            value={blend.toString()}
                            onChangeText={onBlendChange}
                            keyboardType={"numeric"}
                            keyboardAppearance={"dark"}
                            placeholder='Intensity, default 70'
                            placeholderTextColor={"#65558F"}
                            className='px-3 h-full text-text'
                        />
                    </View>
                </View>

                {/* buttons */}

                <ActionButtons
                    mainButtonText={buttonText}
                    mainButtonAction={handleTransformation}
                    loading={loadingMessage.length > 0}
                    style='pb-10'
                />

            </ScrollView>


            {/* Ad here  */}
            <BannerAdComponent />
        </View>
    )
}

export default ImproveColors