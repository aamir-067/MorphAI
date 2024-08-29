import { router, Stack } from "expo-router";
import { Alert, StatusBar } from "react-native"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Network from "expo-network";
// import { appOpenAd } from "@/ads/appOpen";
import ContextProvider, { GlobalContext } from "@/context/contextProvider";
export default function RootLayout() {
    const [loaded, error] = useFonts({
        "Outfit-Bold": require("../assets/fonts/Outfit-Bold.ttf"),
        "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
        "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
        "Outfit-SemiBold": require("../assets/fonts/Outfit-SemiBold.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),

    });

    // const { firstVisit } = useContext(GlobalContext);

    useEffect(() => {
        (async () => {
            // appOpenAd.load();
            if (loaded || error) {
                const res = await Network.getNetworkStateAsync()
                if (res.isConnected && res.isInternetReachable) {
                    SplashScreen.hideAsync();
                    // (appOpenAd.loaded && !firstVisit) && appOpenAd.show()
                } else {
                    Alert.alert("Network Error", "Please connect to internet");
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
