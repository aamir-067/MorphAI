import { server } from "@/CONSTANTS";
import { ApiResponse } from "@/interfaces/IApiResponse";
import { ImagePickerAsset } from "expo-image-picker";

export const generativeReplace = async ({
	image,
	from,
	to,
	preserveShape,
	replaceAllInstances,
}: {
	image: ImagePickerAsset;
	from: string;
	to: string;
	preserveShape: boolean;
	replaceAllInstances: boolean;
}): Promise<string | undefined> => {
	try {
		const formData = new FormData();
		formData.append("image", {
			uri: image?.uri,
			name: image?.fileName,
			type: image?.mimeType,
		} as any);

		formData.append("from", from);
		formData.append("to", to);
		formData.append("preserveShape", preserveShape as any);
		formData.append("replaceAllInstances", replaceAllInstances as any);

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
