import { View, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import { replaceBackground } from '@/utils/effects/replaceBackground';
import { rewarded } from '@/ads/reward';
import BannerAdComponent from '@/ads/banner';
import { GlobalContext } from '@/context/contextProvider';
import { validateAppVersion } from '@/utils/validateAppVersion';
import ActionButtons from '@/components/common/actionButtons';
import PromptComponent from '@/components/common/promptComponent';
import EffectImagePreview from '@/components/common/effectImagePreview';
// import { requestReview } from '@/utils/requestReview';


const backgroundReplace = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");
    const { allowAds } = useContext(GlobalContext);
    const [buttonText, setButtonText] = useState("Replace");

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



    const onPromptChange = (e: string) => {
        setPrompt(e);
        transformedImageUrl && setTransformedImageUrl("");
    }

    useEffect(() => {
        rewarded.load();
    }, [img]);

    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>

                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Background Replace"}
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
                    onPromptChange={onPromptChange}
                    placeholder={'Change background to a green valley with dragons'}
                />


                {/* buttons */}
                <ActionButtons
                    mainButtonAction={handleTransformation}
                    mainButtonText={buttonText}
                    loading={loadingMessage ? true : false}
                />

            </ScrollView>

            <BannerAdComponent />
        </View>
    )
}

export default backgroundReplace