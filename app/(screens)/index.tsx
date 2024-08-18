import { Text, View, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import NavBar from "@/components/navbar";
import { SafeAreaView } from "react-native-safe-area-context"
import FeatureTool from "@/components/featurIcon";
import BackgroundEditTools from "@/components/backgroundEditTools";
import ImageEnhanceTools from "@/components/imageEnhanceTools";
import { Link } from "expo-router";
export default function Index() {

    return (
        <View className="bg-background  h-full">
            <ScrollView className="px-[10px]">
                <Text style={{ fontFamily: "Outfit-Medium" }} className="text-text text-3xl my-5">Featured Tools</Text>

                {/* featured tool */}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Link className="mr-4" href={"/effects/backgroundRemove"}>
                        <FeatureTool title={"Background Remove"} backgroundColor={"#65558F"} />
                    </Link>


                    <Link className="mr-4" href={"/effects/backgroundRemove"}>
                        <FeatureTool title={"Magic Eraser"} backgroundColor={"#EFB8C8"} />
                    </Link>
                    <Link className="mr-4" href={"/effects/backgroundReplace"}>
                        <FeatureTool title={"Background Replace"} backgroundColor={"#E8B931"} />
                    </Link>

                    <Link className="mr-4" href={"/effects/backgroundRemove"}>
                        <FeatureTool title={"Upscale"} backgroundColor={"#14AE5C"} />
                    </Link>
                </ScrollView>

                {/* background Edit Tools */}
                <BackgroundEditTools />



                {/* Image Enhance Tools */}
                <ImageEnhanceTools />
                {/* AI Powered Tools */}
                {/* <ImageEnhanceTools /> */}



            </ScrollView >
        </View >
    );
}
