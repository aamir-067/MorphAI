import { Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import LoadingWithMessage from '@/components/common/loadingWithMessage';
import { imageUpscale } from '@/utils/effects/imageUpscale';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { GlobalContext } from '@/context/contextProvider';
import { rewarded } from '@/ads/reward';
import { validateAppVersion } from '@/utils/validateAppVersion';
import ActionButtons from '@/components/common/actionButtons';
import EffectImagePreview from '@/components/common/effectImagePreview';


const ImageUpscale = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>("");
    const [loadingMessage, setLoadingMessage] = useState("");
    const [buttonText, setButtonText] = useState("Upscale");
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


            setLoadingMessage("Initializing image upscale...");

            await validateAppVersion();


            const transformedUrl = await imageUpscale({ image: img });

            if (rewarded.loaded && allowAds) {
                rewarded.show();
            }

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
            // setLoadingMessage("");
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
                    effectTitle={"Image Upscale"}
                    image={img}
                    originalButtonText='Upscale'
                    setButtonText={setButtonText}
                    loadingMessage={loadingMessage}
                    setLoadingMessage={setLoadingMessage}
                    transformedImageUrl={transformedImageUrl}
                    setTransformedImageUrl={setTransformedImageUrl}
                />

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

export default ImageUpscale