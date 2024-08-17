import { Text, View, TouchableOpacity, ScrollView, Image, StatusBar } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Link } from "expo-router";
export default function Index() {

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





                <Link href={"/(screens)"} asChild>
                    <TouchableOpacity activeOpacity={0.5} className="w-full bg-accentBlue mt-6 rounded-md items-center justify-center">
                        <Text style={{ fontFamily: "Poppins-SemiBold" }} className="text-text p-2">Get Started</Text>
                    </TouchableOpacity>
                </Link>


            </ScrollView >
        </View >
    );
}




