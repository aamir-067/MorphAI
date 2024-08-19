import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
export const downloadImage = async ({ imageUrl }: { imageUrl: string }) => {
	try {
		// Request permission to save files on the device
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission Denied",
				"Storage permission is required to download images"
			);
			return;
		}

		// Define the download path
		const fileUri = `${FileSystem.cacheDirectory}image.jpg`;

		// Start downloading
		const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);

		const asset = await MediaLibrary.createAssetAsync(uri);
		const album = await MediaLibrary.getAlbumAsync("Morph AI");

		if (album == null) {
			// Create a new album if it doesn't exist
			await MediaLibrary.createAlbumAsync("Morph AI", asset, false);
		} else {
			await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
		}
	} catch (error) {
		console.log(error);
		Alert.alert("Error while downloading the file...");
	}
};
