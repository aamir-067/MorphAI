import { ApiResponse } from "@/interfaces/IApiResponse";
import { ImagePickerAsset } from "expo-image-picker";

export const removeBackground = async ({
	image,
}: {
	image: ImagePickerAsset;
}): Promise<string | undefined> => {
	try {
		const formData = new FormData();
		formData.append("image", {
			uri: image?.uri,
			name: image?.fileName,
			type: image?.mimeType,
		} as any);

		const response = await fetch(
			"http://10.0.2.2:3000/api/v1/effects/background-remove",
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
