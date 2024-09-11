
// import { Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { Path, Svg } from 'react-native-svg'
// import { Link } from 'expo-router'
// import { Image } from 'react-native';
// import { downloadImage } from '@/utils/downloadFile';
// import { getAssetFromGallery } from '@/utils/pickAssetFromPhone';
// import { ImagePickerAsset } from 'expo-image-picker';
// import LoadingWithMessage from '@/components/loadingWithMessage';
// import { removeBackground } from '@/utils/effects/removeBackground';
// import BannerAdComponent from '@/ads/banner';
// import { BannerAdSize } from 'react-native-google-mobile-ads';
// const backgroundRemove = () => {
//     const [img, setImg] = useState<ImagePickerAsset | undefined>(undefined);
//     const [transformedImageUrl, setTransformedImageUrl] = useState<string | undefined>(undefined);
//     const [loadingMessage, setLoadingMessage] = useState("");
//     const getPicture = async () => {
//         const asset = await getAssetFromGallery({ fileType: "image" });
//         setImg(asset);
//         setTransformedImageUrl(undefined);
//     }


//     const handleTransformation = async () => {

//         // if their is transformed Image then download it.
//         if (transformedImageUrl) {
//             setLoadingMessage("Downloading...");
//             await downloadImage({ imageUrl: transformedImageUrl });
//             setLoadingMessage("");
//             setTransformedImageUrl(undefined);
//             setImg(undefined);
//             Alert.alert("Image Downloaded Successful");
//             return;
//         }

//         try {
//             // make sure the image is selected.
//             if (img == undefined) {
//                 Alert.alert("please select the image first");
//                 return;
//             }

//             setLoadingMessage("Initializing background Removal...");

//             const transformedUrl = await removeBackground({ image: img });

//             if (transformedUrl) {
//                 setTransformedImageUrl(transformedUrl);
//             } else {
//                 Alert.alert("Error", "Please try again later");
//             }
//             setLoadingMessage("");


//         } catch (error) {
//             // console.log(error);
//             setLoadingMessage("")
//             Alert.alert("Error", "Something went wrong while processing");
//         }
//     }


//     return (
//         <View className='bg-background h-full px-[10px]'>
//             <ScrollView>
//                 <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Background Remove</Text>

//                 {
//                     !loadingMessage ?
//                         <TouchableOpacity onPress={getPicture} activeOpacity={0.5} className='bg-[#1D1B20] h-[280px] items-center rounded-[10px] justify-center'>
//                             {
//                                 img ?
//                                     transformedImageUrl ?
//                                         <Image
//                                             resizeMode={"contain"}
//                                             className='w-full h-full'
//                                             source={{ uri: transformedImageUrl }}
//                                             onLoadStart={() => setLoadingMessage("background Removal in Progress...")}
//                                             onPartialLoad={() => { setLoadingMessage("Preparing Result...") }}
//                                             onLoad={() => setLoadingMessage("")}
//                                             onLoadEnd={() => { setLoadingMessage("") }}
//                                             onError={() => setLoadingMessage("")}
//                                         /> :
//                                         <Image className='w-full h-full' resizeMode={"contain"} source={{ uri: img?.uri }} />
//                                     : <View className='items-center gap-y-2'>
//                                         <Svg width="32" height="41" viewBox="0 0 32 41" fill="">
//                                             <Path d="M20 0.5H4C1.8 0.5 0 2.3 0 4.5V36.5C0 38.7 1.8 40.5 4 40.5H28C30.2 40.5 32 38.7 32 36.5V12.5L20 0.5ZM6 32.5L11 25.834L14 29.834L19 23.168L26 32.5H6ZM18 14.5V3.5L29 14.5H18Z" fill="#e5e7eb" />
//                                         </Svg>
//                                         <Text style={{ fontFamily: "Outfit-Medium" }} className='text-gray-200 text-xl'>Select Image</Text>
//                                     </View>

//                             }
//                         </TouchableOpacity> :
//                         <LoadingWithMessage message={loadingMessage} />
//                 }



//                 {/* buttons */}
//                 <View className='flex-row justify-between items-center mt-4'>
//                     <Link href={".."} asChild>
//                         <TouchableOpacity activeOpacity={0.5} className='border-2 border-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
//                             <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>Cancel</Text>
//                         </TouchableOpacity>
//                     </Link>
//                     <TouchableOpacity onPress={() => {
//                         handleTransformation()
//                     }} activeOpacity={0.5} className='bg-buttonBackground h-[50px] rounded-md justify-center items-center max-w-40 w-[48%]'>
//                         <Text style={{ fontFamily: "Poppins-SemiBold" }} className='text-text text-sm'>{transformedImageUrl ? "Save" : "Erase"}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>


//             {/* Ad here  */}
//             <BannerAdComponent size={BannerAdSize.LEADERBOARD} />
//         </View>
//     )
// }

// export default backgroundRemove




//?     ==================  Temporary    =================

import { Text, View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Link } from 'expo-router'
import BannerAdComponent from '@/ads/banner';
import { BannerAdSize } from 'react-native-google-mobile-ads';
import ComingSoon from '@/components/comingSoon';
import { GlobalContext } from '@/context/contextProvider';
const backgroundRemove = () => {
    const { allowAds } = useContext(GlobalContext)
    return (
        <View className='bg-background h-full px-[10px]'>
            <ScrollView>
                <Text style={{ fontFamily: "Outfit-Medium" }} className='text-text text-3xl my-7'>Background Remove</Text>


                <View className='justify-center h-80 items-center mt-4'>
                    <View className='items-center justify-center'>
                        <ComingSoon />
                        <Link href={".."} asChild>
                            <Text className='text-accentBlue outline outline-accentBlue mt-2 text-lg'>Back</Text>
                        </Link>
                    </View>
                </View>


            </ScrollView>


            {/* Ad here  */}
            <BannerAdComponent />
        </View>
    )
}

export default backgroundRemove