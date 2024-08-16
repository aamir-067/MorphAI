import { Stack } from "expo-router";
import { View, StatusBar } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import NavBar from "@/components/navbar";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {

    return (
        <>

            <View className="bg-background min-h-screen">
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
