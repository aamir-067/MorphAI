import {
	androidPackageName,
	version as currentAppVersion,
	server,
} from "@/CONSTANTS";
import { Alert, BackHandler, Linking } from "react-native";

import ExpoConstants from "expo-constants";

ExpoConstants.systemVersion;

// export const validateAppVersion = async () => {
// 	try {
// 		// check if the app is outdated or not.
// 		let latestAppVersion = currentAppVersion;
// 		const res = await fetch(
// 			server + "/api/v1/general/application-latest-version"
// 		);
// 		const data = await res.json();
// 		if (data.success) {
// 			latestAppVersion = data.data.version;
// 		}

// 		if (latestAppVersion != currentAppVersion) {
// 			Alert.alert(
// 				"Warning",
// 				`Kindly update the application from play store.`,
// 				[
// 					{
// 						text: "exit",
// 						style: "destructive",
// 						onPress: () => {
// 							BackHandler.exitApp();
// 						},
// 					},
// 					{
// 						text: "update",
// 						onPress: async () => {
// 							try {
// 								// android
// 								if (
// 									await Linking.canOpenURL(
// 										`market://details?id=${androidPackageName}`
// 									)
// 								) {
// 									Linking.openURL(
// 										`market://details?id=${androidPackageName}`
// 									);
// 								} else {
// 									BackHandler.exitApp();
// 								}

// 								//? for ios
// 								// if (
// 								// 	await Linking.canOpenURL(
// 								// 		`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}`
// 								// 	)
// 								// ) {
// 								// 	Linking.canOpenURL(
// 								// 		`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}`
// 								// 	);
// 								// } else {
// 								// 	BackHandler.exitApp();
// 								// }
// 							} catch (error) {
// 								BackHandler.exitApp();
// 							}
// 						},
// 					},
// 				]
// 			);
// 		}
// 	} catch (error) {}
// };

// export const validateAppVersion = async () => {
// 	// Alert.alert("Warning", `Kindly update the application from play store.`, [
// 	// 	{
// 	// 		text: "exit",
// 	// 		style: "destructive",
// 	// 		onPress: () => {
// 	// 			BackHandler.exitApp();
// 	// 		},
// 	// 	},
// 	// 	{
// 	// 		text: "update",
// 	// 		onPress: async () => {
// 	// 			try {
// 	// 				// android
// 	// 				if (
// 	// 					await Linking.canOpenURL(
// 	// 						`market://details?id=${androidPackageName}`
// 	// 					)
// 	// 				) {
// 	// 					Linking.openURL(
// 	// 						`market://details?id=${androidPackageName}`
// 	// 					);
// 	// 				} else {
// 	// 					BackHandler.exitApp();
// 	// 				}
// 	// 				//? for ios
// 	// 				// if (
// 	// 				// 	await Linking.canOpenURL(
// 	// 				// 		`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}`
// 	// 				// 	)
// 	// 				// ) {
// 	// 				// 	Linking.canOpenURL(
// 	// 				// 		`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}`
// 	// 				// 	);
// 	// 				// } else {
// 	// 				// 	BackHandler.exitApp();
// 	// 				// }
// 	// 			} catch (error) {
// 	// 				BackHandler.exitApp();
// 	// 			}
// 	// 		},
// 	// 	},
// 	// ]);
// };

export const validateAppVersion = async () => {
	try {
		// check if the app is outdated or not.
		let latestAppVersion = currentAppVersion.split(".").join("");
		let currentVersion = currentAppVersion.split(".").join("");
		const res = await fetch(
			server + "/api/v1/general/application-latest-version"
		);

		const data = await res.json();
		if (data.success) {
			latestAppVersion = data.data.version.split(".").join("");
		}

		console.log(latestAppVersion, currentVersion);
		if (Number(latestAppVersion) > Number(currentVersion)) {
			Alert.alert(
				"Warning",
				`Kindly update the application from play store.`,
				[
					{
						text: "exit",
						style: "cancel",
						onPress: () => {
							BackHandler.exitApp();
						},
					},
					{
						text: "update",
						onPress: async () => {
							try {
								// android
								if (
									await Linking.canOpenURL(
										`market://details?id=${androidPackageName}`
									)
								) {
									Linking.openURL(
										`market://details?id=${androidPackageName}`
									);
								} else {
									BackHandler.exitApp();
								}

								//? for ios
								// if (
								// 	await Linking.canOpenURL(
								// 		`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}`
								// 	)
								// ) {
								// 	Linking.canOpenURL(
								// 		`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}`
								// 	);
								// } else {
								// 	BackHandler.exitApp();
								// }
							} catch (error) {
								BackHandler.exitApp();
							}
						},
					},
				]
			);
		}
	} catch (error) {}
};
