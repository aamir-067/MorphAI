import { Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Path, Svg } from 'react-native-svg'
import { Link } from 'expo-router'
import { Image } from 'react-native';
import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
import { ImagePickerAsset } from 'expo-image-picker';
import { downloadImage } from '@/utils/downloadFile';
import LoadingWithMessage from '@/components/common/loadingWithMessage';
import BannerAdComponent from '@/ads/banner';
import { GlobalContext } from '@/context/contextProvider';
import { generalTransformation } from '@/utils/effects/generalTransformation';
import Checkbox from "expo-checkbox";
import { validateAppVersion } from '@/utils/validateAppVersion';
import ColorPickerModel from '@/components/colorPickerModel';
import { rewarded } from '@/ads/reward';
import EffectImagePreview from '@/components/common/effectImagePreview';
import PromptComponent from '@/components/common/promptComponent';
import CustomCheckBox from '@/components/common/customCheckBox';
import ActionButtons from '@/components/common/actionButtons';


const GenerativeRecolor = () => {
    const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>("");
    const [items, setItems] = useState<string[]>([]);
    const [multiple, setMultiple] = useState(false);
    const [colorPicked, setColorPicked] = useState<string>("#e07484");
    const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined)
    const [loadingMessage, setLoadingMessage] = useState("");
    const { allowAds } = useContext(GlobalContext);
    const [buttonText, setButtonText] = useState("Recolor");
    const getPicture = async () => {
        const asset = await getAssetFromGallery({ fileType: "image" });
        setImg(asset)
        setTransformedImageUrl(undefined)
    }
    const handleItems = (e: string) => {
        console.log(e);
        if (items.length === 3) {
            setPrompt("");
            return;
        }
        setPrompt(e);
        if (e.endsWith(",") && items.length < 3) {
            setItems(prev => [...prev, e.slice(0, -1).trim()]);
            setPrompt("");
        }
    }

    const removeItem = (itemIndex: number) => {
        const newItems = items.filter((item, index) => index !== itemIndex);
        setItems(newItems);
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

            if (items.length === 0 && prompt.trim().length === 0) {
                Alert.alert("Prompt Missing", "Select at least one item to recolor");
                return;
            }

            setLoadingMessage("Initializing generative recolor...");

            await validateAppVersion();
            // remove the hast from the start.
            const color = colorPicked.slice(1);
            let promptToSend;

            if (items.length == 0) {
                promptToSend = `(${prompt})`;
            } else {
                promptToSend = items.length === 1 ? items.join("") : `(${items.join(";")})`;
            }


            if (allowAds && rewarded.loaded) {
                rewarded.show();
            }


            const transformedUrl = await generalTransformation({
                image: img,
                effect: "gen_recolor",
                args: `prompt_${promptToSend};to-color_${color};multiple_${multiple}`
            });

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


    useEffect(() => {
        rewarded.load();
    }, [img]);

    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <EffectImagePreview
                    getPicture={getPicture}
                    effectTitle={"Generative Recolor"}
                    image={img}
                    originalButtonText='Recolor'
                    setButtonText={setButtonText}
                    loadingMessage={loadingMessage}
                    setLoadingMessage={setLoadingMessage}
                    transformedImageUrl={transformedImageUrl}
                    setTransformedImageUrl={setTransformedImageUrl}

                />

                <PromptComponent
                    promptValue={prompt}
                    style='mt-8 h-12 px-2 bg-backgroundContainer text-gray-200 focus:border-2 rounded-md focus:border-outline'
                    onPromptChange={(e: string) => {
                        handleItems(e)
                        setTransformedImageUrl("");
                    }}
                    placeholder={items.length === 0 ? 'Items to recolor separate my comma. (3 max)' : items.length >= 3 ? "Max items selected" : "New items"}
                />

                {/* items to recolor */}
                <View className={`flex-row mt-2 w-full flex-wrap gap-x-2 justify-start items-center ${items.length ? "" : "hidden"}`}>
                    {
                        items.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => removeItem(index)} key={index} className='flex-row h-6 pr-2 gap-x-2 bg-outline rounded-full justify-between items-center'>
                                    <Text
                                        style={{
                                            fontFamily: "Poppins-Medium",
                                        }}
                                        className='text-text mr-1 mb-0.5 text-sm'
                                    >{item.toLowerCase()}</Text>
                                    <Image resizeMode={"contain"} className='w-2.5 aspect-square' source={require("@/assets/icons/crossIcon.png")} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>


                <View className='flex-row justify-between items-center mt-4 gap-x-3'>
                    <View>
                        <CustomCheckBox
                            checked={multiple}
                            style='pl-3'
                            onChecked={() => {
                                setMultiple(prev => !prev)
                                transformedImageUrl && setTransformedImageUrl("");
                            }}
                            label={"Recolor Multiple"}
                        />
                    </View>


                    <View className='w-1/2 h-full flex-row justify-end gap-x-3 items-center'>
                        <Text className='text-text'>Color</Text>
                        <ColorPickerModel colorPicked={colorPicked} setColorPicked={setColorPicked} />
                    </View>
                </View>

                {/* buttons */}
                <ActionButtons
                    mainButtonAction={handleTransformation}
                    mainButtonText={buttonText}
                    loading={loadingMessage ? true : false}
                />

            </ScrollView>


            {/* Ad here  */}
            <BannerAdComponent />
        </View>
    )
}

export default GenerativeRecolor