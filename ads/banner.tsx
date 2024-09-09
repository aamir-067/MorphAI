import React, { useState, useRef, useContext } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';
import { AdIds } from './adIds';
import { GlobalContext } from '@/context/contextProvider';
// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId = AdIds.adaptiveBanner

function BannerAdComponent() {
    const bannerRef = useRef<BannerAd>(null);

    const { allowAds } = useContext(GlobalContext);

    // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
    // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    })

    return (
        <>
            {
                allowAds ? <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
                    : null
            }
        </>
    );
}

export default BannerAdComponent
