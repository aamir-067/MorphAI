import { server } from "@/CONSTANTS";
import { ApiResponse } from "@/interfaces/IApiResponse";
import { ImagePickerAsset } from "expo-image-picker";

export const imageRestore = async ({
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

		const response = await fetch(`${server}/api/v1/effects/image-restore`, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: formData,
		});
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
