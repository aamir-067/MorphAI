import { cld } from "@/cloudinary/cloudinary";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
export const replaceImageBackground = async ({
	publicId,
	prompt,
}: {
	publicId: string;
	prompt: string;
}) => {
	try {
		const image = cld
			.image(publicId)
			.effect(generativeBackgroundReplace().prompt(prompt));

		console.log("the url of the image is ==>", image.toURL());

		return image.toURL();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
