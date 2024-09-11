import { router, Stack } from "expo-router";
import { Alert, BackHandler, StatusBar } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Network from "expo-network";
import ContextProvider from "@/context/contextProvider";
export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
        "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
        "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
        "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),

    });

    useEffect(() => {
        (async () => {
            if (loaded || error) {
                const res = await Network.getNetworkStateAsync()
                if (res.isConnected && res.isInternetReachable) {
                    SplashScreen.hideAsync();
                } else {
                    Alert.alert("Network Error", "Please connect to internet", [
                        {
                            text: "exit", onPress: () => {
                                BackHandler.exitApp();
                            }
                        }
                    ]);
                }
            }
        })()
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <SafeAreaView className="bg-background h-full">
            <ContextProvider>
                <StatusBar animated={true} barStyle={"light-content"} />
                <Stack screenOptions={{ navigationBarHidden: true, navigationBarColor: "dark" }}>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(screens)" options={{ headerShown: false }} />
                </Stack>
            </ContextProvider>
        </SafeAreaView>
    );

}
