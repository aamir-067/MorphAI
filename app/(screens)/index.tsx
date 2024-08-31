import { Text, View, ScrollView } from "react-native";
import FeatureTool from "@/components/featurIcon";
import BackgroundEditTools from "@/components/backgroundEditTools";
import ImageEnhanceTools from "@/components/imageEnhanceTools";
import { Link } from "expo-router";
import PopularAiTools from "@/components/popularAiTools";
import BannerAdComponent from "@/ads/banner";
import { BannerAdSize } from "react-native-google-mobile-ads";
import NewAddedTools from "@/components/newAddedTools";
import { useContext } from "react";
import { GlobalContext } from "@/context/contextProvider";
export default function Index() {
    const { allowAds } = useContext(GlobalContext);
    return (
        <View className="bg-background  h-full">
            <ScrollView className="px-[10px]">
                <Text style={{ fontFamily: "Outfit-Medium" }} className="text-text text-3xl my-5">Featured Tools</Text>

                {/* featured tool */}
                <ScrollView className="mx-auto" horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Link className="mr-4" href={"/effects/generativeReplace"}>
                        <FeatureTool title={"Generative Replace"} backgroundColor={"#65558F"} icon={require("@/assets/icons/backgroundRemoveIcon.png")} />
                    </Link>

                    <Link className="mr-4" href={"/effects/magicEraser"}>
                        <FeatureTool title={"Magic Eraser"} backgroundColor={"#EFB8C8"} icon={require("@/assets/icons/magicEraserIcon.png")} />
                    </Link>

                    <Link className="mr-4" href={"/effects/backgroundReplace"}>
                        <FeatureTool title={"Background Replace"} backgroundColor={"#E8B931"} icon={require("@/assets/icons/backgroundReplaceIcon.png")} />
                    </Link>

                    <Link className="mr-4" href={"/effects/imageUpscale"}>
                        <FeatureTool title={"Upscale"} backgroundColor={"#14AE5C"} icon={require("@/assets/icons/upscaleIcon.png")} />
                    </Link>
                </ScrollView>



                {/* Newly Added */}
                <NewAddedTools />
                {/* background Edit Tools */}
                <BackgroundEditTools />

                {/* Image Enhance Tools */}
                <ImageEnhanceTools />


                {/* Popular AI tools */}
                <PopularAiTools />


                {/* to keep some distance from bottom */}
                <View className="h-8"></View>

            </ScrollView >
            {allowAds && <BannerAdComponent size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />}
        </View >
    );
}
