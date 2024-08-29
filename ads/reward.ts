import { RewardedAd } from "react-native-google-mobile-ads";
import { AdIds } from "./ads";

const adUnitId = AdIds.rewarded;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
	keywords: ["fashion", "clothing"],
});

export { rewarded };
