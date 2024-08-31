import { Stack } from "expo-router";
import { View, StatusBar } from "react-native"
export default function RootLayout() {

    return (
        <>

            <View className="bg-background h-full">
                <StatusBar animated barStyle={"light-content"} />
                {/* <NavBar /> */}
                <Stack screenOptions={{ navigationBarHidden: true, navigationBarColor: "black" }}>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/backgroundRemove" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/backgroundReplace" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/imageRestore" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/imageUpscale" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/magicEraser" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/generativeReplace" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/improveColors" options={{ headerShown: false }} />
                    <Stack.Screen name="effects/generativeRecolor" options={{ headerShown: false }} />
                </Stack>
            </View>
        </>
    );
}
