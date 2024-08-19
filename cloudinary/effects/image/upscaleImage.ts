import { cld } from "@/cloudinary/cloudinary";
import { upscale } from "@cloudinary/url-gen/actions/effect";
export const upscaleImage = async ({ publicId }: { publicId: string }) => {
	try {
		const image = cld.image(publicId).effect(upscale());

		console.log("the url of the image is ==>", image.toURL());

		return image.toURL();
	} catch (error) {
		console.log(error);
		return undefined;
	}
};
