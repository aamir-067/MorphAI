import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
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
import Checkbox from 'expo-checkbox';
import { validateAppVersion } from '@/utils/validateAppVersion';
import EffectImagePreview from '@/components/common/effectImagePreview';
import PromptComponent from '@/components/common/promptComponent';
import CustomCheckBox from '@/components/common/customCheckBox';
import ActionButtons from '@/components/common/actionButtons';


const MagicEraser = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [removeAllInstances, setRemoveAllInstances] = useState(false);
    const [removeShadows, setRemoveShadows] = useState(false);
    const [buttonText, setButtonText] = useState("Erase");
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


            await validateAppVersion();

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

                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Generative Remove"}
                    image={img}
                    setButtonText={setButtonText}
                    loadingMessage={loadingMessage}
                    setLoadingMessage={setLoadingMessage}
                    transformedImageUrl={transformedImageUrl}
                    setTransformedImageUrl={setTransformedImageUrl}
                />


                {/* prompt Area */}
                <PromptComponent
                    promptValue={prompt}
                    onPromptChange={(e) => {
                        setPrompt(e)
                        transformedImageUrl && setTransformedImageUrl("");
                    }}
                    placeholder={'Erase the person in the left from car'}
                />


                {/* to remove shadows, and target multiple instances */}
                <View className='flex-row justify-between items-center mt-4'>
                    <CustomCheckBox
                        checked={removeAllInstances}
                        onChecked={() => {
                            setRemoveAllInstances(prev => !prev)
                            transformedImageUrl && setTransformedImageUrl("");
                        }}
                        label={"Detect Multiple"}
                    />
                    <CustomCheckBox
                        checked={removeShadows}
                        onChecked={() => {
                            setRemoveShadows(prev => !prev)
                            transformedImageUrl && setTransformedImageUrl("");
                        }}
                        label={"Remove Shadows"}
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

export default MagicEraser