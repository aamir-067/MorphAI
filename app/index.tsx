import { Text, View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import ProIcon from "@/components/nav/proIcon";
export default function Index() {

    return (
        <View style={{
            backgroundColor: "white"
        }}>
            <ScrollView>
                <SafeAreaView style={{
                    // backgroundColor: "black",
                    height: 900,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        color: "black",
                    }}>Hello world</Text>
                    <ProIcon />
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}
