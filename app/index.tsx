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
        <View className="bg-background min-h-screen">
            <ScrollView className="px-[10px]">


                <Link href={"/(screens)"} replace>
                    <Text className="text-5xl text-text">Hello World</Text>
                </Link>


            </ScrollView >
        </View >
    );
}




