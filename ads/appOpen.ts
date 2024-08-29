import { AppOpenAd, AdEventType } from "react-native-google-mobile-ads";
import { AdIds } from "./ads";

const adUnitId = AdIds.appOpen;

const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
	keywords: [
		"photography",
		"artificial intelligence",
		"productivity",
		"fashion",
		"camera",
		"photo editing",
		"chat gpt",
	],
});

// Preload an app open ad
// appOpenAd.load();

// Show the app open ad when user brings the app to the foreground.
// const showAppOpenAdd = appOpenAd.show;

export { appOpenAd };
