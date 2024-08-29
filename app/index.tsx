import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { interstitial } from "@/ads/interstitial";
import { AdEventType } from "react-native-google-mobile-ads";
import { GlobalContext } from "@/context/contextProvider";

export default function Index() {
    const [loaded, setLoaded] = useState(false);

    const { firstVisit } = useContext(GlobalContext)

    const openAd = () => {
        try {
            if (loaded && !firstVisit) {
                interstitial.show();
            }
            router.replace("/(screens)")
        } catch (error) {
        }
    }



    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });
        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);


    useEffect(() => {
        if (!firstVisit) {
            router.replace("/(screens)")
        }
    }, [firstVisit])



    return (
        <View className="bg-background h-full">
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
                <TouchableOpacity onPress={openAd} activeOpacity={0.5} className="w-full bg-accentBlue mt-6 rounded-md items-center justify-center">
                    <Text style={{ fontFamily: "Poppins-SemiBold" }} className="text-text p-2">Get Started</Text>
                </TouchableOpacity>
                {/* </Link> */}

            </ScrollView >
        </View >
    );
}




