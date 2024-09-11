import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg';
import LoadingWithMessage from './loadingWithMessage';
import { ImagePickerAsset } from 'expo-image-picker';
import SelectImageIcon from '../selectImageIcon';


interface Props {
    effectTitle: string
    getPicture: () => Promise<void>
    loadingMessage: string
    setLoadingMessage: React.Dispatch<React.SetStateAction<string>>
    setButtonText: React.Dispatch<React.SetStateAction<string>>
    transformedImageUrl: string | undefined
    setTransformedImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>
    image: ImagePickerAsset | undefined
}
const EffectImagePreview = ({
    effectTitle,
    getPicture,
    loadingMessage,
    setButtonText,
    setLoadingMessage,
    setTransformedImageUrl,
    image,
    transformedImageUrl
}: Props) => {


    const onImageLoadError = () => {
        setLoadingMessage("");
        Alert.alert("Error", "something went wrong while loading images. try again later");
        setTransformedImageUrl(undefined);
        setButtonText("Replace");
    }

    const onImageLoad = () => {
        setLoadingMessage("");
        transformedImageUrl ? setButtonText("Save") : setButtonText("Replace");
    }

    const imageSource = transformedImageUrl
        ? { uri: transformedImageUrl }
        : image?.uri
            ? { uri: image.uri }
            : require("@/assets/images/transparent.png")


    return (
        <>
            <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>{effectTitle}</Text>

            {<TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] relative items-center rounded-[10px] justify-center'>

                <Image
                    onLoadStart={() => setLoadingMessage(`${effectTitle} in progress...`)}
                    onLoad={onImageLoad}
                    onError={onImageLoadError}
                    resizeMode={"contain"}
                    className={`w-full absolute top-0 left-0 h-full ${loadingMessage ? "opacity-0" : "opacity-100"}`}
                    source={imageSource} />

                <View className={`items-center absolute top-1/3 left-1/3 z-0 gap-y-2 ${(image || transformedImageUrl) ? "hidden" : ""}`}>
                    <SelectImageIcon />
                </View>


                <LoadingWithMessage message={loadingMessage} />
            </TouchableOpacity>}
        </>
    )
}

export default EffectImagePreview