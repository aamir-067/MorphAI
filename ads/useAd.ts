import { useEffect, useState, useCallback } from "react";
import {
	RewardedAd,
	RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { AdIds } from "./ads";

const adUnitId = AdIds.rewarded;

export const useAdTest = () => {
	const [rewardEarned, setRewardEarned] = useState(false);
	const [loaded, setLoaded] = useState(false);

	const rewarded = RewardedAd.createForAdRequest(adUnitId, {
		keywords: ["fashion", "clothing"],
	});

	useEffect(() => {
		const handleRewardEarned = (reward: any) => {
			setRewardEarned(true);
		};

		const handleAdLoaded = () => {
			setLoaded(true);
		};

		const unsubscribeEarned = rewarded.addAdEventListener(
			RewardedAdEventType.EARNED_REWARD,
			handleRewardEarned
		);

		const unsubscribeLoaded = rewarded.addAdEventListener(
			RewardedAdEventType.LOADED,
			handleAdLoaded
		);

		rewarded.load();

		return () => {
			unsubscribeLoaded();
			unsubscribeEarned();
		};
	}, [rewarded]);

	const showAd = async () => {
		if (loaded) {
			try {
				rewarded.show();
			} catch (error) {
				console.error("Failed to show ad:", error);
			}
		}
	};

	return { loaded, rewardEarned, show: showAd };
};
