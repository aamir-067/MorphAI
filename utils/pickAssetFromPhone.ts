import * as ImagePicker from "expo-image-picker";

export const getAssetFromGallery = async ({
	fileType,
}: {
	fileType: "image" | "video";
}): Promise<ImagePicker.ImagePickerAsset | undefined> => {
	try {
		let mediaTypeToPick =
			fileType === "image"
				? ImagePicker.MediaTypeOptions.Images
				: ImagePicker.MediaTypeOptions.Videos;

		const res = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: mediaTypeToPick,
			allowsEditing: false,
			quality: 0.2,
			videoMaxDuration: 1800,
		});

		if (res?.canceled == false) {
			const asset = res?.assets[0];
			console.log("asset Selected => ", asset);
			return asset;
		}

		return undefined;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
