import { Text, View, TouchableOpacity, ScrollView, Image, LogBox } from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { interstitial } from "@/ads/interstitial";
import { AdEventType, BannerAdSize } from "react-native-google-mobile-ads";
import { GlobalContext } from "@/context/contextProvider";
import BannerAdComponent from "@/ads/banner";
import FullscreenLoading from "@/components/fullscreenLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Index() {
    const [loading, setLoading] = useState(false);
    interstitial.load();
    const { firstVisit, allowAds } = useContext(GlobalContext)

    const openAdAndRoute = () => {
        try {
            if (interstitial.loaded && !firstVisit && allowAds) {
                interstitial.show();
            }
            router.replace("/(screens)")
        } catch (error) {
        }
    }



    useEffect(() => {
        if (allowAds && !firstVisit && interstitial.loaded) interstitial.show();
    }, []);



    // useEffect(() => {
    //     (async () => {
    //         const firstTime = await AsyncStorage.getItem("firstTime");
    //         if (firstTime !== null && firstTime == "false") {
    //             setTimeout(() => {
    //                 router.replace("/(screens)");
    //                 setLoading(false);
    //             }, 0)
    //         } else {
    //             await AsyncStorage.setItem("firstTime", "false");
    //             setLoading(false);
    //         }
    //     })()
    // }, [])


    return (
        <View className="bg-background h-full">
            {
                (!firstVisit || loading) ?

                    <View className="w-full h-full justify-center items-center">
                        <FullscreenLoading />
                    </View> :

                    <ScrollView className="px-[10px]">
                        <View className="w-full p-2 mt-4 items-center justify-center aspect-square">
                            <Image className="w-full h-full object-contain" source={require("@/assets/images/landing-page-illustrator.png")} />
                        </View>

                        <View className="">
                            <Text style={{ fontFamily: "Poppins-SemiBold" }} className="text text-text text-[28px]">Transform images with</Text>
                            <Text style={{ fontFamily: "Outfit-Bold" }} className="text-4xl text-accentBlue">MorphAI</Text>
                        </View>

                        <Text style={{ fontFamily: "Poppins-Regular" }} className="text-text mt-2">Unlock the power of AI to effortlessly transform your photos. Easily remove backgrounds, enhance details, upscale, and restore images with precision. With just a few taps, create stunning visuals and bring your creative vision to life.</Text>

                        {/* <Link href={"/(screens)"} replace asChild> */}
                        <TouchableOpacity onPress={openAdAndRoute} activeOpacity={0.5} className="w-full bg-accentBlue mt-6 rounded-md items-center justify-center">
                            <Text style={{ fontFamily: "Poppins-SemiBold" }} className="text-text p-2">Get Started</Text>
                        </TouchableOpacity>
                        {/* </Link> */}

                    </ScrollView >
            }

        </View >
    );
}






