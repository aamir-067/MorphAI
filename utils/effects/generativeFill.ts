import { dots } from "@/app/(screens)/effects/generativeFill";
import { server } from "@/CONSTANTS";
import { ApiResponse } from "@/interfaces/IApiResponse";
import { ImagePickerAsset } from "expo-image-picker";
import { Alert } from "react-native";
import { validateAppVersion } from "../validateAppVersion";

interface Props {
	image: ImagePickerAsset | undefined;
	aspect: "Square" | "Portrait" | "Landscape" | "Custom";
	height: string;
	width: string;
	focus: keyof typeof dots;
}
export const generativeFill = async ({
	image,
	aspect,
	height,
	width,
	focus,
}: Props): Promise<string | undefined> => {
	try {
		if (image == undefined) {
			Alert.alert("please select the image first");
			return;
		}

		await validateAppVersion();

		if (!aspect || !focus) {
			Alert.alert("please select the aspect and focus");
			return;
		}

		const formData = new FormData();
		formData.append("image", {
			uri: image?.uri,
			name: image?.fileName,
			type: image?.mimeType,
		} as any);

		formData.append("aspect", aspect);
		formData.append("height", height);
		formData.append("width", width);
		formData.append("focus", focus);

		const response = await fetch(
			`${server}/api/v1/effects/generative-fill`,
			{
				method: "POST",
				// headers: {
				// 	"Content-Type": "multipart/form-data",
				// },
				body: formData,
			}
		);

		if (!response.ok) {
			return undefined;
		}

		const data: ApiResponse = await response.json();

		if (!data.success) {
			return undefined;
		}

		return data.data.transformedImageUrl;
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
