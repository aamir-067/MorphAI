import { server } from "@/CONSTANTS";
import { ApiResponse } from "@/interfaces/IApiResponse";
import { ImagePickerAsset } from "expo-image-picker";

export const generalTransformation = async ({
	image,
	effect,
	args,
}: {
	image: ImagePickerAsset;
	effect: string;
	args: string;
}): Promise<string | undefined> => {
	try {
		const formData = new FormData();

		formData.append("image", {
			uri: image?.uri,
			name: image?.fileName,
			type: image?.mimeType,
		} as any);

		formData.append("effect", effect);
		formData.append("args", args);

		const response = await fetch(
			`${server}/api/v1/effects/general-transformation`,
			{
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
				},
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
