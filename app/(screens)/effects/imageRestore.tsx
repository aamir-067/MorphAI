import { Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import { imageRestore } from '@/utils/effects/imageRestore';
import LoadingWithMessage from '@/components/common/loadingWithMessage';
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import { GlobalContext } from '@/context/contextProvider';
import { validateAppVersion } from '@/utils/validateAppVersion';
import ActionButtons from '@/components/common/actionButtons';
import EffectImagePreview from '@/components/common/effectImagePreview';
// import { requestReview } from '@/utils/requestReview';


const ImageRestore = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [transformedImageUrl, setTransformedImageUrl] = useState<undefined | string>(undefined);
    const { allowAds } = useContext(GlobalContext);
    const [buttonText, setButtonText] = useState("Restore");
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


            setLoadingMessage("Initializing Image Restoration...");


            await validateAppVersion();
            const transformedUrl = await imageRestore({ image: img });

            if (transformedUrl) {
                setTransformedImageUrl(transformedUrl);
                // await requestReview();
            } else {
                Alert.alert("Error", "Please try again later");
                setLoadingMessage("")
                return;
            }
        } catch (error) {
            // console.log(error);
            Alert.alert("Error", "Something went wrong while processing");
            setTransformedImageUrl("");
        }
        finally {
            // setLoadingMessage("In process...")
            setLoadingMessage("")
        }
    }





    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>

                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Image Restore"}
                    image={img}
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

export default ImageRestore