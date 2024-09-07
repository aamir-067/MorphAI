import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import LoadingWithMessage from '@/components/loadingWithMessage';
import { replaceBackground } from '@/utils/effects/replaceBackground';
import { rewarded } from '@/ads/reward';
import { BannerAdSize, RewardedAdEventType } from 'react-native-google-mobile-ads';
import BannerAdComponent from '@/ads/banner';
import { GlobalContext } from '@/context/contextProvider';
import { validateAppVersion } from '@/utils/validateAppVersion';
// import { requestReview } from '@/utils/requestReview';


const backgroundReplace = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");
    const { allowAds } = useContext(GlobalContext);

    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setTransformedImageUrl(undefined);
        setImg(asset)
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

            setLoadingMessage("Initializing Background Replace...");

            await validateAppVersion();


            if (allowAds && rewarded.loaded) {
                rewarded.show();
            }

            // if (!rewardEarned) {
            //     setLoadingMessage("Please watch the ad to proceed");
            //     return;
            // }


            const transformedUrl = await replaceBackground({ image: img, prompt: prompt });
            if (transformedUrl) {
                setTransformedImageUrl(transformedUrl);
                // await requestReview();
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


    // ========= ad setup ===========
    // const [rewardEarned, setRewardEarned] = useState<any>(false);
    // const [loaded, setLoaded] = useState(false);
    // useEffect(() => {
    //     const unsubscribeEarned = rewarded.addAdEventListener(
    //         RewardedAdEventType.EARNED_REWARD,
    //         (reward) => {
    //             setRewardEarned(reward);
    //         },
    //     );

    //     const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, (e) => {
    //         setLoaded(true);
    //     })

    //     rewarded.load();

    //     // Unsubscribe from events on unmount
    //     return () => {
    //         unsubscribeLoaded();
    //         unsubscribeEarned();
    //     };
    // }, [img]);
    useEffect(() => {
        rewarded.load();
    }, [img]);

    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Background Replace</Text>

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
                    onChangeText={(e) => {
                        setPrompt(e);
                        transformedImageUrl && setTransformedImageUrl("");
                    }}
                    placeholder='change background to a green valley with dragons'
                    className='mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline'
                    placeholderTextColor={"#65558F"} />


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


            {allowAds && <BannerAdComponent size={BannerAdSize.LEADERBOARD} />}
        </View>
    )
}

export default backgroundReplace