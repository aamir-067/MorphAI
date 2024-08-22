import { server } from "@/CONSTANTS";
import { ApiResponse } from "@/interfaces/IApiResponse";
import { ImagePickerAsset } from "expo-image-picker";

export const generativeRemove = async ({
	image,
	prompt,
	removeShadows,
	removeAllInstances,
}: {
	image: ImagePickerAsset;
	prompt: string;
	removeShadows: boolean;
	removeAllInstances: boolean;
}): Promise<string | undefined> => {
	try {
		const formData = new FormData();
		formData.append("image", {
			uri: image?.uri,
			name: image?.fileName,
			type: image?.mimeType,
		} as any);

		formData.append("prompt", prompt);
		formData.append("removeShadows", removeShadows as any);
		formData.append("removeAllInstances", removeAllInstances as any);

		const response = await fetch(
			`${server}/api/v1/effects/generative-remove`,
			{
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				body: formData,
			}
		);
		console.log(response.ok);
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
