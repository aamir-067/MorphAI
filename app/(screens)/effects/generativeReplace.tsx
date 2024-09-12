import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import { generativeReplace } from '@/utils/effects/generativeReplace';
import LoadingWithMessage from '@/components/common/loadingWithMessage';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { GlobalContext } from '@/context/contextProvider';
import Checkbox from 'expo-checkbox';
import { validateAppVersion } from '@/utils/validateAppVersion';
import ActionButtons from '@/components/common/actionButtons';
import CustomCheckBox from '@/components/common/customCheckBox';
import PromptComponent from '@/components/common/promptComponent';
import EffectImagePreview from '@/components/common/effectImagePreview';
import { rewarded } from '@/ads/reward';


const GenerativeReplace = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [detectMultiple, setDetectMultiple] = useState(false);
    const [preserveGeometry, setPreserveGeometry] = useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>("");
    const [loadingMessage, setLoadingMessage] = useState("");
    const [buttonText, setButtonText] = useState("Replace");
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


            await validateAppVersion();


            if (allowAds && rewarded.loaded) {
                rewarded.show()
            }


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

    useEffect(() => {
        rewarded.load();
    }, [img]);


    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Generative Replace"}
                    image={img}
                    setButtonText={setButtonText}
                    loadingMessage={loadingMessage}
                    setLoadingMessage={setLoadingMessage}
                    transformedImageUrl={transformedImageUrl}
                    setTransformedImageUrl={setTransformedImageUrl}
                />


                {/* prompt Area */}
                <View className='flex-row justify-between items-center'>

                    <PromptComponent
                        onPromptChange={(e) => {
                            setFrom(e);
                            transformedImageUrl && setTransformedImageUrl("");
                        }}
                        promptValue={from}
                        placeholder={"From"}
                        style='w-[48%]'
                    />
                    <PromptComponent
                        onPromptChange={(e) => {
                            setTo(e);
                            transformedImageUrl && setTransformedImageUrl("");
                        }}
                        promptValue={to}
                        placeholder={"To"}
                        style='w-[48%]'
                    />

                </View>


                <View className='flex-row justify-between items-center mt-4'>

                    <CustomCheckBox
                        checked={detectMultiple}
                        onChecked={() => {
                            setDetectMultiple(prev => !prev)
                            transformedImageUrl && setTransformedImageUrl("");
                        }}
                        label={"Detect Multiple"}
                    />
                    <CustomCheckBox
                        checked={preserveGeometry}
                        onChecked={() => {
                            setPreserveGeometry(prev => !prev)
                            transformedImageUrl && setTransformedImageUrl("");
                        }}
                        label={"Preserve Geometry"}
                    />

                </View>

                {/* buttons */}
                <ActionButtons
                    mainButtonAction={handleTransformation}
                    mainButtonText={buttonText}
                    loading={loadingMessage.length > 1}
                />

            </ScrollView>


            {/* Ad here  */}
            <BannerAdComponent />
        </View>
    )
}

export default GenerativeReplace