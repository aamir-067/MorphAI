import { version as currentAppVersion, server } from "@/CONSTANTS";
import { Alert, BackHandler } from "react-native";

export const validateAppVersion = async () => {
	// check if the app is outdated or not.
	let latestAppVersion = currentAppVersion;
	const res = await fetch(
		server + "/api/v1/general/application-latest-version"
	);
	const data = await res.json();
	if (data.success) {
		latestAppVersion = data.data.version;
	}

	if (latestAppVersion != currentAppVersion) {
		Alert.alert(
			"Warning",
			`Kindly update the application from play store. the latest app version is ${latestAppVersion} and you are on ${currentAppVersion}`,
			[
				{
					text: "ok",
					style: "destructive",
					onPress: () => {
						BackHandler.exitApp();
					},
				},
			]
		);
		// return;
		// close the app
		// BackHandler.exitApp();
	}
};
