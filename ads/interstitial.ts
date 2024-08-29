import {
	InterstitialAd,
	TestIds,
	AdEventType,
} from "react-native-google-mobile-ads";
import { AdIds } from "./ads";

const adUnitId = AdIds.Interstitial;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
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

export { interstitial };
