import { upload } from "cloudinary-react-native";
import { Alert } from "react-native";
import { cld } from "./cloudinary";
export const uploadAsset = async ({ fileUri }: { fileUri: string }) => {
	const response = await upload(cld, {
		file: fileUri,
		options: { upload_preset: "unsigned_true" },
		callback: (err, result) => {
			console.log("file uploaded to ===> ", result?.secure_url);
			return result;
		},
	});
	try {
	} catch (error) {
		Alert.alert("Error", "Something went wrong while processing");
	}
};
