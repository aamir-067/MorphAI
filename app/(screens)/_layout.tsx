import { Stack } from "expo-router";
import { View, StatusBar } from "react-native"
import NavBar from "@/components/navbar";
export default function RootLayout() {

    return (
        <>

            <View className="bg-background h-full">
                <StatusBar animated barStyle={"light-content"} />
                <NavBar />
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="effect-screen/index" options={{ headerShown: false }} />
                </Stack>
            </View>
        </>
    );
}