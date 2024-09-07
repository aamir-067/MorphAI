// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as StoreReview from "expo-store-review";
// import { Alert } from "react-native";
// import { Linking } from "react-native";

// const androidPackageName = "com.aamir067.morphai";
// const itunesItemId = 508787257;
// export const requestReview = async () => {
// 	await AsyncStorage.removeItem("isRequestReview");
// 	const effectsUsed = await AsyncStorage.getItem("effectsUsed");
// 	const isRequested = await AsyncStorage.getItem("isRequestReview");

// 	try {
// 		await AsyncStorage.setItem(
// 			"effectsUsed",
// 			effectsUsed ? `${Number(effectsUsed) + 1}` : "1"
// 		);

// 		if (!effectsUsed || isRequested == "true") {
// 			return;
// 		}

// 		if (effectsUsed && Number(effectsUsed) >= 2 && !isRequested) {
// 			const isActive = await StoreReview.hasAction();
// 			const isAvailable = await StoreReview.isAvailableAsync();
// 			if (isActive && isAvailable) {
// 				await StoreReview.requestReview();
// 				// Alert.alert("Review Requested");
// 				console.log("request review");
// 			} else {
// 				// console.log("request review");
// 				// Alert.alert("Review Requested");
// 				// Linking.openURL(
// 				// 	`market://details?id=${androidPackageName}&showAllReviews=true`
// 				// );
// 				//? for ios
// 				// Linking.openURL(
// 				// 	`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
// 				// );
// 			}

// 			await AsyncStorage.setItem("isRequestReview", "true");
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
