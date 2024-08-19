import { cld } from "@/cloudinary/cloudinary";
import { generativeRemove } from "@cloudinary/url-gen/actions/effect";
export const magicEraser = async ({
	publicId,
	prompt,
}: {
	publicId: string;
	prompt: string;
}) => {
	try {
		const image = cld
			.image(publicId)
			.effect(generativeRemove().prompt(prompt));

		console.log("the url of the image is ==>", image.toURL());

		return image.toURL();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
