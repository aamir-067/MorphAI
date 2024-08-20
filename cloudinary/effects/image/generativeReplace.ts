import { cld } from "@/cloudinary/cloudinary";
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";
export const imageRestore = async ({ publicId }: { publicId: string }) => {
	try {
		const image = cld.image(publicId).effect(generativeReplace());

		console.log("the url of the image is ==>", image.toURL());

		return image.toURL();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
