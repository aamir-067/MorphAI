import { Text, View, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import NavBar from "@/components/navbar";
import { SafeAreaView } from "react-native-safe-area-context"
import FeatureTool from "@/components/featurIcon";
import BackgroundEditTools from "@/components/backgroundEditTools";
import ImageEnhanceTools from "@/components/imageEnhanceTools";
export default function Index() {

    return (
        <View className="bg-background  min-h-screen">
            <ScrollView className="px-[10px]">
                <Text style={{ fontFamily: "Outfit-Medium" }} className="text-text text-3xl my-5">Featured Tools</Text>

                {/* featured tool */}
                <ScrollView horizontal={true} className="" showsHorizontalScrollIndicator={false}>
                    <FeatureTool title={"Background Remove"} />
                    <FeatureTool title={"Magic Eraser"} />
                    <FeatureTool title={"Background Replace"} />
                    <FeatureTool title={"Upscale"} />
                </ScrollView>

                {/* background Edit Tools */}
                <BackgroundEditTools />



                {/* Image Enhance Tools */}
                <ImageEnhanceTools />
                {/* Image Enhance Tools */}
                <ImageEnhanceTools />
                {/* Image Enhance Tools */}
                <ImageEnhanceTools />
                {/* Image Enhance Tools */}
                <ImageEnhanceTools />



            </ScrollView >
        </View >
    );
}
