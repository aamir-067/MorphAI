import { RewardedAd } from "react-native-google-mobile-ads";
import { AdIds } from "./adIds";

const adUnitId = AdIds.rewarded;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
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

export { rewarded };
